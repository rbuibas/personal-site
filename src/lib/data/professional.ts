/**
 * Real content for the professional site, mapped 1:1 from Raul's timeline
 * document. Field names and the `YYYY-MM` dates follow that document's own
 * schema so the file can be re-derived if the source is regenerated.
 *
 * Two deliberate departures from the source, both Raul's own corrections:
 *  - Elektrobit sits at the head of "Up the Stack" rather than inside "Close to
 *    the Metal" — it was the bridge into object-oriented work and frameworks.
 *  - The era that followed is "Up the Stack", not "The Frontend Years", which
 *    overclaimed a 22-month span. Duration figures in the era notes and the arc
 *    summary are recomputed to match the moved boundary.
 *
 * The source document's working apparatus — its schema table, its "Open:" gaps
 * and its "Note for merging" asides — is deliberately not represented here.
 */

export type TimelineNode = {
  /** The source document's slug. Safe to use as a DOM id. */
  id: string;
  /** `YYYY-MM`. Omitted on project nodes, which inherit their parent's span. */
  start?: string;
  /** `YYYY-MM` or `present`. Omitted on project nodes. */
  end?: string;
  organisation: string;
  location: string;
  /** Omitted on a group wrapper, whose children carry the real titles. */
  title?: string;
  subtitle?: string;
  brief?: string;
  highlights?: string[];
  tags?: string[];
  children?: TimelineNode[];
  /** How to present `children`: overlapping roles, or work inside the role. */
  childKind?: 'concurrent' | 'project';
};

export type TimelineEra = {
  id: string;
  name: string;
  span: string;
  note?: string;
  items: TimelineNode[];
};

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatMonth(value: string) {
  const [year, month] = value.split('-');
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : year;
}

/** `2007-07`, `2009-09` → `Jul 2007 — Sep 2009`. Empty for inherited spans. */
export function formatPeriod(start?: string, end?: string) {
  if (!start) return '';
  const from = formatMonth(start);
  if (!end) return from;
  return `${from} — ${end === 'present' ? 'present' : formatMonth(end)}`;
}

/** The rail's axis label — the start year alone. */
export function startYear(start?: string) {
  return start ? start.slice(0, 4) : '';
}

export const professionalHero = {
  eyebrow: 'Principal Engineer · Architecture · Generative AI',
  lines: [
    { text: 'Nineteen years.' },
    { text: 'Two halves.', em: true },
    { text: 'One thread.' },
  ],
  bio:
    'Nineteen years in two halves that rarely meet in one person. The thread is the ' +
    'same throughout: build the thing underneath, and understand the constraints below that.',
  tags: ['Embedded', 'Compilers', 'JVM', 'Microservices', 'GenAI', 'Architecture'],
  bgLetter: 'R',
  scrollLabel: 'Scroll through nineteen years',
};

/**
 * The arc summary, offered by the source document as an intro block. Its
 * duration figures are recomputed for the moved era boundary: ten years close
 * to the metal and nine up the stack, and automotive code generation travels
 * with Elektrobit into the second half.
 */
export const careerIntro =
  'Nineteen years in two halves that rarely meet in one person. Ten years close to the ' +
  'metal — printer firmware in C across three processor architectures, then the GNU ' +
  'compiler and debugger themselves. Nine years upward through the stack — automotive ' +
  'code generation, Angular, JVM internals and garbage collection, distributed platforms ' +
  'on Quarkus and Kubernetes, and finally generative AI running in a product used by ' +
  'business travellers every day. The thread is the same throughout: build the thing ' +
  'underneath, and understand the constraints below that.';

export const education: TimelineEra[] = [
  {
    id: 'era-foundations',
    name: 'Foundations',
    span: '2001 — 2010',
    items: [
      {
        id: 'highschool-nikola-tesla',
        start: '2001-09',
        end: '2005-06',
        organisation: 'High School "Nikola Tesla"',
        location: 'Sremska Mitrovica, Serbia',
        title: 'The Board I Etched Myself',
        subtitle: 'Chose automation over general schooling',
        brief:
          'Four years of automatic control systems, ending with a diploma project built ' +
          'from bare copper up.',
        highlights: [
          'Circuit layout drawn by hand',
          'Board etched in acid, not ordered',
          'Controller chip + flash ROM',
          'Control software in Pascal/Delphi',
          'Hardware and software, same project',
        ],
        tags: ['electronics', 'automation', 'pcb', 'pascal', 'delphi', 'hardware', 'firmware'],
      },
      {
        id: 'bsc-informatics',
        start: '2005-10',
        end: '2008-07',
        organisation: 'West University of Timișoara — Faculty of Mathematics and Informatics',
        location: 'Timișoara, Romania',
        title: 'Teaching a Computer to Look',
        subtitle: 'From circuits to algorithms',
        brief:
          'BSc Informatics, 180 ECTS, with a thesis on image processing built as a working ' +
          'application rather than a paper.',
        highlights: [
          '180 ECTS',
          'C# desktop application',
          'Inversion, greyscale, blur, histogram equalisation',
          'Image inspection and statistics',
          'Became the base for the MSc thesis',
        ],
        tags: ['informatics', 'csharp', 'imaging', 'algorithms', 'thesis'],
      },
      {
        id: 'msc-software-engineering',
        start: '2008-10',
        end: '2010-07',
        organisation: 'West University of Timișoara — Faculty of Mathematics and Informatics',
        location: 'Timișoara, Romania',
        title: 'Four Hundred to One',
        subtitle: 'Threw away the pixels',
        brief:
          'MSc Informatics, study programme Software Engineering, with a thesis on an ' +
          'unconventional approach to image compression reaching roughly 400:1.',
        highlights: [
          '120 ECTS',
          'An approach well off the mainstream compression track',
          'Images stored as polygon vertices + colour',
          'Evolutionary search against a similarity score',
          'Configurable quality threshold',
          '≈400:1 compression',
        ],
        tags: [
          'informatics', 'compression', 'evolutionary',
          'algorithms', 'imaging', 'research', 'thesis',
        ],
      },
    ],
  },
];

