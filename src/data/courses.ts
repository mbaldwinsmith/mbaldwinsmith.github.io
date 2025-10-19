export type CourseLink = {
  title: string;
  url: string;
};

export type CourseSection = {
  title: string;
  items: CourseLink[];
};

export type Course = CourseLink & {
  sectionTitle: string;
};

export const courseSections: CourseSection[] = [
  {
    title: 'Apologetics',
    items: [
      {
        title: 'Apologetics and the New Evangelization',
        url: 'https://www.getprinciples.com/courses/apologetics-and-the-new-evangelization',
      },
      {
        title: 'Defending the Faith',
        url: 'https://www.getprinciples.com/courses/defending-the-faith',
      },
    ],
  },
  {
    title: 'Creeds',
    items: [
      {
        title: 'Catechism 101: The Profession of Faith',
        url: 'https://instituteofcatholicculture.org/courses/catechism-101-the-profession-of-faith',
      },
    ],
  },
  {
    title: 'Ecclesiology (The Church)',
    items: [
      {
        title: 'Ecclesiology',
        url: 'https://catholicstudiesacademy.com/courses/ecclesiology/',
      },
    ],
  },
  {
    title: 'Patristics (Church Fathers)',
    items: [
      {
        title: 'The Early Church: History, Theology, and Spirituality',
        url: 'https://online.christendom.edu/courses/approaching-difficult-questions-in-church-history',
      },
      {
        title: 'The Fathers of the Church',
        url: 'https://instituteofcatholicculture.org/courses/the-fathers-of-the-church',
      },
      {
        title: 'The Bible and the Church Fathers',
        url: 'https://archive.stpaulcenter.com/bible-studies/text-studies/the-bible-and-the-church-fathers/',
      },
    ],
  },
  {
    title: 'Discipleship',
    items: [
      {
        title: 'Catechism 103: Life in Christ',
        url: 'https://instituteofcatholicculture.org/courses/catechism-103-life-in-christ',
      },
      {
        title: 'Catechism 201: The Art of Catechesis',
        url: 'https://instituteofcatholicculture.org/courses/catechism-201-the-art-of-catechesis',
      },
    ],
  },
  {
    title: 'Doctrine',
    items: [
      {
        title: 'Christology',
        url: 'https://catholicstudiesacademy.com/courses/christology/',
      },
      {
        title: 'The Holy Trinity',
        url: 'https://catholicstudiesacademy.com/courses/the-holy-trinity/',
      },
      {
        title: 'Introduction to Moral Theology',
        url: 'https://catholicstudiesacademy.com/courses/introduction-to-moral-theology/',
      },
      {
        title: 'The Ten Commandments: A Scriptural, Theological, and Moral Study',
        url: 'https://catholicstudiesacademy.com/courses/the-ten-commandments-a-scriptural-theological-and-moral-study-coming-soon/',
      },
      {
        title: 'Theology 101: Fundamentals of Catholic Doctrine',
        url: 'https://instituteofcatholicculture.org/courses/theology-101-fundamentals-of-catholic-doctrine',
      },
      {
        title: 'Theology 102: The Development of Doctrine',
        url: 'https://instituteofcatholicculture.org/courses/theology-102-the-development-of-doctrine',
      },
    ],
  },
  {
    title: 'Intertextuality',
    items: [
      {
        title: 'Reading the Old Testament in the New: The Gospel of Matthew',
        url: 'https://stpaulcenter.com/bible-studies/text-studies/reading-the-old-testament-in-the-new-the-gospel-of-matthew/',
      },
    ],
  },
  {
    title: 'Liturgy',
    items: [
      {
        title: 'Sacred Liturgy: History & Principles of Christian Worship',
        url: 'https://instituteofcatholicculture.org/courses/sacred-liturgy-history-principles-of-christian-worship',
      },
    ],
  },
  {
    title: 'Biblical Theology',
    items: [
      {
        title: 'Genesis to Jesus',
        url: 'https://archive.stpaulcenter.com/bible-studies/text-studies/genesis-to-jesus/',
      },
      {
        title: 'Scripture 201: Biblical Theology',
        url: 'https://instituteofcatholicculture.org/courses/scripture-201-biblical-theology',
      },
    ],
  },
  {
    title: 'Mental Health',
    items: [
      {
        title: 'Sanctuary Course for Catholics',
        url: 'https://sanctuarymentalhealth.org/catholics/',
      },
    ],
  },
  {
    title: 'New Testament',
    items: [
      {
        title: 'Foundations of the New Testament',
        url: 'https://www.getprinciples.com/courses/foundations-of-the-new-testament',
      },
      {
        title: 'Scripture 102: Introduction to the New Testament',
        url: 'https://instituteofcatholicculture.org/courses/scripture-102-introduction-to-the-new-testament',
      },
      {
        title: 'Scripture 103: Acts of the Apostles',
        url: 'https://instituteofcatholicculture.org/courses/scripture-103-acts-of-the-apostles',
      },
    ],
  },
  {
    title: 'Old Testament',
    items: [
      {
        title: 'Scripture 101: Introduction to the Old Testament',
        url: 'https://instituteofcatholicculture.org/courses/scripture-101-introduction-to-the-old-testament',
      },
    ],
  },
  {
    title: 'Philosophy',
    items: [
      {
        title: 'Ancient Philosophy',
        url: 'https://catholicstudiesacademy.com/courses/ancient-philosophy/',
      },
      {
        title: 'The Crisis of Philosophy: 1900–2000',
        url: 'https://catholicstudiesacademy.com/courses/the-crisis-of-philosophy-1900-2000/',
      },
      {
        title: 'Epistemology',
        url: 'https://catholicstudiesacademy.com/courses/epistemology/',
      },
      {
        title: 'Medieval Philosophy',
        url: 'https://catholicstudiesacademy.com/courses/medieval-philosophy/',
      },
      {
        title: 'Metaphysics',
        url: 'https://catholicstudiesacademy.com/courses/metaphysics/',
      },
      {
        title: 'Modern Philosophy',
        url: 'https://catholicstudiesacademy.com/courses/modern-philosophy/',
      },
      {
        title: 'Philosophy 101: The Pursuit of Wisdom',
        url: 'https://instituteofcatholicculture.org/courses/philosophy-101-the-pursuit-of-wisdom',
      },
      {
        title: 'Philosophy 102: Reality and the Human Person',
        url: 'https://instituteofcatholicculture.org/courses/philosophy-102-reality-and-the-human-person',
      },
      {
        title: 'The Philosophy of Art and Beauty',
        url: 'https://online.christendom.edu/courses/the-philosophy-of-art-and-beauty',
      },
      {
        title: 'Traditional Logic: A Practicum in Classical Reasoning',
        url: 'https://instituteofcatholicculture.org/courses/traditional-logic-a-practicum-in-classical-reasoning',
      },
      {
        title: 'Understanding Human Nature: Man the Jewel of Creation',
        url: 'https://www.getprinciples.com/courses/understanding-human-nature',
      },
      {
        title: 'Philosophy 201: Philosophy of God and Nature',
        url: 'https://instituteofcatholicculture.org/courses/philosophy-201-philosophy-of-god-and-nature',
      },
    ],
  },
  {
    title: 'Politics',
    items: [
      {
        title: 'Catholic Political Thought 101: Foundations and Principles',
        url: 'https://instituteofcatholicculture.org/courses/catholic-political-thought-101',
      },
      {
        title: 'Catholic Political Thought 102: Modernity & the Common Good',
        url: 'https://instituteofcatholicculture.org/courses/catholic-political-thought-102',
      },
      {
        title: 'The History of Western Political Thought',
        url: 'https://online.christendom.edu/courses/the-history-of-western-political-thought',
      },
    ],
  },
  {
    title: 'Prayer',
    items: [
      {
        title: 'Catechism 104: Christian Prayer',
        url: 'https://instituteofcatholicculture.org/courses/catechism-104-christian-prayer',
      },
    ],
  },
  {
    title: 'Spiritual Life',
    items: [
      {
        title: 'Spiritual Life 101: Prayer in the Life of the Church',
        url: 'https://instituteofcatholicculture.org/courses/spiritual-life-101-prayer-in-the-life-of-the-church',
      },
      {
        title: 'Spiritual Life 102: Praying with Scripture',
        url: 'https://instituteofcatholicculture.org/courses/spiritual-life-102-praying-with-scripture',
      },
      {
        title: 'Spiritual Life 201: Prayer with the Mystics',
        url: 'https://instituteofcatholicculture.org/courses/spiritual-life-201-prayer-with-the-mystics',
      },
    ],
  },
  {
    title: 'Sacraments',
    items: [
      {
        title: 'Catechism 102: The Celebration of the Christian Mystery',
        url: 'https://instituteofcatholicculture.org/courses/catechism-102-the-celebration-of-the-christian-mystery',
      },
      {
        title: 'The Lamb’s Supper: The Bible and the Mass',
        url: 'https://stpaulcenter.com/bible-studies/text-studies/the-lambs-supper-the-bible-and-the-mass/',
      },
      {
        title: 'The Bible and the Sacraments',
        url: 'https://archive.stpaulcenter.com/bible-studies/text-studies/the-bible-and-the-sacraments/',
      },
    ],
  },
  {
    title: 'Soteriology (Salvation)',
    items: [
      {
        title: 'Covenant Love: Introducing the Biblical Worldview',
        url: 'https://stpaulcenter.com/bible-studies/text-studies/covenant-love-introducing-the-biblical-worldview/',
      },
      {
        title: 'God’s Covenant Plan',
        url: 'https://stpaulcenter.com/bible-studies/text-studies/gods-covenant-plan/',
      },
      {
        title: '“He Must Reign”: The Kingdom of God in Scripture',
        url: 'https://stpaulcenter.com/bible-studies/text-studies/he-must-reign-the-kingdom-of-god-in-scripture/',
      },
    ],
  },
  {
    title: 'Virgin Mary',
    items: [
      {
        title: 'Holy Queen: The Mother of God in the Word of God',
        url: 'https://stpaulcenter.com/bible-studies/text-studies/holy-queen-the-mother-of-god-in-the-word-of-god/',
      },
    ],
  },
  {
    title: 'Virtue',
    items: [
      {
        title: 'The Cardinal Virtues: Keys to the Good Life',
        url: 'https://instituteofcatholicculture.org/courses/the-cardinal-virtues-keys-to-the-good-life',
      },
    ],
  },
];

export const allCourses: Course[] = courseSections.flatMap((section) =>
  section.items.map((course) => ({
    ...course,
    sectionTitle: section.title,
  })),
);
