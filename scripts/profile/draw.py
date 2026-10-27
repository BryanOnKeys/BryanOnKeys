"""Original pearl-white SVG components. Every metric comes from data.json."""

from datetime import date
from html import escape

WIDTH = 1200
INK = "#f6f9ff"
MUTED = "#a4adbb"
DIM = "#677281"
EDGE = "#303a48"
BG = "#0d1117"
MONO = "ui-monospace,Consolas,Liberation Mono,monospace"
SANS = "Segoe UI,Arial,Helvetica,sans-serif"

DEFS = f"""<defs>
<linearGradient id="surface" x2="1" y2="1"><stop stop-color="#19212b"/><stop offset="1" stop-color="{BG}"/></linearGradient>
<linearGradient id="pearl" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".28" stop-color="#b6c6d8"/><stop offset=".52" stop-color="#fff"/><stop offset=".75" stop-color="#c8d9eb"/><stop offset="1" stop-color="#fff"/></linearGradient>
<linearGradient id="line"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#eff8ff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="sheen"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".65"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="halo"><stop stop-color="#f1f7ff" stop-opacity=".22"/><stop offset="1" stop-color="#d6e8ff" stop-opacity="0"/></radialGradient>
<filter id="glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<style>
text{{font-family:{SANS};fill:{INK}}}
.mono{{font-family:{MONO}}}
.pulse{{animation:pulse 5s ease-in-out infinite}}
.orbit{{transform-origin:center;animation:orbit 28s linear infinite}}
@keyframes pulse{{0%,100%{{opacity:.45}}50%{{opacity:1}}}}
@keyframes orbit{{to{{transform:rotate(360deg)}}}}
@media(prefers-reduced-motion:reduce){{*{{animation:none!important}}}}
</style>"""


def text(x, y, value, size=20, fill=INK, weight=400, anchor=None, mono=False, extra=""):
    anchor_attr = f' text-anchor="{anchor}"' if anchor else ""
    return (
        f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" '
        f'style="fill:{fill}"{anchor_attr} class="{"mono" if mono else ""}" {extra}>'
        f"{escape(str(value))}</text>"
    )


def rect(x, y, width, height, fill="url(#surface)", radius=16, stroke=EDGE, extra=""):
    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="{radius}" fill="{fill}" stroke="{stroke}" {extra}/>'


def line(x1, y1, x2, y2, stroke=EDGE, extra=""):
    return (
        f'<path d="M{x1} {y1}H{x2}" stroke="{stroke}" {extra}/>'
        if y1 == y2
        else f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{stroke}" {extra}/>'
    )


def svg(title, height, body, width=WIDTH, description=None):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">'
        f'<title id="title">{escape(title)}</title><desc id="desc">{escape(description or title)}</desc>'
        f'{DEFS}<rect width="{width}" height="{height}" rx="14" fill="{BG}"/>{body}</svg>\n'
    )


def pills(items, x, y, max_width=1100, size=17):
    result = ""
    start = x
    for item in items:
        width = len(item) * size * 0.58 + 30
        if x + width > start + max_width:
            x, y = start, y + 42
        result += rect(x, y - 23, width, 33, "#171f2a", 16, "#3b4758")
        result += text(x + width / 2, y - 1, item, size, "#dbe5f2", 500, "middle")
        x += width + 10
    return result


GLYPHS = {
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "N": ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
}


