// Regras de consistência e sinalização visual dos campos.
function validarCPF(valor) {
  const n = valor.replace(/\D/g, "");
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(n[i]) * (t + 1 - i);
    if (((soma * 10) % 11) % 10 !== Number(n[t])) return false;
  }
  return true;
}

export const REGRAS = {
  nome: (v) => (v.trim().split(/\s+/).length < 2 ? "Digite nome e sobrenome." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Digite um e-mail válido, como nome@exemplo.com."),
  cpf: (v) => {
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v)) return "Use o formato 000.000.000-00.";
    return validarCPF(v) ? "" : "CPF inválido. Confira os números.";
  },
  telefone: (v) => (/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(v) ? "" : "Use o formato (11) 91234-5678."),
  cep: (v) => (/^\d{5}-\d{3}$/.test(v) ? "" : "Use o formato 00000-000."),
  cidade: (v) => (v.trim().length < 2 ? "Informe a cidade." : ""),
  tipo: () => ""
};

function sinalizar(campo, mensagem) {
  const id = `erro-${campo.id}`;
  let aviso = document.getElementById(id);
  if (!aviso) {
    aviso = document.createElement("span");
    aviso.id = id;
    aviso.className = "msg-erro";
    aviso.setAttribute("role", "alert");
    campo.insertAdjacentElement("afterend", aviso);
    campo.setAttribute("aria-describedby", id);
  }
  aviso.textContent = mensagem;
  aviso.hidden = !mensagem;
  campo.classList.toggle("campo-erro", mensagem !== "");
  campo.classList.toggle("campo-ok", mensagem === "");
  campo.setAttribute("aria-invalid", String(mensagem !== ""));
}

export function limparCampo(campo) {
  campo.classList.remove("campo-erro", "campo-ok");
  campo.removeAttribute("aria-invalid");
  const aviso = document.getElementById(`erro-${campo.id}`);
  if (aviso) { aviso.textContent = ""; aviso.hidden = true; }
}

export function verificarCampo(campo, mostrar) {
  const mensagem = campo.value.trim() === "" ? "Este campo é obrigatório." : REGRAS[campo.id](campo.value);
  if (mostrar) sinalizar(campo, mensagem);
  return mensagem === "";
}
