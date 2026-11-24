/* Aurelia Home – shared script: header/footer, products, search, cart, login */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => '$' + n.toLocaleString('en-US');
const store = { get: (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v } catch (e) { return d } }, set: (k, v) => localStorage.setItem(k, JSON.stringify(v)) };

const PRODUCTS = [
    { id: 1, name: "Alba Velvet Sofa", cat: "Sofas", price: 2890, desc: "Deep three-seater in cocoa velvet with a solid oak frame." },
    { id: 2, name: "Linea Bouclé Sofa", cat: "Sofas", price: 3450, desc: "Soft bouclé curves, feather-wrapped cushions, hand finished." },
    { id: 3, name: "Selene Armchair", cat: "Chairs", price: 1190, desc: "A low, rounded armchair made for long afternoons." },
    { id: 4, name: "Verona Dining Chair", cat: "Chairs", price: 420, desc: "Leather seat, walnut frame, sold individually." },
    { id: 5, name: "Oriel Dining Table", cat: "Tables", price: 2750, desc: "Solid walnut top seating eight, with a hand-oiled finish." },
    { id: 6, name: "Mesa Coffee Table", cat: "Tables", price: 980, desc: "Travertine-look top on a sculpted espresso base." },
    { id: 7, name: "Noor King Bed", cat: "Beds", price: 3890, desc: "Upholstered headboard in linen, with a low solid-wood base." },
    { id: 8, name: "Calm Twin Bed", cat: "Beds", price: 1950, desc: "Slim padded headboard and hidden storage drawers." },
    { id: 9, name: "Halo Floor Lamp", cat: "Lighting", price: 640, desc: "Brass stem with a hand-pleated linen shade." },
    { id: 10, name: "Dusk Table Lamp", cat: "Lighting", price: 310, desc: "Ceramic base glazed in camel, warm diffused light." },
    { id: 11, name: "Atelier Sideboard", cat: "Storage", price: 2380, desc: "Four fluted doors, soft-close hinges, oak interior." },
    { id: 12, name: "Arch Bookcase", cat: "Storage", price: 1620, desc: "Open arched shelving in stained oak, 200 cm tall." }];
const CATS = [["Sofas", "Lounge in quiet comfort"], ["Chairs", "Seats with presence"], ["Tables", "Where people gather"], ["Beds", "Sleep, properly"], ["Lighting", "Warm light, soft shadow"], ["Storage", "Order, made beautiful"]];

/* furniture drawings (inline SVG, no images needed) */
function art(cat) {
    const e = '#4A342A', c = '#7D5A44', m = '#B2967D', l = '#F5F1EA';
    const s = {
        Sofas: `<rect x="34" y="38" width="132" height="50" rx="18" fill="${c}"/><rect x="18" y="64" width="42" height="44" rx="16" fill="${m}"/><rect x="140" y="64" width="42" height="44" rx="16" fill="${m}"/><rect x="52" y="70" width="96" height="34" rx="10" fill="${c}"/><rect x="40" y="108" width="6" height="14" fill="${e}"/><rect x="154" y="108" width="6" height="14" fill="${e}"/>`,
        Chairs: `<rect x="68" y="22" width="64" height="62" rx="26" fill="${c}"/><rect x="56" y="82" width="88" height="22" rx="10" fill="${m}"/><rect x="62" y="104" width="6" height="22" fill="${e}"/><rect x="132" y="104" width="6" height="22" fill="${e}"/>`,
        Tables: `<rect x="24" y="58" width="152" height="12" rx="6" fill="${c}"/><rect x="44" y="70" width="8" height="54" fill="${e}"/><rect x="148" y="70" width="8" height="54" fill="${e}"/><rect x="60" y="48" width="22" height="10" rx="4" fill="${m}"/>`,
        Beds: `<rect x="26" y="24" width="148" height="64" rx="16" fill="${m}"/><rect x="20" y="78" width="160" height="32" rx="10" fill="${c}"/><rect x="34" y="62" width="60" height="18" rx="9" fill="${l}"/><rect x="106" y="62" width="60" height="18" rx="9" fill="${l}"/><rect x="26" y="110" width="8" height="14" fill="${e}"/><rect x="166" y="110" width="8" height="14" fill="${e}"/>`,
        Lighting: `<path d="M72 20h56l16 44H56z" fill="${m}"/><rect x="97" y="64" width="6" height="52" fill="${e}"/><ellipse cx="100" cy="120" rx="30" ry="6" fill="${c}"/>`,
        Storage: `<rect x="30" y="34" width="140" height="76" rx="8" fill="${c}"/><path d="M65 34v76M100 34v76M135 34v76" stroke="${e}" stroke-width="2"/><circle cx="86" cy="72" r="3" fill="${l}"/><circle cx="114" cy="72" r="3" fill="${l}"/><rect x="40" y="110" width="6" height="14" fill="${e}"/><rect x="154" y="110" width="6" height="14" fill="${e}"/>`
    };
    return `<svg viewBox="0 0 200 130" aria-hidden="true">${s[cat]}</svg>`
}