def hero(config):
    body = rect(0.5, 0.5, 1199, 329, radius=22)
    body += '<ellipse cx="600" cy="150" rx="620" ry="190" fill="url(#halo)"/>'
    body += text(
        40,
        39,
        "BRYANONKEYS / SOFTWARE & IDEAS",
        13,
        MUTED,
        500,
        mono=True,
        extra='letter-spacing="2"',
    )
    body += text(
        1160, 39, "LIMA, PERÚ", 13, MUTED, 500, "end", True, 'letter-spacing="2"'
    )
    for x in range(34, 1170, 12):
        for y in range(79, 212, 12):
            body += rect(x, y, 6, 6, "#222c39", 1, "none", 'opacity=".5"')
    label = "BRYAN ON KEYS"
    columns = sum(3 if char == " " else 6 for char in label) - 1
    left = (WIDTH - columns * 12) / 2
    pixels = ""
    cursor = left
    for char in label:
        if char == " ":
            cursor += 36
            continue
        for row, bitmap in enumerate(GLYPHS[char]):
            for col, lit in enumerate(bitmap):
                if lit == "1":
                    pixels += rect(
                        cursor + col * 12,
                        104 + row * 12,
                        9,
                        9,
                        "url(#pearl)",
                        2,
                        "none",
                    )
        cursor += 72
    body += f'<g filter="url(#glow)">{pixels}</g>'
    body += f'<defs><clipPath id="letters">{pixels}</clipPath></defs>'
    body += (
        '<g clip-path="url(#letters)"><rect x="0" y="90" width="150" height="120" fill="url(#sheen)">'
        '<animateTransform attributeName="transform" type="translate" values="-250 0;1400 0;1400 0" '
        'keyTimes="0;.7;1" dur="8s" repeatCount="indefinite"/></rect></g>'
    )
    body += text(
        600,
        251,
        config["role"].upper(),
        22,
        INK,
        600,
        "middle",
        extra='letter-spacing="7"',
    )
    body += line(360, 273, 840, 273, "url(#line)")
    body += text(
        600,
        302,
        "APRENDER. CONSTRUIR. MEJORAR.",
        13,
        MUTED,
        400,
        "middle",
        True,
        'letter-spacing="3"',
    )
    return svg(
        "Bryan On Keys · Full Stack Developer",
        330,
        body,
        description="Cabecera decorativa de píxeles en blanco perlado; no representa un calendario ni métricas de contribuciones.",
    )


def github_mark(path):
    body = '<circle cx="100" cy="100" r="95" fill="url(#halo)"/>'
    for radius, opacity in [(78, 0.18), (68, 0.35), (59, 0.7)]:
        body += f'<circle class="pulse" cx="100" cy="100" r="{radius}" fill="none" stroke="#edf6ff" stroke-opacity="{opacity}"/>'
    body += '<circle cx="100" cy="100" r="51" fill="url(#pearl)"/>'
    body += (
        f'<g transform="translate(68 68) scale(4)" fill="{BG}"><path d="{path}"/></g>'
    )
    body += '<g class="orbit"><circle cx="100" cy="22" r="3" fill="#fff" filter="url(#glow)"/></g>'
    return svg("GitHub · BryanOnKeys", 200, body, 200)


def headline(config):
    body = ""
    for i, value in enumerate(config["headlines"]):
        body += (
            f'<g opacity="{1 if i == 0 else 0}" class="headline{i}">'
            f"{text(600, 42, value, 28, INK, 500, 'middle', True)}</g>"
        )
    count = len(config["headlines"])
    animation = "<style>.typing-reveal{animation:reveal 4s steps(48,end) infinite}@keyframes reveal{0%{width:0}65%,90%{width:1080px}100%{width:0}}"
    for i in range(count):
        start, end = i * 100 / count, (i + 1) * 100 / count
        animation += f".headline{i}{{animation:head{i} {count * 4}s infinite}}"
        keyframes = [
            (0, 1 if i == 0 else 0),
            (max(0, start - 0.1), 0),
            (start + 0.1, 1),
            (end - 1, 1),
            (end, 0),
            (100, 0),
        ]
        if i == 0:
            keyframes = [(0, 1), (end - 1, 1), (end, 0), (100, 0)]
        animation += (
            f"@keyframes head{i}{{"
            + "".join(f"{pct}%{{opacity:{opacity}}}" for pct, opacity in keyframes)
            + "}"
        )
    animation += "@media(prefers-reduced-motion:reduce){[class^=headline]{animation:none!important;opacity:0}.headline0{opacity:1}.typing-reveal{animation:none!important;width:1080px}}</style>"
    clip = '<defs><clipPath id="phrase-reveal"><rect class="typing-reveal" x="60" y="8" width="1080" height="56"/></clipPath></defs>'
    return svg(
        "Frases de presentación de Bryan",
        72,
        clip + '<g clip-path="url(#phrase-reveal)">' + body + "</g>" + animation,
    )


