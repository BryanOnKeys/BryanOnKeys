// Source-generated original vector artwork for BryanOnKeys.
// Run: node scripts/profile/cinematic.mjs [--check]
import fs from "node:fs";
import path from "node:path";
const buildCinematic = function buildCinematic(cfg,d){
 const a={}, C={bg:"#0d1117",pane:"#121820",card:"#0e141c",ink:"#f1f5fa",mute:"#9aa7b7",dim:"#6e7e91",red:"#f90001",orange:"#ff652f",green:"#39d353",blue:"#58a6ff",violet:"#bd7af2",gold:"#f0c34e",cyan:"#2bd8e4"};
 const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
 const t=(x,y,s,size=20,color=C.ink,weight=400,other="")=>`<text x="${x}" y="${y}" font-family="Segoe UI,Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" ${other}>${esc(s)}</text>`;
 const mono=(x,y,s,size=12,color=C.green,other="")=>t(x,y,s,size,color,600,`font-family="Consolas,monospace" letter-spacing="1.7" ${other}`);
 const r=(x,y,w,h,fill=C.card,rx=13,stroke="#2c3540",more="")=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" ${more}/>`;
 const line=(x1,y1,x2,y2,color="#323b49",width=1,more="")=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none" ${more}/>`;
 const dot=(x,y,color=C.green,size=3)=>`<circle cx="${x}" cy="${y}" r="${size}" fill="${color}"/>`;
 const defs=`<defs><linearGradient id="bg" x1="0" x2="1" y2="1"><stop stop-color="#15202a"/><stop offset=".7" stop-color="#0d1117"/><stop offset="1" stop-color="#0c1017"/></linearGradient><linearGradient id="line"><stop stop-color="#f90001"/><stop offset=".5" stop-color="#f90001" stop-opacity=".5"/><stop offset="1" stop-color="#f90001" stop-opacity="0"/></linearGradient><radialGradient id="halo"><stop stop-color="#f90001" stop-opacity=".34"/><stop offset="1" stop-color="#f90001" stop-opacity="0"/></radialGradient><filter id="glow" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><style>@keyframes beam{0%{opacity:.25;transform:translateX(0)}50%{opacity:1;transform:translateX(50px)}100%{opacity:.25;transform:translateX(0)}}@keyframes pulse{50%{opacity:.38}}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes scan{100%{transform:translateX(1030px)}}.pulse{animation:pulse 4.6s ease-in-out infinite}.spin{animation:spin 25s linear infinite;transform-origin:100px 100px}.scan{animation:scan 12s linear infinite}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>`;
 const svg=(w,h,body,title,back=true)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${defs}${back?`<rect width="${w}" height="${h}" rx="14" fill="url(#bg)"/>`:""}${body}</svg>\n`;
 const pill=(x,y,s,color=C.blue,ww)=>{const w=ww||Math.max(66,Math.min(200,s.length*8+24));return r(x,y,w,27,"#18212b",14,"#34404f")+dot(x+12,y+13,color,2.7)+t(x+22,y+18,s,12,C.ink,500)};
 const heading=(code,title,caption)=>mono(28,40,`// ${code} · BRYANONKEYS`,15,C.green)+t(28,93,title,42,C.ink,800)+t(1170,87,caption,16,C.mute,400,`text-anchor="end" font-style="italic"`)+line(28,113,1170,113,C.red,2)+r(28,111,48,5,C.red,2,C.red);
 const styleH=(no,id,title,sub)=>{const body=mono(0,21,`// ${no} · ${id.toUpperCase().replace(/-/g," ")}`,13,C.green)+t(0,67,title,35,C.ink,800)+t(1200,65,sub,14,C.dim,400,'text-anchor="end" font-style="italic"')+line(0,87,1200,87,C.red,1.4)+r(0,85,52,4,C.red,2,C.red);a[`assets/cinematic/sections/${id}.svg`]=svg(1200,97,body,`${no} ${title}`,false);a[`assets/cinematic/toc/${id}.svg`]=svg(275,70,r(1,1,273,68,C.card,11,"#2c3541")+t(15,42,no,22,C.blue,700)+t(61,41,title,16,C.ink,650)+t(257,42,"›",22,C.red,650,"text-anchor='end'"),`Índice: ${title}`,false)};
 const sections=[
 ["01","about","About Me","the developer behind the code"],
 ["02","skills","Tech Stack","where each technology fits"],
 ["03","focus","Current Focus","what I am building"],
 ["04","highlights","Yearly Highlights","verified development history"],
 ["05","stats","GitHub Stats","public GitHub data"],
 ["06","activity","Recent Activity","public events and contributions"],
 ["07","releases","Latest Releases","published versions, if available"],
 ["08","projects","Featured Projects","selected, verifiable work"],
 ["09","quality","Engineering Quality","tests, architecture and CI"],
 ["10","contributions","Contribution Graph","actual calendar, visualized"],
 ["11","connect","Connect With Me","projects and professional profile"],
 ["12","guestbook","Guestbook","public messages via GitHub Issues"]
 ];
 for(const x of sections)styleH(...x);
 a["assets/cinematic/sections/index.svg"]=svg(1200,97,mono(0,21,"// 12 · NAVIGATION",13,C.green)+t(0,67,"Explore the profile",35,C.ink,800)+t(1200,65,"jump to a section",14,C.dim,400,'text-anchor="end" font-style="italic"')+line(0,87,1200,87,C.red,1.4), "Índice",false);
 a["assets/cinematic/splitter.svg"]=svg(1200,22,line(90,11,1110,11,"#323b45")+dot(593,11,"#333c4a",3)+dot(600,11,C.red,4)+dot(607,11,"#333c4a",3),"Separador",false);
 // Original contribution-and-circuit artwork; never claim the decorative pixel lettering is authored by GitHub activity.
 let mural=mono(42,44,"// ORIGINAL DIGITAL MOSAIC · BRYANONKEYS",14,C.green)+t(42,89,"Writing software, one contribution at a time.",30,C.ink,800)
 +t(42,121,"The highlighted dates use real GitHub data; the surrounding artwork is decorative.",15,C.mute,400);
 const total=d.calendar.total||0, active=(d.calendar.days||[]).filter(q=>q.count>0).length;
 [[860,`${total}`,"CONTRIBUTIONS"],[1015,`${active}`,"ACTIVE DAYS"]].forEach(([x,val,lab])=>{mural+=r(x,30,140,82,"#111923",9,"#293647")+mono(x+11,53,lab,9,C.blue)+t(x+11,91,val,33,C.ink,800)});
 const cells=d.calendar.days||[];const end=cells.length;
 // City skyline made of an original constellation of geometric, nonliteral shapes.
 for(let col=0;col<107;col++){for(let row=0;row<25;row++){
  const x=42+col*10.4,y=161+row*11.8;
  const arc=((x-598)/430)**2+((y-308)/140)**2;
  const inner= Math.sin(col*.37)+Math.cos(row*.61);
  let fill=arc<1.05&&inner>-.15?"#5b2b82":row>14&&Math.sin(col*.19+row*.26)>0.67?"#1d2840":"#18212b";
  if(col>93 && row<9)fill="#222b38";
  mural+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="7.4" height="7.4" rx="1.4" fill="${fill}" opacity="${arc<1.02?".85":".55"}"/>`;
 }}
 // Independent abstract branching arms and circuitry, not adapted from the reference artwork.
 for(let arm=0;arm<8;arm++){
  const angle=Math.PI*2*arm/8,x0=600+145*Math.cos(angle),y0=294+80*Math.sin(angle);
  const xe=600+(390+arm%3*12)*Math.cos(angle), ye=294+126*Math.sin(angle);
  mural+=`<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} Q${(xe+x0)/2} ${(ye+y0)/2-((arm%2)?20:-20)} ${xe.toFixed(1)} ${ye.toFixed(1)}" fill="none" stroke="${arm%2?C.violet:C.blue}" stroke-width="5" stroke-dasharray="12 5" opacity=".7"/>`;
 }
 const glyphs={B:["11110","10001","10001","11110","10001","10001","11110"],R:["11110","10001","10001","11110","10100","10010","10001"],Y:["10001","10001","01010","00100","00100","00100","00100"],A:["01110","10001","10001","11111","10001","10001","10001"],N:["10001","11001","10101","10101","10011","10011","10001"]};
 let letters="";[..."BRYAN"].forEach((c,i)=>glyphs[c].forEach((row,j)=>[...row].forEach((v,k)=>{if(v==="1")letters+=r(397+i*86+k*14,225+j*14,12,12,i%2?C.orange:C.red,2,"none");})));
 mural+=`<g filter="url(#glow)">${letters}</g>`;
 mural+=t(600,374,"ON KEYS",27,"#e6eef9",700,'text-anchor="middle" letter-spacing="11"');
 mural+=line(42,488,1156,488,"#374251");
 const lastdays=cells.slice(-40);lastdays.forEach((q,i)=>{const shade=q.count?C.orange:"#202b37";mural+=r(42+i*13.2,510,8,8,shade,1,"none")});
 mural+=mono(42,550,`RECENT CALENDAR  ·  ${cells.at(-1)?.date||"N/A"}  ·  GENERATED FROM REAL PUBLIC DATA`,11,C.mute);
 mural+=mono(1158,550,"PIXEL ART IS DECORATIVE",10,C.dim,'text-anchor="end"');
 a["assets/cinematic/commit-mural.svg"]=svg(1200,570,mural,"BRYAN ON KEYS en un mosaico original con contribuciones reales");
 // Animated logo, no use of copied portrait.
 let logo=`<circle cx="100" cy="100" r="92" fill="url(#halo)"/>`;
 for (let i=0;i<4;i++)logo+=`<circle class="${i%2?"pulse":"spin"}" cx="100" cy="100" r="${89-i*9}" fill="none" stroke="${[C.red,C.orange,C.violet,C.blue][i]}" stroke-width="${i===0?4:2}" stroke-dasharray="${i%2?"none":"32 9"}" opacity=".8"/>`;
 logo+=`<circle cx="100" cy="100" r="61" fill="#ff9b69"/><circle cx="100" cy="100" r="48" fill="${C.bg}"/>`+t(100,117,"BK",49,C.ink,800,'text-anchor="middle"')+dot(147,147,C.green,6);
 a["assets/cinematic/github-logo.svg"]=svg(200,200,logo,"Identificador animado BK con halo multicolor",false);
 // Profile hero, reference's large split card recreated with own content and monogram.
 let about=r(0,0,335,482,"#10151e",18,"#2f3845")+r(5,5,325,6,C.red,2,C.red);
 about+=`<circle cx="166" cy="130" r="91" fill="url(#halo)"/><circle cx="166" cy="130" r="78" fill="none" stroke="${C.red}" stroke-width="5"/>`;
 about+=t(166,155,"BK",80,C.ink,800,'text-anchor="middle"')+t(167,273,"BryanOnKeys",31,C.ink,750,'text-anchor="middle"')+t(167,308,"Software Developer",18,C.mute,400,'text-anchor="middle"')+t(167,337,"Java · Spring Boot · TypeScript",14,C.blue,500,'text-anchor="middle"');
 about+=line(38,361,296,361)+t(166,391,"Lima, Perú",18,C.ink,500,'text-anchor="middle"')+r(36,410,259,42,"#0f2921",22,"#256044")+dot(61,431,C.green,4)+t(83,437,"Disponible para colaborar",15,C.green,600);
 about+=r(348,0,852,200,"#151b22",16,"#303846")+r(348,0,852,5,C.orange,1,C.orange)
 +mono(376,36,"// HOLA, SOY BRYAN",14,C.orange)
 +t(376,87,"Construyo APIs, servicios y",35,C.ink,800)+t(376,131,"aplicaciones conectadas.",35,C.ink,800)
 +t(376,173,"Backend · arquitectura · bases de datos · frontend",17,C.mute);
 const own=d.repositories.filter(z=>!z.fork&&z.name!==cfg.login).length;
 [["AÑOS EN GITHUB",`${Math.max(1,2026-Number(d.joinedAt.slice(0,4))) }+`,C.orange],["REPOS PÚBLICOS",String(d.repositories.length),C.blue],["PROYECTOS PROPIOS",String(own),C.gold],["CONTRIBUCIONES",String(total),C.green]].forEach(([label,val,col],i)=>{
 let x=348+i*214;about+=r(x,213,206,119,C.card,12,"#283342")+r(x+1,214,204,3,col,1,col)+mono(x+14,242,label,10,C.mute)+t(x+14,288,val,36,col,800)});
 about+=r(348,344,852,138,"#101e1b",13,"#22553a")+mono(376,373,"● NOW BUILDING  ·  MY RECENT WORK",12,C.green)
 +t(376,410,"NEXO Fulfillment · microservices and event-driven workflows",20,C.ink,600)
 +t(376,445,"CRM · Java / Spring Boot    |    Web apps · React / TypeScript",17,C.mute,400);
 a["assets/cinematic/about-hero.svg"]=svg(1200,484,about,"Presentación de BryanOnKeys con tarjetas y proyectos reales");
 let code=r(0,0,1200,458,"#0d1520",13,"#2d3948")+r(0,0,1200,40,"#18212b",10,"none")
 +dot(21,21,C.red,5)+dot(42,21,C.gold,5)+dot(63,21,C.green,5)+r(90,4,160,36,"#0c1520",7,"none")
 +t(108,29,"☕  about.java",15,C.ink,650)+t(1176,27,"Java 25 · UTF-8",13,C.mute,400,'text-anchor="end"');
 const lines=[
 [`package dev.bryanonkeys;`,C.violet],
 [`public final class BryanOnKeys {`,C.orange],
 [`    String role = "Backend Developer";`,C.blue],
 [`    String[] backend = {"Java", "Spring Boot", "NestJS"};`,C.ink],
 [`    String[] frontend = {"React", "TypeScript"};`,C.ink],
 [`    String[] databases = {"PostgreSQL", "MySQL", "SQL Server"};`,C.ink],
 [`    String focus = "Clean architecture, APIs & security";`,C.blue],
 [`    boolean openToCollaboration = true;`,C.green],
 [`    String motto() { return "Build. Test. Improve."; }`,C.orange],
 [`}`,C.orange]
 ];
 lines.forEach(([s,col],i)=>{const yy=80+i*34;code+=t(42,yy,String(i+1).padStart(2,"0"),13,C.dim,400,'text-anchor="end" font-family="Consolas,monospace"')+t(65,yy,s,19,col,500,'font-family="Consolas,monospace"')});
 a["assets/cinematic/about-code.svg"]=svg(1200,458,code,"Ficha profesional de Bryan escrita como clase Java");
 // Tech stack with 5 lanes, request flow and detailed cards.
 let flow=mono(30,41,"// HOW A REQUEST MOVES THROUGH MY STACK",14,C.green)+t(30,79,"How my architecture connects.",30,C.ink,800);
 const stages=[
 ["01","Client",C.green,["React","Vite","TypeScript"],"UI · forms · state"],
 ["02","Edge",C.blue,["HTTP","JWT","Validation"],"auth · routing"],
 ["03","API",C.orange,["Java","Spring Boot","NestJS"],"business logic"],
 ["04","Async",C.violet,["WebSockets","SNS / SQS","Outbox"],"events · realtime"],
 ["05","Data",C.blue,["PostgreSQL","MySQL","MikroORM"],"transactions"]
 ];
 stages.forEach(([n,name,col,labels,caption],i)=>{
 let x=30+i*239;flow+=r(x,112,222,210,"#101820",12,col)+r(x,112,222,4,col,2,col)+r(x+14,134,31,30,"#172d2e",6,"none")
 +t(x+29,155,n,13,col,750,'text-anchor="middle"')+t(x+57,155,name,21,C.ink,750)+t(x+18,188,caption,13,C.mute);
 labels.forEach((z,j)=>{flow+=r(x+15,206+j*31,190,25,"#1a222b",5,"#283542")+dot(x+25,219+j*31,col,3)+t(x+35,224+j*31,z,14,C.ink,500)});
 if(i<4)flow+=line(x+222,167,x+238,167,col,2)+t(x+229,160,"›",15,col,650);
 });
 flow+=r(30,342,1140,145,"#101e1c",12,"#205536")+mono(52,372,"// REQUEST TRACE · ILLUSTRATIVE FLOW, NOT MEASURED LATENCY",12,C.green);
 const trace=[["client","Request",C.green],["api","Validate + authorize",C.orange],["domain","Business rules",C.blue],["db","Commit or enqueue",C.violet]];
 trace.forEach(([p,lab,col],i)=>{const x=54+i*270;flow+=dot(x+5,412,col,4)+t(x+18,416,p,14,C.ink,550)+r(x,437,232,10,"#223039",4,"none")+r(x,437,190-i*19,10,col,4,"none")+t(x,472,lab,12,C.mute)});
 const tech=[
 ["LANGUAGES · WEB",C.green,["Java","TypeScript","JavaScript","HTML / CSS","C# / .NET"]],
 ["BACKEND · APIs",C.red,["Spring Boot","Spring Security","NestJS","REST","WebSockets"]],
 ["DATA · DATABASES",C.violet,["PostgreSQL","MySQL","SQL Server","MikroORM","JPA"]],
 ["SHIP · TOOLS",C.blue,["Docker","GitHub Actions","Postman","AWS","Git"]]
 ];
 tech.forEach(([title,col,labels],i)=>{let x=30+(i%2)*580,y=509+Math.floor(i/2)*165;flow+=r(x,y,560,147,C.card,12,"#303947")+r(x,y,560,3,col,1,col)+mono(x+21,y+32,title,13,col);
  labels.forEach((z,j)=>{let px=x+20+(j%3)*171,py=y+49+Math.floor(j/3)*42;flow+=r(px,py,159,32,"#19222c",7,"#2b3641")+dot(px+12,py+16,col,3)+t(px+23,py+22,z,13,C.ink,500)});
 });
 a["assets/cinematic/stack-flow.svg"]=svg(1200,851,flow,"Mapa técnico detallado de cinco capas, trazas y stack");
 // Six focus cards, distinguish owned repositories and forks.
 const focusItems=[
 ["NEXO Fulfillment","Proyecto propio","TypeScript · NestJS · APIs",C.green],
 ["Borough & Ledger CRM","Proyecto propio","Java · Spring Boot · MySQL",C.blue],
 ["Patitas Felices","Proyecto propio","React · Vite · Tailwind",C.orange],
 ["verfy","Repositorio propio","Herramienta · exploración",C.violet],
 ["duo","Fork para contribuir","Colaboración open source",C.blue],
 ["pqc-migration-readiness","Fork para contribuir","Exploración y revisión",C.gold]
 ];
 let focus="";
 focusItems.forEach(([name,type,stack,col],i)=>{let x=8+(i%3)*399,y=8+Math.floor(i/3)*240;focus+=r(x,y,383,225,C.card,14,"#303947")+r(x,y,383,3,col,1,col)+dot(x+20,y+38,col,6)+t(x+40,y+44,name,22,C.ink,750)+mono(x+20,y+76,type.toUpperCase(),11,col)+t(x+20,y+122,stack,16,C.mute,400)+line(x+20,y+155,x+362,y+155)+pill(x+20,y+171,"GitHub",col,100)+t(x+360,y+190,"REPOSITORIO ↗",13,col,650,'text-anchor="end"')});
 a["assets/cinematic/focus.svg"]=svg(1200,495,focus,"Enfoque actual con seis repositorios identificados correctamente");
 // Annual milestones use only available calendar interval.
 const y=new Map();for(const day of cells){const yr=day.date.slice(0,4);const z=y.get(yr)||{total:0,active:0,from:day.date,to:day.date};z.total+=day.count;z.active+=day.count?1:0;z.to=day.date;y.set(yr,z)}
 let timeline=mono(35,44,`// VERIFIED WINDOW: ${cells[0]?.date} — ${cells.at(-1)?.date}`,13,C.green)+t(35,91,"Progress, not invented history.",32,C.ink,800);
 [...y.entries()].forEach(([yr,z],i)=>{let x=35+i*579;let col=i%2?C.orange:C.violet;timeline+=r(x,130,554,293,C.card,15,"#37404b")+r(x,130,554,5,col,2,col)+t(x+28,207,yr,67,col,800)
 +t(x+28,253,i===0?"Primera etapa":"Proyectos y contribuciones",23,C.ink,750)
 +t(x+28,291,`${z.total} contribuciones · ${z.active} días activos`,18,C.ink,500)
 +t(x+28,328,`${z.from}  –  ${z.to}`,16,C.mute,400)
 +line(x+28,347,x+526,347)+mono(x+28,382,"PERIODO PARCIAL DEL CALENDARIO",11,C.mute)});
 timeline+=t(35,467,"Los valores son del intervalo disponible. No representan años completos.",16,C.mute);
 a["assets/cinematic/yearly-highlights.svg"]=svg(1200,495,timeline,"Evolución anual basada solo en el calendario disponible");
 // Statistics: real counts from snapshot, historical graph, all public repo languages.
 const publicRepos=d.repositories||[], stars=publicRepos.reduce((sum,z)=>sum+(z.stars||0),0), langs=d.languages||{};
 let stats=mono(36,43,"// PROFILE",14,C.green)+t(36,97,cfg.login,42,C.orange,800)+t(36,135,"Backend · Java · TypeScript · software engineering",18,C.ink,450)
 +t(36,180,`GitHub: ${d.joinedAt} · Lima, Perú`,17,C.mute)
 +t(36,213,`Datos públicos revisados: ${d.updatedAt.slice(0,10)}`,14,C.mute);
 const monthly=new Map();for(const q of cells){const mo=q.date.slice(0,7);monthly.set(mo,(monthly.get(mo)||0)+q.count)}
 const months=[...monthly.entries()].slice(-12);const high=Math.max(1,...months.map(q=>q[1]));
 stats+=mono(682,43,"// CONTRIBUTIONS · LAST 12 MONTHS",12,C.green)+line(685,222,1162,222,C.green,1);
 months.forEach(([mo,v],i)=>{let x=685+i*39;let hh=v/high*135;stats+=r(x,217-hh,26,Math.max(2,hh),v?C.orange:"#26313e",3,"none")+t(x+13,246,mo.slice(5),10,C.mute,400,'text-anchor="middle"')});
 stats+=line(36,265,1164,265);
 const nums=[[`${total}`,"Contribuciones",C.blue],[`${publicRepos.length}`,"Repos públicos",C.blue],[`${stars}`,"Estrellas",C.blue],[`${d.followers}`,"Seguidores",C.blue],[`${active}`,"Días activos",C.blue]];
 nums.forEach(([n,lab,col],i)=>{const x=36+i*228;stats+=t(x,326,n,46,col,800)+t(x,352,lab,16,C.ink,500)+line(x,378,x+200,378)});
 stats+=mono(36,423,"// CONTRIBUTION RHYTHM",13,C.green)+t(36,465,"Every verified day counts.",30,C.ink,800);
 stats+=`<circle cx="115" cy="555" r="66" fill="#1a1e27" stroke="${C.red}" stroke-width="8"/><circle cx="115" cy="555" r="51" fill="#3e1017"/>`;
 stats+=t(115,561,String(active),43,C.blue,800,'text-anchor="middle"')+t(115,583,"DAYS",13,C.ink,650,'text-anchor="middle"')
 +t(220,531,`Total: ${total} contribuciones`,22,C.ink,600)+t(220,565,`Días activos: ${active}`,18,C.mute)+t(220,599,`Primer día del período: ${cells[0]?.date}`,16,C.mute);
 stats+=mono(654,422,"// LANGUAGES BY BYTES",13,C.green)+t(654,462,"What I write.",30,C.ink,800);
 const languageSorted=Object.entries(langs).sort((a,b)=>b[1]-a[1]);const denom=languageSorted.reduce((s,z)=>s+z[1],0)||1;
 const LCOL=[C.blue,C.violet,C.green,C.orange,C.gold,C.cyan];let xx=654;languageSorted.slice(0,7).forEach((z,i)=>{let w=(z[1]/denom)*510;stats+=r(xx,485,w,13,LCOL[i%LCOL.length],1,"none");xx+=w});
 languageSorted.slice(0,6).forEach(([name,count],i)=>{let x=654+(i%2)*265,yy=543+Math.floor(i/2)*49;stats+=dot(x+3,yy-5,LCOL[i%LCOL.length],5)+t(x+18,yy,`${name} ${(100*count/denom).toFixed(1)}%`,18,C.ink,500)});
 stats+=t(654,729,"Por bytes de código, no nivel de experiencia.",14,C.mute);
 a["assets/cinematic/stats-section.svg"]=svg(1200,760,stats,"Estadísticas reales: contribuciones, repositorios, seguidores, estrellas y lenguajes");
 let activity=mono(35,44,"// LAST PUBLIC ACTIVITY",14,C.green)+t(35,89,"Recent public events.",32,C.ink,800);
 const all=cells.slice(-7);const max=Math.max(1,...all.map(q=>q.count));
 all.forEach((q,i)=>{let x=45+i*155,h=Math.max(2,98*q.count/max);activity+=r(x,241-h,110,h,q.count?C.blue:"#28313d",5,"none")+t(x+55,267,q.date.slice(5),14,C.mute,500,'text-anchor="middle"')+t(x+55,287,String(q.count),13,C.blue,600,'text-anchor="middle"')});
 activity+=line(38,299,1163,299)+mono(40,330,"REPOSITORY / EVENT",12,C.mute)+mono(1117,330,"DATE",12,C.mute,'text-anchor="end"');
 (d.activity||[]).slice(0,5).forEach((z,i)=>{let yy=370+i*43;activity+=dot(49,yy-5,i%2?C.orange:C.blue,4)+t(67,yy,z.repository,18,C.ink,650)+t(365,yy,z.label,16,C.mute)+t(1130,yy,z.date,14,C.mute,450,'text-anchor="end"')+line(45,yy+13,1156,yy+13,"#27333e")});
 a["assets/cinematic/recent-activity.svg"]=svg(1200,602,activity,"Actividad reciente basada en los eventos públicos disponibles");
 let release=mono(35,42,"// PUBLISHED VERSIONS",13,C.green)+t(35,88,"Releases & delivery history.",30,C.ink,800)
 +r(35,110,1130,119,"#111820",12,"#37414b")+t(55,154,"Aún no hay releases publicados en los repositorios destacados.",21,C.ink,600)
 +t(55,186,"Se enlazan sus historiales de commits; no se inventan versiones.",17,C.mute)
 +mono(40,271,"NEXO FULFILLMENT   ·   BOROUGH & LEDGER   ·   WEB-PETSHOP",14,C.blue);
 a["assets/cinematic/releases.svg"]=svg(1200,310,release,"Historial de releases comprobado: todavía sin versiones publicadas");
 const features=[
 {slug:"nexo-fulfillment",title:"NEXO Fulfillment",eyebrow:"// DDD · MICROSERVICES",tag:"NestJS · TypeScript · PostgreSQL · Docker",what:["Gestión de pedidos, inventario y despachos.","Comunicación síncrona y asincrónica entre servicios."],built:["NestJS, MikroORM, WebSockets y eventos.","Patrones outbox / inbox, Docker y Terraform."],quality:["Documentación de arquitectura y CI","Implementación y pruebas en su repositorio."],color:C.green},
 {slug:"borough-ledger-crm",title:"Borough & Ledger CRM",eyebrow:"// FULL STACK · CRM",tag:"Java · Spring Boot · React · MySQL",what:["Sistema de gestión comercial.","Interfaz para trabajar con datos y servicios."],built:["Spring Boot con base de datos relacional.","React y TypeScript para la experiencia web."],quality:["Validaciones y servicios de negocio.","Código y despliegue en su repositorio."],color:C.orange},
 {slug:"web-petshop",title:"Patitas Felices",eyebrow:"// FRONTEND · E-COMMERCE",tag:"React · JavaScript · Vite · Tailwind",what:["Interfaz para una tienda de productos de mascotas.","Componentes reutilizables y navegación."],built:["Aplicación React con Vite y estilos Tailwind.","Organización de componentes y pantallas."],quality:["Diseño y accesibilidad en evolución.","Código fuente disponible para revisión."],color:C.blue}
 ];
 const block=(x,y,label,lines,color)=>mono(x,y,label,12,color)+lines.map((s,i)=>t(x,y+30+i*26,s,17,C.ink,430)).join("");
 for(const f of features){
  let b=r(1,1,1198,470,C.card,17,"#35404c")+r(1,1,1198,4,f.color,2,f.color)
  +mono(34,47,f.eyebrow,14,C.green)+t(34,103,f.title,38,C.ink,800)
  +t(34,143,f.tag,17,C.mute,470)
  +block(36,207,"WHAT",f.what,C.blue)+line(36,271,635,271)
  +block(36,306,"BUILT",f.built,C.blue)+line(36,370,635,370)
  +block(36,401,"QUALITY",[f.quality[0]],C.blue)
  +line(673,175,673,442)+mono(712,207,"// STACK",13,C.green);
  f.tag.split(" · ").slice(0,5).forEach((s,i)=>{let x=712+(i%2)*200, yy=224+Math.floor(i/2)*44;b+=pill(x,yy,s,[C.green,C.orange,C.blue,C.violet][i%4],180)});
  b+=line(712,405,1147,405)+t(1127,440,"VIEW REPOSITORY ↗",17,C.blue,650,'text-anchor="end"');
  a[`assets/cinematic/spotlight-${f.slug}.svg`]=svg(1200,472,b,`Proyecto destacado ${f.title}`);
 }
 // Actual contributor graph: representation of observed cells, not synthetic art.
 let graph=mono(30,41,`// VERIFIED PUBLIC CALENDAR · ${d.updatedAt.slice(0,10)}`,13,C.green)+t(30,87,"Contribution Graph.",32,C.ink,800);
 const first=cells[0]?.date||"2025-01-01",firstDay=new Date(first+"T00:00:00Z").getUTCDay(),size=15.3,offset=firstDay;
 cells.forEach((z,i)=>{let day=offset+i,w=Math.floor(day/7),weekday=day%7,x=44+w*17.8,yy=142+weekday*22.3;const shades=["#19232e","#5d281f","#a83f22","#df552c","#ff7b33"];graph+=r(x,yy,size,size,shades[Math.max(0,Math.min(4,z.level||0))],2,"none")});
 graph+=t(35,348,`${total} contributions  ·  ${active} active days  ·  ${first} — ${cells.at(-1)?.date}`,20,C.ink,550)
 +t(35,391,"Visualización de fechas verificadas; el diseño decorativo superior no modifica los datos.",15,C.mute);
 a["assets/cinematic/contribution-graph.svg"]=svg(1200,420,graph,"Mapa de calor del calendario real de contribuciones");
 let story=mono(30,41,"// CONTRIBUTION PERIODS",13,C.green)+t(30,85,"Every day counts.",31,C.ink,800);
 [...y.entries()].forEach(([yr,z],i)=>{let yy=120+i*175;story+=t(31,yy+33,`${yr}`,32,C.ink,800)+t(120,yy+33,`${z.total} contribuciones · ${z.active} días activos`,19,C.blue,550);
  const dc=cells.filter(e=>e.date.startsWith(yr)), weeks=Math.ceil(dc.length/7);dc.forEach((e,index)=>{let x=36+(Math.floor(index/7))*Math.min(21,1050/(weeks+1)),yv=yy+56+(index%7)*12;story+=r(x,yv,8,8,e.count?C.orange:"#232b35",2,"none")});
 });
 story+=t(30,517,"El calendario disponible cubre una ventana parcial de 2025 y 2026.",14,C.mute);
 a["assets/cinematic/year-story.svg"]=svg(1200,545,story,"Actividad por año y por día a partir de datos verificados");
 let footer=t(600,68,"Thanks for visiting.",36,C.ink,800,'text-anchor="middle"')+t(600,111,"BRYANONKEYS · BUILD · TEST · IMPROVE",16,C.mute,650,'text-anchor="middle" letter-spacing="3"')+t(600,146,"BACK TO TOP ↑",13,C.red,700,'text-anchor="middle"');
 a["assets/cinematic/footer.svg"]=svg(1200,177,footer,"Gracias por visitar el perfil de Bryan");
 a["assets/cinematic/featured-verfy.svg"]="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 580 245\" width=\"580\" height=\"245\" role=\"img\" aria-label=\"verfy, OWN REPOSITORY\"><rect width=\"580\" height=\"245\" rx=\"13\" fill=\"#0e141c\" stroke=\"#303b46\"/><rect x=\"0\" y=\"0\" width=\"580\" height=\"4\" rx=\"2\" fill=\"#58a6ff\"/><text x=\"23\" y=\"39\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#39d353\">OWN REPOSITORY</text><text x=\"23\" y=\"87\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"28\" font-weight=\"800\" fill=\"#f1f5fa\">verfy</text><text x=\"23\" y=\"132\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"17\" font-weight=\"500\" fill=\"#a1adbd\">Tools · experiments</text><path d=\"M23 176H557\" stroke=\"#323c49\"/><text x=\"23\" y=\"215\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"500\" fill=\"#8797ad\">github.com/BryanOnKeys/verfy</text><text x=\"487\" y=\"215\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#58a6ff\">VIEW ↗</text></svg>\n";
 a["assets/cinematic/featured-duo.svg"]="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 580 245\" width=\"580\" height=\"245\" role=\"img\" aria-label=\"duo, OPEN SOURCE FORK\"><rect width=\"580\" height=\"245\" rx=\"13\" fill=\"#0e141c\" stroke=\"#303b46\"/><rect x=\"0\" y=\"0\" width=\"580\" height=\"4\" rx=\"2\" fill=\"#39d353\"/><text x=\"23\" y=\"39\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#39d353\">OPEN SOURCE FORK</text><text x=\"23\" y=\"87\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"28\" font-weight=\"800\" fill=\"#f1f5fa\">duo</text><text x=\"23\" y=\"132\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"17\" font-weight=\"500\" fill=\"#a1adbd\">Contributions and review</text><path d=\"M23 176H557\" stroke=\"#323c49\"/><text x=\"23\" y=\"215\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"500\" fill=\"#8797ad\">github.com/BryanOnKeys/duo</text><text x=\"487\" y=\"215\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#39d353\">VIEW ↗</text></svg>\n";
 a["assets/cinematic/featured-pqc-migration-readiness.svg"]="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 580 245\" width=\"580\" height=\"245\" role=\"img\" aria-label=\"pqc-migration-readiness, OPEN SOURCE FORK\"><rect width=\"580\" height=\"245\" rx=\"13\" fill=\"#0e141c\" stroke=\"#303b46\"/><rect x=\"0\" y=\"0\" width=\"580\" height=\"4\" rx=\"2\" fill=\"#bd7af2\"/><text x=\"23\" y=\"39\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#39d353\">OPEN SOURCE FORK</text><text x=\"23\" y=\"87\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"28\" font-weight=\"800\" fill=\"#f1f5fa\">pqc-migration-readiness</text><text x=\"23\" y=\"132\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"17\" font-weight=\"500\" fill=\"#a1adbd\">Public source collaboration</text><path d=\"M23 176H557\" stroke=\"#323c49\"/><text x=\"23\" y=\"215\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"500\" fill=\"#8797ad\">github.com/BryanOnKeys/pqc-migration-readiness</text><text x=\"487\" y=\"215\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#bd7af2\">VIEW ↗</text></svg>\n";
 a["assets/cinematic/quality.svg"]="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 425\" width=\"1200\" height=\"425\" role=\"img\" aria-label=\"Engineering Quality\"><rect width=\"1200\" height=\"425\" rx=\"13\" fill=\"#0e141c\" stroke=\"#303b46\"/><rect width=\"1200\" height=\"425\" rx=\"15\" fill=\"#0d1117\"/><text x=\"35\" y=\"48\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#39d353\">// ENGINEERING STANDARDS</text><text x=\"35\" y=\"95\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"33\" font-weight=\"800\" fill=\"#f1f5fa\">Build quality into the workflow.</text><rect x=\"25\" y=\"128\" width=\"378\" height=\"236\" rx=\"13\" fill=\"#0e141c\" stroke=\"#303b47\"/><rect x=\"25\" y=\"128\" width=\"378\" height=\"4\" rx=\"2\" fill=\"#39d353\"/><text x=\"47\" y=\"165\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#39d353\">01 / TESTS</text><text x=\"47\" y=\"219\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"22\" font-weight=\"750\" fill=\"#f1f5fa\">Automated verification</text><text x=\"47\" y=\"261\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"16\" font-weight=\"500\" fill=\"#acb9c8\">Unit and integration checks</text><text x=\"47\" y=\"307\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"500\" fill=\"#8b9daf\">Real test suites in project repos</text><rect x=\"420\" y=\"128\" width=\"378\" height=\"236\" rx=\"13\" fill=\"#0e141c\" stroke=\"#303b47\"/><rect x=\"420\" y=\"128\" width=\"378\" height=\"4\" rx=\"2\" fill=\"#58a6ff\"/><text x=\"442\" y=\"165\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#58a6ff\">02 / CI</text><text x=\"442\" y=\"219\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"22\" font-weight=\"750\" fill=\"#f1f5fa\">GitHub Actions</text><text x=\"442\" y=\"261\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"16\" font-weight=\"500\" fill=\"#acb9c8\">Validation of changes</text><text x=\"442\" y=\"307\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"500\" fill=\"#8b9daf\">Reviewable diffs and pipelines</text><rect x=\"815\" y=\"128\" width=\"378\" height=\"236\" rx=\"13\" fill=\"#0e141c\" stroke=\"#303b47\"/><rect x=\"815\" y=\"128\" width=\"378\" height=\"4\" rx=\"2\" fill=\"#ff652f\"/><text x=\"837\" y=\"165\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ff652f\">03 / DOCUMENTATION</text><text x=\"837\" y=\"219\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"22\" font-weight=\"750\" fill=\"#f1f5fa\">Architecture decisions</text><text x=\"837\" y=\"261\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"16\" font-weight=\"500\" fill=\"#acb9c8\">Technical docs and diagrams</text><text x=\"837\" y=\"307\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"14\" font-weight=\"500\" fill=\"#8b9daf\">Open source collaboration</text><text x=\"35\" y=\"406\" font-family=\"Segoe UI,Arial,sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#8294a7\">Evidence: linked CI, code and architecture files below</text></svg>\n";
 return Object.fromEntries(Object.entries(a).map(([p,xml])=>[p,xml.replace(/(<text\b[^>]*?) font-family="Segoe UI,Arial,sans-serif"([^>]*?) font-family="Consolas,monospace"/g,'$1 font-family="Consolas,monospace"$2')]));
};
const config=JSON.parse(fs.readFileSync("profile/config.json","utf8"));
const snapshot=JSON.parse(fs.readFileSync("profile/data.json","utf8"));
const output=buildCinematic(config,snapshot);
let missing=[];
for(const [file,value] of Object.entries(output)){
 if(process.argv.includes("--check")){if(!fs.existsSync(file)||fs.readFileSync(file,"utf8")!==value)missing.push(file);}
 else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value,"utf8");}
}
if(missing.length){console.error("Outdated cinematic SVGs:",missing.join(", "));process.exit(1);}
console.log(`Verified/generated ${Object.keys(output).length} cinematic SVG files`);
