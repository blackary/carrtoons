# CarrToons

Static website prototype for Karen Carr's CarrToons project.

The site is plain HTML, CSS, JavaScript, image assets, and PDFs. There is no build step.

## Versions

- Root files are the original `v1` concept.
- `v2/` is a bright multipage author-and-books concept built from Karen's homepage sketch and website notes.
- `v3/` is a single-page family reading room concept with a more curriculum-forward layout.

## Run locally

```bash
uv run python -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Run the functionality smoke test

Start the local server in one terminal:

```bash
uv run python -m http.server 8000
```

Then run the Playwright smoke test in another:

```bash
npm run qa:smoke
```

This covers desktop and mobile navigation, content rendering from `content.js`, image loading,
and linked PDF availability.

To run the additional concept checks for `v2/` and `v3/`:

```bash
npx playwright test tests/concepts.spec.js --reporter=line
```

## Editing content

Most future edits should happen in `content.js`.

- Change homepage copy in `siteContent.hero`
- Change book section text in `siteContent.booksSection`
- Add or update featured chapter links in `siteContent.featuredCollection`
- Add new books by copying an object in `siteContent.bookCards`
- Add new lesson previews by copying an object in `siteContent.samplerSection.cards`
- Update Karen's bio and board images in `siteContent.aboutSection`
- Add future resources in `siteContent.resourcesSection.bubbles`
- Optional: set `layoutClass` on a book or lesson card if you want it to use one of the existing alternate layouts instead of the default stacked card style

## Editing images and PDFs

- Put new images under `assets/`
- Put new PDFs in the repo root if you want them linked like the current chapter samples
- After adding a file, update the matching `src`, `alt`, or `href` in `content.js`

## Editing layout and styles

- `index.html` holds the page structure
- `styles.css` holds the visual design
- `script.js` renders the editable content from `content.js`

## GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/pages.yml`.

On pushes to `main`, it stages only the public site files into a Pages artifact:

- `index.html`
- `styles.css`
- `content.js`
- `script.js`
- `assets/`
- the specific public excerpt PDFs linked on the site
- `.nojekyll`

That keeps the site static and ready for GitHub Pages without deploying local tooling files.

## Notes

The site uses Karen's PDF notes and rendered artwork already present in this folder.
No extra runtime packages are required.
