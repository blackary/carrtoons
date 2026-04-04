const siteContent = window.siteContent;

const byId = (id) => document.getElementById(id);
const joinClasses = (...names) => names.filter(Boolean).join(" ");

const setText = (id, value) => {
  const node = byId(id);
  if (node) {
    node.textContent = value;
  }
};

const setImage = (id, image) => {
  const node = byId(id);
  if (!node || !image) return;
  node.src = image.src;
  node.alt = image.alt;
  if (image.loading) {
    node.loading = image.loading;
  }
};

const createLink = ({ label, href, className = "", newTab = true }) => {
  const link = document.createElement("a");
  link.textContent = label;
  link.href = href;
  if (className) {
    link.className = className;
  }
  if (newTab && !href.startsWith("#")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  return link;
};

const applyReveal = (node, rotate) => {
  node.setAttribute("data-reveal", "");
  if (rotate) {
    node.style.setProperty("--reveal-rotate", rotate);
  }
  return node;
};

const appendParagraphs = (containerId, paragraphs) => {
  const container = byId(containerId);
  if (!container) return;
  container.replaceChildren(
    ...paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    })
  );
};

const renderHero = (hero) => {
  setText("hero-eyebrow", hero.eyebrow);
  setText("hero-title", hero.title);
  setText("hero-lede", hero.lede);
  setText("hero-note", hero.note);
  setImage("hero-main-image", hero.mainImage);

  const actions = byId("hero-actions");
  actions.replaceChildren(
    ...hero.actions.map((action) =>
      createLink({
        label: action.label,
        href: action.href,
        className: action.className,
        newTab: false,
      })
    )
  );

  const sparks = byId("hero-sparks");
  sparks.replaceChildren(
    ...hero.sparks.map((spark) => {
      const figure = applyReveal(document.createElement("figure"), spark.rotate);
      figure.className = `hero-spark ${spark.positionClass}`;

      const image = document.createElement("img");
      image.src = spark.image.src;
      image.alt = spark.image.alt;
      image.loading = "lazy";

      const caption = document.createElement("figcaption");
      caption.textContent = spark.caption;

      figure.append(image, caption);
      return figure;
    })
  );
};

const renderPurposeCards = (cards) => {
  const container = byId("purpose-cards");
  container.replaceChildren(
    ...cards.map((card) => {
      const article = applyReveal(document.createElement("article"), card.rotate);
      article.className = "purpose-card";

      const title = document.createElement("p");
      title.className = "purpose-title";
      title.textContent = card.title;

      const text = document.createElement("p");
      text.className = "purpose-text";
      text.textContent = card.text;

      article.append(title, text);
      return article;
    })
  );
};

const renderFeaturedCollection = (section) => {
  setText("featured-tag", section.tag);
  setText("featured-title", section.title);
  setText("featured-description", section.description);
  setText("featured-note", section.note);

  const visuals = byId("featured-visuals");
  visuals.replaceChildren(
    ...section.visuals.map((visual) => {
      const figure = document.createElement("figure");
      figure.className = visual.frameClass;

      const image = document.createElement("img");
      image.src = visual.image.src;
      image.alt = visual.image.alt;
      image.loading = "lazy";

      figure.append(image);
      return figure;
    })
  );

  const chapters = byId("featured-chapters");
  chapters.replaceChildren(
    ...section.chapters.map((chapter) => {
      const item = document.createElement("li");
      item.append(
        createLink({
          label: chapter.label,
          href: chapter.href,
        })
      );
      return item;
    })
  );
};

const renderBookCards = (cards) => {
  const container = byId("book-grid");
  container.replaceChildren(
    ...cards.map((card) => {
      const article = applyReveal(document.createElement("article"), card.rotate);
      article.className = joinClasses("book-card", card.themeClass, card.layoutClass);

      const art = document.createElement("figure");
      art.className = "book-card-art";

      const image = document.createElement("img");
      image.src = card.image.src;
      image.alt = card.image.alt;
      image.loading = "lazy";
      art.append(image);

      const tag = document.createElement("p");
      tag.className = "section-tag";
      tag.textContent = card.tag;

      const title = document.createElement("h3");
      title.textContent = card.title;

      const text = document.createElement("p");
      text.textContent = card.text;

      const link = createLink({
        label: card.link.label,
        href: card.link.href,
        className: "text-link",
        newTab: false,
      });

      article.append(art, tag, title, text, link);
      return article;
    })
  );
};

