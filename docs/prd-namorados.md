# Preparing the content for the Markdown file based on the PRD text provided.
prd_content = """# Product Requirements Document (PRD) — Projeto Dia dos Namorados

## 1. Visão Geral do Produto
O projeto consiste num web app interativo e responsivo, desenvolvido como uma página/experiência digital personalizada para celebrar o Dia dos Namorados. O objetivo principal é guiar o utilizador (a namorada) por uma jornada de memórias através de fotos, textos, músicas marcantes e animações fluidas que tornam a experiência emocionante e imersiva.

---

## 2. Objetivos Principais
* **Emocionar e Envolver:** Criar uma experiência visual e auditiva rica através de transições suaves e design refinado.
* **Customização Simples:** Centralizar todos os dados mutáveis (fotos, textos, URLs de músicas) num único local de configuração para facilitar atualizações futuras ou reutilização.
* **Performance:** Garantir um carregamento rápido na Vercel, com otimização de imagens para evitar travamentos nas animações.

---

## 3. Stack Tecnológica & Arquitetura
* **Framework:** Next.js (App Router recomendado para uma melhor gestão de páginas/layouts).
* **Estilização:** Tailwind CSS (com HeroUI para componentes base como modais, cards ou sliders, dark e light mode).
* **Animação:** Motion (Framer Motion) para microinterações, transições de página e efeitos de scroll.
* **Hospedagem:** Vercel (com deploy contínuo via GitHub).
* **Gestão de Dados:** Inicialmente estático/local através de um ficheiro de configuração (`data/config.ts` ou `json`), permitindo uma edição fácil sem ser necessário mexer na estrutura dos componentes.

---

## 4. Requisitos Funcionais (Funcionalidades)

### 4.1. Estrutura de Páginas/Secções
O projeto pode ser construído como uma **Single Page Application (SPA)** com scroll animado por secções ou uma **Multi-page** com transições de página usando o Motion. Recomenda-se o formato de secções (Storytelling).

* **Secção 1: Tela de Boas-Vindas (Hero Screen)**
    * Título impactante com animação de entrada (Fade-in / Blur).
    * Botão interativo ("Iniciar a nossa jornada") com microinterações no hover/click.
* **Secção 2: Linha do Tempo / Os Nossos Momentos**
    * Exibição cronológica ou em blocos dos momentos marcantes.
    * Cada momento deve conter: Título, Data, Texto descritivo e Foto.
    * Efeito de *Scroll Animation* (os elementos surgem à medida que o utilizador faz scroll na página).
* **Secção 3: Galeria de Fotos Interativa**
    * Grid de fotos estilizado com HeroUI.
    * Ao clicar numa foto, abre um Modal (HeroUI) com zoom e detalhes da imagem, animado via Motion.
* **Secção 4: Cartão de Amor / Mensagem Final**
    * Um espaço dedicado a um texto mais longo e íntimo.
    * Efeito visual simulando uma carta a abrir ou um texto que se escreve sozinho (*Typewriter effect*).

### 4.2. Mini Player de Música (Floating Audio Player)
* **Persistência:** O player deve ser um componente global (ficar fixo num canto do ecrã ou no header) para que a música não pare ao navegar entre secções.
* **Controlos:** Play, Pause, Próxima (Next), Anterior (Prev) e Barra de progresso discreta.
* **Fonte dos áudios:** Ficheiros locais na pasta `public/audio` ou integração simples (ex: links diretos de áudio ou integração de stream se preferir não hospedar os ficheiros).
* **Autoplay:** Nota importante: os navegadores modernos bloqueiam o autoplay de áudio sem interação prévia. Portanto, o som deve iniciar **assim que o utilizador clicar no botão de "Iniciar"** da tela de boas-vindas.

---

## 5. Requisitos Não-Funcionais
* **Responsividade (Mobile First):** O projeto deve ser impecável no telemóvel, já que há grandes probabilidades de ser aberto através do smartphone.
* **Otimização de Imagens:** Utilizar o componente `<Image />` do Next.js para garantir que as fotos pesadas do telemóvel não prejudiquem a performance e os Core Web Vitals da página.
* **Acessibilidade Visual:** Cores contrastantes e tipografia legível (ex: fontes elegantes como *Playfair Display* para títulos e *Inter* para textos longos).

---

## 6. Estrutura de Dados (Modelo de Personalização)
Para cumprir o requisito de ser personalizável, a app consumirá um objeto central de configuração. Exemplo de estrutura em `src/data/content.ts`:

7. Cronograma Sugerido de Desenvolvimento (MVP)
Fase 1 (Setup): Setup do Next.js, instalação do Tailwind, Motion e HeroUI. Configuração do ficheiro de dados estruturado.

Fase 2 (Player & Core): Implementação do player de áudio global e lógica de ativação no primeiro clique.

Fase 3 (UI & Secções): Construção da interface visual das secções (Hero, Linha do Tempo e Galeria).

Fase 4 (Animações): Aplicação dos efeitos do Motion (scroll-linked animations, transições de modais).

Fase 5 (Deploy & Teste): Upload na Vercel e teste em dispositivos móveis (iOS/Android) para garantir que o áudio e as imagens carregam perfeitamente.