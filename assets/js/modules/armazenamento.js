// Camada de persistência: único módulo que conhece o localStorage.
export const CHAVE_LISTA = "ongApoio.cadastros";
export const CHAVE_RASCUNHO = "ongApoio.rascunho";

export function ler(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch (erro) {
    return padrao;
  }
}

export function gravar(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (erro) { /* indisponível */ }
}

export function apagar(chave) {
  try { localStorage.removeItem(chave); } catch (erro) { /* ignora */ }
}
