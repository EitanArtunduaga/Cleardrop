/* ============================================================
 
   VOLUNTARIADO.JS — Lógica e interacciones de la página de Voluntariado
 
   Este archivo maneja:
   - Generación dinámica de eventos
   - Modal de detalles de evento
   - Eventos pasados
   - Animaciones al scroll
   - Carga dinámica de navbar y footer
   
============================================================ */

// ============================================================
// 0. CARGA DINÁMICA DE NAVBAR Y FOOTER
// ============================================================

function cargarNavbarYFooter() {
  // Cargar navbar
  fetch('navbar.html')
    .then(response => response.text())
    .then(html => {
      const navContainer = document.createElement('div');
      navContainer.innerHTML = html;
      document.body.insertBefore(navContainer, document.body.firstChild);
      
      // Inicializar eventos del navbar después de cargarlo
      inicializarNavbar();
    })
    .catch(error => console.error('Error cargando navbar:', error));

  // Cargar footer
  fetch('footer.html')
    .then(response => response.text())
    .then(html => {
      const footerContainer = document.createElement('div');
      footerContainer.innerHTML = html;
      document.body.appendChild(footerContainer);
    })
    .catch(error => console.error('Error cargando footer:', error));
}

// ============================================================
// 0.1 INICIALIZACIÓN DEL NAVBAR
// ============================================================

