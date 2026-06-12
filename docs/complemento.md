# Complemento — Novas Seções do Projeto

Este documento especifica as novas seções e funcionalidades a serem adicionadas ao projeto **Dia dos Namorados**.

---

## Princípios Gerais de Implementação

Todas as seções abaixo devem:

- Seguir a **mesma lógica de componentes** já existente no projeto (ex.: `HeroSection.tsx`, `TimelineSection.tsx`, `GallerySection.tsx`).
- Ter seus dados e textos personalizáveis centralizados no arquivo [`src/data/content.ts`](../src/data/content.ts), expandindo a interface `SiteContent` com os novos tipos/campos necessários.
- Seguir a identidade visual e de formatação já estabelecida no frontend (paleta de cores, tipografia, animações, glassmorphism, dark mode, etc.).
- Ser adicionadas como componentes independentes (um arquivo `.tsx` por seção) dentro de `src/components/`.
- Ser integradas na página principal (`src/app/page.tsx` ou equivalente) na ordem desejada.

---

## 1. Seção: Contador de Tempo Juntos

### Descrição

Uma seção com um contador regressivo/progressivo animado que exibe o tempo decorrido desde o início do relacionamento, contando a partir de **05 de fevereiro de 2021**.

### Funcionalidades

- Exibir os valores em tempo real (atualização a cada segundo via `setInterval`).
- Mostrar os seguintes campos, cada um em um card individual:
  - **Meses** juntos
  - **Dias** juntos
  - **Horas** juntas
  - **Segundos** juntos
- Cada card deve ter uma animação de "pulsar" ou flip suave ao atualizar os segundos.
- A data de início deve ser configurável em `content.ts` (campo `startDate` como string ISO, ex.: `"2021-02-05"`).

### Estrutura sugerida em `content.ts`

```ts
export interface CounterSection {
  sectionTitle: string;
  sectionSubtitle: string;
  startDate: string; // ISO 8601, ex: "2021-02-05"
}

// Dentro de SiteContent:
counter: CounterSection;
```

### Dados sugeridos

```ts
counter: {
  sectionTitle: "Juntos há...",
  sectionSubtitle: "Cada segundo contigo vale uma eternidade. 💕",
  startDate: "2021-02-05",
},
```

### Componente

- **Arquivo:** `src/components/CounterSection.tsx`
- Usar `useState` + `useEffect` com `setInterval` de 1000ms para atualizar os valores.
- Os cálculos devem ser precisos: meses via diferença de data real, dias totais, horas totais e segundos totais desde `startDate`.

---

## 2. Seção: Potinho de Coisas que Amo em Você

### Descrição

Uma seção interativa com um "potinho" (jar/pote ilustrado) cheio de bilhetinhos dobrados. O usuário clica no pote para sortear um bilhete aleatório com uma mensagem de amor.

### Funcionalidades

- Exibir um pote animado (pode ser SVG ou ilustração CSS) com pequenos papéis coloridos visíveis na abertura.
- Ao clicar no pote, disparar uma animação de "tirar um bilhete":
  1. Um bilhetinho "sobe" do pote com animação (slide up + unfold).
  2. O bilhete abre e exibe a mensagem.
  3. Botão "Tirar outro bilhete" para sortear novamente com animação de fechar e reabrir.
- Os bilhetes não devem repetir até que todos tenham sido exibidos (embaralhar e percorrer a lista antes de reiniciar).
- Indicar quantos bilhetes já foram revelados (ex.: "12 de 20 bilhetes").

### Estrutura sugerida em `content.ts`

```ts
export interface LoveNote {
  id: string;
  message: string;
}

export interface LoveJarSection {
  sectionTitle: string;
  sectionSubtitle: string;
  clickPrompt: string;       // Texto exibido antes do primeiro clique
  nextNoteText: string;      // Texto do botão "Tirar outro"
  notes: LoveNote[];
}

// Dentro de SiteContent:
loveJar: LoveJarSection;
```

### Dados sugeridos (exemplos — personalizar com mensagens reais)

```ts
loveJar: {
  sectionTitle: "Potinho de Amor",
  sectionSubtitle: "Clique no potinho para tirar um bilhetinho especial. 🫙",
  clickPrompt: "Clique para tirar um bilhete",
  nextNoteText: "Tirar outro bilhete 💌",
  notes: [
    { id: "nota-1", message: "Amo o seu sorriso que ilumina qualquer ambiente." },
    { id: "nota-2", message: "Amo a forma como você me olha." },
    { id: "nota-3", message: "Amo a sua gargalhada espontânea." },
    { id: "nota-4", message: "Amo a sua coragem de ser quem você é." },
    { id: "nota-5", message: "Amo como você me faz sentir em casa." },
    // ... adicionar mais bilhetes personalizados
  ],
},
```

### Componente

- **Arquivo:** `src/components/LoveJarSection.tsx`
- Usar `useState` para controlar: bilhete atual, lista embaralhada, estado da animação (`idle` | `opening` | `open` | `closing`).
- Animações via CSS `@keyframes` ou `framer-motion` (se já usado no projeto).