def section(number, title, subtitle):
    body = text(
        4,
        22,
        f"// {number} · BRYANONKEYS",
        12,
        MUTED,
        500,
        mono=True,
        extra='letter-spacing="2"',
    )
    body += text(2, 64, title, 34, INK, 650)
    body += text(1196, 61, subtitle, 14, MUTED, 400, "end")
    body += line(2, 82, 1198, 82)
    body += line(2, 82, 150, 82, "url(#pearl)", 'stroke-width="3"')
    return svg(title, 96, body)


def nav(number, title):
    body = rect(0.5, 0.5, 289, 69, radius=12)
    body += text(16, 44, number, 27, "#bdcddd", 400, mono=True)
    body += text(66, 42, title, 18, INK, 600)
    body += text(270, 42, "↗", 22, MUTED, 400, "end")
    return svg(title, 70, body, 290)


def about(config):
    body = rect(0.5, 0.5, 315, 329, radius=18)
    body += '<circle cx="158" cy="106" r="90" fill="url(#halo)"/><circle cx="158" cy="106" r="56" fill="none" stroke="url(#pearl)"/>'
    body += text(158, 124, "BK", 46, INK, 650, "middle", True, 'filter="url(#glow)"')
    body += text(158, 206, config["name"], 30, INK, 650, "middle")
    body += text(158, 235, "Full Stack Developer", 18, MUTED, 400, "middle")
    body += line(56, 259, 260, 259)
    body += text(158, 294, config["location"], 16, MUTED, 500, "middle")
    body += rect(334, 0.5, 865, 188, radius=18)
    body += text(
        364,
        35,
        "// HOLA, SOY BRYAN",
        12,
        MUTED,
        500,
        mono=True,
        extra='letter-spacing="2"',
    )
    body += text(364, 78, "Construyo aplicaciones que conectan", 30, INK, 650)
    body += text(364, 116, "interfaces, servicios y datos.", 30, INK, 650)
    body += text(364, 156, "Computación e Informática · Cibertec · Perú", 18, MUTED)
    cards = [
        (334, "BASE", "Java / Spring", "Backend y lógica de negocio"),
        (628, "EXPERIENCIA", "React / TS", "Interfaces y aplicaciones web"),
        (922, "EN PROYECTOS", "NestJS / AWS", "Servicios, eventos y persistencia"),
    ]
    for x, label, value, note in cards:
        body += rect(x, 205, 277, 124, radius=14)
        body += text(
            x + 20, 231, label, 11, MUTED, mono=True, extra='letter-spacing="2"'
        )
        body += text(x + 20, 269, value, 24, INK, 650)
        body += text(x + 20, 300, note, 13, MUTED)
    return svg(
        "Sobre Bryan · Full Stack Developer en Lima, Perú",
        330,
        body,
        description=config["education"]
        + ". Java, Spring Boot, React, TypeScript y proyectos con NestJS y AWS.",
    )


