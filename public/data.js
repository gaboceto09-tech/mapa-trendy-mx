// Spots curados a mano (muestra). heat: 0–1 qué tan "trendy" está ahora.
// cat: food | night | culture | trend
window.SPOTS = [
  // ── CDMX ──
  { name: "El Califa de León", city: "CDMX", cat: "food", lat: 19.4371, lng: -99.1597, heat: 0.98, tag: "#tacosDeLeyenda", desc: "La taquería con estrella Michelin. Pide la gaonera y prepárate para la fila." },
  { name: "Pujol", city: "CDMX", cat: "food", lat: 19.4326, lng: -99.1966, heat: 0.95, tag: "#mole", desc: "Alta cocina mexicana en Polanco. Su mole madre es casi un monumento nacional." },
  { name: "Quintonil", city: "CDMX", cat: "food", lat: 19.4318, lng: -99.1925, heat: 0.93, tag: "#fineDining", desc: "Cocina de temporada con ingredientes mexicanos. De los mejores del mundo según las listas." },
  { name: "Contramar", city: "CDMX", cat: "food", lat: 19.4187, lng: -99.1660, heat: 0.9, tag: "#tostadaDeAtún", desc: "Comida larga de mariscos en la Roma. El pescado a la talla es obligatorio." },
  { name: "Rosetta", city: "CDMX", cat: "food", lat: 19.4175, lng: -99.1607, heat: 0.86, tag: "#rolDeGuayaba", desc: "Casona en la Roma con cocina de autor. La panadería de al lado ya es destino por sí sola." },
  { name: "Handshake Speakeasy", city: "CDMX", cat: "night", lat: 19.4247, lng: -99.1662, heat: 0.92, tag: "#cocteles", desc: "Bar escondido en la Juárez, en el top de los mejores bares del mundo." },
  { name: "Licorería Limantour", city: "CDMX", cat: "night", lat: 19.4185, lng: -99.1626, heat: 0.88, tag: "#mezcalNegroni", desc: "Clásico de la Roma para empezar la noche con un buen coctel." },
  { name: "Museo Frida Kahlo", city: "CDMX", cat: "culture", lat: 19.3551, lng: -99.1625, heat: 0.86, tag: "#CasaAzul", desc: "La Casa Azul en Coyoacán. Compra boletos con días de anticipación." },
  { name: "Arena México", city: "CDMX", cat: "culture", lat: 19.4245, lng: -99.1520, heat: 0.8, tag: "#luchaLibre", desc: "Martes y viernes de lucha libre. Gritos, máscaras y caguamas." },
  { name: "Parque México", city: "CDMX", cat: "trend", lat: 19.4120, lng: -99.1700, heat: 0.82, tag: "#Condesa", desc: "Corazón de la Condesa: perros, cafés de especialidad y brunch infinito." },
  { name: "Bosque de Chapultepec", city: "CDMX", cat: "culture", lat: 19.4204, lng: -99.1819, heat: 0.76, tag: "#museos", desc: "Castillo, Museo de Antropología y lago. Un día no alcanza." },

  // ── Guadalajara / Jalisco ──
  { name: "Alcalde", city: "Guadalajara", cat: "food", lat: 20.6766, lng: -103.3700, heat: 0.88, tag: "#cocinaTapatía", desc: "Cocina mexicana contemporánea del chef Paco Ruano, en el top latinoamericano." },
  { name: "Xokol", city: "Guadalajara", cat: "food", lat: 20.6735, lng: -103.3780, heat: 0.86, tag: "#maíz", desc: "Restaurante dedicado al maíz nixtamalizado. Pequeño, honesto y buenísimo." },
  { name: "Colonia Americana", city: "Guadalajara", cat: "trend", lat: 20.6720, lng: -103.3680, heat: 0.87, tag: "#barrioCool", desc: "Nombrado uno de los barrios más cool del mundo: cafés, bares y galerías." },
  { name: "Hospicio Cabañas", city: "Guadalajara", cat: "culture", lat: 20.6768, lng: -103.3374, heat: 0.7, tag: "#Orozco", desc: "Patrimonio UNESCO con los murales de José Clemente Orozco." },
  { name: "Pueblo de Tequila", city: "Tequila", cat: "culture", lat: 20.8826, lng: -103.8366, heat: 0.82, tag: "#agave", desc: "Campos de agave azul y destilerías. Ve en el tren y regresa feliz." },
  { name: "Sayulita", city: "Nayarit", cat: "trend", lat: 20.8690, lng: -105.4400, heat: 0.8, tag: "#surf", desc: "Pueblo surfero con calles de papel picado y atardeceres de postal." },
  { name: "Malecón de Vallarta", city: "Puerto Vallarta", cat: "night", lat: 20.6100, lng: -105.2350, heat: 0.76, tag: "#malecón", desc: "Esculturas, bares frente al mar y fiesta en la Zona Romántica." },

  // ── Monterrey ──
  { name: "Pangea", city: "Monterrey", cat: "food", lat: 25.6560, lng: -100.3620, heat: 0.82, tag: "#cortes", desc: "Ícono regio de alta cocina. Cortes impecables en San Pedro." },
  { name: "Barrio Antiguo", city: "Monterrey", cat: "night", lat: 25.6680, lng: -100.3080, heat: 0.8, tag: "#fiestaRegia", desc: "Calles empedradas llenas de bares, música en vivo y cantinas." },
  { name: "Parque Fundidora", city: "Monterrey", cat: "culture", lat: 25.6780, lng: -100.2840, heat: 0.74, tag: "#industrial", desc: "Antigua fundidora convertida en parque, sede de festivales y conciertos." },

  // ── Bajío ──
  { name: "San Miguel de Allende", city: "Guanajuato", cat: "culture", lat: 20.9144, lng: -100.7452, heat: 0.88, tag: "#rooftops", desc: "La Parroquia rosa, rooftops y galerías. Siempre en las listas de mejores ciudades." },
  { name: "Callejones de Guanajuato", city: "Guanajuato", cat: "culture", lat: 21.0170, lng: -101.2560, heat: 0.78, tag: "#callejoneadas", desc: "Túneles, colores y callejoneadas con estudiantina." },
  { name: "El Mural de los Poblanos", city: "Puebla", cat: "food", lat: 19.0430, lng: -98.1970, heat: 0.78, tag: "#molePoblano", desc: "Mole poblano y chiles en nogada en pleno centro histórico." },
  { name: "Valle de Bravo", city: "Edomex", cat: "trend", lat: 19.1950, lng: -100.1310, heat: 0.7, tag: "#findeLago", desc: "Escape de fin de semana: lago, parapente y casas de piedra." },

  // ── Oaxaca ──
  { name: "Criollo", city: "Oaxaca", cat: "food", lat: 17.0700, lng: -96.7200, heat: 0.86, tag: "#menúOaxaqueño", desc: "Menú degustación oaxaqueño en una casa preciosa con patio." },
  { name: "Levadura de Olla", city: "Oaxaca", cat: "food", lat: 17.0647, lng: -96.7233, heat: 0.84, tag: "#cocinaDeHumo", desc: "Cocina tradicional elevada de la chef Thalía Barrios." },
  { name: "Mezcalería In Situ", city: "Oaxaca", cat: "night", lat: 17.0590, lng: -96.7270, heat: 0.8, tag: "#mezcal", desc: "Cientos de mezcales artesanales. Pide que te guíen la cata." },
  { name: "Monte Albán", city: "Oaxaca", cat: "culture", lat: 17.0436, lng: -96.7678, heat: 0.74, tag: "#zapotecas", desc: "Ciudad zapoteca en la cima de una montaña con vistas al valle." },
  { name: "Puerto Escondido", city: "Oaxaca", cat: "trend", lat: 15.8580, lng: -97.0560, heat: 0.88, tag: "#Zicatela", desc: "Surf de clase mundial y una escena gastronómica que no para de crecer." },
  { name: "Mazunte", city: "Oaxaca", cat: "trend", lat: 15.6670, lng: -96.5540, heat: 0.75, tag: "#atardecer", desc: "Pueblo mágico de playa: yoga, tortugas y Punta Cometa." },

  // ── Península ──
  { name: "Hartwood", city: "Tulum", cat: "food", lat: 20.1630, lng: -87.4500, heat: 0.85, tag: "#leña", desc: "Todo a la leña, sin electricidad en la cocina. Reservar es un deporte." },
  { name: "Gitano", city: "Tulum", cat: "night", lat: 20.1980, lng: -87.4650, heat: 0.82, tag: "#selva", desc: "Mezcal y DJ bajo bolas disco en medio de la selva." },
  { name: "Zona Arqueológica Tulum", city: "Tulum", cat: "culture", lat: 20.2149, lng: -87.4290, heat: 0.8, tag: "#ruinasConMar", desc: "Ruinas mayas sobre un acantilado turquesa." },
  { name: "Chichén Itzá", city: "Yucatán", cat: "culture", lat: 20.6843, lng: -88.5678, heat: 0.86, tag: "#maravilla", desc: "Una de las 7 maravillas modernas. Llega temprano para evitar el calor." },
  { name: "Paseo de Montejo", city: "Mérida", cat: "trend", lat: 20.9860, lng: -89.6180, heat: 0.82, tag: "#Mérida", desc: "Mansiones, marquesitas y la ciudad más segura del país de moda total." },
  { name: "Laguna de Bacalar", city: "Quintana Roo", cat: "trend", lat: 18.6780, lng: -88.3920, heat: 0.9, tag: "#sieteColores", desc: "La laguna de los siete colores. Kayak al amanecer = vida." },
  { name: "Coco Bongo", city: "Cancún", cat: "night", lat: 21.1360, lng: -86.7460, heat: 0.84, tag: "#show", desc: "Mitad antro, mitad show de acrobacias. La noche más famosa de Cancún." },
  { name: "Quinta Avenida", city: "Playa del Carmen", cat: "night", lat: 20.6280, lng: -87.0730, heat: 0.76, tag: "#5ta", desc: "Peatonal con bares, beach clubs y vida nocturna hasta tarde." },

  // ── Baja California ──
  { name: "Fauna", city: "Valle de Guadalupe", cat: "food", lat: 32.0990, lng: -116.5730, heat: 0.9, tag: "#vinoYfuego", desc: "En los 50 mejores de Latinoamérica, entre viñedos del Valle." },
  { name: "La Guerrerense", city: "Ensenada", cat: "food", lat: 31.8670, lng: -116.6230, heat: 0.86, tag: "#tostadas", desc: "Puesto callejero de tostadas de mariscos con fama internacional." },
  { name: "Telefónica Gastro Park", city: "Tijuana", cat: "food", lat: 32.5220, lng: -117.0300, heat: 0.8, tag: "#foodTrucks", desc: "Food trucks de autor y cerveza artesanal. Tijuana en su mejor momento." },
  { name: "Flora Farms", city: "Los Cabos", cat: "food", lat: 23.0570, lng: -109.6900, heat: 0.82, tag: "#farmToTable", desc: "Granja orgánica con restaurante. Cena bajo las luces de la huerta." },
  { name: "El Arco", city: "Cabo San Lucas", cat: "culture", lat: 22.8760, lng: -109.8920, heat: 0.72, tag: "#findelaTierra", desc: "Donde termina la península. Ve en lancha y busca lobos marinos." },
];

window.CATS = {
  food:    { label: "Restaurantes", color: "#e43b44" },
  night:   { label: "Noche",        color: "#b55088" },
  culture: { label: "Cultura",      color: "#0099db" },
  trend:   { label: "Trending",     color: "#feae34" },
};

window.REGIONS = [
  { name: "MÉXICO", lat: 23.6, lng: -102.5, z: 5 },
  { name: "CDMX", lat: 19.415, lng: -99.17, z: 13 },
  { name: "GDL", lat: 20.675, lng: -103.36, z: 13 },
  { name: "MTY", lat: 25.67, lng: -100.32, z: 12 },
  { name: "OAXACA", lat: 16.6, lng: -96.8, z: 8 },
  { name: "PENÍNSULA", lat: 20.4, lng: -88.0, z: 7 },
  { name: "BAJA", lat: 32.0, lng: -116.6, z: 8 },
];
