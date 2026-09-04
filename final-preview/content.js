// Edit this file to add books, PDFs, images, or future resources.
// Paths are relative to the final-preview folder.
window.carrtoonsContent = {
  books: [
    {
      id: "word-of-god",
      theme: "blue",
      status: "2 chapters available",
      label: "Free book chapters",
      title: "The Wise Child and the Word of God",
      description:
        "Seven illustrated chapters help children read the Bible carefully and understand what it says. The completed, colored editions of the first two chapters are available below.",
      note: "Each chapter is a free resource for families and teachers. The remaining chapters will be posted here in their finished editions.",
      images: [
        {
          src: "../assets/renders/word-of-god.png",
          alt: "Illustrated page from The Word of God chapter",
        },
        {
          src: "../assets/renders/context.png",
          alt: "Illustrated page from the Context chapter",
        },
      ],
      links: [{ label: "Read the preface", href: "../1%20Preface%20.pdf" }],
      chapterHeading: "The seven chapters",
      chapters: [
        {
          label: "The Word of God",
          href: "../1%20The%20Word%20of%20God%20%20WPDF.pdf",
        },
        { label: "Context", href: "../2%20Context.pdf" },
        {
          label: "The Meaning of Words",
          status: "Coming soon",
        },
        { label: "Genre", status: "Coming soon" },
        { label: "Scripture Interprets Scripture", status: "Coming soon" },
        { label: "Principles and Applications", status: "Coming soon" },
        {
          label: "Understanding the Person Who is Writing and the People Described in the Writing",
          status: "Coming soon",
        },
      ],
    },
    {
      id: "wise-child",
      theme: "yellow",
      status: "Whole book available",
      label: "Foundational book",
      title: "The Wise Child Book",
      description:
        "This book began with Proverbs, drawings, and a young child who kept asking to hear the pictures explained again. It helps families talk about wise choices one scene at a time.",
      note: "Read the whole book, or begin with the story of how it came to be. Both downloads are free. An update to page 51 (the ant lesson) is still to come.",
      images: [
        {
          src: "../assets/renders/wise-child-wisdom.png",
          alt: "Page 3 of The Wise Child Book: a wise child and a foolish child, with their parents",
        },
      ],
      links: [
        { label: "Read the whole book (45 MB PDF)", href: "../assets/books/the-wise-child-book.pdf" },
        { label: "Read the preface", href: "../assets/books/the-wise-child-book-preface.pdf" },
      ],
    },
    {
      id: "temptation",
      theme: "pink",
      status: "In progress",
      label: "Short lesson",
      title: "Temptation: A First Lesson",
      description:
        "A familiar trip past the candy shelf opens a child-sized conversation about wanting, obedience, correction, and change.",
      note: "The lesson will be posted here when Karen's finished file is ready.",
      images: [
        {
          src: "../assets/crops/temptation-cover-clean.png",
          alt: "Cover drawing for Temptation: A First Lesson",
        },
      ],
      links: [],
    },
  ],
  resources: [
    {
      number: "01",
      status: "Planned",
      title: "Draw Your Own Wise Child",
      description:
        "Drawing help in Karen's simple elementary style so children can make a wise child book of their own.",
    },
    {
      number: "02",
      status: "In progress",
      title: "Retreat curriculum and coloring books",
      description:
        "Bible class materials developed for church retreats, gathered into practical booklets for teachers and families.",
    },
    {
      number: "03",
      status: "Planned",
      title: "Homeschooling articles",
      description:
        "Short, useful pieces drawn from Karen's years of teaching her three boys at home.",
    },
    {
      number: "04",
      status: "Planned",
      title: "Simple drama with children",
      description:
        "Ideas for using uncomplicated drama to help children take part, remember, and understand.",
    },
  ],
};