def code_card(config):
    rows = [
        ("const", " bryan", " = {"),
        ("  name", ": ", '"Bryan",'),
        ("  basedIn", ": ", '"Lima, Perú",'),
        ("  education", ": ", '"Computación e Informática · Cibertec",'),
        ("  backend", ": ", '["Java", "Spring Boot", "NestJS"],'),
        ("  frontend", ": ", '["React", "TypeScript", "JavaScript"],'),
        ("  data", ": ", '["PostgreSQL", "MySQL", "SQL Server"],'),
        ("  building", ": ", '"APIs, aplicaciones web y sistemas con eventos",'),
        ("  learning", ": ", '["C# / .NET", "AWS", "Testing"],'),
        ("  principle", ": ", '"Claridad, consistencia y mejora continua"'),
        ("}", "", " as const;"),
    ]
    body = rect(0.5, 0.5, 1199, 439, radius=18)
    for x, color in [(24, "#edf5ff"), (44, "#9aaabd"), (64, "#536175")]:
        body += f'<circle cx="{x}" cy="25" r="5" fill="{color}"/>'
    body += text(95, 30, "bryan.ts", 14, MUTED, mono=True)
    body += text(1174, 30, "TypeScript · UTF-8", 12, DIM, anchor="end", mono=True)
    body += line(1, 50, 1199, 50)
    for i, parts in enumerate(rows):
        y = 88 + i * 31
        body += text(34, y, i + 1, 14, DIM, anchor="end", mono=True)
        content = "".join(parts)
        body += text(
            64, y, content, 18, "#d4deeb", mono=True, extra='xml:space="preserve"'
        )
    return svg("bryan.ts · mi perfil como código", 440, body)


