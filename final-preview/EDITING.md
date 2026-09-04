# Editing the CarrToons preview

This site has no build step. It is plain HTML, CSS, and JavaScript.

## Change books, downloads, and future resources

Edit `content.js`.

- Each item in `books` controls a book title, status, description, images, and PDF links.
- Copy one complete book object to add a book.
- Each item in `resources` controls one row on the Other Resources page.
- Put commas between items and keep image/PDF paths inside quotation marks.
- A book can have a `chapters` list. A chapter with `href` has a PDF download;
  a chapter with only `status` is shown as text, not a broken or disabled link.

### Post a finished chapter

1. Add the final PDF to `assets/books/` using a simple filename such as `genre.pdf`.
2. Find its title in the `chapters` list in `content.js`.
3. Replace `status: "Coming soon"` with `href: "../assets/books/genre.pdf"`.
4. Update the book's available-chapter count and introductory wording.
5. Preview the Books page and open the new PDF before publishing.

Files under `assets/` are included in deployment automatically. No workflow edit is needed.

## Change page wording

- Home page: `index.html`
- Books introduction: `books.html`
- Karen's biography: `about.html`
- Resources introduction and closing note: `resources.html`

## Add images or PDFs

1. Put images in `assets/` and new PDFs in `assets/books/`.
2. Add or update the matching `src`, `alt`, or `href` in `content.js` or the relevant page.
3. Add new root-level PDFs to `.github/workflows/pages.yml` so GitHub Pages publishes them.

Every image needs useful `alt` text describing what the image shows.

## A first editing session with Karen

Karen does not need to install tools or use AI. The current files can be edited in
GitHub's browser editor after repository access has been granted. Start with one
sentence, preview the change together, and then publish it.

The book/resource data is separated from layout, but it is still JavaScript, not a
visual editor. For now, leave the surrounding quotes, commas, and braces alone.
If Karen would rather use labeled fields and image uploads, agree on and connect
a browser-based content editor before handing over independent publishing.
Do not describe the present site as having that editor already.
