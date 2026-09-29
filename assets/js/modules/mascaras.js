// Máscaras de digitação (CPF, telefone e CEP).
function aplicar(id, formatar) {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", () => { el.value = formatar(el.value.replace(/\D/g, "")); });
}

export function aplicarMascaras() {
  aplicar("cpf", (v) => v.slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2"));
  aplicar("telefone", (v) => {
    v = v.slice(0, 11);
    return v.length > 10
      ? v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
      : v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
  });
  aplicar("cep", (v) => v.slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"));
}