export const career: TimelineEra[] = [
  {
    id: 'era-close-to-the-metal',
    name: 'Close to the Metal',
    span: '2007 — 2017',
    note: 'Ten years of low-level C, real-time systems and toolchains.',
    items: [
      {
        id: 'saguaro-intern',
        start: '2007-07',
        end: '2007-09',
        organisation: 'Saguaro Technology, Inc.',
        location: 'Timișoara, Romania',
        title: 'Three Months, One Server',
        subtitle: 'First code someone else depended on',
        brief: 'A summer internship spent writing a multithreaded backup server in C.',
        highlights: [
          'Multithreaded backup server in C',
          'Linux',
          'Bash deployment scripting for Tomcat',
        ],
        tags: ['internship', 'c', 'linux', 'multithreading', 'bash'],
      },
      {
        id: 'saguaro-junior',
        start: '2007-09',
        end: '2009-09',
        organisation: 'Saguaro Technology, Inc.',
        location: 'Timișoara, Romania',
        title: 'Inside the Printer',
        subtitle: 'Intern to engineer',
        brief:
          'Two years building printer-side resource handling in low-level C for high-end ' +
          'production printers.',
        highlights: [
          'IPDS printer firmware',
          'Resource database and caching mechanism',
          'Resource container parser',
          'TrueType font handling',
          'ANSI C on Linux',
        ],
        tags: ['c', 'firmware', 'printers', 'ipds', 'caching', 'parsing', 'ibm'],
      },
      {
        id: 'saguaro-developer',
        start: '2009-09',
        end: '2012-06',
        organisation: 'Saguaro Technology, Inc.',
        location: 'Timișoara, Romania',
        title: 'Same Code, Three Processors',
        subtitle: 'Went cross-architecture',
        brief:
          'Porting IPDS functionality across x86, MIPS and PowerPC, on three different ' +
          'operating systems.',
        highlights: [
          'x86, MIPS, PowerPC',
          'VxWorks, FreeBSD, openSUSE/SLES',
          'Image rasterization and caching',
          'TTF and OTF font support',
          'IOCA image handling',
        ],
        tags: [
          'c', 'porting', 'mips', 'powerpc',
          'vxworks', 'freebsd', 'realtime', 'rasterization',
        ],
      },
      {
        id: 'saguaro-advanced',
        start: '2012-07',
        end: '2016-05',
        organisation: 'Saguaro Technology, Inc.',
        location: 'Timișoara, Romania',
        title: 'Getting Colour Right',
        subtitle: 'Senior on the firmware',
        brief:
          'Four years on colour printing and colour management — the hardest correctness ' +
          'problem on the product.',
        highlights: [
          'Colour printing: halftone and TTC',
          'Color Management Resource support',
          'ICC profiles',
          'Cross-architecture functionality porting',
          'valgrind, GDB/DDD on deployed systems',
          'Nine years total at Saguaro',
        ],
        tags: ['c', 'colour', 'icc', 'halftone', 'debugging', 'firmware', 'ricoh'],
      },
      {
        id: 'cyberthor',
        start: '2016-06',
        end: '2017-10',
        organisation: 'CyberTHOR Studios Ltd.',
        location: 'Timișoara, Romania',
        subtitle: 'Three concurrent roles',
        childKind: 'concurrent',
        children: [
          {
            id: 'cyberthor-gnu-tools',
            start: '2016-06',
            end: '2017-10',
            organisation: 'CyberTHOR Studios Ltd.',
            location: 'Timișoara, Romania',
            title: 'Building the Tools That Build the Code',
            subtitle: 'Moved from writing C to compiling it',
            brief:
              'Compiler and debugger development on the GNU toolchain for three embedded ' +
              'architectures.',
            highlights: [
              'GNU compiler and debugger components',
              'RX, RL78, ARM (Renesas RZ)',
              'C, Assembly, Linux',
              'DejaGNU test framework',
              'Client: Renesas Electronics',
            ],
            tags: [
              'gnu', 'compiler', 'debugger', 'toolchain',
              'arm', 'assembly', 'embedded', 'renesas',
            ],
          },
          {
            id: 'cyberthor-lead-java',
            start: '2016-10',
            end: '2017-10',
            organisation: 'CyberTHOR Studios Ltd.',
            location: 'Timișoara, Romania',
            title: 'Leaped Over the Abstraction Ladder',
            subtitle: 'C to Java, and first time leading',
            brief:
              'Took on Eclipse CDT toolchain integration in Java while still writing ' +
              'compiler C — and started leading the team doing it.',
            highlights: [
              'Eclipse CDT and EMF',
              'Same three architectures as the compiler work',
              'C and Java in parallel',
              'Architectural and test-case design',
              'Mentoring and sprint planning',
              'SVN administration',
            ],
            tags: [
              'java', 'eclipse', 'cdt', 'leadership',
              'mentoring', 'architecture', 'scrum',
            ],
          },
          {
            id: 'cyberthor-release-coordinator',
            start: '2017-01',
            end: '2017-10',
            organisation: 'CyberTHOR Studios Ltd.',
            location: 'Timișoara, Romania',
            title: 'One Click, Every Quarter',
            subtitle: 'Took ownership of shipping',
            brief:
              'Owned quarterly GNU toolchain releases, and automated the delivery process ' +
              'that made them repeatable.',
            highlights: [
              'Quarterly GNU toolchain releases',
              'Test plans and release reports',
              'One-click deliverable automation',
              'Bash, Python, SVN hooks, cron',
              'DejaGNU test framework',
              'Internal wiki design and maintenance',
            ],
            tags: ['release', 'automation', 'python', 'bash', 'devops', 'process', 'ownership'],
          },
        ],
      },
    ],
  },
  {
    id: 'era-up-the-stack',
    name: 'Up the Stack',
    span: '2017 — 2019',
    note:
      'Twenty-two months out of C — Java tooling, then a new country, a new industry and ' +
      'the only stretch of the career spent in the browser.',
    items: [
      {
        id: 'elektrobit-senior',
        start: '2017-10',
        end: '2018-06',
        organisation: 'Elektrobit (EB)',
        location: 'Timișoara, Romania',
        title: 'The Generator, Not the Generated',
        subtitle: 'Automotive tooling, one step back from the vehicle',
        brief:
          'Eclipse-based Java tooling for AUTOSAR configuration, including R&D on the ' +
          'Adaptive AUTOSAR toolchain.',
        highlights: [
          'Adaptive AUTOSAR configuration tooling',
          'C++ template generation from architectural definitions',
          'Eclipse JDT, EMF, Sphinx, Xtext',
          'Java 8, JUnit 4, Jenkins',
          'R&D phase product',
        ],
        tags: ['autosar', 'java', 'eclipse', 'codegen', 'automotive', 'xtext', 'tooling'],
      },
      {
        id: 'amadeus-frontend-merchandising',
        start: '2018-06',
        end: '2019-04',
        organisation: 'Amadeus, via Inetum',
        location: 'Nice, France',
        title: 'From Firmware to the Browser',
        subtitle: 'New country, new stack, new industry',
        brief:
          'Moved from Romania to France and from embedded C to Angular, on a real-time ' +
          'airline merchandising platform.',
        highlights: [
          'Relocated Romania → France',
          'Embedded C → TypeScript and Angular',
          'Real-time airline merchandising platform',
          'AngularJS and Angular 6+, RxJS',
          'D3.js visualisation',
          'Project-wide test coverage work',
        ],
        tags: ['angular', 'typescript', 'frontend', 'rxjs', 'd3', 'relocation', 'amadeus'],
      },
      {
        id: 'amadeus-frontend-expense',
        start: '2019-04',
        end: '2019-08',
        organisation: 'Amadeus, via Inetum',
        location: 'Nice, France',
        title: 'Analytics Without the Surveillance',
        subtitle: 'New product, and an ethical argument won',
        brief:
          'Five months on Cytric Expense — proposed and introduced privacy-respecting ' +
          'web analytics.',
        highlights: [
          'Cytric Expense product',
          'Matomo ethical analytics — proposed and adopted',
          'Angular 6+, SCSS',
          'Jasmine, Protractor, Karma',
          'Workload estimation from client input',
        ],
        tags: ['angular', 'scss', 'analytics', 'privacy', 'matomo', 'frontend', 'testing'],
      },
    ],
  },
  {
    id: 'era-platform-performance-standards',
    name: 'Platform, Performance & Standards',
    span: '2019 — 2023',
    note:
      'Back into the JVM and out again into distributed systems — four years spent on how ' +
      'things are built rather than what they do.',
    items: [
      {
        id: 'amadeus-architecture-design-security',
        start: '2019-08',
        end: '2021-05',
        organisation: 'Amadeus, via Inetum',
        location: 'Nice, France',
        title: 'The Forensic End of the Work',
        subtitle: 'Frontend to JVM internals',
        brief:
          'Nearly two years on JVM performance, garbage-collector studies and production ' +
          'incident forensics.',
        highlights: [
          'JVM internals and profiling',
          'G1 and Zing garbage-collector studies',
          'Design recommendations over tuning parameters',
          'Critical production incident forensics',
          'JMeter, Docker, Linux',
        ],
        tags: ['jvm', 'performance', 'gc', 'java', 'forensics', 'architecture', 'profiling'],
      },
      {
        id: 'amadeus-teams-v1',
        start: '2021-05',
        end: '2022-02',
        organisation: 'Amadeus, via Inetum',
        location: 'Nice, France',
        title: 'From Nothing',
        subtitle: 'Greenfield, with the team that shaped it',
        brief:
          'Built the first version of the Cytric Travel integration for Microsoft Teams ' +
          'from a blank repository.',
        highlights: [
          'Greenfield service layer',
          'Spring → Quarkus migration mid-project',
          'OpenShift runtime and delivery',
          'Keycloak authentication',
          'Elastic Stack, Grafana, Prometheus observability baseline',
        ],
        tags: [
          'quarkus', 'spring', 'java', 'openshift',
          'keycloak', 'observability', 'greenfield',
        ],
      },
      {
        id: 'amadeus-teams-standardisation',
        start: '2022-02',
        end: '2023-11',
        organisation: 'Amadeus (Cytric)',
        location: 'Nice, France',
        title: 'The Standard Path, Deliberately',
        subtitle: 'Direct hire, and off the bespoke stack',
        brief:
          "Rebuilt the Teams integration onto Amadeus' internal platform — the standardised " +
          'route rather than a bespoke one — and shipped its first AI chatbot.',
        highlights: [
          'Contractor → direct employee',
          'Six microservices on SKube / Quarkus',
          'Standard internal platform over bespoke',
          '15+ Playwright end-to-end tests',
          'React embedded in Microsoft Teams',
          'Kafka, Couchbase, OpenShift',
          'First AI chatbot integration shipped in the product',
        ],
        tags: [
          'quarkus', 'skube', 'platform', 'standardisation',
          'react', 'kafka', 'couchbase', 'playwright', 'ai',
        ],
      },
    ],
  },
  {
    id: 'era-ai-in-production',
    name: 'AI in Production',
    span: '2023 — present',
    items: [
      {
        id: 'amadeus-tech-lead-epic-owner',
        start: '2023-12',
        end: '2026-03',
        organisation: 'Amadeus (Cytric)',
        location: 'Nice, France',
        title: 'Owning the Intent, Not Just the Delivery',
        subtitle: 'Team lead, and epic owner across three',
        brief:
          'Technical lead for the Cytric AI Assistant and Epic Owner at programme level ' +
          'for the epics behind it.',
        highlights: [
          'Technical lead + programme-level Epic Owner',
          'AI architectural direction with System Architects',
          'Onboarded 5 engineers and 2 System Architects',
          'GitHub Copilot trainer — first cohort of 8 engineers',
          'Scrum Master for two teams in parallel, six months',
          'PI Planning across two teams',
        ],
        tags: ['leadership', 'safe', 'rag', 'azure', 'architecture', 'mentoring', 'scrum', 'ai'],
        childKind: 'project',
        children: [
          {
            id: 'project-bot-framework-migration',
            organisation: 'Amadeus (Cytric)',
            location: 'Nice, France',
            title: 'Cutting the Framework Out',
            subtitle: 'Isolated a dependency across three teams',
            brief:
              'A programme-level epic spanning three teams, isolating the Bot Framework ' +
              'behind a dedicated connector.',
            highlights: [
              'Three teams',
              'Seven microservices',
              'Dedicated Node.js connector',
              'Communication flows redesigned',
              'Zero-downtime cutover',
            ],
            tags: ['nodejs', 'migration', 'architecture', 'microservices', 'epic'],
          },
          {
            id: 'project-travel-policy-agent',
            organisation: 'Amadeus (Cytric)',
            location: 'Nice, France',
            title: 'Ask the Policy Anything',
            subtitle: 'Travel-policy Q&A onto vector search',
            brief:
              'Modernised travel-policy question answering onto Azure AI Search and ' +
              'integrated it into the main product.',
            highlights: [
              'Azure AI Search',
              'Integrated into the main product',
              'Opened the path to scalable document ingestion',
            ],
            tags: ['rag', 'azure', 'search', 'ai', 'redesign'],
          },
          {
            id: 'project-agent-playground',
            organisation: 'Amadeus (Cytric)',
            location: 'Nice, France',
            title: 'Build It Small First',
            subtitle: 'Prototypes to de-risk decisions',
            brief:
              'Prototyped an Agent Playground for local development and a personalisation ' +
              'microservice, before teams committed.',
            highlights: [
              'Local agent development environment',
              'Personalisation microservice prototype',
              'Built to de-risk, not to ship',
            ],
            tags: ['prototyping', 'agents', 'architecture', 'microservices'],
          },
        ],
      },
      {
        id: 'amadeus-principal-engineer',
        start: '2026-04',
        end: 'present',
        organisation: 'Amadeus (Cytric)',
        location: 'Nice, France',
        title: 'Setting the Direction',
        subtitle: 'Promoted to Principal',
        brief:
          'Sets AI architectural direction across the programme and consults for teams ' +
          'building their own AI capabilities.',
        highlights: [
          'Promoted April 2026',
          'Three consecutive Exceeding Expectations ratings',
          'AI architectural direction across the programme',
          'Azure OpenAI, Azure AI Search, RAG',
          'LangGraph, langchain4j, MCP and MCP Apps',
          'Internal and external AI consulting',
        ],
        tags: [
          'principal', 'architecture', 'genai', 'rag',
          'mcp', 'langgraph', 'azure', 'leadership',
        ],
      },
    ],
  },
];

