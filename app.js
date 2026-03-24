// ===== MOROCCO STORE ORAIMO — MAIN JS =====

// ---- DATA ----
const PRODUCTS = [
  { id: 1, name: 'FreePods 4 Pro', category: 'audio', price: 349, badge: 'Best Seller', icon: '🎧', desc: 'ANC + 38H battery, Bluetooth 5.3, IPX5 waterproof', fourthwall: 'https://www.fourthwall.com' },
  { id: 2, name: 'Watch ER AMOLED', category: 'wearable', price: 499, badge: 'New', icon: '⌚', desc: '1.43" AMOLED, health monitoring, BT calling, IP68', fourthwall: 'https://www.fourthwall.com' },
  { id: 3, name: 'PowerPack 27000', category: 'power', price: 279, badge: 'Sale', icon: '🔋', desc: '27000mAh, 65W PD fast charge, 3 ports', fourthwall: 'https://www.fourthwall.com' },
  { id: 4, name: 'SpaceBuds Z ANC', category: 'audio', price: 429, badge: 'New', icon: '🎵', desc: 'Active noise cancellation, 30H playtime, premium drivers', fourthwall: 'https://www.fourthwall.com' },
  { id: 5, name: 'Watch Nova AM', category: 'wearable', price: 369, badge: null, icon: '⌚', desc: 'Smart calling, fitness tracking, 7-day battery', fourthwall: 'https://www.fourthwall.com' },
  { id: 6, name: 'Charger Pro 65W', category: 'power', price: 149, badge: null, icon: '⚡', desc: 'GaN 65W, 3-in-1 ports, universal compatibility', fourthwall: 'https://www.fourthwall.com' },
  { id: 7, name: 'Rover RGB Speaker', category: 'audio', price: 389, badge: 'New', icon: '🔊', desc: 'RGB lighting, 360° surround sound, 20H battery', fourthwall: 'https://www.fourthwall.com' },
  { id: 8, name: 'SmartClip Holder', category: 'accessories', price: 89, badge: null, icon: '📱', desc: 'Magnetic mount, 360° rotation, universal fit', fourthwall: 'https://www.fourthwall.com' },
];

const ORDERS = [
  { id: '#MA-001', customer: 'Youssef Alami', product: 'FreePods 4 Pro', amount: '349 MAD', status: 'delivered', date: '22 Mar' },
  { id: '#MA-002', customer: 'Fatima Zahra', product: 'Watch ER AMOLED', amount: '499 MAD', status: 'processing', date: '23 Mar' },
  { id: '#MA-003', customer: 'Karim Benali', product: 'PowerPack 27000', amount: '279 MAD', status: 'pending', date: '23 Mar' },
  { id: '#MA-004', customer: 'Amina Oufkir', product: 'SpaceBuds Z ANC', amount: '429 MAD', status: 'delivered', date: '21 Mar' },
  { id: '#MA-005', customer: 'Hassan Idrissi', product: 'Rover RGB Speaker', amount: '389 MAD', status: 'processing', date: '24 Mar' },
];

// ---- STATE ----
let cart = [];
let currentPage = 'home';
let currentFilter = 'all';

// ---- DOM READY ----
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  showPage('home');
  setupCart();
  setupToast();
  updateDate();
});

