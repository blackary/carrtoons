(() => {
  const content = window.carrtoonsContent;
  const currentPage = document.body.dataset.page;

  if (!content) {
    return;
  }

  const navigation = [
    { page: "home", label: "Home", href: "index.html" },
    { page: "about", label: "About Karen", href: "about.html" },
    { page: "books", label: "Books", href: "books.html" },
    { page: "resources", label: "Other Resources", href: "resources.html" },
  ];

  const renderHeader = () => {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;

    const link = ({ page, label, href }) => `
      <a class="nav-link nav-link-${page}${page === currentPage ? " is-current" : ""}"
         href="${href}"${page === currentPage ? ' aria-current="page"' : ""}>${label}</a>`;

    header.innerHTML = `
      <div class="masthead">
        <nav class="site-nav" aria-label="Primary navigation">
          ${link(navigation[0])}
          ${link(navigation[1])}
          <a class="brand" href="index.html" aria-label="CarrToons home">
            <strong>CarrToons</strong>
            <span>Tools to Help Kids Become Wise</span>
            <small>Proverbs 4:7</small>
          </a>
          ${link(navigation[2])}
          ${link(navigation[3])}
        </nav>
      </div>`;
  };

  const renderFooter = () => {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-inner">
        <p><strong>CarrToons</strong><span>Tools to Help Kids Become Wise</span></p>
        <nav aria-label="Footer navigation">
          ${navigation.map(({ label, href }) => `<a href="${href}">${label}</a>`).join("")}
        </nav>
        <p class="footer-verse">Proverbs 4:7</p>
      </div>`;
  };

  const renderBooks = () => {
    const list = document.querySelector("[data-book-list]");
    if (!list) return;

    list.innerHTML = content.books
      .map(
        (book, index) => `
          <article class="book-entry book-entry-${book.theme}${index % 2 ? " book-entry-reverse" : ""}" id="${book.id}">
            <div class="book-art book-art-${book.images.length > 1 ? "spread" : "single"}">
              ${book.images
                .map(({ src, alt }) => `<img src="${src}" alt="${alt}" loading="lazy" />`)
                .join("")}
            </div>
            <div class="book-copy">
              <div class="book-meta"><span>${book.label}</span><strong>${book.status}</strong></div>
              <h2>${book.title}</h2>
              <p>${book.description}</p>
              <p class="book-note">${book.note}</p>
              ${
                book.links.length
                  ? `<ul class="document-links">${book.links
                      .map(
                        ({ label, href }) =>
                          `<li><a href="${href}" target="_blank" rel="noreferrer">${label}<span aria-hidden="true"> &#8599;</span><span class="visually-hidden"> (opens PDF in a new tab)</span></a></li>`
                      )
                      .join("")}</ul>`
                  : '<p class="coming-note">No download yet</p>'
              }
            </div>
          </article>`
      )
      .join("");
  };

  const renderResources = () => {
    const list = document.querySelector("[data-resource-list]");
    if (!list) return;

    list.innerHTML = content.resources
      .map(
        (resource) => `
          <article class="resource-row">
            <p class="resource-number">${resource.number}</p>
            <div class="resource-copy">
              <p class="resource-status">${resource.status}</p>
              <h2>${resource.title}</h2>
              <p>${resource.description}</p>
            </div>
          </article>`
      )
      .join("");
  };

  renderHeader();
  renderFooter();
  renderBooks();
  renderResources();
})();
