# Susana Xarepe — Solicitadora · Contexto do Projeto

## O que é este projeto
Site institucional estático para uma solicitadora em Lisboa. Ficheiros: `index.html`, `style.css`, `main.js`.

## Estrutura de ficheiros
```
solicitadora-site/
├── index.html       # Estrutura HTML (single-page, scroll sections)
├── style.css        # Todos os estilos + variáveis CSS + responsive
├── main.js          # Interações: navbar scroll, mobile menu, reveal, contadores, formulário
├── CLAUDE.md        # Este ficheiro — contexto para o Claude Code
└── assets/          # (a criar) Imagens, ícones, favicon
    ├── foto-hero.jpg
    ├── foto-sobre.jpg
    └── favicon.ico
```

## Design System

### Paleta de cores (CSS Variables em style.css)
| Variável         | Valor      | Uso                          |
|------------------|------------|------------------------------|
| `--cream`        | `#f5efe0`  | Fundo principal              |
| `--parchment`    | `#ede4cf`  | Fundo alternativo            |
| `--dark`         | `#14221b`  | Verde-escuro (hero, footer)  |
| `--dark2`        | `#1e3028`  | Verde escuro secundário      |
| `--gold`         | `#c09a4a`  | Acento dourado               |
| `--gold-light`   | `#d4b572`  | Dourado claro (itálicos)     |
| `--muted`        | `#7a7063`  | Texto secundário             |
| `--white`        | `#fdfaf3`  | Cards e formulários          |
| `--border`       | `#ddd5c0`  | Bordas subtis                |

### Tipografia
- **Serif (títulos):** Cormorant Garamond — pesos 300, 400, 500, 600 + itálico
- **Sans (corpo):** DM Sans — pesos 300, 400, 500
- Ambas carregadas via Google Fonts no `<head>` do HTML

### Animações
- `.reveal`, `.reveal-left`, `.reveal-right` — activadas por Intersection Observer em `main.js`
- Hero: animações CSS com `animation: fadeUp` e delays escalonados
- Contadores nas estatísticas: `animateCounter()` com easing em `main.js`

## Secções (IDs para navegação)
| ID          | Descrição                                      |
|-------------|------------------------------------------------|
| `#inicio`   | Hero dividido + barra de estatísticas          |
| `#servicos` | Grid 3×2 de serviços (6 cards)                 |
| `#sobre`    | Foto + texto + credenciais                     |
| `#contacto` | Informações de contacto + formulário           |

## O que falta personalizar
- [x] Nome "Susana Xarepe" já definido em todos os ficheiros
- [ ] Adicionar foto real no hero (`assets/foto-hero.jpg`) — ver comentário no HTML
- [ ] Adicionar foto real na secção Sobre (`assets/foto-sobre.jpg`)
- [ ] Atualizar morada, telefone e email
- [ ] Atualizar estatísticas (anos, clientes, satisfação)
- [ ] Atualizar credenciais académicas e profissionais
- [ ] Adicionar links reais para redes sociais
- [ ] Integrar formulário com serviço real (ver secção abaixo)
- [ ] Criar páginas de privacidade e aviso legal
- [ ] Adicionar favicon

## Integração do formulário
O formulário em `main.js` está em modo demo (simula envio com setTimeout).
Para ativar envio real, substitui o bloco `// TODO` por uma destas opções:

### Opção A — Formspree (mais simples, gratuito)
```js
const data = new FormData(contactForm);
fetch('https://formspree.io/f/SEU_ID_AQUI', {
  method: 'POST',
  body: data,
  headers: { 'Accept': 'application/json' }
}).then(r => {
  if (r.ok) { contactForm.style.display = 'none'; formSuccess.classList.add('show'); }
});
```

### Opção B — EmailJS (sem backend)
```js
emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', contactForm)
  .then(() => { contactForm.style.display = 'none'; formSuccess.classList.add('show'); });
```
Adicionar no `<head>`: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>`

## Próximos passos sugeridos
- Adicionar secção de **Testemunhos** (depoimentos de clientes)
- Adicionar **FAQ** com acordeão (perguntas frequentes sobre serviços)
- Adicionar **Google Maps** embed na secção de contacto
- Criar **página de serviço individual** (ex: `herancas.html`)
- Adicionar **cookie banner** (RGPD)
- Configurar **SEO** (schema.org LocalBusiness + Open Graph)
- Converter para **multi-página** se o conteúdo crescer

## Responsive breakpoints
| Breakpoint   | Comportamento                              |
|--------------|--------------------------------------------|
| > 1024px     | Layout completo, grelha 3 colunas          |
| 768–1024px   | Grelha serviços 2 colunas, footer 2 colunas|
| < 768px      | Stack vertical, menu hamburger, hero sem foto |
