// ============================================
// Ficheiro de Dados Estruturado
// ============================================
// Todos os dados personalizáveis da app estão centralizados aqui.
// Para personalizar, basta alterar os textos, URLs e datas abaixo.
// Não é necessário mexer nos componentes.

export interface Moment {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string; // Caminho para o ficheiro em public/audio/
  cover?: string; // Imagem de capa opcional
}

export interface SiteContent {
  // --- Metadados ---
  meta: {
    title: string;
    description: string;
    coupleNames: string;
  };

  // --- Secção 1: Hero / Boas-Vindas ---
  hero: {
    headline: string;
    subtitle: string;
    ctaText: string;
    backgroundImage?: string;
  };

  // --- Secção 2: Linha do Tempo / Os Nossos Momentos ---
  timeline: {
    sectionTitle: string;
    sectionSubtitle: string;
    moments: Moment[];
  };

  // --- Secção 3: Galeria de Fotos ---
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    photos: GalleryPhoto[];
  };

  // --- Secção 4: Cartão de Amor / Mensagem Final ---
  loveCard: {
    sectionTitle: string;
    message: string;
    signature: string;
    closingImage?: string;
  };

  // --- Mini Player de Música ---
  music: {
    songs: Song[];
    autoplayOnStart: boolean; // Inicia a música após clique no botão "Iniciar"
  };
}

// ============================================
// DADOS DA APP — Personaliza aqui! 🩷
// ============================================