---

## 3. Seção: Vale Presentes (Vale Tickets)

### Descrição

Uma seção no estilo de "carteira de vale-benefícios" onde são exibidos vales que podem ser "resgatados" pela parceira, como vale-almoço, vale-viagem, vale-maquiagem etc.

### Funcionalidades

- Exibir uma grade de cartões no estilo tickets/vouchers (design de ingresso ou voucher físico com borda serrilhada, perfuração lateral, etc.).
- Cada vale tem:
  - Um ícone/emoji representativo.
  - Um título (ex.: "Vale Almoço").
  - Uma descrição curta (ex.: "Um almoço especial em qualquer lugar que você escolher.").
  - Um botão **"Resgatar"**.
- Ao clicar em "Resgatar":
  1. O card exibe uma animação de "carimbo" (`RESGATADO` em vermelho, girado, como um carimbo físico).
  2. O vale fica visualmente "usado" (opacidade reduzida, grayscale, carimbo sobreposto).
  3. O estado de resgate deve ser **persistido no `localStorage`** para não resetar ao recarregar a página.
- Vales já resgatados devem mostrar a data/hora do resgate.
- Botão opcional para "devolver" (desfazer resgate), visível apenas em modo de edição ou com clique longo.

### Estrutura sugerida em `content.ts`

```ts
export interface GiftVoucher {
  id: string;
  icon: string;        // Emoji ou nome de ícone
  title: string;
  description: string;
  color?: string;      // Cor de destaque do vale (ex: "#e91e8c")
}

export interface VouchersSection {
  sectionTitle: string;
  sectionSubtitle: string;
  redeemButtonText: string;
  redeemedLabel: string;       // Ex: "RESGATADO"
  undoRedeemText?: string;     // Ex: "Devolver vale"
  vouchers: GiftVoucher[];
}

// Dentro de SiteContent:
vouchers: VouchersSection;
```

### Dados sugeridos (exemplos — personalizar)

```ts
vouchers: {
  sectionTitle: "Seus Vales Especiais",
  sectionSubtitle: "Presentes que você pode resgatar quando quiser. 🎟️",
  redeemButtonText: "Resgatar",
  redeemedLabel: "RESGATADO",
  undoRedeemText: "Devolver",
  vouchers: [
    {
      id: "vale-1",
      icon: "🍽️",
      title: "Vale Almoço",
      description: "Um almoço especial em qualquer restaurante que você escolher.",
      color: "#e91e8c",
    },
    {
      id: "vale-2",
      icon: "✈️",
      title: "Vale Viagem",
      description: "Uma viagem surpresa para um lugar que você queira conhecer.",
      color: "#9c27b0",
    },
    {
      id: "vale-3",
      icon: "💄",
      title: "Vale Maquiagem",
      description: "Compras de maquiagem à sua escolha, sem julgamentos.",
      color: "#f06292",
    },
    {
      id: "vale-4",
      icon: "🍿",
      title: "Vale Cinema",
      description: "Uma sessão de cinema com pipoca, bebida e o filme que você quiser.",
      color: "#ff7043",
    },
    {
      id: "vale-5",
      icon: "💆",
      title: "Vale Spa",
      description: "Um dia de spa ou massagem para relaxar e se mimar.",
      color: "#66bb6a",
    },
    {
      id: "vale-6",
      icon: "🛍️",
      title: "Vale Compras",
      description: "Um dia inteiro de compras com o seu personal shopper favorito.",
      color: "#42a5f5",
    },
    // ... adicionar mais vales personalizados
  ],
},
```

### Componente

- **Arquivo:** `src/components/VouchersSection.tsx`
- Usar `useState` inicializado a partir do `localStorage` para manter o estado dos vales resgatados.
- Persistir as alterações no `localStorage` a cada resgate/devolução.
- A animação do carimbo deve ser um `@keyframes` de `scale` + `rotate` (drop-in effect).
- Design de ticket: bordas com `border-image` ou pseudo-elemento com padrão de furos (círculos) para simular um voucher físico.

---

## Ordem de Exibição Sugerida na Página

1. Hero
2. **Contador de Tempo Juntos** ← nova
3. Timeline
4. Galeria
5. **Potinho de Amor** ← nova
6. **Vale Presentes** ← nova
7. Cartão de Amor
8. Footer

---

## Checklist de Implementação

- [ ] Adicionar interfaces e dados de `counter`, `loveJar` e `vouchers` em `src/data/content.ts`
- [ ] Criar `src/components/CounterSection.tsx`
- [ ] Criar `src/components/LoveJarSection.tsx`
- [ ] Criar `src/components/VouchersSection.tsx`
- [ ] Integrar os três componentes em `src/app/page.tsx` (ou equivalente) na ordem sugerida
- [ ] Adicionar estilos CSS/animações consistentes com o design system existente
- [ ] Testar persistência do `localStorage` nos vales
- [ ] Testar responsividade em mobile
