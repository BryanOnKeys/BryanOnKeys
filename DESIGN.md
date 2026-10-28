# Blanco perlado · Bryan On Keys

Perfil en español con blanco luminoso, plata y un fondo grafito. La composición toma como referencia el [perfil de Abdullah Bakir](https://github.com/AbdullahBakir97): cabecera animada, identificador de GitHub, tarjetas, navegación por secciones, proyectos y actividad. Los componentes SVG y el generador de este repositorio son una implementación propia adaptada a Bryan.

## Editar el contenido

- `README.md`: texto, enlaces y estructura del perfil.
- `profile/config.json`: identidad, stack, frases, enfoque y proyectos seleccionados.
- `scripts/profile/draw.py`: paleta y componentes SVG.
- `profile/data.json`: instantánea de datos públicos de GitHub; se actualiza automáticamente.
- `assets/profile/`: gráficos generados y guardados en el propio repositorio.

Con Python 3.10 o superior, sin paquetes adicionales:

```bash
python3 -m scripts.profile.build
python3 -m scripts.profile.build --check
python3 -m unittest discover -s tests -v
```

Para actualizar también los datos:

```bash
python3 -m scripts.profile.build --refresh
```

El token opcional `GH_TOKEN` mejora los límites de la API y permite leer el calendario mediante GraphQL. El workflow utiliza el `GITHUB_TOKEN` efímero de GitHub Actions. No hace falta crear ni publicar un token personal. La consulta se limita a datos públicos; el colector descarta repositorios privados y eventos ajenos a los repositorios públicos del usuario. Nunca guarda correo, credenciales, nombres de repositorios privados ni cuerpos de peticiones.

## Actualización automática

El workflow `Perfil · Blanco perlado` valida datos y SVG, y actualiza las tarjetas cada día a las 11:35 UTC (06:35 en Lima). También se puede ejecutar manualmente desde Actions. Las propuestas de cambio se validan con permisos de lectura; solo el trabajo de actualización en `main` tiene permiso de escritura para publicar sus archivos generados. El push es normal, sin forzar la rama.

Las fuentes son la API REST de GitHub y su calendario de contribuciones. Si GraphQL no está disponible, se consulta el calendario público de GitHub y se verifican sus cantidades y tooltips. Un cambio de formato o un fallo de red hace fallar la actualización y conserva la instantánea anterior. La fecha de la tarjeta indica cuándo se consultaron los datos. GitHub puede tardar en renovar su caché de imágenes.

Los repositorios y estrellas incluyen los forks públicos. La distribución de lenguajes suma bytes de código de repositorios no derivados y excluye este perfil. No es una medición del nivel técnico. Las contribuciones representan el calendario que publica GitHub, no equivalen exclusivamente a commits. La cabecera de píxeles es decorativa y no representa actividad.

## Compatibilidad

Los SVG usan vectores, gradientes y animaciones sin JavaScript ni fuentes externas. Las tarjetas permanecen legibles como imágenes estáticas. Las animaciones CSS respetan `prefers-reduced-motion`; los barridos SVG son decorativos y no contienen información necesaria. La paleta de las tarjetas se conserva con los temas claro y oscuro de GitHub; el marco y la barra lateral de GitHub utilizan el tema elegido por cada visitante. El README incluye texto alternativo y descripciones en texto de los proyectos.

El workflow de Pac-Man y su rama `output` se mantienen. Su visualización está en una sección desplegable del perfil.

El icono GitHub procede de Primer Octicons; su licencia y atribución están en [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

## Diseño ampliado en octubre de 2026

La presentación se organiza en doce apartados, siguiendo el orden visual del perfil de referencia, pero con ilustraciones SVG originales en `assets/showcase/`. Se conserva el generador propio de métricas y tarjetas de `assets/profile/` junto con su workflow de actualización diaria. Las secciones de evolución anual y relieve 3D son instantáneas de datos públicos verificables indicadas con su fecha de corte; las demás métricas dinámicas siguen el flujo existente. Las tarjetas de enlaces llevan exclusivamente a proyectos, perfiles y archivos reales de BryanOnKeys. El libro de visitas utiliza el sistema nativo de GitHub Issues.

Los SVG no incluyen JavaScript, servicios de rastreo ni imágenes de terceros. La composición se inspira en AbdullahBakir97, sin reutilizar sus archivos artísticos ni atribuir a Bryan su trabajo.
