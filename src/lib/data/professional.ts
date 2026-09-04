/**
 * Placeholder content for the professional site. Every string here is lorem
 * ipsum standing in for real copy — replace the values, not the shapes.
 */

export type TimelineMetric = {
  value: string;
  label: string;
};

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  org: string;
  body: string;
  /** Optional stat chips — the "minimalist infographic" beat, before real graphics exist. */
  metrics?: TimelineMetric[];
};

export const professionalHero = {
  eyebrow: 'Lorem · Ipsum · Dolor',
  lines: [
    { text: 'Designing systems.' },
    { text: 'Measuring outcomes.', em: true },
    { text: 'Shipping the result.' },
  ],
  bio:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor ' +
    'incididunt ut labore et dolore magna aliqua — ut enim ad minim veniam, quis nostrud ' +
    'exercitation ullamco laboris.',
  tags: ['Architecture', 'Platforms', 'Reliability', 'Mentoring', 'Delivery'],
  bgLetter: 'P',
  scrollLabel: 'Scroll for the timeline',
};

export const education: TimelineItem[] = [
  {
    id: 'edu-1',
    period: '2001 — 2005',
    title: 'Lorem Ipsum Baccalaureate',
    org: 'Consectetur Adipiscing Lyceum',
    body:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ' +
      'doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore.',
    metrics: [
      { value: '4', label: 'years' },
      { value: '2', label: 'languages' },
    ],
  },
  {
    id: 'edu-2',
    period: '2005 — 2009',
    title: 'BSc Dolor Sit Amet',
    org: 'Universitas Tempor Incididunt',
    body:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ' +
      'adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.',
    metrics: [
      { value: '240', label: 'credits' },
      { value: '6', label: 'projects' },
    ],
  },
  {
    id: 'edu-3',
    period: '2009 — 2011',
    title: 'MSc Magna Aliqua',
    org: 'Institutum Laboris Nisi',
    body:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit ' +
      'laboriosam, nisi ut aliquid ex ea commodi consequatur reprehenderit.',
    metrics: [
      { value: '1', label: 'thesis' },
      { value: '3', label: 'publications' },
    ],
  },
  {
    id: 'edu-4',
    period: '2012 — present',
    title: 'Continuing Veniam Quis',
    org: 'Self-directed',
    body:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis ' +
      'praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.',
    metrics: [{ value: '∞', label: 'ongoing' }],
  },
];

export const career: TimelineItem[] = [
  {
    id: 'car-1',
    period: '2011 — 2013',
    title: 'Junior Consectetur Engineer',
    org: 'Adipiscing Systems',
    body:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ' +
      'deserunt mollit anim id est laborum et dolorum fuga voluptatum.',
    metrics: [
      { value: '2', label: 'years' },
      { value: '5', label: 'services' },
    ],
  },
  {
    id: 'car-2',
    period: '2013 — 2016',
    title: 'Eiusmod Tempor Engineer',
    org: 'Incididunt Labs',
    body:
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit ' +
      'quo minus id quod maxime placeat facere possimus omnis voluptas assumenda.',
    metrics: [
      { value: '3', label: 'years' },
      { value: '12', label: 'releases' },
    ],
  },
  {
    id: 'car-3',
    period: '2016 — 2019',
    title: 'Senior Ut Labore Engineer',
    org: 'Magna Aliqua Group',
    body:
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus ' +
      'saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
    metrics: [
      { value: '3', label: 'years' },
      { value: '4', label: 'teams' },
    ],
  },
  {
    id: 'car-4',
    period: '2019 — 2023',
    title: 'Principal Veniam Architect',
    org: 'Nostrud Exercitation',
    body:
      'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis ' +
      'voluptatibus maiores alias consequatur aut perferendis doloribus asperiores.',
    metrics: [
      { value: '4', label: 'years' },
      { value: '30+', label: 'engineers' },
    ],
  },
  {
    id: 'car-5',
    period: '2023 — present',
    title: 'Ullamco Laboris Lead',
    org: 'Commodo Consequat',
    body:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur, excepteur sint occaecat cupidatat non proident.',
    metrics: [
      { value: 'now', label: 'current' },
      { value: '3', label: 'products' },
    ],
  },
];
