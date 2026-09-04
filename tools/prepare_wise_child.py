"""Prepare supplied PDFs without redrawing or downsampling artwork.

Run: uv run --with pymupdf --with pillow python tools/prepare_wise_child.py BOOK CORRECTIONS
"""

import argparse
import hashlib
import io
from pathlib import Path

import fitz
from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parents[1]


def page_fingerprint(page):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False)
    return (page.rect, page.get_text(), hashlib.sha256(pixmap.samples).hexdigest())


def rendered_image(page):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False)
    return Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)


def prepare_book(source_path, output_path):
    with fitz.open(source_path) as document:
        # Re-encode scans only; retain their pixel dimensions and page transforms.
        images = {}
        for page in document:
            for image in page.get_images():
                images.setdefault(image[0], (page.number, image))
        for xref in images:
            extracted = document.extract_image(xref)
            if extracted["ext"] not in {"jpeg", "jpg"}:
                continue
            with Image.open(io.BytesIO(extracted["image"])) as image:
                encoded = io.BytesIO()
                image.save(encoded, format="JPEG", quality=85, optimize=True)
                if encoded.tell() < len(extracted["image"]):
                    # Retain the existing color profile, soft mask, and transforms.
                    document.update_stream(xref, encoded.getvalue(), compress=False)
                    document.xref_set_key(xref, "Filter", "/DCTDecode")
                    document.xref_set_key(xref, "DecodeParms", "null")
        document.save(output_path, garbage=4, deflate=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("book", type=Path)
    parser.add_argument("corrections", type=Path)
    args = parser.parse_args()
    downloads = ROOT / "assets" / "books"
    previews = ROOT / "assets" / "renders"
    downloads.mkdir(parents=True, exist_ok=True)

    with fitz.open(args.book) as source, fitz.open(args.corrections) as corrections:
        # Guard page offsets against a different edition or attachment.
        assert len(source) == 111, "Confirm page mapping for this edition first."
        assert len(corrections) == 3
        assert "HOW THE WISE CHILD BOOK CAME TO BE" in corrections[1].get_text()
        assert "Proverbs 6:6-11" in source[60].get_text()
        assert source[60].get_text().strip().endswith("51")
        assert source[2].get_text() == corrections[1].get_text()
        assert source[3].get_text() == corrections[2].get_text()

        book_path = downloads / "the-wise-child-book.pdf"
        prepare_book(args.book, book_path)
        assert book_path.stat().st_size < 50 * 1024 * 1024, "Too large for the site."

        with fitz.open(book_path) as prepared:
            assert len(prepared) == len(source)
            maximum_error = 0
            for index, page in enumerate(source):
                output = prepared[index]
                assert page.rect == output.rect
                assert page.get_text() == output.get_text()
                dimensions = lambda p: [(i["width"], i["height"], i["bbox"]) for i in p.get_image_info()]
                assert dimensions(page) == dimensions(output), f"Image resampled or moved on page {index + 1}"
                difference = ImageStat.Stat(ImageChops.difference(rendered_image(page), rendered_image(output)))
                error = max(difference.mean)
                assert error < 2 and max(difference.rms) < 8, f"Review compression quality on page {index + 1}"
                maximum_error = max(maximum_error, error)
        print(f"Verified all {len(source)} pages: text, layout, and image dimensions unchanged.")
        print(f"Maximum page mean compression error: {maximum_error:.3f}/255.")

        preface_path = downloads / "the-wise-child-book-preface.pdf"
        with fitz.open() as preface:
            preface.insert_pdf(corrections, from_page=1, to_page=2)
            preface.save(preface_path, garbage=4, deflate=True)
        with fitz.open(preface_path) as prepared:
            assert len(prepared) == 2
            for index in range(2):
                assert page_fingerprint(prepared[index]) == page_fingerprint(corrections[index + 1])
        print("Verified the standalone preface contains only the two intended pages.")

        for page, name in [
            (source[12], "wise-child-wisdom.png"),
            (corrections[1], "wise-child-preface.png"),
        ]:
            page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(previews / name)

        for path in [book_path, preface_path]:
            print(f"{path.relative_to(ROOT)}: {path.stat().st_size / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