def stack(config):
    body = ""
    for index, group in enumerate(config["stack"]):
        x, y = (index % 2) * 610, (index // 2) * 265
        body += rect(x + 0.5, y + 0.5, 589, 249, radius=18)
        body += text(
            x + 28,
            y + 36,
            group["title"],
            12,
            MUTED,
            mono=True,
            extra='letter-spacing="3"',
        )
        body += text(x + 28, y + 76, group["label"], 27, INK, 600)
        body += pills(group["items"], x + 28, y + 126, 533, 17)
    return svg("Stack tecnológico utilizado en proyectos", 515, body)


def flow():
    body = rect(0.5, 0.5, 1199, 159, radius=18)
    nodes = [
        (40, "01", "INTERFAZ", "React / TypeScript"),
        (330, "02", "API", "Spring Boot / NestJS"),
        (620, "03", "DOMINIO", "Reglas / servicios"),
        (910, "04", "DATOS", "SQL / ORM / eventos"),
    ]
    for x, number, label, detail in nodes:
        body += text(x, 41, number, 14, DIM, mono=True)
        body += text(x, 79, label, 22, INK, 650)
        body += text(x, 115, detail, 16, MUTED)
        if x != 910:
            body += line(x + 215, 75, x + 267, 75, "#718399")
            body += f'<circle cx="{x + 215}" cy="75" r="3" fill="#fff"><animate attributeName="cx" values="{x + 215};{x + 267}" dur="2.4s" repeatCount="indefinite"/></circle>'
    return svg("Una petición: interfaz, API, dominio y datos", 160, body)


def focus(config):
    body = ""
    for i, card in enumerate(config["focus"]):
        x = i * 405
        body += rect(x + 0.5, 0.5, 389, 249, radius=18)
        body += text(
            x + 24,
            35,
            "ENFOQUE / " + card["number"],
            11,
            MUTED,
            mono=True,
            extra='letter-spacing="2"',
        )
        body += text(x + 24, 85, card["title"], 25, INK, 600)
        for j, value in enumerate(card["lines"]):
            body += text(x + 24, 130 + j * 29, value, 15, MUTED)
        body += line(x + 24, 187, x + 365, 187)
        body += text(x + 24, 221, card["tag"], 10, "#c7d8eb", mono=True)
    return svg("En qué estoy trabajando y aprendiendo", 250, body)


def project(card, data):
    repo = next((r for r in data["repositories"] if r["name"] == card["slug"]), None)
    body = rect(0.5, 0.5, 1199, 339, radius=20)
    body += '<ellipse cx="1060" cy="160" rx="230" ry="210" fill="url(#halo)"/>'
    body += text(
        32, 37, card["eyebrow"], 12, MUTED, mono=True, extra='letter-spacing="2"'
    )
    body += text(32, 96, card["title"], 40, INK, 650)
    for i, value in enumerate(card["summary"]):
        body += text(32, 141 + i * 27, value, 20, MUTED)
    body += pills(card["tags"], 32, 251, 750, 16)
    body += text(32, 298, card["details"], 15, MUTED)
    body += text(
        1165, 313, "VER CÓDIGO ↗", 12, INK, 600, "end", True, 'letter-spacing="2"'
    )
    body += rect(856, 62, 302, 204, "#101722", 15, "#3a4657")
    if card["kind"] == "fulfillment":
        for i, label in enumerate(["PEDIDO", "EVENTO", "ENTREGA"]):
            x = 883 + i * 90
            body += rect(x, 108, 66, 68, "#1c2837", 10, "#65758b")
            body += text(x + 33, 150, str(i + 1).zfill(2), 24, INK, 500, "middle", True)
            body += text(x + 33, 200, label, 9, MUTED, 500, "middle", True)
            if i < 2:
                body += line(x + 68, 142, x + 86, 142, "#edf5ff")
        body += text(
            1007, 239, "3 SERVICIOS / UN MISMO FLUJO", 10, MUTED, 400, "middle", True
        )
    elif card["kind"] == "crm":
        for i, h in enumerate([35, 58, 82, 112, 91]):
            body += rect(
                885 + i * 46,
                212 - h,
                26,
                h,
                "url(#pearl)",
                4,
                "none",
                f'opacity="{0.35 + i * 0.14}"',
            )
        body += text(
            1007, 240, "CLIENTES / VENTAS / DATOS", 10, MUTED, 400, "middle", True
        )
    else:
        body += '<path d="M950 120h112l-10 72h-90z" fill="none" stroke="#e2edf9" stroke-width="3"/>'
        body += '<path d="M982 120v-9a25 25 0 0 1 50 0v9" fill="none" stroke="#8fa2bb" stroke-width="3"/>'
        for x in [986, 1025]:
            body += f'<circle cx="{x}" cy="211" r="5" fill="#e2edf9"/>'
        body += text(
            1007, 240, "REACT / COMPONENTES / UI", 10, MUTED, 400, "middle", True
        )
    if repo:
        body += text(
            1166,
            36,
            f"★ {repo['stars']} · REPOSITORIO PÚBLICO",
            10,
            MUTED,
            anchor="end",
            mono=True,
        )
    return svg(
        card["title"], 340, body, description=" ".join(card["summary"] + card["tags"])
    )


def stats(data):
    values = [
        (
            len(data["repositories"]),
            "REPOSITORIOS PÚBLICOS",
            "Incluye repositorios derivados",
        ),
        (
            data["calendar"]["total"],
            "CONTRIBUCIONES",
            "Calendario de los últimos 12 meses",
        ),
        (
            sum(r["stars"] for r in data["repositories"]),
            "ESTRELLAS RECIBIDAS",
            "Repositorios públicos del perfil",
        ),
        (data["followers"], "SEGUIDORES", "Comunidad en GitHub"),
    ]
    body = ""
    for i, (value, title, note) in enumerate(values):
        x = i * 303
        body += rect(x + 0.5, 0.5, 290, 174, radius=16)
        body += text(
            x + 22, 29, title, 10, MUTED, mono=True, extra='letter-spacing="1"'
        )
        body += text(x + 22, 108, f"{value:,}", 60, INK, 600)
        body += text(x + 22, 147, note, 12, MUTED)
    stamp = data["updatedAt"][:10]
    body += text(
        2,
        207,
        f"DATOS PÚBLICOS DE GITHUB / ACTUALIZADO {stamp}",
        11,
        DIM,
        mono=True,
        extra='letter-spacing="1"',
    )
    return svg("GitHub en cifras · datos públicos", 225, body)


def languages(data):
    pairs = sorted(data["languages"].items(), key=lambda pair: pair[1], reverse=True)
    total = sum(size for _, size in pairs)
    body = rect(0.5, 0.5, 1199, 239, radius=16)
    body += text(
        28,
        40,
        "LENGUAJES EN MIS REPOSITORIOS",
        13,
        INK,
        600,
        mono=True,
        extra='letter-spacing="2"',
    )
    body += text(
        28,
        70,
        "Distribución por bytes de código · excluye forks y este perfil",
        16,
        MUTED,
    )
    if not total:
        return svg(
            "Lenguajes: aún no hay datos disponibles",
            240,
            body + text(28, 137, "Sin datos de lenguajes disponibles.", 20, MUTED),
        )
    shades = ["#f7fbff", "#cbd9ea", "#a2b5ce", "#7d94b2", "#5b7392", "#3f5572"]
    position = 28
    for i, (name, count) in enumerate(pairs):
        width = 1144 * count / total
        body += rect(
            round(position, 2),
            97,
            round(width, 2),
            15,
            shades[min(i, 5)],
            0,
            BG,
            'stroke-width="2"',
        )
        position += width
    shown = pairs[:5]
    if len(pairs) > 5:
        shown.append(("Otros", sum(size for _, size in pairs[5:])))
    for i, (name, count) in enumerate(shown):
        x, y = 28 + (i % 3) * 390, 153 + (i // 3) * 40
        body += f'<circle cx="{x + 5}" cy="{y - 5}" r="5" fill="{shades[i]}"/>'
        body += text(x + 22, y, f"{name}  {count / total:.1%}", 17, "#d7e3f3")
    return svg("Lenguajes en repositorios propios, medidos por bytes", 240, body)


def activity(data):
    rows = data["activity"]
    body = rect(0.5, 0.5, 1199, 84 + len(rows) * 68, radius=18)
    body += text(
        28,
        37,
        "ACTIVIDAD PÚBLICA RECIENTE",
        12,
        MUTED,
        mono=True,
        extra='letter-spacing="2"',
    )
    for i, event in enumerate(rows):
        y = 88 + i * 68
        body += f'<circle cx="32" cy="{y - 7}" r="4" fill="#edf5ff"/>'
        body += text(54, y, event["repository"], 22, INK, 600)
        body += text(650, y, event["label"], 17, MUTED)
        body += text(1168, y, event["date"], 14, MUTED, anchor="end", mono=True)
        if i < len(rows) - 1:
            body += line(54, y + 26, 1168, y + 26, "#252f3e")
    if not rows:
        body += text(
            28, 80, "Sin eventos públicos recientes en estos repositorios.", 20, MUTED
        )
    return svg("Actividad pública reciente de BryanOnKeys", 85 + len(rows) * 68, body)


def contributions(data):
    days = data["calendar"]["days"]
    start = min(date.fromisoformat(day["date"]) for day in days)
    offset = (start.weekday() + 1) % 7
    active = sum(day["count"] > 0 for day in days)
    maximum = max((day["count"] for day in days), default=0)
    body = rect(0.5, 0.5, 1199, 349, radius=18)
    body += text(28, 41, "CADA APORTE DEJA UNA HUELLA.", 26, INK, 600)
    body += text(
        28,
        73,
        "Contribuciones reales del calendario de GitHub, en blanco perlado.",
        17,
        MUTED,
    )
    shades = ["#1c2633", "#53677f", "#829bb9", "#bbd0e9", "#f6faff"]
    step, cell = 20.6, 15.5
    for day in days:
        dt = date.fromisoformat(day["date"])
        position = (dt - start).days + offset
        x, y = 51 + (position // 7) * step, 112 + (position % 7) * step
        level = max(0, min(4, day["level"]))
        body += rect(round(x, 1), round(y, 1), cell, cell, shades[level], 3, "none")
    body += line(28, 277, 1172, 277)
    body += text(
        28,
        313,
        f"{data['calendar']['total']} contribuciones · {active} días activos · máximo diario: {maximum}",
        16,
        MUTED,
    )
    body += text(966, 313, "MENOS", 10, DIM, mono=True)
    for i, color in enumerate(shades):
        body += rect(1015 + i * 22, 301, 15, 15, color, 3, "none")
    body += text(1168, 313, "MÁS", 10, DIM, anchor="end", mono=True)
    return svg("Calendario de contribuciones reales de BryanOnKeys", 350, body)


def connect(title, note, icon):
    body = rect(0.5, 0.5, 589, 139, radius=18)
    body += text(28, 57, title, 30, INK, 600)
    body += text(28, 96, note, 16, MUTED)
    body += text(553, 77, icon, 35, "#deebfa", anchor="end")
    return svg(title, 140, body, 590)


def footer():
    body = rect(0.5, 0.5, 1199, 169, radius=18)
    body += '<ellipse cx="600" cy="80" rx="520" ry="140" fill="url(#halo)"/>'
    body += text(600, 66, "Gracias por pasar por aquí.", 30, INK, 600, "middle")
    body += text(
        600,
        108,
        "BRYAN ON KEYS · CÓDIGO CON INTENCIÓN",
        13,
        MUTED,
        500,
        "middle",
        True,
        'letter-spacing="3"',
    )
    body += text(600, 142, "VOLVER ARRIBA ↑", 11, MUTED, anchor="middle", mono=True)
    return svg("Gracias por visitar mi perfil · volver arriba", 170, body)


SECTIONS = [
    ("01", "about", "Sobre mí", "la persona detrás del código"),
    ("02", "stack", "Stack tecnológico", "herramientas utilizadas en proyectos"),
    ("03", "focus", "Enfoque actual", "construir y seguir aprendiendo"),
    ("04", "projects", "Proyectos destacados", "del problema a una solución"),
    ("05", "stats", "GitHub en cifras", "datos públicos verificables"),
    ("06", "activity", "Actividad reciente", "lo que está ocurriendo en GitHub"),
    ("07", "contributions", "Contribuciones", "cada aporte cuenta"),
    ("08", "connect", "Conectemos", "conversar, compartir y construir"),
]


def assets(config, data, mark_path):
    result = {
        "hero.svg": hero(config),
        "github-mark.svg": github_mark(mark_path),
        "headline.svg": headline(config),
        "about.svg": about(config),
        "about-code.svg": code_card(config),
        "stack.svg": stack(config),
        "flow.svg": flow(),
        "focus.svg": focus(config),
        "stats.svg": stats(data),
        "languages.svg": languages(data),
        "activity.svg": activity(data),
        "contributions.svg": contributions(data),
        "footer.svg": footer(),
        "contact-github.svg": connect(
            "GitHub", "@BryanOnKeys · código, proyectos y actividad", "↗"
        ),
        "contact-projects.svg": connect(
            "Mis repositorios", "Explora el código y la documentación", "⌘"
        ),
        "splitter.svg": svg(
            "Separador decorativo",
            34,
            line(40, 17, 1160, 17, "url(#line)")
            + '<circle class="pulse" cx="600" cy="17" r="2" fill="#f5faff"/>',
        ),
    }
    for number, slug, title, subtitle in SECTIONS:
        result[f"sections/{slug}.svg"] = section(number, title, subtitle)
        short = {
            "stack": "Stack",
            "projects": "Proyectos",
            "stats": "GitHub en cifras",
            "contributions": "Contribuciones",
        }.get(slug, title)
        result[f"nav/{slug}.svg"] = nav(number, short)
    for card in config["projects"]:
        result[f"projects/{card['slug']}.svg"] = project(card, data)
    return result