const renderSamplerSection = (section) => {
  setText("sampler-tag", section.tag);
  setText("sampler-title", section.title);

  const grid = byId("sampler-grid");
  grid.replaceChildren(
    ...section.cards.map((card) => {
      const article = applyReveal(document.createElement("article"), card.rotate);
      article.className = joinClasses("sampler-card", card.layoutClass);

      const art = document.createElement("figure");
      art.className = "sampler-art";

      const image = document.createElement("img");
      image.src = card.image.src;
      image.alt = card.image.alt;
      image.loading = "lazy";
      art.append(image);

      const title = document.createElement("h3");
      title.textContent = card.title;

      const text = document.createElement("p");
      text.textContent = card.text;

      const link = createLink({
        label: card.link.label,
        href: card.link.href,
      });

      article.append(art, title, text, link);
      return article;
    })
  );
};

const renderAboutSection = (section) => {
  setText("about-tag", section.tag);
  setText("about-title", section.title);
  appendParagraphs("about-body", section.paragraphs);
  setText("about-origin-story", section.originStory);

  const action = byId("about-action");
  action.replaceChildren(
    createLink({
      label: section.action.label,
      href: section.action.href,
      className: "button-secondary inline-button",
    })
  );

  const board = byId("about-board");
  board.replaceChildren(
    ...section.board.map((item) => {
      const figure = document.createElement("figure");
      figure.className = item.frameClass;
      if (item.rotate) {
        figure.style.setProperty("--reveal-rotate", item.rotate);
        figure.setAttribute("data-reveal", "");
      }

      const image = document.createElement("img");
      image.src = item.image.src;
      image.alt = item.image.alt;
      image.loading = "lazy";

      const caption = document.createElement("figcaption");
      caption.textContent = item.caption;

      figure.append(image, caption);
      return figure;
    })
  );
};

const renderResourcesSection = (section) => {
  setText("resources-tag", section.tag);
  setText("resources-title", section.title);
  setText("resources-intro", section.intro);

  const cloud = byId("resource-cloud");
  cloud.replaceChildren(
    ...section.bubbles.map((bubble) => {
      const article = applyReveal(document.createElement("article"));
      article.className = `resource-bubble ${bubble.toneClass}`;

      const title = document.createElement("h3");
      title.textContent = bubble.title;

      const text = document.createElement("p");
      text.textContent = bubble.text;

      article.append(title, text);
      return article;
    })
  );

  setText("closing-tag", section.closing.tag);
  setText("closing-title", section.closing.title);
  setText("closing-text", section.closing.text);
  setImage("closing-image", { ...section.closing.image, loading: "lazy" });
};

const renderFooter = (footer) => {
  setText("footer-line", footer.line);
  setText("footer-note", footer.note);
};

const renderSiteContent = () => {
  if (!siteContent) {
    return;
  }

  renderHero(siteContent.hero);
  renderPurposeCards(siteContent.purposeCards);

  setText("books-tag", siteContent.booksSection.tag);
  setText("books-title", siteContent.booksSection.title);
  setText("books-intro", siteContent.booksSection.intro);
  renderFeaturedCollection(siteContent.featuredCollection);
  renderBookCards(siteContent.bookCards);

  renderSamplerSection(siteContent.samplerSection);
  renderAboutSection(siteContent.aboutSection);
  renderResourcesSection(siteContent.resourcesSection);
  renderFooter(siteContent.footer);
};

renderSiteContent();

const revealItems = document.querySelectorAll("[data-reveal]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const sectionLinks = document.querySelectorAll("[data-section-link]");
const sections = ["home", "books", "about", "resources"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const validSectionIds = new Set(sections.map((section) => section.id));
const getHashSectionId = () => window.location.hash.replace("#", "");

const setActiveLink = (id) => {
  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.sectionLink === id);
  });
};

if (revealItems.length) {
  revealItems.forEach((item, index) => {
    window.setTimeout(() => {
      item.classList.add("is-visible");
    }, 70 * index);
  });
}

if (sections.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      if (validSectionIds.has(getHashSectionId())) {
        return;
      }

      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActiveLink(visible.target.id);
      }
    },
    {
      threshold: [0.3, 0.55, 0.75],
      rootMargin: "-15% 0px -40% 0px",
    }
  );

  sections.forEach((section) => activeObserver.observe(section));
  const hashId = getHashSectionId();
  setActiveLink(validSectionIds.has(hashId) ? hashId : "home");
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.dataset.sectionLink;
    if (validSectionIds.has(targetId)) {
      setActiveLink(targetId);
    }
  });
});

window.addEventListener("hashchange", () => {
  const hashId = getHashSectionId();
  if (validSectionIds.has(hashId)) {
    setActiveLink(hashId);
  }
});

if (menuToggle && mobileNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.classList.toggle("is-open", !isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}
