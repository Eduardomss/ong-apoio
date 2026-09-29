# ONG Apoio

Site institucional de uma ONG, com três páginas responsivas e acessíveis: `index.html` (missão e valores), `projetos.html` (frentes de atuação, campanhas e voluntariado) e `cadastro.html` (formulário validado).

## Tecnologias
- **HTML5 semântico**: header, nav, main, section, footer, fieldset/legend, hierarquia h1-h3 e textos alternativos.
- **CSS3**: Design System com variáveis em `:root`, CSS Grid de 12 colunas, Flexbox, 5 breakpoints, menu dropdown/hambúrguer e estados de botões e formulários.
- **JavaScript (ES Modules)**: navegação SPA com History API, templates com Template Literals, validação com RegEx, máscaras e `localStorage`.
- Sem bibliotecas externas e sem etapa de build.

## Estrutura de pastas
```
/
├── index.html, projetos.html, cadastro.html
├── README.md
└── assets/
    ├── css/style.css
    ├── images/ (logo.svg, banner-principal.webp, voluntariado.webp)
    └── js/
        ├── main.js (ponto de entrada)
        └── modules/ (menu, spa, templates, mascaras, validacao, formulario, armazenamento, utilidades)
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
- Não há build: os arquivos são servidos como estão.
- Não há testes automatizados. A verificação é manual: validar cada página em https://validator.w3.org/, testar o formulário (CPF, telefone e CEP), redimensionar a janela para conferir os breakpoints e navegar por teclado.

## Design System
Variáveis em `assets/css/style.css`: 10 cores, 5 tamanhos de fonte (rem) e 7 espaçamentos com base em 4/8 px.

## Versionamento
- **GitFlow**: `main` (versões estáveis), `develop` (integração), `feature/*`, `release/*` e `hotfix/*`.
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:`.
- **Versionamento semântico** (MAJOR.MINOR.PATCH) com tags anotadas: `v1.0.0`, `v1.0.1`, `v1.0.2`.
