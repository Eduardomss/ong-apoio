// Templates dinâmicos: transforma dados em HTML (Template Literals) e injeta no DOM.
import { ler, apagar, CHAVE_LISTA } from "./armazenamento.js";
import { escapar } from "./utilidades.js";

const DADOS = {
  valores: [
    { titulo: "Transparência", texto: "Prestamos contas de cada recurso recebido." },
    { titulo: "Respeito", texto: "Escutamos as famílias antes de agir." },
    { titulo: "Coletividade", texto: "Só crescemos com voluntários e doadores." }
  ],
  frentes: [
    { titulo: "Mesa Cheia", texto: "Distribuição mensal de cestas básicas.", status: "sucesso", rotulo: "Vagas abertas" },
    { titulo: "Aprender Mais", texto: "Reforço escolar para crianças e jovens.", status: "info", rotulo: "Em andamento" },
    { titulo: "Renda em Foco", texto: "Cursos de capacitação profissional.", status: "alerta", rotulo: "Poucas vagas" }
  ],
  campanhas: [
    { titulo: "Inverno Solidário", texto: "Arrecadação de agasalhos e cobertores.", status: "erro", rotulo: "Urgente" },
    { titulo: "Volta às Aulas", texto: "Doação de material escolar.", status: "sucesso", rotulo: "Meta atingida" }
  ]
};

function templateCartao(item, classes) {
  const selo = item.rotulo
    ? `<span class="badge badge--${item.status}">${escapar(item.rotulo)}</span>`
    : "";
  return `<article class="cartao ${classes}">${selo}<h3>${escapar(item.titulo)}</h3><p>${escapar(item.texto)}</p></article>`;
}

export function renderizarListas() {
  document.querySelectorAll("[data-lista]").forEach((contenor) => {
    const itens = DADOS[contenor.dataset.lista];
    if (!itens) return;
    const classes = itens.length === 2 ? "col-sm-6 col-lg-6" : "col-sm-6 col-lg-4";
    contenor.innerHTML = itens.map((item) => templateCartao(item, classes)).join("");
  });
}

export function renderizarCadastros() {
  const ul = document.getElementById("lista-cadastros");
  if (!ul) return;
  const lista = ler(CHAVE_LISTA, []);
  ul.innerHTML = lista.length
    ? lista.map((c) => `<li>${escapar(c.nome)} (${escapar(c.tipo)}) - ${new Date(c.data).toLocaleDateString("pt-BR")}</li>`).join("")
    : "<li>Nenhum cadastro salvo ainda.</li>";
  const limpar = document.getElementById("limpar-cadastros");
  limpar.hidden = !lista.length;
  limpar.onclick = () => { apagar(CHAVE_LISTA); renderizarCadastros(); };
}
