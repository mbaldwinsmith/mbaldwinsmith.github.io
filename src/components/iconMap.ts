import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faBezierCurve,
  faBookOpen,
  faChartColumn,
  faChartLine,
  faChevronDown,
  faChurch,
  faClock,
  faComments,
  faCompassDrafting,
  faCross,
  faDatabase,
  faDove,
  faEnvelope,
  faEnvelopeOpenText,
  faFeather,
  faFeatherPointed,
  faFire,
  faFireFlameCurved,
  faEye,
  faHandsHolding,
  faHandsPraying,
  faHandHoldingHeart,
  faKeyboard,
  faLeaf,
  faLightbulb,
  faMapLocationDot,
  faMicrophoneLines,
  faPaperPlane,
  faPenNib,
  faPeopleCarry,
  faPeopleGroup,
  faSeedling,
  faShieldHalved,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin, faThreads, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import type { IconName } from '../data/icons';
import { iconNames } from '../data/icons';

export const iconDefinitions = {
  'arrow-left': faArrowLeft,
  'arrow-right': faArrowRight,
  'arrow-up-right-from-square': faArrowUpRightFromSquare,
  'bezier-curve': faBezierCurve,
  'book-open': faBookOpen,
  'chart-column': faChartColumn,
  'chart-line': faChartLine,
  'chevron-down': faChevronDown,
  church: faChurch,
  clock: faClock,
  comments: faComments,
  'compass-drafting': faCompassDrafting,
  cross: faCross,
  database: faDatabase,
  dove: faDove,
  envelope: faEnvelope,
  'envelope-open-text': faEnvelopeOpenText,
  feather: faFeather,
  'feather-pointed': faFeatherPointed,
  fire: faFire,
  flame: faFireFlameCurved,
  'hands-holding': faHandsHolding,
  'hands-praying': faHandsPraying,
  'hand-holding-heart': faHandHoldingHeart,
  keyboard: faKeyboard,
  eye: faEye,
  leaf: faLeaf,
  lightbulb: faLightbulb,
  'map-location-dot': faMapLocationDot,
  'microphone-lines': faMicrophoneLines,
  'paper-plane': faPaperPlane,
  'pen-nib': faPenNib,
  'people-carry': faPeopleCarry,
  'people-group': faPeopleGroup,
  seedling: faSeedling,
  'shield-halved': faShieldHalved,
  sun: faSun,
  github: faGithub,
  instagram: faInstagram,
  'x-twitter': faXTwitter,
  linkedin: faLinkedin,
  threads: faThreads,
} satisfies Record<IconName, IconDefinition>;

export const iconMap = iconNames.reduce<Record<IconName, IconDefinition>>((map, iconName) => {
  const icon = iconDefinitions[iconName];

  if (!icon) {
    throw new Error(`Icon "${iconName}" is not defined in iconDefinitions`);
  }

  map[iconName] = icon;
  return map;
}, {} as Record<IconName, IconDefinition>);
