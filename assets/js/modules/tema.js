// Modo escuro: segue o sistema e permite alternar manualmente (preferência salva).
import { ler, gravar } from "./armazenamento.js";

const CHAVE_TEMA = "ongApoio.tema";

function aplicar(tema) {
  document.documentElement.dataset.tema = tema;
  const botao = document.querySelector(".tema-toggle");
  if (botao) botao.setAttribute("aria-pressed", String(tema === "escuro"));
}

export function iniciarTema() {
  const sistema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
  aplicar(ler(CHAVE_TEMA, null) || sistema);
  const botao = document.querySelector(".tema-toggle");
  if (!botao) return;
  botao.addEventListener("click", () => {
    const novo = document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro";
    aplicar(novo);
    gravar(CHAVE_TEMA, novo);
  });
}
