/* ====== CONFIGURAÇÃO: edite apenas este bloco ====== */
const CONFIG = {
  whatsapp: "554730285225", // Somente números, com país e DDD
  phone: "(47) 3028-5225",
  address: "R. Blumenau, 1934 - América, Joinville - SC, 89204-324",
  hours: "Loja: segunda a sexta, 8h às 12h e 13h30 às 18h\nSábado e domingo: fechado\nAtendimento on-line: todos os dias, 8h às 18h\nEm feriados, os horários podem mudar.",
  instagram: "zenatocell", // Usuário sem @
  mapEmbedUrl: "https://maps.google.com/maps?q=R.%20Blumenau%2C%201934%20-%20Am%C3%A9rica%2C%20Joinville%20-%20SC%2C%2089204-324&output=embed"
};
/* =================================================== */

const $ = (s, c = document) => [...c.querySelectorAll(s)];

// WhatsApp: com número configurado abre a conversa; sem número abre o seletor de contato.
$("[data-wa]").forEach(a => {
  const text = encodeURIComponent(a.dataset.msg || "Olá!");
  const num = CONFIG.whatsapp.replace(/\D/g, "");
  a.href = num ? `https://wa.me/${num}?text=${text}` : `https://wa.me/?text=${text}`;
  a.target = "_blank";
  a.rel = "noopener";
});
if (!CONFIG.whatsapp) console.warn("Zenato Cell: defina CONFIG.whatsapp em script.js.");

// Contato: campos vazios mostram aviso de substituição.
const labels = { phone: "telefone", address: "endereço", hours: "horário", instagram: "Instagram" };
$("[data-field]").forEach(el => {
  const k = el.dataset.field, v = CONFIG[k];
  if (!v) { el.innerHTML = `<span class="todo">[Informar ${labels[k]}]</span>`; return; }
  if (k === "phone") {
    el.append(Object.assign(document.createElement("a"), { href: "tel:+55" + v.replace(/\D/g, ""), textContent: v }));
  } else if (k === "address") {
    el.append(v + " ", Object.assign(document.createElement("a"), { href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v), textContent: "Como chegar", target: "_blank", rel: "noopener" }));
  } else if (k === "instagram") {
    const a = Object.assign(document.createElement("a"), { href: `https://instagram.com/${v}`, textContent: "@" + v, target: "_blank", rel: "noopener" });
    el.append(a);
  } else el.textContent = v;
});

// Mapa: só aparece com URL confirmada.
if (CONFIG.mapEmbedUrl) {
  const m = document.getElementById("map");
  m.innerHTML = `<iframe src="${CONFIG.mapEmbedUrl}" title="Mapa da Zenato Cell" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  m.hidden = false;
}

// Menu móvel
const burger = document.querySelector(".burger"), nav = document.getElementById("menu");
const setMenu = open => { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu"); };
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// Revelação suave ao rolar
const io = "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 })
  : null;
$(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

document.getElementById("ano").textContent = new Date().getFullYear();
