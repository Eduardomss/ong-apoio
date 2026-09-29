# ONG Apoio

Site estático de 3 páginas (HTML5, CSS e JavaScript puros).

## Estrutura
```
/
├── index.html
├── projetos.html
├── cadastro.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js (ponto de entrada)
    ├── js/modules/ (menu, spa, templates, mascaras, validacao, formulario, armazenamento, utilidades)
    └── images/ (logo.svg, banner-principal.webp, voluntariado.webp)
```

## Design System
Variáveis em `:root` de `assets/css/style.css`: 10 cores, 5 tamanhos de fonte e 7 espaçamentos (base 4/8 px).

## Validação
- HTML: https://validator.w3.org/ (enviar cada página)
- Formulário: `pattern` nativo para CPF, telefone e CEP, com máscaras em `main.js`.
- Acessibilidade: alt descritivo, h1-h3, `aria-current`, link de pular conteúdo, foco visível.

## Uso
Os scripts usam ES Modules e a navegação SPA usa `fetch`, então o site precisa de um servidor local (por exemplo, a extensão Live Server do VS Code ou `python -m http.server`). Abrir o arquivo direto com duplo clique não carrega o JavaScript.