const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 36V19a14 14 0 0 1 28 0v17" fill="none" stroke="#4A342A" stroke-width="2"/><rect x="11" y="22" width="18" height="8" rx="3" fill="#7D5A44"/><rect x="9" y="25" width="5" height="8" rx="2" fill="#B2967D"/><rect x="26" y="25" width="5" height="8" rx="2" fill="#B2967D"/></svg>`;
const I = { search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></svg>', user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 15-5 16 0"/></svg>', bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>', menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' };

/* ---------- layout ---------- */
function buildLayout() {
    const p = location.pathname.split('/').pop() || 'index.html';
    const L = [["index.html", "Home"], ["shopping.html", "Shop"], ["about.html", "About us"], ["contact.html", "Contact us"]];
    $('#site-header').outerHTML = `<header class="hd"><div class="wrap"><a class="logo" href="index.html">${LOGO}Aurelia Home</a>
<nav class="nav" id="nav">${L.map(x => `<a href="${x[0]}" class="${p === x[0] ? 'on' : ''}">${x[1]}</a>`).join('')}</nav>
<div class="tools"><button class="ib" id="srchBtn" aria-label="Search products">${I.search}</button>
<button class="who" id="userBtn" aria-label="Account">Sign in</button>
<button class="ib" id="cartBtn" aria-label="Open cart">${I.bag}<span class="badge" id="cnt">0</span></button>
<button class="ib burger" id="burger" aria-label="Menu">${I.menu}</button></div></div></header>`;
    $('#site-footer').outerHTML = `<footer class="ft"><div class="wrap"><div class="cols"><div><h4>Aurelia Home</h4><p>Luxury furniture in natural tones, made to last a lifetime.</p></div>
<div><h4>Explore</h4>${L.map(x => `<a href="${x[0]}">${x[1]}</a>`).join('')}</div>
<div><h4>Visit</h4><p>12 Artisan Row, Damascus<br>hello@aureliahome.com<br>+963 11 000 0000</p></div></div><div class="cp">© ${new Date().getFullYear()} Aurelia Home. All rights reserved.</div></div></footer>
<div class="ov" id="ov"></div>
<aside class="drawer" id="drawer" aria-label="Cart"><header><h3>Your cart</h3><button class="ib" data-close aria-label="Close">✕</button></header><div class="items" id="items"></div>
<footer><div class="tot"><span>Total</span><span id="total">$0</span></div><button class="btn block" id="checkout">Checkout</button></footer></aside>
<div class="modal" id="modal" role="dialog" aria-modal="true"><button class="ib x" data-close aria-label="Close">✕</button><h3>Welcome</h3>
<div class="tabs"><button class="on" data-tab="login">Sign in</button><button data-tab="register">Create account</button></div>
<form class="form" id="authForm"><label id="nameRow" hidden>Full name<input name="name" autocomplete="name"></label>
<label>Email<input name="email" type="email" required autocomplete="email"></label>
<label>Password<input name="password" type="password" minlength="6" required autocomplete="current-password"></label>
<p class="msg" id="authMsg"></p><button class="btn block" id="authGo">Sign in</button></form></div><div class="toast" id="toast"></div>`;
}
function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('show'), 2400) }
function openLayer(id) { $('#ov').classList.add('open'); $(id).classList.add('open') }
function closeLayers() { $$('.open').forEach(e => e.classList.remove('open')) }

