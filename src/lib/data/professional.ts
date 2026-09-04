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