/**
 * The Chat section is not built yet. Its placeholder says what is coming
 * rather than standing in with filler.
 */
export const chatComingSoon = {
  caption: 'coming soon',
  blurb:
    'A personal AI assistant that knows my work and background — ask it about my ' +
    'experience, or leave a message and it will pass it along.',
};

export const contact = {
  email: 'raulbuibas@proton.me',
  profiles: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/raulbuibas/' },
    { label: 'GitHub', href: 'https://github.com/rbuibas' },
  ],
};

/* ---------------------------------------------------------------------------
   The three story views.

   The same nineteen years, rendered three ways. `story` and `turningPoints`
   are written narrative — they are not derived from the `career` tree above,
   because the point of them is the telling, not the record. `chronology`
   renders `education` + `career` unchanged, and stays the place where a fact
   is authoritative: if a date moves, it moves there first and the prose is
   rewritten to match.
   --------------------------------------------------------------------------- */

export type StoryViewId = 'story' | 'turning-points' | 'chronology';

export type StoryView = {
  id: StoryViewId;
  name: string;
  /** The one-line descriptor under the name in the switcher. */
  blurb: string;
  href: string;
  /** Marks a telling that is still placeholder text, not Raul's own words. */
  wip?: boolean;
};

/**
 * `story` is the default and owns the bare `/professional` URL, so a shared
 * link lands on the telling rather than the CV.
 */
