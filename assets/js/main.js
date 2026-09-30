// Ponto de entrada: só orquestra os módulos (sem regras de negócio).
import { iniciarTema } from "./modules/tema.js";
import { iniciarMenu } from "./modules/menu.js";
import { iniciarSPA } from "./modules/spa.js";
import { renderizarListas, renderizarCadastros } from "./modules/templates.js";
import { aplicarMascaras } from "./modules/mascaras.js";
import { iniciarFormulario } from "./modules/formulario.js";

// Roda no carregamento e após cada navegação da SPA.
function iniciarPagina() {
  renderizarListas();
  renderizarCadastros();
  aplicarMascaras();
  iniciarFormulario();
}

iniciarTema();
iniciarMenu();
iniciarSPA(iniciarPagina);
iniciarPagina();
