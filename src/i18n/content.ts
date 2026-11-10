/*
 * Contenido del sitio en cada idioma. Ambos idiomas comparten la misma estructura:
 * al anadir un texto en uno, anadirlo tambien en el otro.
 */

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

export type TimelineItem = {
  kind: 'education' | 'work' | 'travel';
  period: string;
  title: string;
  description: string;
  highlights?: string[];
  links?: { label: string; href: string }[];
  current?: boolean;
};

const stack = [
  { name: 'Angular', logo: 'angular.svg' },
  { name: 'TypeScript', logo: 'typescript.svg' },
  { name: 'JavaScript', logo: 'javascript.svg' },
  { name: 'HTML5', logo: 'html.svg' },
  { name: 'CSS3', logo: 'css.svg' },
  { name: 'Sass', logo: 'sass.svg' },
  { name: 'Tailwind CSS', logo: 'tailwindcss.svg' },
  { name: 'Bootstrap', logo: 'bootstrap.svg' },
  { name: 'jQuery', logo: 'jquery.svg' },
  { name: 'PHP', logo: 'php.svg' },
  { name: 'Laravel', logo: 'laravel.svg' },
  { name: 'MySQL', logo: 'mysql.svg' },
  { name: 'Git', logo: 'git.svg' },
  { name: 'Docker', logo: 'docker.svg' },
  { name: 'Ansible', logo: 'ansible.svg' },
  { name: 'Nginx', logo: 'nginx.svg' },
  { name: 'Apache', logo: 'apache.svg' },
];