export const storyViews: StoryView[] = [
  {
    id: 'chronology',
    name: 'Classic Chronology',
    blurb: 'the CV shape, if you must',
    href: '/professional?view=chronology',
  },
  {
    id: 'turning-points',
    name: 'Turning Points',
    blurb: 'six decisions · unfinished draft',
    href: '/professional?view=turning-points',
    wip: true,
  },
  {
    id: 'story',
    name: 'The Career Story',
    blurb: 'in order, over coffee',
    href: '/professional',
  },
];

export type StoryChapter = {
  id: string;
  /** The margin's first line, and the only one set in the foreground colour. */
  period: string;
  /** Further margin lines — place, employer, stack. Kept short; they are asides. */
  meta: string[];
  /** A final margin line in the accent colour, for the role held now. */
  accent?: string;
  title: string;
  paragraphs: string[];
  /** An optional pulled line, set after the paragraph it follows. */
  pull?: string;
};

export const storyIntro =
  'This is my journey through IT, the way I would tell it over a coffee.';

/**
 * The climb, as a sequence rather than a timeline: the gaps between these
 * moments are wildly uneven in years, so they are spaced evenly and the year
 * is carried as a label. `level` is a rung on the ladder, 1 being closest to
 * the metal — it is a judgement, not a measurement.
 */