/* ---------- cart ---------- */
let cart = store.get('ah_cart', []);
function saveCart() { store.set('ah_cart', cart); renderCart() }
function addToCart(id) { const i = cart.find(x => x.id === id); i ? i.qty++ : cart.push({ id, qty: 1 }); saveCart(); toast('Added to your cart') }
function renderCart() {
    $('#cnt').textContent = cart.reduce((a, b) => a + b.qty, 0);
    const box = $('#items');
    if (!cart.length) { box.innerHTML = '<p class="empty">Your cart is empty. Browse the shop to add pieces.</p>' }
    else box.innerHTML = cart.map(c => {
        const p = PRODUCTS.find(x => x.id === c.id); return `<div class="it"><div class="th">${art(p.cat)}</div><div><b>${p.name}</b><br><small>${money(p.price)}</small>
<div class="qty"><button data-q="-1" data-id="${p.id}" aria-label="Less">−</button><span>${c.qty}</span><button data-q="1" data-id="${p.id}" aria-label="More">+</button></div></div>
<button class="rm" data-rm="${p.id}">Remove</button></div>`
    }).join('');
    $('#total').textContent = money(cart.reduce((a, c) => a + c.qty * PRODUCTS.find(x => x.id === c.id).price, 0));
}

/* ---------- products ---------- */
function cardHTML(p) {
    return `<article class="card"><div class="pic">${art(p.cat)}</div><div class="bd"><span class="ct">${p.cat}</span><h3>${p.name}</h3><p>${p.desc}</p>
<div class="row"><span class="price">${money(p.price)}</span><button class="btn" data-add="${p.id}">Add to cart</button></div></div></article>`
}
function initShop() {
    const g = $('#grid'); if (!g) return;
    const u = new URLSearchParams(location.search); let cat = u.get('cat') || 'All';
    const q = $('#q'); q.value = u.get('q') || '';
    $('#chips').innerHTML = ['All', ...CATS.map(c => c[0])].map(c => `<button class="chip ${c === cat ? 'on' : ''}" data-cat="${c}">${c}</button>`).join('');
    const draw = () => {
        const t = q.value.trim().toLowerCase(), s = $('#sort').value;
        let r = PRODUCTS.filter(p => (cat === 'All' || p.cat === cat) && (p.name + p.cat + p.desc).toLowerCase().includes(t));
        if (s === 'lo') r.sort((a, b) => a.price - b.price); if (s === 'hi') r.sort((a, b) => b.price - a.price);
        $('#count').textContent = r.length + (r.length === 1 ? ' piece' : ' pieces');
        g.innerHTML = r.length ? r.map(cardHTML).join('') : '<p class="empty">No pieces match your search. Try another word or choose All.</p>'
    };
    q.oninput = draw; $('#sort').onchange = draw;
    $('#chips').onclick = e => { const b = e.target.closest('[data-cat]'); if (!b) return; cat = b.dataset.cat; $$('.chip').forEach(c => c.classList.toggle('on', c === b)); draw() };
    draw(); if (u.get('q')) q.focus();
}
function initHome() {
    const f = $('#featured'); if (f) f.innerHTML = [1, 5, 7, 9].map(i => cardHTML(PRODUCTS.find(p => p.id === i))).join('');
    const c = $('#cats'); if (c) c.innerHTML = CATS.map(x => `<a class="cat" href="shopping.html?cat=${x[0]}"><h3>${x[0]}</h3><span>${x[1]}</span></a>`).join('');
}