function inicializarNavbar() {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuClose = document.getElementById('menuClose');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      if (mobileNav) mobileNav.classList.add('open');
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', () => {
      if (mobileNav) mobileNav.classList.remove('open');
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 24px rgba(11,61,110,.12)'
        : 'none';
    });
  }

  // Dropdowns desktop
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');

        dropdowns.forEach((d) => {
          d.classList.remove('open');
          const t = d.querySelector('.nav-dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          dropdown.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  document.addEventListener('click', () => {
    dropdowns.forEach((d) => {
      d.classList.remove('open');
      const t = d.querySelector('.nav-dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach((d) => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mobile nav accordion
  const mobileGroups = document.querySelectorAll('.mobile-nav-group');
  mobileGroups.forEach((group) => {
    const toggle = group.querySelector('.mobile-nav-toggle');

    if (toggle) {
      toggle.addEventListener('click', () => {
        const isOpen = group.classList.contains('open');

        mobileGroups.forEach((g) => {
          g.classList.remove('open');
          const t = g.querySelector('.mobile-nav-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          group.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  console.log('✅ Navbar inicializado correctamente');
}

// ============================================================
// 1. DATOS DE EVENTOS (Array de eventos próximos)
// ============================================================

const eventosProximos = [
  {
    id: 1,
    nombre: 'Limpieza de Río Juan Díaz',
    categoria: 'Educación ambiental',
    fecha: '15 de Agosto, 2026',
    ubicacion: 'Panamá Metropolitana',
    inscritos: 24,
    imagen: 'img/evento-1.jpg', // Reemplazar con imagen real
    descripcion: 'Únete a nosotros en la limpieza del Río Juan Díaz. Proporcionaremos todos los materiales necesarios. Es una excelente oportunidad para aprender sobre conservación ambiental mientras contribuyes al cuidado del agua.'
  },
  {
    id: 2,
    nombre: 'Charla sobre Conservación',
    categoria: 'Eventos y campañas',
    fecha: '22 de Agosto, 2026',
    ubicacion: 'Colón',
    inscritos: 18,
    imagen: 'img/evento-2.jpg',
    descripcion: 'Charla informativa sobre la importancia de la conservación del agua con expertos en medio ambiente. Aprenderás sobre los principales desafíos del agua en Panamá y cómo puedes contribuir a la solución.'
  },
  {
    id: 3,
    nombre: 'Monitoreo de Fugas',
    categoria: 'Monitoreo y reportes',
    fecha: '28 de Agosto, 2026',
    ubicacion: 'Chiriquí',
    inscritos: 15,
    imagen: 'img/evento-3.jpg',
    descripcion: 'Participa en el programa de monitoreo comunitario de fugas. Recibirás capacitación sobre cómo identificar y reportar problemas con el servicio de agua en tu comunidad.'
  },
  {
    id: 4,
    nombre: 'Taller de Educación Ambiental',
    categoria: 'Educación ambiental',
    fecha: '5 de Septiembre, 2026',
    ubicacion: 'Panamá Oeste',
    inscritos: 32,
    imagen: 'img/evento-4.jpg',
    descripcion: 'Taller práctico sobre el uso responsable del agua dirigido a familias y comunidades. Aprenderemos técnicas para ahorrar agua en el hogar y en la comunidad.'
  },
  {
    id: 5,
    nombre: 'Campaña de Sensibilización',
    categoria: 'Eventos y campañas',
    fecha: '12 de Septiembre, 2026',
    ubicacion: 'Bocas del Toro',
    inscritos: 28,
    imagen: 'img/evento-5.jpg',
    descripcion: 'Campaña de sensibilización dirigida a escuelas sobre la importancia del agua potable. Ayudaremos a crear conciencia en niños y adolescentes sobre el valor del agua.'
  },
  {
    id: 6,
    nombre: 'Iniciativa Comunitaria',
    categoria: 'Apoyo comunitario',
    fecha: '19 de Septiembre, 2026',
    ubicacion: 'Darién',
    inscritos: 12,
    imagen: 'img/evento-6.jpg',
    descripcion: 'Proyecto de mejora de acceso al agua en comunidades remotas. Trabajaremos junto a las comunidades locales para implementar soluciones sostenibles.'
  }
];

// ============================================================
// 2. DATOS DE EVENTOS PASADOS
// ============================================================

const eventosPasados = [
  {
    id: 101,
    nombre: 'Limpiezas ambientales en Bahía Vidé',
    fecha: '20 de Julio, 2026',
    imagen: 'img/pasado-1.jpg'
  },
  {
    id: 102,
    nombre: 'Charla Comunitaria en San Francisco',
    fecha: '15 de Julio, 2026',
    imagen: 'img/pasado-2.jpg'
  },
  {
    id: 103,
    nombre: 'Charla Comunitaria en San Francisco (30 años)',
    fecha: '10 de Julio, 2026',
    imagen: 'img/pasado-3.jpg'
  },
  {
    id: 104,
    nombre: 'Limpieza de playa en Coronado',
    fecha: '25 de Junio, 2026',
    imagen: 'img/pasado-4.jpg'
  },
  {
    id: 105,
    nombre: 'Taller educativo en escuelas',
    fecha: '18 de Junio, 2026',
    imagen: 'img/pasado-5.jpg'
  },
  {
    id: 106,
    nombre: 'Reforestación en cuenca alta',
    fecha: '12 de Junio, 2026',
    imagen: 'img/pasado-6.jpg'
  }
];

// ============================================================
// 3. FUNCIÓN: Generar tarjetas de eventos próximos
// ============================================================

function generarEventos() {
  const container = document.getElementById('eventosContainer');
  
  if (!container) return;

  container.innerHTML = eventosProximos.map(evento => `
    <div class="evento-card" data-evento-id="${evento.id}">
      <img src="${evento.imagen}" alt="${evento.nombre}" class="evento-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22%3E%3Crect fill=%22%23E8F2FB%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22DM Sans%22 font-size=%2214%22 fill=%22%238AABB8%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImagen del evento%3C/text%3E%3C/svg%3E'">
      
      <div class="evento-content">
        <div class="evento-category">${evento.categoria}</div>
        
        <h3 class="evento-name">${evento.nombre}</h3>
        
        <div class="evento-meta">
          <div class="evento-meta-item">
            <span class="evento-meta-icon">📅</span>
            <span>${evento.fecha}</span>
          </div>
          <div class="evento-meta-item">
            <span class="evento-meta-icon">📍</span>
            <span>${evento.ubicacion}</span>
          </div>
          <div class="evento-meta-item">
            <span class="evento-meta-icon">👥</span>
            <span>${evento.inscritos} inscritos</span>
          </div>
        </div>
        
        <button class="evento-btn" data-evento-id="${evento.id}">Ver detalles</button>
      </div>
    </div>
  `).join('');

  // Agregar event listeners a los botones de eventos
  document.querySelectorAll('.evento-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const eventoId = parseInt(btn.dataset.eventoId);
      abrirModal(eventoId);
    });
  });

  // Agregar animaciones de revelación
  document.querySelectorAll('.evento-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// ============================================================
// 4. FUNCIÓN: Abrir modal con detalles del evento
// ============================================================

function abrirModal(eventoId) {
  const evento = eventosProximos.find(e => e.id === eventoId);
  
  if (!evento) return;

  const modal = document.getElementById('modalEvento');
  
  // Rellenar datos del modal
  document.getElementById('modalImage').src = evento.imagen;
  document.getElementById('modalImage').onerror = function() {
    this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 300%22%3E%3Crect fill=%22%23E8F2FB%22 width=%22600%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22DM Sans%22 font-size=%2216%22 fill=%22%238AABB8%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImagen del evento%3C/text%3E%3C/svg%3E';
  };
  document.getElementById('modalCategory').textContent = evento.categoria;
  document.getElementById('modalTitle').textContent = evento.nombre;
  document.getElementById('modalDescription').textContent = evento.descripcion;
  document.getElementById('modalDate').textContent = evento.fecha;
  document.getElementById('modalLocation').textContent = evento.ubicacion;
  document.getElementById('modalAttendees').textContent = evento.inscritos;

  // Mostrar modal
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ============================================================
// 5. FUNCIÓN: Cerrar modal
// ============================================================

function cerrarModal() {
  const modal = document.getElementById('modalEvento');
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// ============================================================
// 6. EVENT LISTENERS: Modal
// ============================================================

function setupModalListeners() {
  // Botón de cerrar modal
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', cerrarModal);
  }

  // Cerrar modal al hacer clic fuera (en el overlay)
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', cerrarModal);
  }

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarModal();
    }
  });

  // Prevenir cerrar cuando se hace clic dentro del modal
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

// ============================================================
// 7. FUNCIÓN: Generar tarjetas de eventos pasados
// ============================================================

function generarEventosPasados() {
  const container = document.getElementById('pasadosContainer');
  
  if (!container) return;

  container.innerHTML = eventosPasados.map(evento => `
    <div class="pasado-card">
      <img src="${evento.imagen}" alt="${evento.nombre}" class="pasado-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22%3E%3Crect fill=%22%23E8F2FB%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22DM Sans%22 font-size=%2214%22 fill=%22%238AABB8%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EEvento pasado%3C/text%3E%3C/svg%3E'">
      
      <div class="pasado-content">
        <h3 class="pasado-name">${evento.nombre}</h3>
        <div class="pasado-date">${evento.fecha}</div>
      </div>
    </div>
  `).join('');

  // Agregar animaciones de revelación
  document.querySelectorAll('.pasado-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// ============================================================
// 8. ANIMACIONES AL SCROLL (Reveal)
// ============================================================

function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================================
// 9. INICIALIZACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Voluntariado.js cargado correctamente');
  
  // Cargar navbar y footer primero
  cargarNavbarYFooter();
  
  // Esperar a que el navbar se cargue antes de inicializar otros elementos
  setTimeout(() => {
    // Generar eventos
    generarEventos();
    generarEventosPasados();
    
    // Setup scroll reveal
    setupScrollReveal();
    
    // Setup modal listeners
    setupModalListeners();
    
    // Setup botones de acción
    setupBotonesAccion();
  }, 100);
});

// ============================================================
// 10. FUNCIÓN: Setup botones de acción (navegación)
// ============================================================

function setupBotonesAccion() {
  // Botones "Quiero ser voluntario"
  document.querySelectorAll('a[href="voluntariado-formulario.html"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      console.log('Navegando a formulario de voluntariado');
    });
  });

  // Botón "Ver más" de eventos pasados
  const verMasBtn = document.getElementById('verMasPasados');
  if (verMasBtn) {
    verMasBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Ver más eventos pasados');
    });
  }
}

// ============================================================
// 11. FUNCIÓN AUXILIAR: Animar números (si se necesita en futuro)
// ============================================================

function animarNumero(elemento, numeroFinal) {
  let numeroActual = 0;
  const incremento = numeroFinal / 60;
  
  const intervalo = setInterval(() => {
    numeroActual += incremento;
    if (numeroActual >= numeroFinal) {
      elemento.textContent = numeroFinal;
      clearInterval(intervalo);
    } else {
      elemento.textContent = Math.floor(numeroActual);
    }
  }, 16); // ~60fps
}

// ============================================================
// 12. FUNCIÓN: Agregar un evento nuevo dinámicamente
// ============================================================

function agregarEvento(nuevoEvento) {
  eventosProximos.push(nuevoEvento);
  generarEventos();
}

// ============================================================
// 13. FUNCIÓN: Agregar evento pasado dinámicamente
// ============================================================

function agregarEventoPasado(nuevoEvento) {
  eventosPasados.push(nuevoEvento);
  generarEventosPasados();
}

// ============================================================
// EXPORTAR FUNCIONES (para uso desde console o código externo)
// ============================================================

window.voluntariado = {
  agregarEvento,
  agregarEventoPasado,
  abrirModal,
  cerrarModal,
  eventosProximos,
  eventosPasados
};

console.log('📌 API de Voluntariado disponible en: window.voluntariado');