export type LadderStep = {
  year: string;
  label: string;
  level: number;
};

/** The highest rung used, so the diagram can scale itself. */
export const ladderRungs = 7;

export const abstractionLadder: LadderStep[] = [
  { year: '2001', label: 'Logic gates', level: 1 },
  { year: '2005', label: 'Boards, by hand', level: 2 },
  { year: '2006', label: 'C, and algorithms', level: 4 },
  { year: '2016', label: 'Compiler, assembler', level: 3 },
  { year: '2017', label: 'Java, Eclipse tooling', level: 5 },
  { year: '2018', label: 'Angular, the browser', level: 6 },
  { year: '2019', label: 'JVM internals', level: 3 },
  { year: '2023', label: 'Cloud, APIs, AI', level: 7 },
];

export const careerStoryHeading =
  'Looking back, it is almost a clean climb up the abstraction ladder.';

export const careerStory: StoryChapter[] = [
  {
    id: 'story-taking-apart',
    period: 'the 1990s',
    meta: ['Sremska Mitrovica', 'before any of it'],
    title: 'Taking things apart',
    paragraphs: [
      'As a kid I liked to take things apart and try to rebuild them. I had a passion for ' +
        'electronic devices. I would get old calculators, remotes, anything I could find, and ' +
        'break them open. I still remember the first one I managed to fix: a shop calculator ' +
        'that printed receipts on a roll of paper. I could not find the proper paper to test ' +
        'it, so I cut strips out of an A4 sheet and fed them in, just to see it work.',
      'Owning a computer was not an option, though I dreamt about it. I did get my hands on a ' +
        'games console with a built-in QWERTY keyboard. There was no operating system and no ' +
        'way to program anything, but some of the games were very good for practising typing. ' +
        'So I did. I could type fast long before high school.',
      'In the seventh grade I finally had access to a computer at school, a Commodore if I ' +
        'remember correctly. I wrote my first lines in QBasic. I knew that was what I wanted ' +
        'to do. There was no doubt.',
    ],
  },
  {
    id: 'story-highschool',
    period: '2001 — 2005',
    meta: ['Sremska Mitrovica', 'electrotechnical high school', 'automated systems'],
    title: 'Electronics, but not by choice',
    paragraphs: [
      'There was no option in my region to go to a high school focused on informatics or ' +
        'programming. An electrotechnical high school, in the section for automated systems, ' +
        'was the closest I could get.',
      'By accident it was a great choice. It laid a very good foundation for understanding ' +
        'electronics and how devices work, long before learning to program them. The inside of ' +
        'a computer, of a printer. Digital Electronics, after which I could draw a rudimentary ' +
        'calculator out of nothing but logic gates — AND, OR, XOR, NOR. Before I wrote my ' +
        'first real lines of code, I understood how a CPU works.',
      'It ended with a diploma project that started as bare copper. I drew the circuit by ' +
        'hand, made the board myself with acid rather than ordering one, burned a controller ' +
        'chip and a flash ROM, and wrote the control software in Pascal.',
      'Software and hardware cannot go one without the other. I would learn later that ' +
        'software is often thought of completely independently of the hardware, especially at ' +
        'the higher levels of abstraction.',
    ],
  },
  {
    id: 'story-bsc',
    period: '2005 — 2008',
    meta: [
      'Timișoara',
      'West University of Timișoara',
      'BSc Informatics · 180 ECTS',
    ],
    title: 'University, in a language I barely spoke',
    paragraphs: [
      'I had left Romania at the age of five and only came back a few times since. At eighteen ' +
        'I moved back for good and enrolled at the West University of Timișoara. When I ' +
        'started my studies, the level at which I spoke Romanian was not better than that of a ' +
        'five year old. It was definitely not good enough for university. It was an ' +
        'interesting challenge, and quite a struggle in the first months.',
      'The studies themselves were a dream for me. We started with algorithms, databases and ' +
        'the C programming language. Later came more complex things, including image ' +
        'processing and my first AI algorithms. I enjoyed every course.',
      'My thesis was an image processing application written in C# — inversion, greyscale, ' +
        'blur, histogram equalisation, and the statistics to inspect what it had done. It was ' +
        'a working application rather than a paper, which was the point.',
      'The degree lasted three years. I started an internship after the second one, was hired ' +
        'by the company not long after, and finished my studies part time while working.',
    ],
  },
  {
    id: 'story-msc',
    period: '2008 — 2010',
    meta: [
      'Timișoara',
      'West University of Timișoara',
      'MSc Informatics · Software Engineering',
    ],
    title: 'Four hundred to one',
    paragraphs: [
      'The master\u2019s was higher up: software lifecycle, graphics, and hints of product ' +
        'management. I kept working the whole way through it, on reduced hours.',
      'I also kept going with the C# image processing application and added a compression ' +
        'algorithm to it. The pixels went away entirely. Images were stored as polygon ' +
        'vertices and colour, with an evolutionary search looking for an arrangement that ' +
        'scored close enough to the original against a configurable quality threshold. It ' +
        'reached roughly four hundred to one.',
      'When I did the research I did not find a practical implementation of the evolutionary ' +
        'algorithm done the way I had done it. The notion existed. What I did not find ' +
        'anywhere was the willingness to accept that much compromise for the sake of a 400:1 ' +
        'ratio, and the proposal to use it for thumbnails.',
    ],
  },
  {
    id: 'story-printer',
    period: '2007 — 2016',
    meta: ['Timișoara', 'Saguaro Technology', 'C · IPDS · nine years'],
    title: 'Nine years inside a printer',
    paragraphs: [
      'I arrived as a summer intern writing a multithreaded backup server in C and left nine ' +
        'years later as the person who owned colour. In between: printer-side firmware for ' +
        'high-end production machines — a resource database, a caching layer, font handling — ' +
        'and then the same functionality carried across x86, MIPS and PowerPC, on VxWorks, ' +
        'FreeBSD and SLES, because the customer’s machine was whichever one it happened to be.',
      'The last four years were colour: halftones, ICC profiles, colour management resources. ' +
        'It is the hardest kind of correctness I have worked on, because nothing crashes.',
    ],
    pull:
      'A page comes out, and someone who has looked at that shade every day for twenty years ' +
      'tells you it is wrong. And they are right.',
  },
  {
    id: 'story-compiler',
    period: '2016 — 2017',
    meta: ['CyberTHOR Studios', 'GNU toolchain, for Renesas'],
    title: 'I stopped writing C and started compiling it',
    paragraphs: [
      'After nine years of writing C, I went to work on the thing that turns it into ' +
        'instructions: GNU compiler and debugger components for three embedded architectures. ' +
        'Within a year I was doing Eclipse toolchain work in Java at the same time — my first ' +
        'real climb up the abstraction ladder — leading a team for the first time, and quietly ' +
        'automating our quarterly release down to a single click.',
      'Three roles running at once for the last ten months of it. It is the busiest I have ' +
        'been and the fastest I have ever learned.',
    ],
  },
  {
    id: 'story-generator',
    period: '2017 — 2018',
    meta: ['Elektrobit', 'AUTOSAR tooling'],
    title: 'The generator, not the generated',
    paragraphs: [
      'A short stretch in automotive, one step back from the vehicle: Eclipse-based Java ' +
        'tooling that takes an architectural definition and emits the C++ that ends up in a ' +
        'car. Nobody outside the building ever sees this layer, and I liked it enormously. If ' +
        'you have read this far you can probably guess why.',
    ],
  },
  {
    id: 'story-france',
    period: '2018 — 2019',
    meta: ['Timișoara → Nice', 'Amadeus'],
    title: 'A new country and a new language, in the same month',
    paragraphs: [
      'In June 2018 I moved from Romania to France, and from embedded C to Angular in a ' +
        'browser, on a real-time airline merchandising platform. None of what I knew about ' +
        'registers helped. All of what I knew about reading a system I had not written did.',
      'It is the only stretch of my career spent in the front end. I am glad I did it, and ' +
        'glad it was a season rather than a home. The part I still tell people about is not ' +
        'the framework — it is arguing successfully for analytics that did not follow anyone ' +
        'around.',
    ],
  },
  {
    id: 'story-platform',
    period: '2019 — 2023',
    meta: ['Nice', 'JVM · Quarkus · OpenShift'],
    title: 'Back down, then out',
    paragraphs: [
      'Two years on JVM internals, garbage collectors and production incident forensics — the ' +
        'years I learned to argue with a design instead of a tuning flag. Then a greenfield ' +
        'service layer built from an empty repository, and, a year after that, the deliberately ' +
        'unglamorous decision to rebuild it on the standard internal platform instead of the ' +
        'clever bespoke one we already had running.',
      'Six microservices, a migration nobody outside the team noticed, and the first AI chatbot ' +
        'to ship inside the product. That last one turned out to matter.',
    ],
  },
  {
    id: 'story-now',
    period: '2023 — now',
    meta: ['Nice'],
    accent: 'Principal Engineer',
    title: 'The product started answering back',
    paragraphs: [
      'I lead the technical side of an AI assistant that business travellers use every day, and ' +
        'I set the architectural direction for it across the programme. The work is not the ' +
        'model. The work is retrieval that returns the right paragraph, a framework dependency ' +
        'cut out from under three teams without downtime, and prototypes built small so that ' +
        'nobody has to guess.',
      'Which is, I notice, the same job as the board. Build the thing underneath, and ' +
        'understand the constraints below that.',
    ],
  },
];

