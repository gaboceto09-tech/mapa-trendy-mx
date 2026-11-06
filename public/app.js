(() => {
  const { SPOTS, CATS, REGIONS } = window;
  const $ = (id) => document.getElementById(id);

  // ───────── Sprites pixel-art (SVG generado desde mapas de caracteres) ─────────
  const GLYPHS = {
    food:    ["#.#.#.", "#.#.#.", "#####.", ".###..", "..#...", "..#..."],
    night:   ["######", ".####.", "..##..", "..##..", "..##..", ".####."],
    culture: ["..##..", "..##..", ".####.", ".####.", "######", "######"],
    trend:   ["..#...", "..##..", ".###..", ".####.", "######", ".####."],
  };
  const PLAYER = [
    "...kkkk...",
    "..krrrrk..",
    ".kkkkkkkk.",
    "..kssssk..",
    "..kksskk..",
    "..kssssk..",
    "...kkkk...",
    "..kbbbbk..",
    ".kbkbbkbk.",
    ".ksbbbbsk.",
    "..kbbbbk..",
    "..kk..kk..",
  ];
  const PAL = { k: "#181425", r: "#e43b44", s: "#f6c49b", b: "#0099db", "#": "#ffffff", w: "#ffffff" };

  function svgFromRows(rows, palette, scale) {
    const h = rows.length, w = rows[0].length;
    let rects = "";
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (palette[ch]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[ch]}"/>`;
    }));
    return `<svg class="sprite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * scale}" height="${h * scale}" shape-rendering="crispEdges">${rects}</svg>`;
  }

  // Insignia 10x12: marco negro, relleno del color de la categoría, glifo blanco, y un "pico" abajo.
  function badgeRows(cat) {
    const g = GLYPHS[cat];
    const rows = [];
    rows.push(".kkkkkkkk.");
    rows.push("kchccccccck".slice(0, 10).replace(/./g, (c, i) => (i === 0 || i === 9 ? "k" : i < 3 ? "h" : "c")));
    for (let y = 0; y < 6; y++) rows.push("kc" + g[y].replace(/\./g, "c") + "ck");
    rows.push("kccccccccd".replace(/d$/, "k"));
    rows.push(".kkkkkkkk.");
    rows.push("...kddk...");
    rows.push("....kk....");
    return rows;
  }
  function darken(hex, f = 0.65) {
    const n = parseInt(hex.slice(1), 16);
    const c = (v) => Math.round(v * f).toString(16).padStart(2, "0");
    return `#${c(n >> 16)}${c((n >> 8) & 255)}${c(n & 255)}`;
  }
  function spotIcon(cat) {
    const color = CATS[cat].color;
    const pal = { k: PAL.k, c: color, h: "#ffffffaa", d: darken(color), "#": "#ffffff" };
    return L.divIcon({ className: "spot-icon", html: svgFromRows(badgeRows(cat), pal, 3), iconSize: [30, 36], iconAnchor: [15, 36] });
  }

  // ───────── Mapa ─────────
  const map = L.map("map", {
    center: [23.6, -102.5], zoom: 5, minZoom: 4, maxZoom: 17,
    maxBounds: [[8, -125], [38, -80]], zoomControl: true, keyboard: false,
  });

  // Truco de pixelado: tiles de 256 mostrados a 512 (zoomOffset -1) con image-rendering: pixelated.
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    tileSize: 512, zoomOffset: -1, maxZoom: 17, className: "pixel-tiles",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Etiquetas de ciudades en fuente pixel
  const CITY_LABELS = [
    ["CDMX", 19.43, -99.13], ["GUADALAJARA", 20.67, -103.35], ["MONTERREY", 25.69, -100.31], ["OAXACA", 17.06, -96.72],
    ["MÉRIDA", 20.97, -89.62], ["CANCÚN", 21.16, -86.85], ["TIJUANA", 32.51, -117.04], ["LOS CABOS", 22.95, -109.8],
    ["PUEBLA", 19.04, -98.2], ["TULUM", 20.21, -87.47], ["SAN MIGUEL", 20.91, -100.74], ["PTO. VALLARTA", 20.65, -105.23],
  ];
  const labelLayer = L.layerGroup(CITY_LABELS.map(([n, lat, lng]) =>
    L.marker([lat, lng], { interactive: false, icon: L.divIcon({ className: "city-label", html: n, iconSize: null, iconAnchor: [-14, 22] }) })
  ));
  const syncLabels = () => (map.getZoom() <= 9 ? labelLayer.addTo(map) : labelLayer.remove());
  map.on("zoomend", syncLabels);
  syncLabels();

  // ───────── Estado / filtros ─────────
  const active = new Set(Object.keys(CATS));
  let heatOn = true;
  const markers = SPOTS.map((s, i) => {
    const m = L.marker([s.lat, s.lng], { icon: spotIcon(s.cat), title: s.name, riseOnHover: true });
    m.on("click", () => openSpot(i, true));
    m.spot = s;
    return m;
  });
  const markerLayer = L.layerGroup().addTo(map);

  // Puntos de calor: el spot + "ruido" a su alrededor para que se vea orgánico
  function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }
  function heatPoints() {
    const pts = [];
    SPOTS.forEach((s, i) => {
      if (!active.has(s.cat)) return;
      const r = rng(i + 7);
      pts.push([s.lat, s.lng, s.heat]);
      for (let k = 0; k < 14; k++) {
        const d = 0.004 + r() * 0.03, a = r() * Math.PI * 2;
        pts.push([s.lat + Math.sin(a) * d, s.lng + Math.cos(a) * d, s.heat * (0.25 + r() * 0.5)]);
      }
    });
    return pts;
  }
  // Gradiente escalonado = look de paleta limitada
  const heat = L.heatLayer([], {
    radius: 26, blur: 16, maxZoom: 7, max: 1, minOpacity: 0.25,
    gradient: { 0.0: "#3b5dc9", 0.3: "#3b5dc9", 0.31: "#41a6f6", 0.5: "#41a6f6", 0.51: "#a7f070", 0.65: "#a7f070", 0.66: "#ffcd75", 0.8: "#ffcd75", 0.81: "#ef7d57", 0.9: "#ef7d57", 0.91: "#b13e53", 1.0: "#b13e53" },
  });

  // El canvas del heat map falla si el mapa mide 0px (p. ej. pestaña oculta al cargar)
  const hasSize = () => { const z = map.getSize(); return z.x > 0 && z.y > 0; };
  function syncHeat() {
    const want = heatOn && hasSize();
    try {
      if (want && !map.hasLayer(heat)) heat.addTo(map);
      if (!want && map.hasLayer(heat)) map.removeLayer(heat);
      if (want) heat.setLatLngs(heatPoints());
    } catch (e) { console.warn("heat map:", e); }
  }
  map.on("resize", syncHeat);

  function render() {
    markerLayer.clearLayers();
    markers.forEach((m) => active.has(m.spot.cat) && markerLayer.addLayer(m));
    syncHeat();
    renderRanking();
  }

  // ───────── UI: regiones, filtros, ranking ─────────
  REGIONS.forEach((r, i) => {
    const b = document.createElement("button");
    b.textContent = r.name;
    if (i === 0) b.classList.add("on");
    b.onclick = () => {
      document.querySelectorAll(".regions button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      closeDialog();
      map.flyTo([r.lat, r.lng], r.z, { duration: 1.2 });
    };
    $("regions").appendChild(b);
  });

  Object.entries(CATS).forEach(([key, c]) => {
    const b = document.createElement("button");
    b.innerHTML = `<i style="background:${c.color}"></i>${c.label}`;
    b.onclick = () => {
      active.has(key) ? active.delete(key) : active.add(key);
      b.classList.toggle("off", !active.has(key));
      render();
    };
    $("filters").appendChild(b);
  });
  $("heatToggle").onchange = (e) => { heatOn = e.target.checked; render(); };

  function renderRanking() {
    const list = SPOTS.map((s, i) => ({ s, i })).filter(({ s }) => active.has(s.cat)).sort((a, b) => b.s.heat - a.s.heat).slice(0, 15);
    $("ranking").innerHTML = list.map(({ s, i }, n) =>
      `<li tabindex="0" data-i="${i}"><span class="n">${String(n + 1).padStart(2, "0")}</span><span><span class="name">${s.name}</span><span class="city">${s.city} · ${CATS[s.cat].label}</span></span><span class="h">${Math.round(s.heat * 100)}°</span></li>`
    ).join("");
  }
  $("ranking").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) { openSpot(+li.dataset.i, true); $("panel").classList.remove("open"); }
  });
  $("ranking").addEventListener("keydown", (e) => { if (e.key === "Enter") e.target.closest("li")?.click(); });
  $("menuBtn").onclick = () => $("panel").classList.toggle("open");

  // ───────── Diálogo con efecto máquina de escribir ─────────
  let typing = null, selected = -1;
  function openSpot(i, fly) {
    const s = SPOTS[i];
    selected = i;
    markers.forEach((m, k) => m._icon && m._icon.classList.toggle("sel", k === i));
    if (fly) map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 14), { duration: 1.1 });
    $("flash").classList.remove("go"); void $("flash").offsetWidth; $("flash").classList.add("go");

    const c = CATS[s.cat];
    $("dBadge").textContent = c.label.toUpperCase();
    $("dBadge").style.background = c.color;
    $("dTitle").textContent = s.name;
    $("dMeta").textContent = `📍 ${s.city}  ${s.tag}`;
    $("dHeat").style.width = "0";
    $("dHeatNum").textContent = `${Math.round(s.heat * 100)}°`;
    $("dialog").classList.remove("hidden");
    requestAnimationFrame(() => ($("dHeat").style.width = `${s.heat * 100}%`));

    clearInterval(typing);
    const text = s.desc; let n = 0;
    $("dText").textContent = "";
    typing = setInterval(() => {
      $("dText").textContent = text.slice(0, ++n);
      if (n >= text.length) clearInterval(typing);
    }, 22);
  }
  function closeDialog() {
    clearInterval(typing);
    $("dialog").classList.add("hidden");
    markers.forEach((m) => m._icon && m._icon.classList.remove("sel"));
    selected = -1;
  }
  $("dialog").onclick = () => {
    const s = SPOTS[selected];
    if (s && $("dText").textContent.length < s.desc.length) { clearInterval(typing); $("dText").textContent = s.desc; }
    else closeDialog();
  };

  // ───────── Jugador: siempre al centro, el mundo se desplaza ─────────
  const playerIcon = L.divIcon({ className: "player-icon", html: `<div class="alert">!</div>${svgFromRows(PLAYER, PAL, 3)}`, iconSize: [30, 36], iconAnchor: [15, 32] });
  const player = L.marker(map.getCenter(), { icon: playerIcon, interactive: false, zIndexOffset: 1000, keyboard: false }).addTo(map);
  let nearest = -1;
  function updatePlayer() {
    player.setLatLng(map.getCenter());
    const c = map.latLngToContainerPoint(map.getCenter());
    let best = -1, bestD = 46;
    SPOTS.forEach((s, i) => {
      if (!active.has(s.cat)) return;
      const d = map.latLngToContainerPoint([s.lat, s.lng]).distanceTo(c);
      if (d < bestD) { bestD = d; best = i; }
    });
    nearest = best;
    player._icon && player._icon.classList.toggle("near", best >= 0);
    $("hint").classList.toggle("hidden", best < 0 || !$("dialog").classList.contains("hidden"));
  }
  map.on("move zoom", updatePlayer);

  const held = new Set();
  const KEYMAP = { ArrowUp: "up", w: "up", W: "up", ArrowDown: "down", s: "down", S: "down", ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right", D: "right" };
  const SPEED = 6;
  function loop() {
    if (held.size) {
      let dx = 0, dy = 0;
      if (held.has("up")) dy -= SPEED;
      if (held.has("down")) dy += SPEED;
      if (held.has("left")) dx -= SPEED;
      if (held.has("right")) dx += SPEED;
      map.panBy([dx, dy], { animate: false });
      if (player._icon) {
        player._icon.classList.add("walk");
        if (dx) player._icon.classList.toggle("left", dx < 0);
      }
    } else if (player._icon) player._icon.classList.remove("walk");
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function pressA() {
    if (!$("dialog").classList.contains("hidden")) return $("dialog").click();
    if (nearest >= 0) openSpot(nearest, false);
  }
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    // "a" se usa para caminar a la izquierda; A mayúscula, Enter, Espacio y Z = botón A
    if (e.key === "Enter" || e.key === " " || e.key === "z" || e.key === "A") { e.preventDefault(); return pressA(); }
    if (e.key === "Escape" || e.key === "x" || e.key === "b" || e.key === "B") return closeDialog();
    if (KEYMAP[e.key]) { e.preventDefault(); held.add(KEYMAP[e.key]); }
  });
  document.addEventListener("keyup", (e) => KEYMAP[e.key] && held.delete(KEYMAP[e.key]));
  window.addEventListener("blur", () => held.clear());

  document.querySelectorAll(".dpad button").forEach((b) => {
    const dir = b.dataset.dir;
    b.addEventListener("pointerdown", (e) => { e.preventDefault(); held.add(dir); });
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => b.addEventListener(ev, () => held.delete(dir)));
  });
  $("aBtn").onclick = pressA;
  $("bBtn").onclick = closeDialog;

  render();
  updatePlayer();
})();
