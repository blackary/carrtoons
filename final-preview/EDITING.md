# Editing the CarrToons preview

This site has no build step. It is plain HTML, CSS, and JavaScript.

## Change books, downloads, and future resources

Edit `content.js`.

- Each item in `books` controls a book title, status, description, images, and PDF links.
- Copy one complete book object to add a book.
- Each item in `resources` controls one row on the Other Resources page.
- Put commas between items and keep image/PDF paths inside quotation marks.

## Change page wording

- Home page: `index.html`
- Books introduction: `books.html`
- Karen's biography: `about.html`
- Resources introduction and closing note: `resources.html`

## Add images or PDFs

1. Put images in `assets/` and PDFs in the repository root.
2. Add or update the matching `src`, `alt`, or `href` in `content.js` or the relevant page.
3. Add new root-level PDFs to `.github/workflows/pages.yml` so GitHub Pages publishes them.

Every image needs useful `alt` text describing what the image shows.
