/** Original 3D isometric SVG renderer for BryanOnKeys. No external dependencies.
  * Usage: node scripts/profile/volumetric.mjs [--check]
  * Data: public snapshot in profile/data.json; no simulated contribution counts.
  */
import fs from "node:fs";
import path from "node:path";
const createVolumetric = function createVolumetric(config,data) {
  const A={}, pal={bg:"#080c16",navy:"#11172b",cyan:"#00e5ff",blue:"#518cff",violet:"#a36aff",pink:"#ff52bd",white:"#eef8ff",mute:"#9baac6",muted:"#64758d",green:"#54f2b4",amber:"#ffb75e"};
  const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const rect=(x,y,w,h,fill=pal.navy,rx=12,stroke="#263452",extra="")=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
  const text=(x,y,s,size=20,color=pal.white,weight=500,extra="")=>`<text x="${x}" y="${y}" font-family="Segoe UI,Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${esc(s)}</text>`;
  const code=(x,y,s,size=14,color=pal.cyan,extra="")=>`<text x="${x}" y="${y}" font-family="Consolas,Menlo,monospace" font-size="${size}" letter-spacing="1.3" fill="${color}" ${extra}>${esc(s)}</text>`;
  const path=(pts,fill,stroke="none",width=1,extra="")=>`<polygon points="${pts.map(v=>v.map(q=>Number(q).toFixed(1)).join(",")).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round" ${extra}/>`;
  const pt=(x,y,z,ox,oy,s=1)=>[ox+(x-y)*.866*s,oy+(x+y)*.5*s-z*s];
  const cube=(x,y,z,w,d,h,ox,oy,s=1,colors=[pal.cyan,"#174c72","#123052"],extra="")=>{
    const P=(xx,yy,zz)=>pt(xx,yy,zz,ox,oy,s);
    const lowA=P(x,y,z),lowB=P(x+w,y,z),lowC=P(x+w,y+d,z),lowD=P(x,y+d,z);
    const hiA=P(x,y,z+h),hiB=P(x+w,y,z+h),hiC=P(x+w,y+d,z+h),hiD=P(x,y+d,z+h);
    return `<g ${extra}>${path([lowD,lowC,hiC,hiD],colors[1])}${path([lowB,lowC,hiC,hiB],colors[2])}${path([hiA,hiB,hiC,hiD],colors[0],"#668ab8",.6)}</g>`;
  };
  const light=(x,y,r=4,col=pal.cyan)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" filter="url(#glow)"/>`;
  const defs=`<defs><linearGradient id="base" x2="1" y2="1"><stop stop-color="#101731"/><stop offset=".56" stop-color="#0a1020"/><stop offset="1" stop-color="#060a13"/></linearGradient><linearGradient id="ice" x2="1" y2="1"><stop stop-color="#00e5ff"/><stop offset=".52" stop-color="#6c81ff"/><stop offset="1" stop-color="#db65fa"/></linearGradient><linearGradient id="edge"><stop stop-color="#00e5ff" stop-opacity=".05"/><stop offset=".45" stop-color="#00e5ff" stop-opacity=".75"/><stop offset="1" stop-color="#a36aff" stop-opacity=".05"/></linearGradient><radialGradient id="halo"><stop stop-color="#396fff" stop-opacity=".24"/><stop offset="1" stop-color="#396fff" stop-opacity="0"/></radialGradient><filter id="glow" x="-65%" y="-65%" width="230%" height="230%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M 42 0 L 0 0 0 42" stroke="#1b294c" fill="none" stroke-width="1" opacity=".38"/></pattern></defs><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.34}}@keyframes orbital{to{transform:rotate(360deg)}}.float{animation:float 6s ease-in-out infinite}.pulse{animation:pulse 4s ease-in-out infinite}.orbit{animation:orbital 38s linear infinite;transform-origin:920px 220px}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>`;
  const svg=(height,body,title)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${defs}<rect width="1200" height="${height}" rx="18" fill="url(#base)"/><rect x="0" y="0" width="1200" height="${height}" rx="18" fill="url(#grid)"/>${body}</svg>\n`;
  const title=(eyebrow,headline,sub)=>code(32,37,eyebrow,13,pal.cyan)+text(32,84,headline,34,pal.white,780)+text(32,115,sub,15,pal.mute,400)+`<rect x="32" y="132" width="1136" height="2" fill="url(#edge)"/>`;
  const badge=(x,y,msg,color=pal.cyan)=>rect(x,y,Math.max(96,msg.length*8+30),28,"#101b31",9,color)+text(x+13,y+19,msg,13,color,600);
  const days=data.calendar?.days||[],total=data.calendar?.total||0,active=days.filter(x=>x.count>0).length,repo=data.repositories||[];
  const stars=repo.reduce((a,b)=>a+(b.stars||0),0),followers=data.followers||0;
  const hi=[pal.cyan,"#517cf7",pal.violet],sides=["#16687e","#202f73","#562a78"],faces=["#103448","#12244a","#2c194b"];
  // Hero: title area + suspended server complex built from true isometric faces.
  let hero=`<ellipse cx="932" cy="238" rx="260" ry="195" fill="url(#halo)"/>`;
  for(let i=0;i<14;i++){const x=720+(i%7)*64,y=81+Math.floor(i/7)*285;hero+=light(x,y,1.9,i%2?pal.violet:pal.cyan)}
  hero+=code(47,57,"// BRYANONKEYS · SYSTEM ONLINE",16)+text(45,147,"BRYAN",75,pal.white,850)+text(45,231,"ON KEYS",75,"url(#ice)",850)
  +text(50,275,"BACKEND / SOFTWARE ENGINEERING",19,pal.cyan,720)
  +text(50,316,"Java · Spring Boot · TypeScript · NestJS",19,pal.mute,470)
  +badge(51,352,"APIs & ARCHITECTURE",pal.cyan)+badge(266,352,"OPEN SOURCE",pal.violet);
  // Isometric neon-technology skyline.
  hero+=cube(-180,-150,0,380,340,18,950,358,.81,["#243558","#162943","#0d1c35"]);
  const blocks=[[0,0,22,90,100,165,0],[1,92,30,80,75,113,1],[2,5,140,86,66,97,2],[3,165,135,90,85,173,1],[4,175,-15,75,76,107,2],[5,95,125,55,56,236,0]];
  for(const [idx,x,y,w,d,h,c] of blocks){hero+=cube(x-130,y-95,18,w,d,h,934,348,.92,[hi[c],sides[c],faces[c]]);hero+=light(920+(idx%3)*51,260+Math.floor(idx/3)*40,2,hi[c])}
  hero+=code(51,427,`PUBLIC REPOS ${repo.length}   /   CONTRIBUTIONS ${total}   /   FOLLOWERS ${followers}`,13,pal.mute);
  A["assets/3d/hero.svg"]=svg(465,hero,"Cabecera 3D isométrica con nombre de BryanOnKeys y edificios tecnológicos");
  // About with an isometric workstation and literal summary.
  let about=title("01 / PROFILE", "El desarrollador detrás de la arquitectura","Backend, integraciones, datos y aplicaciones web.");
  about+=rect(30,158,530,360,"#0c1628",16,"#263d5d")
  +code(55,202,"public class BryanOnKeys {",15,pal.green)
  +text(56,252,"Construyo servicios con",27,pal.white,740)
  +text(56,289,"reglas de negocio claras.",27,pal.white,740)
  +text(56,344,"Java · Spring Boot · NestJS",18,pal.cyan,650)
  +text(56,378,"React · TypeScript · SQL",18,pal.violet,650)
  +text(56,438,"Lima, Perú   /   Open to collaborate",15,pal.mute,450)
  +code(55,488,"}",20,pal.green);
  about+=`<ellipse cx="885" cy="353" rx="266" ry="160" fill="url(#halo)"/>`
  +cube(-155,-120,0,335,255,22,907,434,.79,["#243856","#13284b","#111d3a"])
  +cube(-65,-65,22,192,145,48,902,397,.92,[pal.violet,"#562b81","#281846"])
  +cube(-42,-46,70,165,12,104,897,361,.84,[pal.cyan,"#145982","#12314d"])
  +cube(-24,-24,72,117,6,77,909,326,.84,["#233c6b","#17254a","#101d3d"])
  +cube(-22,55,23,145,55,9,908,434,.92,["#5f7aff","#24376d","#152449"]);
  for(let i=0;i<11;i++)about+=light(788+i*20,420-i%3*4,2,i%2?pal.cyan:pal.violet);
  about+=text(886,498,"3D / ENGINEERING DESK",12,pal.mute,450,'text-anchor="middle"');
  A["assets/3d/about.svg"]=svg(545,about,"Sobre mí: estación tridimensional de desarrollo y especialización");
  // A group of floating modular chips for each part of the tech stack.
  let stack=title("02 / TECH ECOSYSTEM","Arquitectura por capas","Cuatro subsistemas visualizados como módulos 3D.");
  const stackGroups=[
    {x:322,y:315,col:0,label:"BACKEND",tools:["Java","Spring Boot","NestJS","REST API"]},
    {x:887,y:315,col:2,label:"FRONTEND",tools:["React","TypeScript","JavaScript","Vite"]},
    {x:322,y:653,col:1,label:"DATA",tools:["PostgreSQL","MySQL","SQL Server","MikroORM"]},
    {x:887,y:653,col:0,label:"DELIVERY",tools:["Docker","GitHub Actions","AWS","Git"]}
  ];
  for(const g of stackGroups){const c=g.col;
    stack+=`<ellipse cx="${g.x}" cy="${g.y+28}" rx="205" ry="106" fill="url(#halo)"/>`;
    stack+=cube(-124,-90,0,245,185,21,g.x,g.y,.79,["#243558","#162b4b","#101e36"]);
    stack+=cube(-88,-70,23,170,140,35,g.x,g.y-9,.79,[hi[c],sides[c],faces[c]]);
    stack+=cube(-35,-40,63,92,70,79,g.x,g.y-25,.79,[hi[c],sides[c],faces[c]]);
    stack+=code(g.x,g.y-146,g.label,18,hi[c],'text-anchor="middle"');
    g.tools.forEach((s,i)=>stack+=badge(g.x-223+(i%2)*223,g.y+72+Math.floor(i/2)*42,s,hi[c]));
  }
  stack+=`<path d="M470 295Q600 220 738 295 M470 630Q600 563 738 630 M318 398Q234 475 318 541 M887 398Q983 475 887 541" fill="none" stroke="#00d6fa" stroke-width="2" stroke-dasharray="7 9" opacity=".68"/>`;
  stack+=text(600,477,"API  •  EVENTS  •  DATA",19,pal.white,740,'text-anchor="middle"')+`<circle class="pulse" cx="600" cy="477" r="76" fill="none" stroke="${pal.violet}" stroke-width="1" opacity=".5"/>`;
  A["assets/3d/stack.svg"]=svg(848,stack,"Módulos tridimensionales para backend, frontend, datos y entrega");
  // Technology orbit: ellipses and orbital depth illusion; text grounded in language byte ratios.
  let orbit=title("03 / TECHNOLOGY ORBIT","Tecnologías en órbita","Vista orbital decorativa; los porcentajes proceden del código público.");
  orbit+=`<ellipse cx="480" cy="359" rx="298" ry="112" fill="none" stroke="#3663aa" stroke-width="3" transform="rotate(-23 480 359)"/><ellipse cx="480" cy="359" rx="255" ry="150" fill="none" stroke="#6655bd" stroke-width="2" transform="rotate(20 480 359)"/>`
  +`<ellipse cx="480" cy="359" rx="148" ry="148" fill="url(#halo)"/><circle cx="480" cy="359" r="97" fill="#162a51" stroke="${pal.cyan}" stroke-width="4"/>`;
  orbit+=text(480,348,"DEV",47,pal.white,850,'text-anchor="middle"')+text(480,378,"STACK",26,pal.cyan,740,'text-anchor="middle"');
  [["Java",206,248,pal.green],["Spring Boot",692,233,pal.cyan],["NestJS",230,463,pal.violet],["React",699,451,pal.pink],["PostgreSQL",480,200,pal.amber],["Docker",480,534,pal.blue]].forEach(([word,x,y,c])=>{orbit+=cube(0,0,0,40,40,24,x,y,.6,[c,"#25425a","#192f45"])+text(x,y+47,word,15,pal.white,650,'text-anchor="middle"')});
  const language=Object.entries(data.languages||{}).sort((a,b)=>b[1]-a[1]).slice(0,6),sum=Object.values(data.languages||{}).reduce((s,v)=>s+v,0)||1;
  orbit+=rect(807,182,352,339,"#101b2d",16,"#34446c")+code(834,222,"// LANGUAGES IN REPOS",14,pal.green);
  language.forEach(([name,count],i)=>{let y=265+i*42,pct=count*100/sum,bar=Math.max(5,pct*2.15);orbit+=text(831,y,name,16,pal.white,600)+text(1135,y,`${pct.toFixed(1)}%`,15,pal.mute,500,'text-anchor="end"')+rect(831,y+9,304,5,"#253654",2,"none")+rect(831,y+9,bar,5,[pal.cyan,pal.violet,pal.pink,pal.amber,pal.green,pal.blue][i],2,"none")});
  A["assets/3d/orbit.svg"]=svg(568,orbit,"Sistema orbital tridimensional con tecnologías y porcentajes reales de lenguajes");
  // Distinct 3D model on each featured project.
  const projectModels=[
    {id:"nexo-fulfillment",tag:"FULFILLMENT PLATFORM",title:"NEXO Fulfillment",tech:"NestJS · TypeScript · PostgreSQL · Docker",desc:"Pedidos, inventario, eventos y microservicios.",col:0},
    {id:"borough-ledger-crm",tag:"BUSINESS SOFTWARE",title:"Borough & Ledger CRM",tech:"Java · Spring Boot · React · MySQL",desc:"CRM empresarial y operaciones comerciales.",col:1},
    {id:"web-petshop",tag:"WEB EXPERIENCE",title:"Patitas Felices",tech:"React · JavaScript · Vite · Tailwind",desc:"Interfaz para un comercio de productos.",col:2}
  ];
  for(const [i,p] of projectModels.entries()){
    const c=p.col;let card=`<ellipse cx="937" cy="202" rx="240" ry="170" fill="url(#halo)"/>`
      +code(45,47,`${String(i+1).padStart(2,"0")} / ${p.tag}`,14,hi[c])
      +text(46,111,p.title,38,pal.white,800)
      +text(46,161,p.desc,20,pal.mute,450)
      +text(46,203,p.tech,18,hi[c],650)
      +badge(47,254,"ABRIR REPOSITORIO ↗",hi[c])
      +cube(-160,-110,0,330,250,19,945,314,.8,["#213557","#172846","#111e35"]);
    if(i===0){card+=cube(-90,-90,20,145,115,91,929,294,.95,[hi[c],sides[c],faces[c]])+cube(50,0,20,73,65,46,933,308,.95,["#547ea1","#245678","#1c3a65"])+cube(-15,34,110,55,44,34,920,285,.95,[pal.green,"#1a6b5b","#133a40"]);for(let n=0;n<4;n++)card+=light(915+n*37,291+n*5,3,pal.green)}
    if(i===1){card+=cube(-104,-90,20,180,100,116,943,300,.94,[hi[c],sides[c],faces[c]])+cube(15,1,20,116,77,63,918,312,.94,[pal.cyan,"#175b85","#173b62"])+cube(-18,-2,145,69,54,24,930,285,.94,[pal.amber,"#ad6540","#55335a"])}
    if(i===2){card+=cube(-104,-90,20,204,147,84,940,308,.95,[hi[c],sides[c],faces[c]])+cube(-92,-90,104,181,29,32,940,308,.95,[pal.amber,"#9b4758","#532951"])+cube(8,-40,104,57,50,48,940,300,.95,[pal.pink,"#86386e","#4a2256"]);for(let k=0;k<4;k++)card+=light(878+k*37,285,3,pal.cyan)}
    A[`assets/3d/project-${p.id}.svg`]=svg(350,card,`Proyecto ${p.title} con maqueta isométrica tridimensional`);
  }
  // isometric city contributions, actual verified days without invented data; a few active days.
  let city=title("07 / VERIFIED CONTRIBUTIONS","Ciudad de contribuciones","Cada edificio corresponde a un día con actividad pública registrada.");
  city+=`<ellipse cx="640" cy="383" rx="510" ry="242" fill="url(#halo)"/>`;
  const n=days.length;const usable=days.slice(Math.max(0,n-371));const end=usable.length;
  const bound=53;
  // Draw back-to-front 7x53 board.
  city+=cube(0,0,0,53,7,0.35,581,354,11.65,["#223456","#16273f","#111f36"]);
  for(let j=0;j<7;j++)for(let i=0;i<53;i++){
    const datum=usable[i*7+j];if(!datum)continue;
    const v=datum.count||0,low=v===0;
    const topColor=low?"#1e2942":(v>10?pal.pink:v>5?pal.violet:v>2?pal.cyan:pal.green);
    const height=low?0.12:Math.min(17,2.1+Math.sqrt(v)*3.2);
    city+=cube(i+.08,j+.08,.55,.83,.83,height,581,354,11.65,[topColor,low?"#172037":"#196886",low?"#11192c":"#1a3b69"]);
  }
  city+=rect(48,584,1101,83,"#0d1930",12,"#2a416b")
  +text(77,617,`${total}`,26,pal.cyan,800)+text(146,616,"CONTRIBUCIONES",15,pal.mute,550)
  +text(461,617,`${active}`,26,pal.violet,800)+text(508,616,"DÍAS ACTIVOS",15,pal.mute,550)
  +text(768,618,`Datos: ${days.at(-1)?.date||"sin fecha"}`,15,pal.mute,500)
  +text(77,645,"El resto de las casillas corresponde a días sin contribuciones registradas.",13,pal.mute,400);
  A["assets/3d/contribution-city.svg"]=svg(693,city,"Ciudad isométrica de contribuciones reales, sin datos artificiales");
  // Open Source 3d gates and cubes.
  let oss=title("06 / OPEN SOURCE","Contribuir fuera de mis proyectos","Issues, revisiones y propuestas de cambios en repositorios públicos.");
  const forks=[["duo",pal.green,0],["pqc-migration-readiness",pal.violet,1],["deadcode-hunter",pal.cyan,2]];
  forks.forEach(([name,c,i])=>{
    const ox=220+i*385,oy=330;
    oss+=cube(-92,-72,0,192,162,13,ox,oy,.8,["#263558","#172b4a","#121e38"])
     +cube(-43,-43,16,95,93,58,ox,oy,.9,[c,"#285b7f","#193859"])
     +light(ox,oy-150,4,c)+text(ox,oy+115,name,18,pal.white,700,'text-anchor="middle"');
  });
  oss+=`<path d="M349 280Q415 198 515 280 M736 280Q801 198 908 280" stroke="${pal.blue}" stroke-dasharray="9 8" stroke-width="3" fill="none"/>`;
  A["assets/3d/open-source.svg"]=svg(488,oss,"Tres portales tridimensionales para contribuciones open source");
  // Dimensional metric meters.
  let stats=title("05 / GITHUB DATA","Señales reales de actividad","Indicadores de tu cuenta pública, generados a partir de GitHub.");
  const vals=[["CONTRIBUCIONES",total,pal.cyan],["REPOSITORIOS",repo.length,pal.violet],["FOLLOWERS",followers,pal.green],["STARS",stars,pal.amber]];
  vals.forEach(([label,value,col],i)=>{
    const x=80+i*282;stats+=cube(0,0,0,155,145,13,x+110,397,.7,["#223558","#142744","#102038"])
      +cube(0,0,13,105,100,Math.max(17,Math.min(134,20+Math.log2(value+1)*21)),x+130,380,.7,[col,"#25567c","#183456"])
      +text(x+78,267,String(value),48,col,820,'text-anchor="middle"')+text(x+80,302,label,15,pal.white,650,'text-anchor="middle"');
  });
  stats+=text(49,543,`Fuente: información pública · actualización ${data.updatedAt?.slice(0,10)||"no disponible"}`,15,pal.mute,400);
  A["assets/3d/stats.svg"]=svg(568,stats,"Métricas de GitHub representadas como prismas tridimensionales con valores reales");
  let footer=`<ellipse cx="600" cy="104" rx="400" ry="110" fill="url(#halo)"/>`
    +`<ellipse cx="600" cy="108" rx="400" ry="74" fill="none" stroke="${pal.cyan}" stroke-width="1" opacity=".6"/>`
    +`<ellipse cx="600" cy="108" rx="307" ry="48" fill="none" stroke="${pal.violet}" stroke-width="1" opacity=".6"/>`
    +text(600,102,"BUILD  •  TEST  •  IMPROVE",31,pal.white,820,'text-anchor="middle"')
    +code(600,149,"BRYANONKEYS  /  SOFTWARE ENGINEERING",13,pal.cyan,'text-anchor="middle"');
  A["assets/3d/footer.svg"]=svg(207,footer,"Portal de cierre tridimensional de BryanOnKeys");
  return A;
};
const config=JSON.parse(fs.readFileSync("profile/config.json","utf8"));
const data=JSON.parse(fs.readFileSync("profile/data.json","utf8"));
if(data.login!==config.login)throw new Error("Mismatched public GitHub account");
const files=createVolumetric(config,data);
let invalid=[];
for(const [file,s] of Object.entries(files)){
 if(process.argv.includes("--check")){if(!fs.existsSync(file)||fs.readFileSync(file,"utf8")!==s)invalid.push(file);}
 else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,s,"utf8");}
}
if(invalid.length){console.error("3D assets outdated: "+invalid.join(", "));process.exit(1);}
console.log("Generated or verified "+Object.keys(files).length+" original 3D SVGs");
