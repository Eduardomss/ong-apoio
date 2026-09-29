// Menu hambúrguer (elementos do cabeçalho, que persistem na SPA).
function alternar(abrir) {
  const menu = document.getElementById("menu-principal");
  const botao = document.querySelector(".menu-toggle");
  if (!menu || !botao) return;
  menu.classList.toggle("aberto", abrir);
  botao.setAttribute("aria-expanded", String(abrir));
}

export function fecharMenu() { alternar(false); }

export function iniciarMenu() {
  const botao = document.querySelector(".menu-toggle");
  if (!botao) return;
  botao.addEventListener("click", () => alternar(botao.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { fecharMenu(); botao.focus(); }
  });
}