export type TurningPoint = {
  id: string;
  /** Rendered as the oversized numeral in the left rail. */
  index: string;
  when: string;
  title: string;
  happened: string;
  changed: string;
};

export const turningPointsIntro =
  'A CV lists where I was standing. These are the times I chose something that changed what I was.';

export const turningPoints: TurningPoint[] = [
  {
    id: 'tp-iron',
    index: '01',
    when: '2001 · school of automation',
    title: 'I picked the soldering iron over the textbook',
    happened:
      'I chose the school of automatic control systems instead of general secondary ' +
      'schooling. It ended with a diploma project built from bare copper: circuit drawn by ' +
      'hand, board etched in acid, controller and flash ROM burned, control software written ' +
      'in Pascal.',
    changed:
      'It set the reflex I have never lost: never trust a layer you have not opened. ' +
      'Everything after this is the same instinct pointed at bigger boxes.',
  },
  {
    id: 'tp-stayed',
    index: '02',
    when: '2007 — 2016 · nine years, one product',
    title: 'I stayed nine years when the advice was to move every two',
    happened:
      'Intern to senior on printer firmware in C: caching and resource handling, then the same ' +
      'code carried onto x86, MIPS and PowerPC across three operating systems, then four years ' +
      'on colour — halftones, ICC profiles, colour management.',
    changed:
      'Nine years is long enough to meet your own decisions coming back. Colour taught me the ' +
      'kind of bug that never crashes — it just comes out wrong, and a customer can see it.',
  },
  {
    id: 'tp-compiler',
    index: '03',
    when: '2016 · after nine years of writing it',
    title: 'I stopped writing C and started compiling it',
    happened:
      'GNU compiler and debugger components for three embedded architectures — and within a ' +
      'year, Eclipse toolchain work in Java alongside it, a team to lead, and a quarterly ' +
      'release turned into one click. Three roles at once for the last ten months of it.',
    changed:
      'It broke the idea that I was a C engineer. I was someone who takes lids off, and C had ' +
      'just been the lid in front of me for nine years.',
  },
  {
    id: 'tp-france',
    index: '04',
    when: 'June 2018 · one month, two migrations',
    title: 'I left the country and the language at the same time',
    happened:
      'Romania to France, embedded C to Angular, printers to airline retailing — all in the ' +
      'same month. Eleven years of low-level instinct, and suddenly the whole job was in a ' +
      'browser.',
    changed:
      'It proved the transferable thing was never the language. It was the habit of reading a ' +
      'system nobody explains to you — and being willing to be the least experienced person in ' +
      'the room again.',
  },
  {
    id: 'tp-jvm',
    index: '05',
    when: '2019 · one year into the browser',
    title: 'I went back down, into the JVM',
    happened:
      'Two years on JVM internals, profiling, garbage collector studies and forensics on ' +
      'critical production incidents — being the person called when nobody could explain the ' +
      'pause.',
    changed:
      'I stopped answering with tuning parameters and started answering with design ' +
      'recommendations. That is the line between an engineer and an architect, and I crossed ' +
      'it here.',
  },
  {
    id: 'tp-boring',
    index: '06',
    when: '2022 · with a working product already shipping',
    title: 'We chose the boring platform on purpose',
    happened:
      'We rebuilt a live integration onto the standard internal platform instead of the ' +
      'bespoke stack we had already made work — six microservices, and a migration nobody ' +
      'outside the team noticed.',
    changed:
      'The clever thing and the right thing are not always the same object. Choosing the ' +
      'standard path is the least glamorous decision on this page, and the one I would defend ' +
      'hardest.',
  },
];

