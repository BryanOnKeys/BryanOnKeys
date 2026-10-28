/** Updates only the verified public-activity block in README.md.
 * No dependencies, no tokens, and no private repository data.
 * Usage: node scripts/profile/render_readme.mjs [--check]
 */
import fs from "node:fs";

const OPEN = "<!-- PROFILE_LIVE:START -->";
const CLOSE = "<!-- PROFILE_LIVE:END -->";
const README = "README.md";

function render(data) {
  if (data.login !== "BryanOnKeys" || !Array.isArray(data.repositories) || !data.calendar || !data.updatedAt) {
    throw new Error("Invalid or mismatched public GitHub snapshot");
  }
  const n = value => Number.isFinite(Number(value)) ? Number(value).toLocaleString("es-PE") : "—";
  const publicRepos = data.repositories.filter(r => r && typeof r.name === "string");
  const owned = publicRepos.filter(r => !r.fork && r.name !== "BryanOnKeys");
  const stars = publicRepos.reduce((sum, repo) => sum + (Number(repo.stars) || 0), 0);
  const updated = data.updatedAt.slice(0, 10);
  const allowed = new Set(publicRepos.map(r => r.name));
  const events = (data.activity || []).filter(e =>
    e && allowed.has(e.repository) && /^\d{4}-\d\d-\d\d$/.test(e.date)
  ).slice(0, 3);
  const escape = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const entries = events.map(e =>
    `| ${escape(e.date)} | [\`${escape(e.repository)}\`](https://github.com/BryanOnKeys/${encodeURIComponent(e.repository)}) | ${escape(e.label)} |`
  ).join("\n");
  return `**Actividad verificable** · Instantánea pública: \`${updated}\` (UTC)

| Contribuciones (últimos 12 meses) | Repositorios públicos | Proyectos propios públicos | Estrellas en esos repositorios | Seguidores |
| :---: | :---: | :---: | :---: | :---: |
| **${n(data.calendar.total)}** | **${n(publicRepos.length)}** | **${n(owned.length)}** | **${n(stars)}** | **${n(data.followers)}** |

${entries ? `<details>
<summary>Últimos eventos públicos registrados</summary>

| Fecha | Repositorio | Evento |
| --- | --- | --- |
${entries}

</details>

` : ""}<sub>Las contribuciones proceden del calendario público de GitHub. Los eventos disponibles dependen de la ventana de la API; estas cifras no son una medición de habilidad o productividad.</sub>`;
}

const data = JSON.parse(fs.readFileSync("profile/data.json", "utf8"));
const readme = fs.readFileSync(README, "utf8");
const first = readme.indexOf(OPEN), last = readme.indexOf(CLOSE);
if (first < 0 || last < first || readme.indexOf(OPEN, first + 1) !== -1 ||
    readme.indexOf(CLOSE, last + 1) !== -1) {
  throw new Error("README must have exactly one pair of live markers");
}
const next = readme.slice(0, first + OPEN.length) + "\n" + render(data) + "\n" + readme.slice(last);
if (process.argv.includes("--check")) {
  if (next !== readme) { console.error("Public-activity block is out of date"); process.exit(1); }
  console.log("Verified README telemetry for " + data.login);
} else {
  if (next !== readme) fs.writeFileSync(README, next, "utf8");
  console.log("Rendered public GitHub telemetry");
}