/* ---------- auth (PHP + MySQL, with local fallback if PHP is not running) ---------- */
let user = store.get('ah_user', null), mode = 'login';
async function api(action, data) {
    try { const r = await fetch('php/auth.php?action=' + action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data || {}) }); return JSON.parse(await r.text()) } catch (e) { return null }
}
function renderUser() { $('#userBtn').textContent = user ? ('Hi, ' + user.name.split(' ')[0]) : 'Sign in' }
function setMode(m) { mode = m; $$('[data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === m)); $('#nameRow').hidden = m === 'login'; $('#nameRow input').required = m === 'register'; $('#authGo').textContent = m === 'login' ? 'Sign in' : 'Create account'; $('#authMsg').textContent = '' }
async function submitAuth(e) {
    e.preventDefault(); const d = Object.fromEntries(new FormData(e.target)), msg = $('#authMsg');
    let res = await api(mode, d);
    if (!res) { // local fallback
        const users = store.get('ah_users', []), em = d.email.toLowerCase(), pw = btoa(d.password);
        if (mode === 'register') { if (users.some(u => u.email === em)) res = { ok: false, error: 'This email is already registered.' }; else { users.push({ name: d.name, email: em, pw }); store.set('ah_users', users); res = { ok: true, user: { name: d.name, email: em } } } }
        else { const u = users.find(u => u.email === em && u.pw === pw); res = u ? { ok: true, user: { name: u.name, email: em } } : { ok: false, error: 'Email or password is incorrect.' } }
    }
    if (!res.ok) { msg.textContent = res.error || 'Something went wrong. Try again.'; return }
    user = res.user; store.set('ah_user', user); renderUser(); closeLayers(); e.target.reset(); toast('Welcome, ' + user.name.split(' ')[0])
}
async function logout() { await api('logout'); user = null; localStorage.removeItem('ah_user'); renderUser(); toast('You are signed out') }

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    buildLayout(); renderCart(); renderUser(); initHome(); initShop();
    document.addEventListener('click', e => {
        const t = e.target;
        if (t.closest('[data-add]')) addToCart(+t.closest('[data-add]').dataset.add);
        if (t.closest('[data-q]')) { const b = t.closest('[data-q]'), i = cart.find(x => x.id === +b.dataset.id); i.qty += +b.dataset.q; if (i.qty < 1) cart = cart.filter(x => x !== i); saveCart() }
        if (t.closest('[data-rm]')) { cart = cart.filter(x => x.id !== +t.closest('[data-rm]').dataset.rm); saveCart() }
        if (t.closest('[data-tab]')) setMode(t.closest('[data-tab]').dataset.tab);
        if (t.closest('[data-close]') || t === $('#ov')) closeLayers()
    });
    $('#cartBtn').onclick = () => openLayer('#drawer');
    $('#userBtn').onclick = () => user ? (confirm('Sign out of ' + user.email + '?') && logout()) : openLayer('#modal');
    $('#burger').onclick = () => $('#nav').classList.toggle('open');
    $('#srchBtn').onclick = () => $('#q') ? $('#q').focus() : location.href = 'shopping.html?q=' + encodeURIComponent(prompt('Search products') || '');
    $('#authForm').onsubmit = submitAuth;
    $('#checkout').onclick = () => { if (!cart.length) return toast('Your cart is empty'); if (!user) { closeLayers(); openLayer('#modal'); return toast('Sign in to checkout') } cart = []; saveCart(); closeLayers(); toast('Order placed. Thank you!') };
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLayers() });
    const cf = $('#contactForm'); if (cf) cf.onsubmit = e => { e.preventDefault(); const m = store.get('ah_msgs', []); m.push(Object.fromEntries(new FormData(cf))); store.set('ah_msgs', m); cf.reset(); $('#cmsg').textContent = 'Thank you. We will reply within one working day.' };
});