export const turningPointsCoda = {
  eyebrow: 'and now',
  title: 'Which is how I ended up here',
  paragraphs: [
    'Leading the technical side of an AI assistant that business travellers use every day, and ' +
      'setting where its architecture goes next. Retrieval that returns the right paragraph. A ' +
      'framework dependency cut out from under three teams with no downtime. Prototypes built ' +
      'small so nobody has to guess.',
    'Six decisions, and every one of them was the same decision: go and look underneath.',
  ],
};

/**
 * The essays behind the story. Each is a question the whole career keeps
 * asking; the posts themselves are still to be written, so an entry without a
 * `slug` renders as a stub rather than a dead link. Adding the post to
 * `src/posts/` and setting `slug` here turns it into a real entry — and the
 * date and read time then come from that file's frontmatter.
 */
export type WritingTopic = {
  id: string;
  title: string;
  standfirst: string;
  /** Matches a filename in `src/posts/`, once the post exists. */
  slug?: string;
};

/** A topic, plus the post's frontmatter once that post exists. */
export type WritingEntry = WritingTopic & {
  post?: { date: string; readTime: string };
};

export const writingIntro =
  'Nineteen years is really only four questions, asked in whatever room I happen to be ' +
  'standing in. Each one gets an essay of its own.';

export const writingTopics: WritingTopic[] = [
  {
    id: 'q-underneath',
    title: 'What is underneath this?',
    standfirst:
      'Every job I have taken has been one layer below the last one that made me curious. The ' +
      'board, the firmware, the compiler, the runtime, the platform.',
  },
  {
    id: 'q-quiet-failures',
    title: 'Is it right when nothing crashes?',
    standfirst:
      'A colour that is subtly off. A pause that only appears under real traffic. An answer ' +
      'that is fluent and wrong. The failures I have spent most of my life on are the quiet ones.',
  },
  {
    id: 'q-tools',
    title: 'Can I build the thing that builds the thing?',
    standfirst:
      "Compilers, generators, release automation, playgrounds for other people's experiments. " +
      'Given the choice, I would rather own the tool than borrow it.',
  },
  {
    id: 'q-machines',
    title: 'How much can a machine work out for itself?',
    standfirst:
      "Older than it looks: a master's thesis that threw the pixels away and let a search find " +
      'its own representation, and a day job doing a version of the same thing sixteen years later.',
  },
];
