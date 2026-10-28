# Perfil de GitHub · Ingeniería verificable

El README de BryanOnKeys prioriza código, decisiones técnicas y proyectos reales frente a ilustraciones. Conserva únicamente la visualización 3D de contribuciones del proyecto [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) de yoshi389111, generado por el workflow independiente `.github/workflows/3d-contributions.yml`.

## Componentes actuales

- `README.md`: presentación, proyectos, arquitectura Mermaid, fragmentos de código y enlaces.
- `profile/data.json`: instantánea de datos públicos de GitHub.
- `scripts/profile/collect.py`: recolector con comprobación de privacidad.
- `scripts/profile/update_snapshot.py`: actualiza solo la instantánea pública con escritura atómica.
- `scripts/profile/render_readme.mjs`: construye el bloque de actividad en Markdown desde los datos públicos.
- `.github/workflows/profile.yml`: valida, actualiza y publica el bloque de actividad diariamente.
- `.github/workflows/3d-contributions.yml`: mantiene las variantes 3D de Yoshi.

Los gráficos `assets/3d`, `assets/cinematic` y `assets/showcase` de los diseños previos ya no se usan en el README ni se regeneran mediante el workflow principal; se mantienen como historial de experimentación. La fecha de los datos aparece en el README. Las cifras son una instantánea y pueden ir por detrás de GitHub.

## Comprobación local

```bash
python3 -m unittest discover -s tests -v
node scripts/profile/render_readme.mjs --check
```

Para regenerar solo el bloque en el README:

```bash
node scripts/profile/render_readme.mjs
```

La actualización de datos requiere consultar la API pública de GitHub y puede utilizar el token efímero `GITHUB_TOKEN` dentro del workflow. La automatización no publica datos privados ni información de repositorios no públicos. Los informes técnicos y las afirmaciones de los proyectos enlazan a su fuente de código. Mermaid se renderiza de forma nativa en GitHub; no requiere imágenes externas.

## Atribución

El generador 3D pertenece a [yoshi389111/github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib). El README enlaza a su repositorio original. El contenido y código de perfil aquí descritos son adaptaciones específicas de BryanOnKeys.