const siteContent: SiteContent = {
  meta: {
    title: "Para o Amor da Minha Vida 💕",
    description: "Uma jornada pelas nossas memórias mais bonitas.",
    coupleNames: "Gabriel & [Nome]",
  },

  hero: {
    headline: "A Nossa História de Amor",
    subtitle: "Cada momento contigo é uma página do meu capítulo favorito.",
    ctaText: "Iniciar a nossa jornada",
    backgroundImage: "/images/hero-bg.jpg",
  },

  timeline: {
    sectionTitle: "Os Nossos Momentos",
    sectionSubtitle: "Uma linha do tempo dos dias que nos tornaram nós.",
    moments: [
      {
        id: "momento-1",
        title: "O Dia em que Tudo Começou",
        date: "2020-11-22",
        description:
          "Lembro-me de cada detalhe daquele dia. O teu sorriso iluminou tudo à minha volta e soube, naquele instante, que eras especial.",
        image: "/images/moments/img1.jpg",
        imageAlt: "O primeiro 'eu te amo'",
      },
      {
        id: "momento-2",
        title: "A Nossa Primeira Praia",
        date: "2021-04-20",
        description:
          "O dia em que percebi que eu queria passar todos os dias ao teu lado (e não te perder para as ondas 😟).",
        image: "/images/moments/img2.jpg",
        imageAlt: "A nossa primeira praia",
      },
      {
        id: "momento-3",
        title: "Um Pôr do Sol Inesquecível",
        date: "2022-07-31",
        description:
          "O céu pintou-se de tons de laranja, mas nenhuma cor era tão bonita quanto o brilho nos teus olhos naquele momento.",
        image: "/images/moments/sol.jpg",
        imageAlt: "Pôr do sol juntos",
      },
    ],
  },

  gallery: {
    sectionTitle: "A Nossa Galeria",
    sectionSubtitle: "Fotografias que contam a nossa história.",
    photos: [
      {
        id: "foto-1",
        src: "/images/gallery/IMG-20210207-WA0005.jpg",
        alt: "Nós dois sorridentes",
        caption: "Contigo, tudo faz sentido.",
      },
      {
        id: "foto-2",
        src: "/images/gallery/IMG-20220319-WA0053.jpg",
        alt: "Momento especial",
        caption: "Cada segundo contigo é um presente.",
      },
      {
        id: "foto-3",
        src: "/images/gallery/IMG_20201121_222618_379.jpg",
        alt: "Lembrança feliz",
        caption: "A melhor aventura é a que vivemos juntos.",
      },
      {
        id: "foto-4",
        src: "/images/gallery/IMG_20211030_160223_665.webp",
        alt: "Nós dois juntinhos",
        caption: "Felicidade é estar ao teu lado.",
      },
      {
        id: "foto-5",
        src: "/images/gallery/IMG_20220301_181641_552.jpg",
        alt: "Dia feliz",
        caption: "Memórias que guardo no coração.",
      },
      {
        id: "foto-6",
        src: "/images/gallery/IMG_20220731_005026_782.webp",
        alt: "Momento único",
        caption: "O teu sorriso é o meu lugar favorito.",
      },
      {
        id: "foto-7",
        src: "/images/gallery/IMG_20231022_000259.jpg",
        alt: "Registo de amor",
        caption: "O teu abraço é o meu porto seguro.",
      },
      {
        id: "foto-8",
        src: "/images/gallery/IMG_20241212_213455_555.webp",
        alt: "Sorrisos cúmplices",
        caption: "A vida é muito mais bonita contigo nela.",
      },
      {
        id: "foto-9",
        src: "/images/gallery/IMG_20241214_184623.jpg",
        alt: "Passeio juntos",
        caption: "A minha pessoa favorita em todo o universo.",
      },
      {
        id: "foto-10",
        src: "/images/gallery/IMG_20250524_220159_463.webp",
        alt: "Olhares de carinho",
        caption: "Construindo a nossa história, um dia de cada vez.",
      },
      {
        id: "foto-11",
        src: "/images/gallery/IMG_20250612_194039.jpg",
        alt: "Dia especial",
        caption: "Amor que transborda e enche a nossa vida de luz.",
      },
      {
        id: "foto-12",
        src: "/images/gallery/IMG_20250720_190733_012.jpg",
        alt: "Sorrisos sinceros",
        caption: "Amo a nossa cumplicidade e a nossa parceria.",
      },
      {
        id: "foto-14",
        src: "/images/gallery/IMG_20251122_181020_357.webp",
        alt: "Festa ou evento juntos",
        caption: "Mais um registo de amor puro.",
      },
      {
        id: "foto-15",
        src: "/images/gallery/IMG_20260321_212204_456.jpg",
        alt: "Cumplicidade pura",
        caption: "Mais uma página no nosso livro preferido.",
      },
      {
        id: "foto-16",
        src: "/images/gallery/IMG_20260506_210954_937.webp",
        alt: "Sorriso lindo",
        caption: "O amor está nos pequenos detalhes.",
      },
      {
        id: "foto-17",
        src: "/images/gallery/IMG_20260506_211015.jpg",
        alt: "Nós dois num dia feliz",
        caption: "Colecionando sorrisos e momentos inesquecíveis.",
      },
      {
        id: "foto-18",
        src: "/images/gallery/IMG_20260506_211100_242.webp",
        alt: "Olhar apaixonado",
        caption: "És o meu sol em dias nublados.",
      },
      {
        id: "foto-19",
        src: "/images/gallery/Screenshot_2025-05-05-23-56-40-704_com.google.android.apps.photos.png",
        alt: "Lembrança guardada no telemóvel",
        caption: "Que a nossa história seja sempre cheia de alegria.",
      },
      {
        id: "foto-20",
        src: "/images/gallery/Screenshot_2025-05-06-00-01-39-384_com.miui.gallery.png",
        alt: "Recordação especial",
        caption: "Cada foto conta um pedacinho da nossa cumplicidade.",
      },
      {
        id: "foto-21",
        src: "/images/gallery/Screenshot_2026-02-05-14-19-36-270_com.google.android.apps.photos.png",
        alt: "Lembrança linda",
        caption: "Para sempre e mais um dia.",
      },
      {
        id: "foto-22",
        src: "/images/gallery/Screenshot_2026-02-05-15-17-51-729_com.miui.gallery.png",
        alt: "Momento guardado",
        caption: "A minha maior certeza é o nosso amor.",
      },
      {
        id: "foto-23",
        src: "/images/gallery/Gemini_Generated_Image_2mboq82mboq82mbo.png",
        alt: "Lembrança ilustrada",
        caption: "Agradeço todos os dias por te ter na minha vida.",
      },
      {
        id: "foto-24",
        src: "/images/gallery/Gemini_Generated_Image_txx1bntxx1bntxx1.png",
        alt: "Lembrança artística",
        caption: "Momentos mágicos que ficarão guardados para sempre.",
      },
      {
        id: "foto-25",
        src: "/images/gallery/Gemini_Generated_Image_usx2rfusx2rfusx2.png",
        alt: "Ilustração do nosso amor",
        caption: "A risada que faz o meu mundo parar.",
      },
      {
        id: "foto-26",
        src: "/images/gallery/Gemini_Generated_Image_yzswntyzswntyzsw.png",
        alt: "Desenho especial",
        caption: "O nosso amor em formato de imagem.",
      },
    ],
  },

  loveCard: {
    sectionTitle: "Para Ti, Meu Amor",
    message: `Meu amor,

Há tantas coisas que quero dizer-te, mas as palavras nunca são suficientes para descrever o que sinto.

Desde o dia em que te conheci, a minha vida ganhou uma cor que eu nem sabia que existia. Cada momento contigo — os risos, as conversas até tarde, os abraços apertados — transformou-se na minha memória favorita.

Tu fazes-me querer ser melhor, todos os dias. O teu carinho, a tua paciência, o teu sorriso... tudo em ti me inspira.

Obrigado por seres quem és. Obrigado por me escolheres todos os dias. Obrigado por tornares a minha vida tão bonita.

Amo-te mais do que qualquer palavra poderá algum dia expressar. 💕`,
    signature: "Com todo o meu amor, Gabriel ❤️",
    closingImage: "/images/love-card.jpg",
  },

  music: {
    autoplayOnStart: true,
    songs: [
      {
        id: "musica-1",
        title: "Be The One",
        artist: "Dua Lipa",
        src: "/audio/be-the-one.mp3",
        cover: "/images/covers/dua-lipa-deluxe.jpg",
      },
      {
        id: "musica-2",
        title: "Nervous",
        artist: "The Neighbourhood",
        src: "/audio/the-neighbourhood-nervous.mp3",
        cover: "/images/covers/the-neighbourhood.jpg",
      },
      {
        id: "musica-3",
        title: "Babydoll",
        artist: "Dominic Fike",
        src: "/audio/babydoll.mp3",
        cover: "/images/covers/dominic-fike.jpg",
      },
      {
        id: "musica-4",
        title: "Iris",
        artist: "Goo Goo Dolls",
        src: "/audio/iris.mp3",
        cover: "/images/covers/goo-goo-dolls.jpg",
      },
      {
        id: "musica-5",
        title: "He Could Be The One",
        artist: "Hannah Montana",
        src: "/audio/he-could-be-the-one.mp3",
        cover: "/images/covers/hannah-montana.jpg",
      },
      {
        id: "musica-6",
        title: "Lovebug",
        artist: "Jonas Brothers",
        src: "/audio/lovebug.mp3",
        cover: "/images/covers/jonas-brothers.jpg",
      },
      {
        id: "musica-7",
        title: "Breaking Free",
        artist: "High School Musical",
        src: "/audio/breaking-free.mp3",
        cover: "/images/covers/hsm.jpg",
      },
      {
        id: "musica-8",
        title: "Dias de Juventude",
        artist: "Terno Rei",
        src: "/audio/dias-da-juventude.mp3",
        cover: "/images/covers/terno-rei.jpg",
      },
      {
        id: "musica-9",
        title: "Parachute",
        artist: "Hayley Williams",
        src: "/audio/parachute.mp3",
        cover: "/images/covers/hayley-williams.jpg",
      },
      {
        id: "musica-10",
        title: "Spitting Off The Edge Of The World",
        artist: "Yeah Yeah Yeahs",
        src: "/audio/Spitting_Off_The_Edge_Of_The_World.mp3",
        cover: "/images/covers/yeah.jpg",
      },
      {
        id: "musica-11",
        title: "Follow You",
        artist: "Bring Me The Horizon",
        src: "/audio/follow-you.mp3",
        cover: "/images/covers/bmth.jpg",
      },
      {
        id: "musica-12",
        title: "These Walls",
        artist: "Dua Lipa",
        src: "/audio/these-walls.mp3",
        cover: "/images/covers/dua-lipa.jpg",
      },
      {
        id: "musica-14",
        title: "Have Faith in Me",
        artist: "A Day To Remember",
        src: "/audio/have-faith-in-me.mp3",
        cover: "/images/covers/a-day-to-remember.jpg",
      },
      {
        id: "musica-15",
        title: "I Think I'm OKAY",
        artist: "Machine Gun Kelly, YUNGBLUD, blackbear",
        src: "/audio/im-okay.mp3",
        cover: "/images/covers/mgk.jpg",
      },
    ],
  },
};

export default siteContent;
