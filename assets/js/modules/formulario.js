// Comportamento do formulário de cadastro: eventos, rascunho, envio.
import { REGRAS, verificarCampo, limparCampo } from "./validacao.js";
import { ler, gravar, apagar, CHAVE_LISTA, CHAVE_RASCUNHO } from "./armazenamento.js";
import { mostrarToast } from "./utilidades.js";
import { renderizarCadastros } from "./templates.js";

const CAMPOS_RASCUNHO = ["nome", "email", "telefone", "cep", "cidade", "tipo"];

export function iniciarFormulario() {
  const f = document.getElementById("form-cadastro");
  if (!f) return;
  const msg = document.getElementById("mensagem");
  const enviar = f.querySelector("button[type=submit]");
  const campos = Array.from(f.elements).filter((el) => REGRAS[el.id]);

  const todosValidos = (mostrar) => campos.map((c) => verificarCampo(c, mostrar)).every(Boolean);
  const atualizar = () => { enviar.disabled = !todosValidos(false); };
  const salvarRascunho = () => {
    const dados = {};
    CAMPOS_RASCUNHO.forEach((id) => { dados[id] = document.getElementById(id).value; });
    gravar(CHAVE_RASCUNHO, dados);
  };

  f.addEventListener("focusout", (e) => { if (REGRAS[e.target.id]) verificarCampo(e.target, true); });
  f.addEventListener("input", (e) => {
    const c = e.target;
    if (REGRAS[c.id] && (c.classList.contains("campo-erro") || c.classList.contains("campo-ok"))) verificarCampo(c, true);
    atualizar();
    salvarRascunho();
  });
  f.addEventListener("change", (e) => {
    if (REGRAS[e.target.id]) verificarCampo(e.target, true);
    atualizar();
    salvarRascunho();
  });
  f.addEventListener("reset", () => { campos.forEach(limparCampo); setTimeout(atualizar, 0); });
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!todosValidos(true)) {
      const primeiro = f.querySelector(".campo-erro");
      if (primeiro) primeiro.focus();
      return;
    }
    msg.innerHTML = '<div class="alerta alerta--sucesso"><strong>Cadastro enviado.</strong> Obrigado por apoiar a ONG Apoio!</div>';
    mostrarToast("Cadastro enviado com sucesso!");
    const lista = ler(CHAVE_LISTA, []);
    lista.push({
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      tipo: document.getElementById("tipo").value,
      data: new Date().toISOString()
    });
    gravar(CHAVE_LISTA, lista);
    f.reset();
    apagar(CHAVE_RASCUNHO);
    renderizarCadastros();
  });

  const rascunho = ler(CHAVE_RASCUNHO, null);
  if (rascunho) {
    CAMPOS_RASCUNHO.forEach((id) => {
      if (typeof rascunho[id] === "string") document.getElementById(id).value = rascunho[id];
    });
  }
  atualizar();
}
