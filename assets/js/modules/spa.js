// Roteamento de página única com History API.
import { fecharMenu } from "./menu.js";

const PAGINAS = ["index.html", "projetos.html", "cadastro.html"];
const arquivo = (url) => new URL(url, location.href).pathname.split("/").pop() || "index.html";
const ehRotaInterna = (a) =>
  a.origin === location.origin && PAGINAS.includes(arquivo(a.href)) && !a.target && !a.hasAttribute("download");

function marcarLinkAtivo() {
  document.querySelectorAll("#menu-principal > ul > li > a").forEach((a) => {
    if (arquivo(a.href) === arquivo(location.href)) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

export function iniciarSPA(aoRenderizar) {
  const alvo = document.getElementById("conteudo");

  function renderizar(url, registrarHistorico) {
    return fetch(url)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const novo = doc.getElementById("conteudo");
        if (!novo) throw new Error("conteúdo não encontrado");
        alvo.textContent = "";
        alvo.append(...novo.childNodes);
        document.title = doc.title;
        if (registrarHistorico) history.pushState({}, "", url);
        marcarLinkAtivo();
        aoRenderizar();
        const ancora = location.hash && document.getElementById(location.hash.slice(1));
        if (ancora) ancora.scrollIntoView(); else { window.scrollTo(0, 0); alvo.focus(); }
      })
      .catch(() => { location.href = url; });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!ehRotaInterna(a)) return;
    if (arquivo(a.href) === arquivo(location.href) && a.hash) return;
    e.preventDefault();
    fecharMenu();
    renderizar(a.href, true);
  });
  window.addEventListener("popstate", () => renderizar(location.href, false));
  marcarLinkAtivo();
}
