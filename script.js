/* ==========================================================================
   DATOS DE PROYECTOS
   Añadir un proyecto nuevo = añadir un objeto a este array.
   category: 'web' | 'data'
   status:   'done' | 'wip' | null (null = no mostrar estado)
   ========================================================================== */
const PROJECTS = [
  {
    name: "MATCHZONE",
    category: "web",
    categoryLabel: "Web",
    status: "done",
    description: "Plataforma web de fútbol desarrollada y desplegada en producción con Next.js, TypeScript y Supabase. Incluye autenticación, roles de usuario, RLS, panel de administración, integración con Twitch API, SEO y configuración de monetización mediante Google AdSense y ads.txt.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Twitch API",
      "Vercel",
      "Google AdSense"
    ],
    demo: "https://matchzone-two.vercel.app/",
    demoLabel: "Visitar MatchZone →",
    github: "https://github.com/MarcosRol04/MatchZone"
  },
  {
    name: "DÖNER DIOSA FORTUNA",
    category: "web",
    categoryLabel: "Web",
    status: "done",
    description: "Carta digital por QR para un restaurante real: el cliente escanea, navega por categorías y arma una lista para enseñar al camarero. Sin pagos ni pedidos online.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    demo: "https://d-ner-diosa-fortuna.vercel.app/",
    demoLabel: "Ver menú digital →",
    github: "https://github.com/MarcosRol04/D-NER-DIOSA-FORTUNA"
  },
  {
    name: "BETTRACKER",
    category: "data",
    categoryLabel: "Data & Backend",
    status: "done",
    description: "Plataforma de seguimiento de apuestas deportivas con dashboard de rendimiento, partidos reales vía API y una red social para compartir picks.",
    stack: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Chart.js"],
    demo: "https://godbets-production.up.railway.app",
    demoLabel: "Probar BetTracker →",
    github: "https://github.com/MarcosRol04/GodBets"
  },
  {
    name: "JM · PRESUPUESTOS",
    category: "web",
    categoryLabel: "Web",
    status: null,
    description: "Calculadora de presupuestos para una consultoría tecnológica: cálculo automático de precios, gestión y duplicación de presupuestos, y generación de PDF con el logo del cliente.",
    stack: ["JavaScript", "jsPDF", "AutoTable", "LocalStorage"],
    demo: null,
    demoLabel: null,
    github: "https://github.com/MJConsultores/Presupuestos"
  },
  {
    name: "JM · NOSOTROS",
    category: "web",
    categoryLabel: "Web",
    status: null,
    description: "Web corporativa para presentar los servicios de una consultoría tecnológica: catálogo de servicios, portfolio y formulario de contacto para solicitar presupuesto.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    demo: null,
    demoLabel: null,
    github: "https://github.com/MJConsultores/Nosotros"
  }
];

function projectCardHTML(p){
  const statusHTML = p.status
    ? `<span class="project-card__status ${p.status === 'done' ? 'is-done' : 'is-wip'}">
         <span class="dot"></span>${p.status === 'done' ? 'Finalizado' : 'En desarrollo'}
       </span>`
    : '';

  const stackHTML = p.stack.map(s => `<span>${s}</span>`).join('');

  let actionsHTML = '';
  if (p.demo) {
    actionsHTML += `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn--primary">${p.demoLabel}</a>`;
  }
  if (p.github) {
    actionsHTML += `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn--ghost">${p.demo ? 'GitHub' : 'Ver código →'}</a>`;
  }

  return `
    <article class="project-card reveal" data-category="${p.category}">
      <div class="project-card__top">
        <span class="project-card__cat">${p.categoryLabel}</span>
        ${statusHTML}
      </div>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="project-card__stack">${stackHTML}</div>
      <div class="project-card__actions">${actionsHTML}</div>
    </article>
  `;
}

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(projectCardHTML).join('');
  observeReveals();
}

function initFilters(){
  const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const value = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const show = value === 'all' || card.dataset.category === value;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ==========================================================================
   NAV MÓVIL
   ========================================================================== */
function initNav(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL
   ========================================================================== */
let observer;
function observeReveals(){
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  if (!observer){
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section-inner > *, .terminal').forEach(el => el.classList.add('reveal'));

  renderProjects();
  initFilters();
  initNav();
  observeReveals();

  const yearEl = document.querySelector('.footer__year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
