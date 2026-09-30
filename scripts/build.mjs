// Build de produção: agrupa e minifica JS e CSS com esbuild, minifica o HTML e copia as imagens para dist/.
import { build } from "esbuild";
import { cpSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });

// JS: resolve os imports dos módulos e gera um único arquivo minificado (continua sendo um módulo ES).
await build({
  entryPoints: ["assets/js/main.js"],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: "dist/assets/js/main.js"
});

// CSS minificado
await build({
  entryPoints: ["assets/css/style.css"],
  minify: true,
  outfile: "dist/assets/css/style.css"
});

// Imagens (já em formatos leves: SVG e WebP)
cpSync("assets/images", "dist/assets/images", { recursive: true });

// HTML: remove comentários, quebras de linha e indentação entre tags (mantém o espaço entre palavras)
mkdirSync("dist", { recursive: true });
for (const arquivo of ["index.html", "projetos.html", "cadastro.html"]) {
  const html = readFileSync(arquivo, "utf8")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s*\n\s*</g, "><")
    .replace(/\s*\n\s*/g, " ")
    .trim();
  writeFileSync(`dist/${arquivo}`, html);
}
console.log("Build concluído em dist/");
