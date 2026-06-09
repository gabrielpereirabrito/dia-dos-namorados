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
        date: "2024-01-15",
        description:
          "Lembro-me de cada detalhe daquele dia. O teu sorriso iluminou tudo à minha volta e soube, naquele instante, que eras especial.",
        image: "/images/moments/momento-1.jpg",
        imageAlt: "O nosso primeiro encontro",
      },
      {
        id: "momento-2",
        title: "A Nossa Primeira Viagem",
        date: "2024-04-20",
        description:
          "Explorar o mundo contigo fez-me perceber que a melhor viagem é aquela que faço ao teu lado, não importa o destino.",
        image: "/images/moments/momento-2.jpg",
        imageAlt: "A nossa primeira viagem juntos",
      },
      {
        id: "momento-3",
        title: "Um Pôr do Sol Inesquecível",
        date: "2024-07-10",
        description:
          "O céu pintou-se de rosa e laranja, mas nenhuma cor era tão bonita quanto o brilho nos teus olhos naquele momento.",
        image: "/images/moments/momento-3.jpg",
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
        src: "/images/gallery/foto-1.jpg",
        alt: "Nós dois sorridentes",
        caption: "O teu sorriso é o meu lugar favorito.",
      },
      {
        id: "foto-2",
        src: "/images/gallery/foto-2.jpg",
        alt: "Momento especial",
        caption: "Cada segundo contigo é um presente.",
      },
      {
        id: "foto-3",
        src: "/images/gallery/foto-3.jpg",
        alt: "Aventura juntos",
        caption: "A melhor aventura é a que vivemos juntos.",
      },
      {
        id: "foto-4",
        src: "/images/gallery/foto-4.jpg",
        alt: "Dia feliz",
        caption: "Felicidade é estar ao teu lado.",
      },
      {
        id: "foto-5",
        src: "/images/gallery/foto-5.jpg",
        alt: "Recordação especial",
        caption: "Memórias que guardo no coração.",
      },
      {
        id: "foto-6",
        src: "/images/gallery/foto-6.jpg",
        alt: "Juntos para sempre",
        caption: "Contigo, tudo faz sentido.",
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
        title: "A Nossa Música",
        artist: "Artista",
        src: "/audio/musica-1.mp3",
        cover: "/images/covers/cover-1.jpg",
      },
      {
        id: "musica-2",
        title: "Canção Especial",
        artist: "Artista",
        src: "/audio/musica-2.mp3",
        cover: "/images/covers/cover-2.jpg",
      },
    ],
  },
};

export default siteContent;
