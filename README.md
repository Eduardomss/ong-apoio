# ONG Apoio

Site institucional de uma ONG, com três páginas responsivas e acessíveis: `index.html` (missão e valores), `projetos.html` (frentes de atuação, campanhas e voluntariado) e `cadastro.html` (formulário validado).

## Tecnologias
- **HTML5 semântico**: header, nav, main, section, footer, fieldset/legend, hierarquia h1-h3 e textos alternativos.
- **CSS3**: Design System com variáveis em `:root`, CSS Grid de 12 colunas, Flexbox, 5 breakpoints, menu dropdown/hambúrguer e estados de botões e formulários.
- **JavaScript (ES Modules)**: navegação SPA com History API, templates com Template Literals, validação com RegEx, máscaras e `localStorage`.
- **Imagens**: WebP e SVG, com `srcset`/`sizes` (versões de 600/1200 px e 400/800 px), `loading="lazy"` fora da primeira dobra e `fetchpriority="high"` no banner.
- Sem bibliotecas externas em produção. **esbuild** é a única ferramenta de build (dependência de desenvolvimento).

## Estrutura de pastas
```
/
├── index.html, projetos.html, cadastro.html
├── README.md, package.json
├── scripts/build.mjs
├── dist/ (build de produção)
└── assets/
    ├── css/style.css
    ├── images/ (logo.svg, banner-principal.webp, voluntariado.webp)
    └── js/
        ├── main.js (ponto de entrada)
        └── modules/ (menu, tema, spa, templates, mascaras, validacao, formulario, armazenamento, utilidades)
```

## Pré-requisitos
- Navegador moderno (Chrome, Firefox, Edge ou Safari).
- Um servidor local estático, pois ES Modules e a navegação SPA usam `fetch` e não funcionam ao abrir o arquivo com duplo clique. Opções: Python 3, Node.js ou a extensão Live Server do VS Code.

## Instalação e execução local
1. Clone o repositório ou descompacte o projeto: `git clone URL_DO_REPOSITORIO && cd ong-apoio`
2. Não há dependências para instalar (nenhum `npm install`).
3. Inicie um servidor na pasta do projeto: `python -m http.server 8000` (ou use o Live Server).
4. Abra `http://localhost:8000` no navegador.

## Build e testes
- **Build de produção:** requer Node.js. Rode `npm install` e depois `npm run build`. O script `scripts/build.mjs` usa o esbuild para agrupar os módulos JS em um único arquivo minificado, minificar o CSS, minificar o HTML e copiar as imagens para a pasta `dist/`. Para testar, sirva a pasta `dist/` (por exemplo, `python -m http.server 8000 -d dist`).
- Redução medida: cerca de 19% no total (JS 43%, CSS 6%, HTML 2%).
- Não há testes automatizados. A verificação é manual: validar cada página em https://validator.w3.org/, testar o formulário (CPF, telefone e CEP), redimensionar a janela para conferir os breakpoints e navegar por teclado.

## Design System
Inclui modo escuro (automático pelo sistema e com botão manual, preferência salva no `localStorage`) e ajustes para `prefers-contrast: more`. Contrastes calculados pela fórmula WCAG 2.1 (mínimo 4.5:1).

Variáveis em `assets/css/style.css`: 10 cores, 5 tamanhos de fonte (rem) e 7 espaçamentos com base em 4/8 px.

## Deploy
Publicação automática no **GitHub Pages** por GitHub Actions (`.github/workflows/deploy.yml`): a cada push na branch `main`, o workflow instala as dependências, executa `npm run build` e publica a pasta `dist/`. Para ativar: no repositório, em Settings > Pages, escolha "GitHub Actions" como Source. O endereço será `https://USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Versionamento
- **GitFlow**: `main` (versões estáveis), `develop` (integração), `feature/*`, `release/*` e `hotfix/*`.
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:`.
- **Versionamento semântico** (MAJOR.MINOR.PATCH) com tags anotadas: `v1.0.0`, `v1.0.1`, `v1.0.2`, `v1.1.0`, `v1.2.0`, `v1.2.1`, `v1.2.2`.
