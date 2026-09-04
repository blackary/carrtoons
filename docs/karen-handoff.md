# Karen's September 3 corrections and remaining handoff

This is a maintainer checklist, not visitor-facing copy.

## Applied

- Teaching Art and Other Resources use Karen's replacement sentences verbatim.
- The Wise Child Book's standalone preface is extracted from pages 2-3 of
  `Website word corrections pdf.pdf`. Page 1 contains private website feedback and
  is deliberately excluded from the public download.
- The existing `1 Preface .pdf` belongs to The Wise Child and the Word of God. It
  is retained under that book, not overwritten globally across earlier concepts.
- All seven Word of God chapter titles are listed. Only The Word of God and
  Context link to the supplied completed editions. The two rough chapter links
  are removed from the final preview; the old concepts remain unchanged.
- The supplied 111-page Wise Child Book is offered as its current edition. The
  website explicitly notes that the page 51 update is still pending.
- Thumbnail images are rendered from supplied PDF pages, not AI-redrawn art.
- The 126 MB full-book attachment is recompressed to about 45 MB without
  downsampling its scans. All 111 pages retain the same text, image dimensions,
  and layout. The largest per-page mean rendered difference is 0.047/255.
  The source file remains untouched. The extracted preface is lossless.

## Still needed from Karen

- Finished editions of The Meaning of Words and Genre.
- Scripture Interprets Scripture; Principles and Applications; Understanding the
  Person Who is Writing and the People Described in the Writing.
- The corrected ant page. Printed page 51 is physical PDF page 61 (zero-based
  index 60) in the 111-page attachment. Do not replace physical page 51 by mistake.
- The Word picture file mentioned in the email, which was not attached here.
- Confirmation that the address printed on her book's cover is the inbox she
  wants website questions delivered to. No form or email address has been added
  to the page without that confirmation.

## Contact

A contact form is a small set of fields on the website, typically name, email,
and message. Visitors press Send; Karen receives the message in her email inbox
and can reply there. It is different from an email link, which opens the visitor's
own mail application.

GitHub Pages serves static files and cannot itself deliver email. Connect a
form-delivery service only after its account and recipient are confirmed. Add
spam protection, clear success/failure feedback, a short privacy explanation,
and a tested reply-to address. Do not fake successful delivery in a static form.

## carrtoons.org launch

On September 3, `dig carrtoons.org A` returned NXDOMAIN. This does not prove the
domain is available to buy. The current Pages API reports no repository custom
domain and the existing preview remains at `blackary.com/carrtoons/`.

1. Confirm whether Karen owns the domain and where it is registered. If not,
   registration needs her account, billing details, and approval of the actual
   registration/renewal price. Do not purchase it or guess account ownership.
2. Obtain delegated DNS access, not a password pasted into chat.
3. Verify domain ownership in GitHub; add it to the Pages repository before
   pointing DNS at GitHub. Preserve unrelated DNS and email records.
4. Configure apex A records and a www CNAME per current GitHub documentation.
5. Publish the approved site at the new domain's root, rather than exposing the
   version chooser as Karen's homepage. Review asset/PDF paths during that move.
6. Check apex/www redirects, certificate issuance, and HTTPS enforcement.
7. Test links and any contact delivery on the actual domain before announcing it.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Editing

`final-preview/EDITING.md` covers the current browser-based GitHub editing path.
Arrange one guided edit before giving Karen independent publishing access. The
site does not yet have a visual content editor; choose one together only if the
current small-file workflow proves too technical. Keep hosting static.
