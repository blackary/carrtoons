// Most future content edits should happen in this file.
// To add a new book or lesson card, copy an object in the matching array below.
// Images should live under assets/, and PDF links can point to files in the repo root.

window.siteContent = {
  hero: {
    eyebrow: "Welcome to CarrToons",
    title: "Warm drawings. Wise books. Clear Bible teaching.",
    lede:
      "Karen Carr creates picture-rich books and lesson pages that help children understand truth, remember it, and grow in wisdom.",
    note:
      "The CarrToons are meant to help kids become wise.",
    actions: [
      { label: "Browse the books", href: "#books", className: "button-primary" },
      { label: "Meet Karen", href: "#about", className: "button-secondary" },
    ],
    mainImage: {
      src: "assets/renders/home-collage.png",
      alt: "Hand-drawn CarrToons collage with children reading the Bible and scenes from Karen Carr's books",
    },
    sparks: [
      {
        positionClass: "hero-spark-left",
        rotate: "-5deg",
        image: {
          src: "assets/crops/hero-candy.png",
          alt: "A hand-drawn scene about candy and temptation from CarrToons",
        },
        caption: "Everyday moments become lessons children can picture.",
      },
      {
        positionClass: "hero-spark-right",
        rotate: "4deg",
        image: {
          src: "assets/crops/hero-prayer.png",
          alt: "A hand-drawn praying child from CarrToons",
        },
        caption: "Bright, welcoming art keeps the purpose front and center.",
      },
    ],
  },

  purposeCards: [
    {
      title: "Big Truths, Child-Sized",
      text: "Karen turns serious ideas into lessons children can picture and remember.",
      rotate: "-3deg",
    },
    {
      title: "Warm Hand-Drawn Style",
      text: "The drawings stay central so the site feels like her books, not a generic template.",
    },
    {
      title: "Books That Invite Wisdom",
      text: "The purpose is simple: help parents bless their children with wisdom.",
      rotate: "3deg",
    },
  ],

  booksSection: {
    tag: "Books",
    title: "Books children can picture, understand, and remember.",
    intro:
      "Karen's notes return to the same priorities: keep the drawings central, keep the words short, and let the books help children think carefully and live wisely.",
  },

  featuredCollection: {
    tag: "Featured Collection",
    title: "The Wise Child and the Word of God",
    description:
      "These sample chapters introduce children to careful Bible reading: God's word, context, the meaning of words, and the kind of writing they are reading. The tone is gentle, but the teaching is serious and clear.",
    note:
      "Parents can read these aloud to younger children, while older children can begin to work through them for themselves.",
    visuals: [
      {
        frameClass: "stacked-page stacked-page-primary",
        image: {
          src: "assets/renders/word-of-god.png",
          alt: "Sample page from The Wise Child and the Word of God",
        },
      },
      {
        frameClass: "stacked-page stacked-page-secondary",
        image: {
          src: "assets/renders/context.png",
          alt: "Sample page from the Context chapter",
        },
      },
    ],
    chapters: [
      {
        label: "Open the chapter sample: The Word of God",
        href: "1%20The%20Word%20of%20God%20%20WPDF.pdf",
      },
      { label: "Open the chapter sample: Context", href: "2%20Context.pdf" },
      {
        label: "Open the chapter sample: The Meaning of Words",
        href: "4%20the%20meaning%20of%20words%20%20copy2.pdf",
      },
      { label: "Open the chapter sample: Genre", href: "5%20Genre%20Revised%20copy.pdf" },
    ],
  },

  bookCards: [
    {
      themeClass: "book-card-sky",
      layoutClass: "book-card-story",
      rotate: "-2deg",
      tag: "Core Book",
      title: "The Wise Child Book",
      text:
        "The original Wise Child drawings grew out of Karen's own time teaching Proverbs to her son. The scenes show wise and foolish choices in a way children can immediately recognize.",
      image: {
        src: "assets/crops/hero-reading.png",
        alt: "A hand-drawn scene of children reading together from CarrToons",
      },
      link: { label: "Read how the Wise Child story began", href: "#about" },
    },
    {
      themeClass: "book-card-rose",
      layoutClass: "book-card-note",
      rotate: "2deg",
      tag: "Short Lesson",
      title: "Temptation: A First Lesson",
      text:
        "A memorable household scene becomes a first lesson in desire, self-control, and obedience. It is simple enough for children, but rich enough for conversation.",
      image: {
        src: "assets/crops/temptation-cover-clean.png",
        alt: "Cover image for Temptation: A First Lesson",
      },
      link: { label: "See the future resources Karen has in mind", href: "#resources" },
    },
  ],

  samplerSection: {
    tag: "Sample Lessons",
    title: "Open a few pages and you can feel Karen's teaching style right away.",
    cards: [
      {
        layoutClass: "sampler-card-postage",
        rotate: "-2deg",
        title: "The Word of God",
        text: "Begins with God speaking and helps children see why Scripture carries authority.",
        image: {
          src: "assets/renders/word-of-god.png",
          alt: "Page preview from The Word of God",
        },
        link: { label: "Read excerpt", href: "1%20The%20Word%20of%20God%20%20WPDF.pdf" },
      },
      {
        layoutClass: "sampler-card-wide sampler-card-right",
        rotate: "1.5deg",
        title: "Context",
        text: "Shows children why the whole message matters before they interpret one small part.",
        image: {
          src: "assets/renders/context.png",
          alt: "Page preview from the Context chapter",
        },
        link: { label: "Read excerpt", href: "2%20Context.pdf" },
      },
      {
        layoutClass: "sampler-card-wide sampler-card-left",
        rotate: "-1deg",
        title: "The Meaning of Words",
        text: "Uses vivid examples to show that words and phrases have to be understood carefully.",
        image: {
          src: "assets/renders/meaning-page-10.png",
          alt: "Page preview from the Meaning of Words chapter",
        },
        link: { label: "Read excerpt", href: "4%20the%20meaning%20of%20words%20%20copy2.pdf" },
      },
      {
        layoutClass: "sampler-card-postage sampler-card-postage-alt",
        rotate: "2deg",
        title: "Genre",
        text: "Helps children notice the difference between commands, stories, letters, and more.",
        image: {
          src: "assets/renders/genre-page-8.png",
          alt: "Page preview from the Genre chapter",
        },
        link: { label: "Read excerpt", href: "5%20Genre%20Revised%20copy.pdf" },
      },
    ],
  },

  aboutSection: {
    tag: "About Karen Carr",
    title: "An art teacher, homeschool mom, and grandmother still teaching through drawings.",
    paragraphs: [
      "Karen K. Carr is a retired art teacher and homeschool mom from West Lafayette, Indiana. She loved drawing as a little girl, taught art in Indiana public schools, and later homeschooled her three boys.",
      "Much of that teaching involved drawing to help children understand deeper ideas. Now, as a grandmother, she is turning those same gifts of art, teaching, and curriculum building into books that help children grow in wisdom.",
    ],
    originStory:
      "The Wise Child Book began when Karen was reading Proverbs, sketching what she was learning, and her three-year-old son kept coming back to ask for the pictures again.",
    action: { label: "Read the preface", href: "1%20Preface%20.pdf" },
    board: [
      {
        frameClass: "portrait-card",
        image: {
          src: "assets/crops/karen-portrait-clean.png",
          alt: "Portrait of Karen Carr",
        },
        caption: "Karen Carr, artist, teacher, and creator of CarrToons.",
      },
      {
        frameClass: "paper-note small-note",
        rotate: "4deg",
        image: {
          src: "assets/crops/daisy-sketch.png",
          alt: "Early drawing of Karen's dog Daisy",
        },
        caption: "One of Karen's first homemade books featured Daisy the dog.",
      },
      {
        frameClass: "paper-note",
        rotate: "-3deg",
        image: {
          src: "assets/crops/art-teacher-drawing.png",
          alt: "Child's drawing of Karen as an art teacher",
        },
        caption: "Her students also drew the teacher who taught them to look closely.",
      },
    ],
  },

  resourcesSection: {
    tag: "Other Resources",
    title: "Karen is also imagining a wider circle of helps for parents and children.",
    intro:
      "Her planning pages point toward more books, drawing helps, and class materials. This section keeps that future sense alive without pretending those resources are already finished.",
    bubbles: [
      {
        toneClass: "bubble-gold",
        title: "Make Your Own Wise Child Book",
        text: "Drawing helps in Karen's elementary style.",
      },
      {
        toneClass: "bubble-blue",
        title: "The Light of the World",
        text: "A future lesson built around one clear biblical image.",
      },
      {
        toneClass: "bubble-rose",
        title: "The Love Loop",
        text: "Another memorable picture-led teaching tool.",
      },
      {
        toneClass: "bubble-green",
        title: "Church Retreat Classes",
        text: "Class materials and curricula that could become booklets or books.",
      },
    ],
    closing: {
      tag: "For Parents",
      title: "Warm, welcoming, and serious about wisdom.",
      text:
        "Karen's own design notes kept returning to the same idea: let the colors feel happy, let the drawings feel inviting, and keep the purpose plain. This site follows that lead.",
      image: {
        src: "assets/crops/laugh-drawing.png",
        alt: "Hand-drawn children laughing together",
      },
    },
  },

  footer: {
    line: "CarrToons: tools to help kids become wise.",
    note: "Sample book excerpts open in a new tab.",
  },
};
