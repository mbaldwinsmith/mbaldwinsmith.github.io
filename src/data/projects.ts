import type { ImageMetadata } from 'astro';
import ChurchDashboardImage from '../assets/portfolio/ChurchDashboard.png';
import MarkdownEditorImage from '../assets/portfolio/MarkdownEditor.png';
import RegulaImage from '../assets/portfolio/Regula.png';

export type ProjectBadge = {
  icon: string;
  label: string;
};

export type ProjectLink = {
  href: string;
  label: string;
};

export type ProjectImage = {
  asset: ImageMetadata;
  alt: string;
  sizes: string;
};

export type Project = {
  name: string;
  subtitle: string;
  description: string;
  badges: ProjectBadge[];
  highlights: string[];
  image: ProjectImage;
  primaryLink: ProjectLink;
  secondaryLink?: ProjectLink;
};

export const projects: Project[] = [
  {
    name: 'Church Attendance Dashboard',
    subtitle: 'Interactive analytics for pastoral insight.',
    description:
      'Church Attendance Dashboard is a web tool that lets you upload a CSV of church attendance data—broken down by week, site, service, and kids check-in—and then interactively visualize trends over time. It generates charts and summaries such as total and average attendance, peak weeks, and distributions across services/sites. The app uses a placeholder dataset by default, but you can replace it with your own data formatted according to the specified CSV schema.',
    badges: [
      { icon: 'database', label: 'Data craft' },
      { icon: 'chart-line', label: 'Trend analysis' },
    ],
    highlights: [
      'Filter and slice data by year, site, service, and metric to explore specific subsets.',
      'Visualisations including weekly trend lines, monthly bar charts, and pie charts of service/site distributions.',
      'Tabular “Recent Weeks” view showing raw data entries (up to 50) filtered by selected parameters.',
    ],
    image: {
      asset: ChurchDashboardImage,
      alt: 'Screenshot preview of the Church Attendance Dashboard interface',
      sizes: '(min-width: 64rem) 720px, 100vw',
    },
    primaryLink: {
      href: 'https://mbaldwinsmith.github.io/churchdatadashboard/',
      label: 'View the live dashboard',
    },
    secondaryLink: {
      href: 'https://github.com/mbaldwinsmith/churchdatadashboard',
      label: 'Browse the code',
    },
  },
  {
    name: "Mark's Markdown Editor",
    subtitle: 'A contemplative writing environment for the web.',
    description:
      "Mark's Markdown Editor progressive web app is a web-based tool that allows users to write, edit, and preview Markdown content in real time. The interface is minimalist and user-friendly: a single-pane editor updates the rendered Markdown instantly as you type, so you can stay focused on the words. The editor supports basic formatting, links, lists, code blocks, headings, and seamless live previewing, making it convenient for drafting documents, notes, or writing content for web pages.",
    badges: [
      { icon: 'keyboard', label: 'Writing flow' },
      { icon: 'eye', label: 'Live preview' },
    ],
    highlights: [
      'Live inline preview so changes in Markdown are instantly reflected in the rendered version without leaving the editor.',
      'Support for standard Markdown syntax elements (headings, lists, links, code blocks, images, etc.).',
      'Simple, calm UI designed for distraction-free writing with intuitive controls for applying Markdown formatting.',
    ],
    image: {
      asset: MarkdownEditorImage,
      alt: "Screenshot preview of Mark's Markdown Editor interface",
      sizes: '(min-width: 64rem) 720px, 100vw',
    },
    primaryLink: {
      href: 'https://mbaldwinsmith.github.io/markdownEditor/',
      label: 'Use the editor',
    },
    secondaryLink: {
      href: 'https://github.com/mbaldwinsmith/markdownEditor',
      label: 'Explore the repository',
    },
  },
  {
    name: 'Regula',
    subtitle: 'A mindful companion for rhythms of prayer.',
    description:
      'Regula is a web-based tool focused on helping users integrate mindfulness with Catholic prayer practices. It offers guided prayer experiences, tracks when and how prayers are practiced, and supports reflection on prayer habits over time. The app is structured to help users develop consistency, mindfulness, and deeper awareness in their spiritual life through tangible tracking and gentle prompts.',
    badges: [
      { icon: 'bezier-curve', label: 'Product design' },
      { icon: 'clock', label: 'Habit tracking' },
    ],
    highlights: [
      'Guided, themed prayer sessions to cultivate an intentional prayer life.',
      'A log or tracking system that records prayer sessions so patterns and consistency can be seen at a glance.',
      'Reflective feedback and visualisations to help users understand their prayer rhythms and growth.',
    ],
    image: {
      asset: RegulaImage,
      alt: 'Screenshot preview of the Regula prayer companion interface',
      sizes: '(min-width: 64rem) 720px, 100vw',
    },
    primaryLink: {
      href: 'https://mbaldwinsmith.github.io/mindfulprayerapp/',
      label: 'Start a session',
    },
    secondaryLink: {
      href: 'https://github.com/mbaldwinsmith/mindfulprayerapp',
      label: 'See how it’s built',
    },
  },
];