// ---- NAVIGATION ----
function renderNav() {
  const nav = document.getElementById('main-nav');
  nav.innerHTML = `
    <div class="nav-logo">
      <div class="logo-mark">M</div>
      <span>Morocco Store <em>Oraimo</em></span>
    </div>
    <ul class="nav-links" id="nav-links">
      <li><a href="#" onclick="showPage('home'); return false;" class="active" id="nav-home">Accueil</a></li>
      <li><a href="#" onclick="showPage('products'); return false;" id="nav-products">Produits</a></li>
      <li><a href="#" onclick="showPage('about'); return false;" id="nav-about">À propos</a></li>
      <li><a href="#" onclick="showPage('contact'); return false;" id="nav-contact">Contact</a></li>
      <li><a href="#" onclick="showPage('dashboard'); return false;" id="nav-dashboard">Dashboard</a></li>
    </ul>
    <div style="display:flex;align-items:center;gap:16px;">
      <button class="nav-cart" onclick="toggleCart()">
        🛒 Panier <span class="cart-count" id="cart-count">0</span>
      </button>
      <div class="hamburger" id="hamburger" onclick="toggleMenu()">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
}

function setActiveNav(page) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const el = document.getElementById(`nav-${page}`);
  if (el) el.classList.add('active');
}

function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

function showPage(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  setActiveNav(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'products') renderProducts('all');
  if (page === 'dashboard') renderDashboard();
  // close mobile menu
  document.getElementById('nav-links').classList.remove('open');
}

// ---- HOME PAGE ----
document.addEventListener('DOMContentLoaded', () => {
  const homeContent = document.getElementById('page-home');
  if (!homeContent) return;
  homeContent.innerHTML = buildHome();
});

function buildHome() {
  return `
  <div class="pattern-strip"></div>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-geo"></div>
    <div style="width:100%;">
      <div class="hero-content">
        <div class="hero-badge">🇲🇦 Livraison dans tout le Maroc</div>
        <h1>Tech Premium<br><span>Oraimo</span><br>au Maroc</h1>
        <p>Écouteurs ANC, montres connectées, chargeurs ultrarapides et bien plus — livrés directement à votre porte.</p>
        <div class="hero-ctas">
          <button class="btn-primary" onclick="showPage('products')">🛍 Voir les produits</button>
          <button class="btn-secondary" onclick="showPage('about')">En savoir plus</button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><strong>2000+</strong><span>Clients satisfaits</span></div>
        <div class="hero-stat"><strong>50+</strong><span>Produits disponibles</span></div>
        <div class="hero-stat"><strong>48H</strong><span>Livraison rapide</span></div>
        <div class="hero-stat"><strong>100%</strong><span>Produits originaux</span></div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-card-float">
        <span class="product-icon">🎧</span>
        <h3>FreePods 4 Pro</h3>
        <p>ANC · 38H Batterie · Bluetooth 5.3</p>
        <div class="hero-price">349 MAD</div>
      </div>
    </div>
  </section>

  <div class="marquee-wrap">
    <div class="marquee-track">
      <span class="accent">★</span><span>FreePods 4 Pro</span>
      <span class="accent">★</span><span>Watch ER AMOLED</span>
      <span class="accent">★</span><span>PowerPack 27000</span>
      <span class="accent">★</span><span>SpaceBuds Z ANC</span>
      <span class="accent">★</span><span>Rover RGB Speaker</span>
      <span class="accent">★</span><span>Charger Pro 65W</span>
      <span class="accent">★</span><span>FreePods 4 Pro</span>
      <span class="accent">★</span><span>Watch ER AMOLED</span>
      <span class="accent">★</span><span>PowerPack 27000</span>
      <span class="accent">★</span><span>SpaceBuds Z ANC</span>
      <span class="accent">★</span><span>Rover RGB Speaker</span>
      <span class="accent">★</span><span>Charger Pro 65W</span>
    </div>
  </div>

  <section class="features-section">
    <div class="section-header">
      <span class="section-label">Pourquoi nous choisir</span>
      <h2 style="color:#fff">Votre partenaire tech<br>de confiance au Maroc</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🚚</div>
        <h3>Livraison rapide</h3>
        <p>Expédition en 24-48h dans tout le Maroc. Suivi de commande en temps réel.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">✅</div>
        <h3>100% Authentique</h3>
        <p>Produits Oraimo originaux avec garantie officielle et support après-vente.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💳</div>
        <h3>Paiement sécurisé</h3>
        <p>Carte bancaire, virement ou paiement à la livraison. Vos données sont protégées.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔄</div>
        <h3>Retours faciles</h3>
        <p>30 jours pour changer d'avis. Retours gratuits sans questions posées.</p>
      </div>
    </div>
  </section>

  <section style="background:var(--off);padding:100px 5%;">
    <div class="section-header">
      <span class="section-label">Nos bestsellers</span>
      <h2>Produits les plus<br>populaires</h2>
      <p>Découvrez ce que nos clients adorent le plus</p>
    </div>
    <div class="products-grid" id="home-products"></div>
    <div style="text-align:center;margin-top:48px;">
      <button class="btn-primary" onclick="showPage('products')">Voir tous les produits →</button>
    </div>
  </section>
  `;
}

// Render 4 featured products on home
function renderHomeProducts() {
  const container = document.getElementById('home-products');
  if (!container) return;
  const featured = PRODUCTS.slice(0, 4);
  container.innerHTML = featured.map(buildProductCard).join('');
}

// ---- PRODUCTS PAGE ----
function renderProducts(filter) {
  currentFilter = filter;
  const container = document.getElementById('products-grid');
  if (!container) return;
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  container.innerHTML = filtered.map(buildProductCard).join('');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

function buildProductCard(p) {
  const badge = p.badge ? `<div class="product-badge ${p.badge === 'New' ? 'new' : ''}">${p.badge}</div>` : '';
  return `
  <div class="product-card" onclick="openProductDetail(${p.id})">
    ${badge}
    <div class="product-img">${p.icon}</div>
    <div class="product-body">
      <div class="product-category">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-footer">
        <div class="product-price">${p.price} <span>MAD</span></div>
        <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${p.id})">+ Ajouter</button>
      </div>
    </div>
  </div>`;
}

function openProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  // Open Fourthwall link for ordering
  showToast(`🛍 Commander "${p.name}" via notre boutique`);
  setTimeout(() => {
    window.open(p.fourthwall, '_blank');
  }, 800);
}

// ---- ABOUT PAGE ----
function buildAbout() {
  const el = document.getElementById('page-about');
  if (!el) return;
  el.innerHTML = `
  <div class="pattern-strip"></div>
  <section style="padding:140px 5% 100px;background:var(--off);">
    <div class="about-grid">
      <div class="about-visual">
        <div class="about-flag">
          <div class="star-symbol">☆</div>
        </div>
        <div class="about-badge-float">
          Maroc 🇲🇦
          <small>Notre pays, notre fierté</small>
        </div>
      </div>
      <div class="about-content">
        <span class="section-label">À propos de nous</span>
        <h2>Morocco Store Oraimo — La tech accessible à tous</h2>
        <p>Nous sommes un revendeur officiel Oraimo basé au Maroc, passionné par la technologie accessible et de qualité. Notre mission : mettre entre les mains de chaque Marocain des produits premium à des prix justes.</p>
        <p>Depuis notre lancement, nous avons servi plus de 2000 clients satisfaits à travers tout le Royaume. Chaque produit est vérifié, garanti et expédié avec soin depuis notre entrepôt.</p>
        <div class="about-vals">
          <div class="about-val">
            <div class="about-val-icon">🎯</div>
            <div><strong>Notre mission</strong><span>Tech de qualité pour tous</span></div>
          </div>
          <div class="about-val">
            <div class="about-val-icon">🌍</div>
            <div><strong>Couverture</strong><span>Livraison nationale</span></div>
          </div>
          <div class="about-val">
            <div class="about-val-icon">🏅</div>
            <div><strong>Authenticité</strong><span>100% produits originaux</span></div>
          </div>
          <div class="about-val">
            <div class="about-val-icon">💬</div>
            <div><strong>Support</strong><span>7j/7 par WhatsApp</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="features-section">
    <div class="section-header">
      <span class="section-label">Nos valeurs</span>
      <h2 style="color:#fff">Ce qui nous distingue</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card"><div class="feature-icon">🔒</div><h3>Confiance</h3><p>Chaque commande est traitée avec transparence et honnêteté. Votre satisfaction est notre priorité absolue.</p></div>
      <div class="feature-card"><div class="feature-icon">⚡</div><h3>Efficacité</h3><p>Commandez aujourd'hui, recevez demain. Notre logistique est optimisée pour les délais les plus courts.</p></div>
      <div class="feature-card"><div class="feature-icon">🇲🇦</div><h3>Marocain</h3><p>Fier de servir notre communauté. Prix en MAD, support en darija, livraison partout au Maroc.</p></div>
      <div class="feature-card"><div class="feature-icon">💎</div><h3>Qualité</h3><p>Partenaire officiel Oraimo. Chaque produit est original, testé et garanti par le fabricant.</p></div>
    </div>
  </section>
  `;
}

// ---- CONTACT PAGE ----
function buildContact() {
  const el = document.getElementById('page-contact');
  if (!el) return;
  el.innerHTML = `
  <div class="pattern-strip"></div>
  <section class="contact-section" style="padding-top:120px;">
    <div class="section-header">
      <span class="section-label">Contact</span>
      <h2>Contactez-nous</h2>
      <p style="color:rgba(255,255,255,0.5)">Envoyez-nous votre demande — nous répondons sous 24h</p>
    </div>
    <div class="contact-grid">
      <div class="contact-info">
        <h3>Nous sommes là pour vous</h3>
        <p>Que ce soit pour une commande, une question sur un produit ou un retour, notre équipe est disponible 7j/7 pour vous aider.</p>
        <div class="contact-item"><div class="contact-icon">📍</div><div><strong>Adresse</strong><span>Casablanca, Maroc</span></div></div>
        <div class="contact-item"><div class="contact-icon">📱</div><div><strong>WhatsApp</strong><span>+212 6XX XXX XXX</span></div></div>
        <div class="contact-item"><div class="contact-icon">✉️</div><div><strong>Email</strong><span>contact@moroccostore-oraimo.ma</span></div></div>
        <div class="contact-item"><div class="contact-icon">🕐</div><div><strong>Horaires</strong><span>Lun–Sam, 9h–21h</span></div></div>
      </div>
      <div class="contact-form">
        <div class="form-row">
          <div class="form-group"><label>Prénom</label><input type="text" id="f-prenom" placeholder="Votre prénom"></div>
          <div class="form-group"><label>Nom</label><input type="text" id="f-nom" placeholder="Votre nom"></div>
        </div>
        <div class="form-group"><label>Email</label><input type="email" id="f-email" placeholder="votre@email.com"></div>
        <div class="form-group"><label>Téléphone (WhatsApp)</label><input type="tel" id="f-tel" placeholder="+212 6XX XXX XXX"></div>
        <div class="form-group">
          <label>Produit qui vous intéresse</label>
          <select id="f-product">
            <option value="">-- Choisir un produit --</option>
            ${PRODUCTS.map(p => `<option value="${p.name}">${p.name} — ${p.price} MAD</option>`).join('')}
            <option value="autre">Autre / Question générale</option>
          </select>
        </div>
        <div class="form-group"><label>Message</label><textarea id="f-message" placeholder="Décrivez votre demande, quantité souhaitée, adresse de livraison..."></textarea></div>
        <button class="submit-btn" onclick="submitContact()">📩 Envoyer la demande</button>
      </div>
    </div>
  </section>
  `;
}

function submitContact() {
  const prenom = document.getElementById('f-prenom')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();
  if (!prenom || !email) {
    showToast('⚠️ Veuillez remplir les champs obligatoires');
    return;
  }
  showToast('✅ Demande envoyée ! Nous vous répondrons sous 24h');
  // Reset
  ['f-prenom','f-nom','f-email','f-tel','f-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const sel = document.getElementById('f-product');
  if (sel) sel.selectedIndex = 0;
}

// ---- DASHBOARD PAGE ----
function renderDashboard() {
  const el = document.getElementById('page-dashboard');
  if (!el) return;

  const barData = [
    { month: 'Oct', h: 45 }, { month: 'Nov', h: 62 }, { month: 'Déc', h: 88 },
    { month: 'Jan', h: 54 }, { month: 'Fév', h: 71 }, { month: 'Mar', h: 95 },
  ];

  el.innerHTML = `
  <div class="pattern-strip"></div>
  <section class="dashboard-section">
    <div class="dashboard-header-bar">
      <div>
        <h2>📊 Dashboard Analytique</h2>
        <div class="dashboard-date" id="dash-date"></div>
      </div>
      <button class="btn-primary" onclick="showPage('products')">+ Nouvelle commande</button>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card red">
        <div class="kpi-label">Chiffre d'affaires (MAD)</div>
        <div class="kpi-value">48 750</div>
        <div class="kpi-trend up">↑ +18% ce mois</div>
      </div>
      <div class="kpi-card green">
        <div class="kpi-label">Commandes totales</div>
        <div class="kpi-value">143</div>
        <div class="kpi-trend up">↑ +12% ce mois</div>
      </div>
      <div class="kpi-card gold">
        <div class="kpi-label">Produits vendus</div>
        <div class="kpi-value">218</div>
        <div class="kpi-trend up">↑ +9% ce mois</div>
      </div>
      <div class="kpi-card dark">
        <div class="kpi-label">Clients actifs</div>
        <div class="kpi-value">97</div>
        <div class="kpi-trend up">↑ +24% ce mois</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h3>Ventes mensuelles (MAD × 100)</h3>
        <div class="bar-chart">
          ${barData.map(b => `
            <div class="bar-wrap">
              <div class="bar" style="height:${b.h}%"></div>
              <div class="bar-label">${b.month}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="chart-card">
        <h3>Ventes par catégorie</h3>
        <div class="donut-chart">
          <div class="donut"></div>
          <div class="donut-legend">
            <div class="legend-item"><span class="legend-dot" style="background:var(--red)"></span>Audio — 42%</div>
            <div class="legend-item"><span class="legend-dot" style="background:var(--green)"></span>Wearable — 25%</div>
            <div class="legend-item"><span class="legend-dot" style="background:var(--gold)"></span>Power — 15%</div>
            <div class="legend-item"><span class="legend-dot" style="background:#ccc"></span>Accessoires — 18%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="orders-table">
      <h3>Dernières commandes</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Client</th><th>Produit</th><th>Montant</th><th>Date</th><th>Statut</th>
          </tr>
        </thead>
        <tbody>
          ${ORDERS.map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.customer}</td>
              <td>${o.product}</td>
              <td><strong>${o.amount}</strong></td>
              <td>${o.date}</td>
              <td><span class="status-badge ${o.status}">${statusLabel(o.status)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
  `;

  updateDate();
}

function statusLabel(s) {
  return s === 'delivered' ? '✓ Livré' : s === 'pending' ? '⏳ En attente' : '⚙ En cours';
}

// ---- CART ----
function setupCart() {
  const overlay = document.getElementById('cart-overlay');
  overlay.addEventListener('click', toggleCart);
}

function toggleCart() {
  document.getElementById('cart-overlay').classList.toggle('open');
  document.getElementById('cart-sidebar').classList.toggle('open');
  renderCart();
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...p, qty: 1 }); }
  updateCartCount();
  showToast(`✅ "${p.name}" ajouté au panier`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const total = cart.reduce((s, x) => s + x.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><p>Votre panier est vide</p></div>`;
    document.getElementById('cart-total-amount').textContent = '0 MAD';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.icon}</div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>Qté: ${item.qty}</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <div class="cart-item-price">${item.price * item.qty} MAD</div>
        <button class="cart-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  document.getElementById('cart-total-amount').textContent = total + ' MAD';
}

function checkout() {
  if (cart.length === 0) { showToast('⚠️ Votre panier est vide'); return; }
  showToast('🛍 Redirection vers la boutique Fourthwall...');
  setTimeout(() => {
    window.open('https://www.fourthwall.com', '_blank');
  }, 1000);
}

// ---- TOAST ----
function setupToast() {}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ---- DATE ----
function updateDate() {
  const el = document.getElementById('dash-date');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}

// ---- PAGE INIT HOOKS ----
// Called after DOM inserts for dynamic pages
const _origShowPage = showPage;
window.showPage = function(page) {
  _origShowPage(page);
  setTimeout(() => {
    if (page === 'home') { buildHomeContent(); renderHomeProducts(); }
    if (page === 'about') buildAbout();
    if (page === 'contact') buildContact();
  }, 10);
};

function buildHomeContent() {
  const el = document.getElementById('page-home');
  if (el && el.innerHTML.trim() === '') {
    el.innerHTML = buildHome();
  }
}

// Initial page render on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    buildHomeContent();
    renderHomeProducts();
  }, 50);
});
