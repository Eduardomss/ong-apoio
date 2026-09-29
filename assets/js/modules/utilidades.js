// Funções genéricas, sem dependência de outros módulos.
const ENTIDADES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ENTIDADES[c]);
}

export function mostrarToast(texto) {
  const t = document.createElement("div");
  t.className = "toast";
  t.setAttribute("role", "status");
  t.textContent = texto;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}
