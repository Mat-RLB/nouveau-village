/* ===================================================================
   APP.JS — NOUVEAU VILLAGE V2
   - Injecte le contenu depuis contenu.js
   - Anime les éléments quand ils apparaissent à l'écran (scroll reveal)
   - Donne une ombre au header quand on scrolle
   - Gère le menu mobile
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  const data = window.contenu;
  if (!data) { console.error('contenu.js non chargé'); return; }

  /* -----------------------------------------------------------------
     1. INJECTION DU CONTENU (même logique que la V1)
     ----------------------------------------------------------------- */

  function lire(chemin) {
    return chemin.split('.').reduce((obj, cle) => obj ? obj[cle] : undefined, data);
  }

  document.querySelectorAll('[data-champ]').forEach(function (el) {
    const valeur = lire(el.getAttribute('data-champ'));
    if (valeur !== undefined) el.textContent = valeur;
  });

  const anneeEl = document.querySelector('[data-annee]');
  if (anneeEl) anneeEl.textContent = new Date().getFullYear();

  /* --- Annonce principale --- */
  const zoneAnnonce = document.getElementById('annonce-principale');
  if (zoneAnnonce && data.annoncePrincipale) {
    const a = data.annoncePrincipale;
    if (a.afficher === false) {
      const wrap = document.getElementById('annonce-wrap');
      if (wrap) wrap.style.display = 'none';
    } else {
      zoneAnnonce.innerHTML =
        (a.etiquette ? '<div class="annonce-badge">' + a.etiquette + '</div>' : '') +
        '<div class="annonce-corps">' +
          '<strong>' + a.titre + '</strong>' +
          '<span class="date">' + a.date + '</span> · ' +
          '<span class="lieu">' + a.lieu + '</span>' +
          (a.complement ? '<div class="complement">' + a.complement + '</div>' : '') +
        '</div>';
    }
  }

  /* --- Accès rapides --- */
  const zoneAcces = document.getElementById('acces-rapides');
  if (zoneAcces && data.accesRapides) {
    zoneAcces.innerHTML = data.accesRapides.map(function (c) {
      return '<a class="carte" href="' + c.lien + '">' +
               '<div class="carte-ico">' + c.icone + '</div>' +
               '<h3>' + c.titre + '</h3>' +
               '<p>' + c.texte + '</p>' +
               '<span class="lien-fleche">Découvrir →</span>' +
             '</a>';
    }).join('');
  }

  /* --- Actualités --- */
  const zoneActus = document.getElementById('liste-actus');
  if (zoneActus && data.actualites) {
    zoneActus.innerHTML = data.actualites.map(function (a) {
      return '<article class="actu">' +
               '<div class="actu-date">' + a.date + '</div>' +
               '<h4>' + a.titre + '</h4>' +
               '<p>' + a.texte + '</p>' +
             '</article>';
    }).join('');
  }

  /* --- Agenda --- */
  const zoneAgenda = document.getElementById('liste-agenda');
  if (zoneAgenda && data.rendezVous) {
    zoneAgenda.innerHTML = data.rendezVous.map(function (r) {
      return '<div class="agenda-item">' +
               '<div class="agenda-date">' + r.date + '</div>' +
               '<div>' +
                 '<h4>' + r.titre + '</h4>' +
                 '<div class="lieu">' + r.lieu + '</div>' +
               '</div>' +
             '</div>';
    }).join('');
  }

  /* --- Espaces verts (liste de points) --- */
  const zoneEV = document.getElementById('espaces-verts-points');
  if (zoneEV && data.espacesVerts) {
    zoneEV.innerHTML = data.espacesVerts.points.map(p => '<li>' + p + '</li>').join('');
  }

  /* --- Organisation --- */
  const zoneOrg = document.getElementById('organisation-elements');
  if (zoneOrg && data.organisation) {
    zoneOrg.innerHTML = data.organisation.elements.map(function (e) {
      return '<a class="carte" href="' + e.lien + '">' +
               '<div class="carte-ico">📋</div>' +
               '<h3>' + e.titre + '</h3>' +
               '<p>' + e.texte + '</p>' +
               '<span class="lien-fleche">Voir →</span>' +
             '</a>';
    }).join('');
  }

  /* --- Documents groupés par catégorie ---
     Petite amélioration V2 : chaque catégorie a une icône et un compteur.
     Chaque groupe a un ID slugifié (ex: #cat-piscine) pour pouvoir y scroller. */
  const zoneDocs = document.getElementById('liste-documents');
  if (zoneDocs && data.documents) {
    const iconesCateg = {
      'Présentation': '👋',
      'Organisation': '🏛️',
      'Espaces verts': '🌳',
      'Piscine': '🏊'
    };
    /* Fonction pour transformer "Espaces verts" en "espaces-verts" */
    function slug(s) {
      return s.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // enlève accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    const categories = [];
    data.documents.forEach(d => { if (categories.indexOf(d.categorie) === -1) categories.push(d.categorie); });

    zoneDocs.innerHTML = categories.map(function (cat) {
      const docsCat = data.documents.filter(d => d.categorie === cat);
      const lignes = docsCat.map(function (d) {
        return '<a class="doc-ligne" href="' + d.lien + '">' +
                 '<span class="doc-ico">📄</span>' +
                 '<div class="doc-info">' +
                   '<strong>' + d.titre + '</strong>' +
                   '<div class="doc-date">Mis à jour : ' + d.date + ' · ' + d.taille + '</div>' +
                 '</div>' +
                 '<span class="doc-tele">⬇ Télécharger</span>' +
               '</a>';
      }).join('');
      const ico = iconesCateg[cat] || '📁';
      const catId = 'cat-' + slug(cat);
      return '<div class="docs-groupe reveal" id="' + catId + '">' +
               '<div class="docs-groupe-tete">' +
                 '<span class="ico">' + ico + '</span>' +
                 '<h3 class="docs-groupe-titre">' + cat + '</h3>' +
                 '<span class="docs-groupe-count">' + docsCat.length + ' doc' + (docsCat.length > 1 ? 's' : '') + '</span>' +
               '</div>' +
               lignes +
             '</div>';
    }).join('');

    /* Après injection, on gère le scroll vers l'ancre si elle existe dans l'URL */
    setTimeout(function () {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 200);
  }

  /* -----------------------------------------------------------------
     2. ANIMATIONS AU SCROLL (Intersection Observer)
     ----------------------------------------------------------------- */

  /* Petite explication pour Matheo :
     L'Intersection Observer est une fonction du navigateur qui surveille
     quand un élément entre dans la fenêtre visible. Quand ça arrive, on
     ajoute la classe "visible" -> le CSS prend le relais pour animer. */

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,                  // dès 5% visible, on déclenche
    rootMargin: '0px 0px 80px 0px'    // marge négative inverse : déclenche AVANT que l'élément n'arrive
  });

  /* On observe tous les éléments .reveal et .reveal-stagger.
     Garde-fou : si après 2 secondes un élément n'a toujours pas été
     révélé (Observer pas supporté, JS lent, etc.), on le rend visible
     d'office pour ne JAMAIS laisser de zone vide sur le site. */
  setTimeout(function () {
    const targets = document.querySelectorAll('.reveal, .reveal-stagger');
    targets.forEach(function (el) {
      observer.observe(el);
    });
    /* Fallback : 2 secondes après, tout ce qui n'est pas visible le devient */
    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.classList.contains('visible')) el.classList.add('visible');
      });
    }, 2000);
  }, 100);

  /* -----------------------------------------------------------------
     3. HEADER DYNAMIQUE (ombre apparaît au scroll)
     ----------------------------------------------------------------- */
  const entete = document.querySelector('.entete');
  if (entete) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y > 20) entete.classList.add('scrolled');
      else entete.classList.remove('scrolled');
      lastScroll = y;
    }, { passive: true });
  }

  /* -----------------------------------------------------------------
     4. MENU MOBILE
     ----------------------------------------------------------------- */
  const burger = document.querySelector('.menu-burger');
  const navLiens = document.querySelector('.nav-liens');
  if (burger && navLiens) {
    burger.addEventListener('click', function () {
      navLiens.classList.toggle('ouvert');
    });
    /* Ferme le menu quand on clique sur un lien */
    navLiens.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', () => navLiens.classList.remove('ouvert'));
    });
  }

  /* -----------------------------------------------------------------
     5. FORMULAIRE DE CONTACT
     ----------------------------------------------------------------- */
  const formContact = document.getElementById('form-contact');
  if (formContact) {
    formContact.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('form-message-retour');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      formContact.reset();
    });
  }

});