export const socials = [
  { name: 'GitHub', href: 'https://github.com/dgonmej', icon: 'github' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dgonmej', icon: 'linkedin' },
  { name: 'X (Twitter)', href: 'https://twitter.com/dgonmej', icon: 'twitter' },
] as const;

export const email = 'dgonmej10@gmail.com';

const es = {
  meta: {
    title: 'Diego González | Quién soy',
    description:
      'Desarrollador frontend en Tenerife. Conoce mi trayectoria, las tecnologías con las que trabajo y lo que me gusta hacer.',
  },
  nav: {
    about: 'Sobre mí',
    stack: 'Tecnologías',
    hobbies: 'Aficiones',
    journey: 'Trayectoria',
    language: 'Idioma',
    skip: 'Saltar al contenido',
  },
  hero: {
    greeting: 'Hola, soy',
    role: 'Desarrollador frontend',
    location: 'Tenerife, España',
    bio: 'Me apasionan la programación y la tecnología, y tengo ganas de aprender algo nuevo cada día.',
    cta: 'Escríbeme',
    avatarAlt: 'Ilustración de Diego González',
  },
  about: {
    title: 'Más sobre mí',
    text: 'Soy una persona muy curiosa y siempre intento estar al día de la tecnología más puntera. Soy responsable y paciente, y siempre intento ayudar y contagiar buen rollo a mi alrededor.',
    tags: ['Trabajo', 'Código', 'Constancia'],
    imageAlt: 'Diego trabajando frente al ordenador en la oficina',
    photoAlt: 'Foto de Diego González',
  },
  stack: {
    title: 'Mi día a día',
    intro: 'Las tecnologías con las que trabajo y que uso a diario.',
    learning: 'Siempre aprendiendo',
  },
  hobbies: {
    title: 'Mis aficiones',
    intro: 'Lo que me gusta hacer cuando no estoy delante del código.',
    items: [
      {
        place: 'Tenerife',
        image: 'tenerife',
        alt: 'Diego bajo el agua en una piscina de Tenerife, saludando a la cámara',
        text: 'Me gusta divertirme y conocer gente nueva. Intento disfrutar de las cosas buenas de la vida, siempre con una sonrisa.',
        tags: ['Piscina', 'Diversión', 'Gafas de sol'],
      },
      {
        place: 'La Palma',
        image: 'la-palma',
        alt: 'Diego en la cima de una montaña de La Palma, entre la niebla',
        text: 'Me encanta viajar y descubrir sitios nuevos para escapar de la rutina. La nieve de la montaña o la arena de la playa son lo que necesito para recargar energía.',
        tags: ['Montaña', 'Frío', 'Nieve'],
      },
      {
        place: 'Fuerteventura',
        image: 'fuerteventura',
        alt: 'Pies descalzos en la orilla de una playa de Fuerteventura',
        text: 'Para mí es muy importante tener momentos de paz, como pasar el rato en la playa disfrutando de un buen atardecer.',
        tags: ['Playa', 'Océano', 'Descalzo'],
      },
    ],
  },
  journey: {
    title: 'Mi trayectoria',
    intro: 'De los primeros ciclos formativos a liderar el frontend de una intranet.',
    timelineLabel: 'Trayectoria de Diego González',
    start: { title: 'Empieza el viaje', description: 'Mi trayectoria hasta hoy' },
    end: { title: 'Y esto no acaba aquí', description: 'Continuará…' },
    items: [
      {
        kind: 'education',
        period: '2013 – 2015',
        title: 'Sistemas Microinformáticos y Redes',
        description:
          'Ciclo de grado medio en el que aprendí a instalar, configurar y mantener sistemas microinformáticos, aislados o en red, y redes locales en entornos pequeños.',
        highlights: ['DNS y DHCP', 'Windows Server', 'Linux', 'Scripting'],
      },
      {
        kind: 'work',
        period: '2015',
        title: 'Prácticas en Inerza',
        description: 'Prácticas en empresa del ciclo de Sistemas Microinformáticos y Redes en Inerza S.A.',
        highlights: ['Asistencia técnica', 'Configuración y mantenimiento de hardware'],
      },
      {
        kind: 'travel',
        period: '2015',
        title: 'Erasmus+ en Italia',
        description:
          'Beca del programa europeo Erasmus+ para hacer parte de las prácticas en Italia, en la empresa Vegan Solutions S.R.L.',
        highlights: ['Asistencia técnica', 'Diseño de componentes web', 'Testing de aplicaciones'],
      },
      {
        kind: 'education',
        period: '2016 – 2018',
        title: 'Desarrollo de Aplicaciones Web',
        description:
          'Ciclo de grado superior centrado en el diseño, desarrollo, implantación y mantenimiento de sitios web.',
        highlights: ['Bases de datos', 'Maquetación web', 'Java, C#, .NET y PHP', 'JavaScript, jQuery y React', 'Despliegue'],
      },
      {
        kind: 'work',
        period: '2018 – 2020',
        title: 'Desarrollador en Open Data Security',
        description: 'Desarrollador web en proyectos de ciberseguridad, con metodologías Kanban y Scrum.',
        highlights: ['Backend', 'App móvil', 'Frontend', 'Bases de datos y pasarelas de pago', 'Infraestructura y despliegue', 'Documentación'],
        links: [
          { label: 'secureaccess.com', href: 'https://secureaccess.com' },
          { label: 'metacleaner.com', href: 'https://metacleaner.com' },
        ],
      },
      {
        kind: 'work',
        period: '2020 – 2021',
        title: 'Desarrollador en Transformación Digital',
        description: 'Desarrollador web en proyectos de marketing para empresas, proyectos de gestión y aplicaciones móviles.',
        highlights: ['Backend', 'App móvil', 'Frontend', 'Documentación'],
      },
      {
        kind: 'work',
        period: '2021',
        current: true,
        title: 'TECH Education Rights & Technologies',
        description:
          'Desarrollador web y responsable del frontend de la intranet de la empresa, con módulos en Angular (v12–v17) y una librería privada de web components. También he conectado y mejorado las APIs en .NET, supervisado al equipo y dado formación interna en frontend, arquitectura web y onboarding.',
        highlights: ['Angular', 'Web components', 'APIs .NET', 'Liderazgo técnico', 'Formación'],
      },
    ] satisfies TimelineItem[],
  },
  contact: {
    title: '¿Hablamos?',
    text: 'Si tienes un proyecto, una pregunta o simplemente quieres saludar, escríbeme.',
    cta: 'Escríbeme un correo',
  },
  footer: {
    madeWith: 'Hecho con',
    love: 'amor',
    by: 'por',
    top: 'Volver arriba',
  },
};

const en: typeof es = {
  meta: {
    title: 'Diego González | Who am I?',
    description:
      'Frontend developer in Tenerife. Learn about my journey, the technologies I work with and what I enjoy doing.',
  },
  nav: {
    about: 'About me',
    stack: 'Stack',
    hobbies: 'Hobbies',
    journey: 'Journey',
    language: 'Language',
    skip: 'Skip to content',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'Frontend developer',
    location: 'Tenerife, Spain',
    bio: "I'm a programming enthusiast, passionate about technology and eager to learn something new every day.",
    cta: 'Get in touch',
    avatarAlt: 'Illustration of Diego González',
  },
  about: {
    title: 'More about me',
    text: "I'm a very curious person and I always try to keep up with cutting-edge technology. I'm responsible and patient, and I always try to help and spread good vibes around me.",
    tags: ['Work', 'Code', 'Commitment'],
    imageAlt: 'Diego working at his computer in the office',
    photoAlt: 'Photo of Diego González',
  },
  stack: {
    title: 'My daily routine',
    intro: 'The technologies I work with and use every day.',
    learning: 'Always learning',
  },
  hobbies: {
    title: 'My hobbies',
    intro: "What I enjoy doing when I'm not in front of the code.",
    items: [
      {
        place: 'Tenerife',
        image: 'tenerife',
        alt: 'Diego underwater in a pool in Tenerife, waving at the camera',
        text: 'I like having fun and meeting new people. I try to enjoy the good things in life, always with a smile on my face.',
        tags: ['Pool', 'Fun', 'Sunglasses'],
      },
      {
        place: 'La Palma',
        image: 'la-palma',
        alt: 'Diego on a mountain top in La Palma, surrounded by fog',
        text: 'I love traveling and discovering new places to escape the routine. Mountain snow or beach sand is what I need to recharge.',
        tags: ['Mountain', 'Cold', 'Snow'],
      },
      {
        place: 'Fuerteventura',
        image: 'fuerteventura',
        alt: 'Bare feet on the shore of a beach in Fuerteventura',
        text: 'Moments of peace matter a lot to me, like spending time on the beach and enjoying a good sunset.',
        tags: ['Beach', 'Ocean', 'Barefoot'],
      },
    ],
  },
  journey: {
    title: 'My journey',
    intro: 'From my first vocational courses to leading the frontend of an intranet.',
    timelineLabel: "Diego González's journey",
    start: { title: 'The journey begins', description: 'My path so far' },
    end: { title: "That's not all, folks", description: 'To be continued…' },
    items: [
      {
        kind: 'education',
        period: '2013 – 2015',
        title: 'Microcomputer Systems and Networks',
        description:
          'Vocational Education and Training (VET) certificate, where I learned to install, configure and maintain microcomputer systems, isolated or networked, and local networks in small environments.',
        highlights: ['DNS and DHCP', 'Windows Server', 'Linux', 'Scripting'],
      },
      {
        kind: 'work',
        period: '2015',
        title: 'Internship at Inerza',
        description: 'Company internship of the Microcomputer Systems and Networks certificate at Inerza S.A.',
        highlights: ['Technical support', 'Hardware setup and maintenance'],
      },
      {
        kind: 'travel',
        period: '2015',
        title: 'Erasmus+ in Italy',
        description:
          'Scholarship from the European Erasmus+ programme to do part of my internship in Italy, at Vegan Solutions S.R.L.',
        highlights: ['Technical support', 'Web component design', 'Application testing'],
      },
      {
        kind: 'education',
        period: '2016 – 2018',
        title: 'Web Application Development',
        description:
          'Higher National Certificate (HNC) focused on the design, development, deployment and maintenance of websites.',
        highlights: ['Databases', 'Web layout', 'Java, C#, .NET and PHP', 'JavaScript, jQuery and React', 'Deployment'],
      },
      {
        kind: 'work',
        period: '2018 – 2020',
        title: 'Developer at Open Data Security',
        description: 'Web developer on cybersecurity projects, using Kanban and Scrum.',
        highlights: ['Backend', 'Mobile app', 'Frontend', 'Databases and payment gateways', 'Infrastructure and deployment', 'Documentation'],
        links: [
          { label: 'secureaccess.com', href: 'https://secureaccess.com' },
          { label: 'metacleaner.com', href: 'https://metacleaner.com' },
        ],
      },
      {
        kind: 'work',
        period: '2020 – 2021',
        title: 'Developer at Transformación Digital',
        description: 'Web developer on marketing projects for companies, management projects and mobile applications.',
        highlights: ['Backend', 'Mobile app', 'Frontend', 'Documentation'],
      },
      {
        kind: 'work',
        period: '2021',
        current: true,
        title: 'TECH Education Rights & Technologies',
        description:
          "Web developer and head of the frontend for the company's intranet, building modules with Angular (v12–v17) and a private web component library. I've also connected and improved the .NET APIs, supervised the team and given internal training on frontend, web architecture and onboarding.",
        highlights: ['Angular', 'Web components', '.NET APIs', 'Technical leadership', 'Training'],
      },
    ],
  },
  contact: {
    title: "Let's talk",
    text: 'If you have a project, a question or just want to say hi, drop me a line.',
    cta: 'Send me an email',
  },
  footer: {
    madeWith: 'Made with',
    love: 'love',
    by: 'by',
    top: 'Back to top',
  },
};

export const content: Record<Locale, typeof es> = { es, en };

/** Texto de la etiqueta "Actualidad" del timeline segun el idioma. */
export const currentLabel: Record<Locale, string> = { es: 'Actualidad', en: 'Present' };

export { stack };
