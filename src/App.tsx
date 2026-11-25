import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type IconName =
  | "arrow"
  | "pin"
  | "whatsapp"
  | "instagram"
  | "menu"
  | "close"
  | "cheese"
  | "flame"
  | "heart"
  | "clock"
  | "plus";
function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    // Official filled WhatsApp glyph (rendered with fill, not stroke; see below).
    whatsapp: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    cheese: (
      <>
        <path d="M3 11 18 4l3 7v9H3Z" />
        <path d="M3 11h18M8 15h.01M16 16h.01M15 8h.01" />
      </>
    ),
    flame: (
      <path d="M13 2c2 6-3 6-1 10 2 0 3-2 3-4 7 6 5 14-3 14S1 13 7 7c0 4 2 4 2 4-1-4 3-5 4-9Z" />
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === "whatsapp" ? "currentColor" : "none"}
      stroke={name === "whatsapp" ? "none" : "currentColor"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`logo ${footer ? "logo-footer" : ""}`}
      href="#inicio"
      aria-label="Pizza Estofada, ir al inicio"
    >
      <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Pizza Estofada · Sabor Original" />
    </a>
  );
}

const products = [
  {
    name: "Súper Estofada",
    description:
      "Dorada por fuera. Brutal por dentro. Nuestra receta original, bien rellena y con mucho queso.",
    image: "pizza-estofada.png",
    category: "Estofadas",
    badge: "LA FAVORITA",
    note: "Porción desde $17.500 · Jumbo $132.000",
  },
  {
    name: "Stromboli",
    description: "Todo lo que te gusta, enrollado en una masa doradita. Cada corte es otro antojo.",
    image: "stromboli.webp",
    category: "Para variar",
    note: "Un rollo de otro nivel",
  },
  {
    name: "Calzone",
    description: "Una media luna llena de sabor. Masa al horno, relleno generoso y queso fundido.",
    image: "calzone.webp",
    category: "Para variar",
    note: "Un clásico, a nuestra manera",
  },
  {
    name: "Hamburguesa Estofada",
    description: "Sin pan, sin reglas. Carne y queso abrazados por nuestra inconfundible masa.",
    image: "hamburguesa.webp",
    category: "Estofadas",
    badge: "SIN PAN. SIN LÍMITES.",
    note: "Esto no es una hamburguesa cualquiera",
  },
  {
    name: "Pizzetas",
    description: "Pequeñas en tamaño, gigantes en sabor. El antojo perfecto para compartir… o no.",
    image: "pizzetas.webp",
    category: "Para compartir",
    note: "Un antojo que se comparte",
  },
];
// WhatsApp numbers come from the links in the Instagram bio. Salitre is new and has no number yet.
const branches: {
  name: string;
  area: string;
  address: string;
  whatsapp?: string;
  isNew?: boolean;
  lat: number;
  lng: number;
}[] = [
  {
    name: "Salitre",
    area: "Fontibón",
    address: "Av. La Esperanza #69B-50",
    isNew: true,
    lat: 4.65592,
    lng: -74.11255,
  },
  {
    name: "Santa Isabel",
    area: "Los Mártires",
    address: "Calle 1F con Cra. 27A esquina",
    whatsapp: "573118219292",
    lat: 4.5983,
    lng: -74.1009,
  },
  {
    name: "Ciudad Montes",
    area: "Puente Aranda",
    address: "Calle 8 Sur #39-04",
    whatsapp: "573203407672",
    lat: 4.604,
    lng: -74.1137,
  },
  {
    name: "Ciudad Montes",
    area: "Puente Aranda",
    address: "Calle 8 Sur #38-78",
    whatsapp: "573203407672",
    lat: 4.6037,
    lng: -74.1131,
  },
  {
    name: "Ciudad Jardín",
    area: "Antonio Nariño",
    address: "Calle 17 Sur #10A-95",
    whatsapp: "573124790909",
    lat: 4.57975,
    lng: -74.0941,
  },
  {
    name: "Villa Mayor",
    area: "Antonio Nariño",
    address: "Calle 38 Sur #34D-52",
    whatsapp: "573152222248",
    lat: 4.59271,
    lng: -74.1217,
  },
];
const instagram = "https://www.instagram.com/pizzaestofada_/";
const menuPdf = "https://drive.google.com/file/d/1cFom9AWMacdxGECViKRWno0n4HMEnQ6D/view";
const branchLabel = (b: (typeof branches)[number]) => `${b.name} · ${b.address}`;
const directionsUrl = (b: (typeof branches)[number]) =>
  `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`;

function BranchMap({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (i: number | null) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const bounds = L.latLngBounds(branches.map((b) => [b.lat, b.lng]));

  useEffect(() => {
    if (!container.current || map.current) return;
    const m = L.map(container.current, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(m);
    m.fitBounds(bounds, { padding: [40, 40] });
    markers.current = branches.map((b, i) =>
      L.marker([b.lat, b.lng], {
        title: `${b.name} · ${b.address}`,
        icon: L.divIcon({
          className: "",
          html: `<span class="leaflet-pin"><span>${i + 1}</span></span>`,
          iconSize: [34, 42],
          iconAnchor: [17, 42],
          popupAnchor: [0, -38],
        }),
      })
        .addTo(m)
        .bindPopup(
          `<strong>${b.name}</strong><span>${b.address}</span><a href="${directionsUrl(b)}" target="_blank" rel="noreferrer">Cómo llegar →</a>`,
        )
        .on("click", () => onSelect(i)),
    );
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
    };
    // Map is created once; selection is synced by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    markers.current.forEach((mk, i) =>
      mk.getElement()?.firstElementChild?.classList.toggle("selected", i === selected),
    );
    if (selected === null || !map.current) return;
    const b = branches[selected];
    map.current.flyTo([b.lat, b.lng], 16, { duration: 0.8 });
    markers.current[selected].openPopup();
  }, [selected]);

  return (
    <div className="city-map">
      <div ref={container} className="leaflet-holder" aria-label="Mapa de Bogotá con las sedes" />
      <button
        className="map-reset"
        onClick={() => {
          onSelect(null);
          map.current?.closePopup();
          map.current?.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 });
        }}
      >
        Ver todas
      </button>
      <div className="map-badge">
        <strong>6</strong>
        <span>
          PUNTOS DE
          <br />
          PURO SABOR
        </span>
      </div>
    </div>
  );
}

function SectionHeading({
  sticker,
  children,
  description,
  centered = false,
}: {
  sticker: string;
  children: ReactNode;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="sticker">{sticker}</span>
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Scooter() {
  return (
    <svg
      className="scooter"
      viewBox="0 0 500 340"
      fill="none"
      aria-label="Ilustración de un repartidor en moto"
      role="img"
    >
      <ellipse cx="263" cy="306" rx="195" ry="12" fill="#080808" opacity=".3" />
      <g stroke="#f7ecd5" strokeWidth="3">
        <path d="M45 179h96M18 200h93M68 222h58M361 83h70M387 105h77" opacity=".45" />
      </g>
      <circle cx="160" cy="263" r="43" fill="#141414" stroke="#f7ecd5" strokeWidth="6" />
      <circle cx="160" cy="263" r="16" fill="#555" />
      <circle cx="375" cy="263" r="43" fill="#141414" stroke="#f7ecd5" strokeWidth="6" />
      <circle cx="375" cy="263" r="16" fill="#555" />
      <path
        d="M144 221h100l30 39h-97c-17 0-32-16-33-39Z"
        fill="#f5c542"
        stroke="#151515"
        strokeWidth="5"
      />
      <path
        d="M232 260h78c24 0 47-19 46-42l-8-65-22-3 5 61h-54l-23-25h-73v29h59Z"
        fill="#f5c542"
        stroke="#151515"
        strokeWidth="5"
      />
      <path
        d="m348 155 29 108M324 149l28 5M315 146h18"
        stroke="#f7ecd5"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M163 189h90" stroke="#151515" strokeWidth="16" strokeLinecap="round" />
      <path
        d="m258 139-34 44 63 12-17 57h24l30-72-47-28"
        fill="#1a1a1a"
        stroke="#f7ecd5"
        strokeWidth="3"
      />
      <path
        d="m257 82-26 48 44 36 26-48 28 26 13-13-43-48Z"
        fill="#f7ecd5"
        stroke="#151515"
        strokeWidth="4"
      />
      <path d="m248 74 8 20 34-10-5-29" fill="#e3b389" />
      <path
        d="M239 57c-2-40 62-45 64 0l-13 12-49-1Z"
        fill="#151515"
        stroke="#f7ecd5"
        strokeWidth="3"
      />
      <path d="m275 42 27 5-1 14-26 3Z" fill="#f5c542" />
      <rect
        x="135"
        y="97"
        width="89"
        height="82"
        rx="5"
        fill="#171717"
        stroke="#f7ecd5"
        strokeWidth="3"
        transform="rotate(-7 135 97)"
      />
      <text
        x="177"
        y="124"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Anton, sans-serif"
        fontSize="17"
        transform="rotate(-7 177 124)"
      >
        PIZZA
      </text>
      <text
        x="179"
        y="146"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Anton, sans-serif"
        fontSize="17"
        transform="rotate(-7 179 146)"
      >
        ESTOFADA
      </text>
      <path
        d="m390 156 10-21 5 14 16-8-7 22M93 83l7-15 5 12 11-4"
        stroke="#f5c542"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [order, setOrder] = useState<{ product: string; branch: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const openOrder = (product = "Súper Estofada", branch = "") => {
    setMobileOpen(false);
    setOrder({ product, branch });
  };
  useEffect(() => {
    if (order && !dialog.current?.open) dialog.current?.showModal();
    if (!order && dialog.current?.open) dialog.current?.close();
    document.body.style.overflow = order || mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [order, mobileOpen]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const chosenBranch = branches.find((b) => order && branchLabel(b) === order.branch);
  const message = order
    ? `¡Hola, Pizza Estofada ${chosenBranch?.name ?? ""}! Quiero pedir: ${order.product}. ¿Me confirman tamaños, precio y si hay domicilio a mi dirección?`
    : "";

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#menu">Menú</a>
            <a href="#sedes">Sedes</a>
            <a href="#domicilios">Domicilios</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <button className="button button-red header-order" onClick={() => openOrder()}>
            PIDE AHORA <Icon name="arrow" size={17} />
          </button>
          <button
            className="mobile-toggle"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={26} />
          </button>
        </div>
        {mobileOpen && (
          <nav id="mobile-menu" className="mobile-nav" aria-label="Navegación móvil">
            {["Menú", "Sedes", "Domicilios", "Contacto"].map((label, i) => (
              <a
                key={label}
                href={`#${["menu", "sedes", "domicilios", "contacto"][i]}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
                <Icon name="arrow" />
              </a>
            ))}
            <button className="button button-red" onClick={() => openOrder()}>
              PIDE AHORA <Icon name="arrow" />
            </button>
          </nav>
        )}
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-image">
            <img
              src={`${import.meta.env.BASE_URL}images/pizza-estofada.png`}
              alt="Pizza estofada dorada, cortada y con una porción levantada que estira el queso"
              fetchPriority="high"
            />
          </div>
          <div className="hero-shade" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="sticker hero-sticker">NO ES CUALQUIER PIZZA.</span>
              <h1>
                MÁS JUGO.
                <br />
                <span>MÁS ANTOJO.</span>
              </h1>
              <p>
                La receta original que no encuentras
                <br className="desktop-break" /> en otro lugar.
              </p>
              <div className="hero-actions">
                <button className="button button-red" onClick={() => openOrder()}>
                  ¡PÍDELA YA! <Icon name="arrow" />
                </button>
                <a href="#menu" className="button button-outline">
                  VER MENÚ <span className="down-arrow">↘</span>
                </a>
              </div>
              <a className="hero-location" href="#sedes">
                <span className="location-icon">
                  <Icon name="pin" size={18} />
                </span>
                <span>
                  <strong>6 sedes en Bogotá</strong>
                  <small>El antojo está más cerca de lo que crees.</small>
                </span>
                <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="hero-seal">
              <span>100% ORIGINAL</span>
              <strong>
                RELLENA
                <br />
                DE SABOR
              </strong>
              <span>BOGOTÁ, COLOMBIA</span>
            </div>
            <div className="photo-caption">
              <span /> MASA DORADITA. INTERIOR BRUTAL.
            </div>
          </div>
          <a className="scroll-cue" href="#nosotros" aria-label="Descubre nuestra pizza">
            <span /> BAJA Y DÉJATE TENTAR
          </a>
        </section>

        <div className="ticker" aria-label="Sabor original, relleno generoso, puro antojo">
          <div>
            {[0, 1, 2].map((n) => (
              <span key={n} aria-hidden={n > 0}>
                SABOR ORIGINAL <b>✦</b> RELLENO GENEROSO <b>✦</b> HECHA PARA ANTOJAR <b>✦</b> MUCHO,
                MUCHO QUESO <b>✦</b>{" "}
              </span>
            ))}
          </div>
        </div>

        <section className="section about-section" id="nosotros">
          <div className="container about-grid reveal">
            <div className="about-image-wrap">
              <img
                className="about-image"
                src={`${import.meta.env.BASE_URL}images/pizza-estofada.png`}
                alt="Interior jugoso y abundante de nuestra pizza estofada"
                loading="lazy"
              />
              <span className="about-image-tag">
                POR FUERA, DORADITA.
                <br />
                <b>POR DENTRO, UNA LOCURA.</b>
              </span>
              <div className="little-star">✦</div>
            </div>
            <div className="about-copy">
              <SectionHeading sticker="EL SECRETO ESTÁ ADENTRO">
                ¿PIZZA QUÉ?
                <br />
                <span>ES-TO-FA-DA.</span>
              </SectionHeading>
              <p>
                Olvídate de la pizza de siempre. La nuestra es{" "}
                <strong>cerrada, rellena y jugosa</strong>: una masa doradita que guarda todo lo
                bueno adentro.
              </p>
              <p>
                La cortas, el queso se estira y entiendes por qué no hay otra igual. Así de simple.
                Así de brutal.
              </p>
              <div className="features">
                {(
                  [
                    { icon: "flame", label: "Receta", bold: "original" },
                    { icon: "heart", label: "Relleno", bold: "generoso" },
                    { icon: "cheese", label: "Queso que", bold: "se estira" },
                  ] as const
                ).map((f) => (
                  <div key={f.bold}>
                    <Icon name={f.icon} size={28} />
                    <span>
                      {f.label}
                      <strong>{f.bold}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="container">
            <div className="menu-heading reveal">
              <SectionHeading sticker="ELIGE TU PRÓXIMO ANTOJO">
                ACÁ SE COME <span>EN SERIO.</span>
              </SectionHeading>
              <p>
                Sin miedo al queso.
                <br />
                Sin ganas de compartir.
              </p>
            </div>
            <div className="menu-tabs" role="group" aria-label="Filtrar menú">
              {["Todos", "Estofadas", "Para variar", "Para compartir"].map((tab) => (
                <button
                  className={category === tab ? "active" : ""}
                  key={tab}
                  onClick={() => setCategory(tab)}
                  aria-pressed={category === tab}
                >
                  {tab}
                  {tab === "Todos" && <span>05</span>}
                </button>
              ))}
            </div>
            <div className="product-grid">
              {products
                .filter((p) => category === "Todos" || p.category === category)
                .map((product, i) => (
                  <article
                    key={product.name}
                    className={`product-card ${i === 0 && category === "Todos" ? "featured-product" : ""}`}
                  >
                    <div className="product-image-wrap">
                      <img src={`${import.meta.env.BASE_URL}images/${product.image}`} alt={product.name} loading="lazy" />
                      {product.badge && (
                        <span className="sticker product-badge">{product.badge}</span>
                      )}
                      <span className="product-image-index">0{products.indexOf(product) + 1}</span>
                    </div>
                    <div className="product-content">
                      <span className="product-note">{product.note}</span>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <button onClick={() => openOrder(product.name)} className="product-order">
                        LO QUIERO{" "}
                        <span>
                          Pedir <Icon name="arrow" size={18} />
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              {category === "Todos" && (
                <div className="menu-note-card">
                  <Icon name="cheese" size={45} />
                  <h3>
                    ¿CON QUIÉN
                    <br />
                    VAS A <span>PECAR?</span>
                  </h3>
                  <p>Etiqueta a esa persona que nunca le dice que no a una buena pizza.</p>
                  <a href={instagram} target="_blank" rel="noreferrer">
                    @pizzaestofada_ <Icon name="instagram" size={19} />
                  </a>
                </div>
              )}
            </div>
            <p className="menu-footnote">
              Porción, pequeña (30 cm), mediana (35 cm) y jumbo (50 cm). Sabores, especiales,
              spaguetti, ensaladas y bebidas en la carta completa.
            </p>
            <div className="menu-pdf-wrap">
              <a className="button button-outline" href={menuPdf} target="_blank" rel="noreferrer">
                VER CARTA COMPLETA <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        <section className="section locations-section" id="sedes">
          <div className="container">
            <div className="reveal">
              <SectionHeading sticker="EL PARCHE ES AQUÍ" centered>
                BOGOTÁ TIENE <span>BUEN GUSTO.</span>
              </SectionHeading>
              <p className="section-intro">6 sedes. La misma receta original. Encuentra la tuya.</p>
            </div>
            <div className="locations-layout">
              <BranchMap selected={selectedBranch} onSelect={setSelectedBranch} />
              <div className="branch-grid">
                {branches.map((branch, i) => (
                  <article
                    className={`branch-card ${selectedBranch === i ? "selected" : ""}`}
                    key={branch.address}
                  >
                    <div className="branch-top">
                      <span className="branch-number">0{i + 1}</span>
                      <span>{branch.area}</span>
                    </div>
                    <h3>
                      {branch.name}
                      {branch.isNew && <span className="branch-new">¡NUEVA!</span>}
                    </h3>
                    <button
                      className="branch-locate"
                      onClick={() => setSelectedBranch(i)}
                      aria-label={`Ver ${branch.name} en el mapa`}
                    >
                      <Icon name="pin" size={13} />
                      {branch.address}
                    </button>
                    <div className="branch-actions">
                      <a
                        href={directionsUrl(branch)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Cómo llegar <Icon name="arrow" size={14} />
                      </a>
                      <button
                        onClick={() => openOrder("Súper Estofada", branchLabel(branch))}
                      >
                        <Icon name="whatsapp" size={15} /> WhatsApp
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="domicilios" className="delivery-section">
          <div className="container delivery-inner reveal">
            <div className="delivery-copy">
              <span className="sticker sticker-light">TÚ PONES EL PARCHE. NOSOTROS LA PIZZA.</span>
              <h2>
                MISIÓN EN RUTA:
                <br />
                <span>SÚPER ESTOFADA</span>
                <br />A DOMICILIO.
              </h2>
              <p>
                Del horno a tu puerta. Que el único esfuerzo
                <br />
                sea decidir quién se queda con el último pedazo.
              </p>
              <button className="button button-cream" onClick={() => openOrder()}>
                ACTIVA TU ANTOJO <Icon name="arrow" />
              </button>
              <small>
                <Icon name="pin" size={14} /> Consulta cobertura con tu sede más cercana.
              </small>
            </div>
            <div className="delivery-art">
              <span className="delivery-orbit" />
              <span className="delivery-art-label">
                ¡VOY CON
                <br />
                TODO EL QUESO!
              </span>
              <Scooter />
              <span className="delivery-slogan">SABOR ORIGINAL. HASTA TU PUERTA.</span>
            </div>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="container">
            <div className="testimonials-heading reveal">
              <SectionHeading sticker="EL ANTOJO SE CONTAGIA">
                ELLOS YA <span>CAYERON.</span>
              </SectionHeading>
              <a className="social-count" href={instagram} target="_blank" rel="noreferrer">
                <Icon name="instagram" size={28} />
                <span>
                  <strong>+15 MIL</strong>
                  <small>seguidores con buen gusto</small>
                </span>
                <Icon name="arrow" />
              </a>
            </div>
            <div className="testimonials-grid">
              {[
                {
                  text: "Ese primer corte y el queso estirándose… No estaba lista para tanto antojo. La estofada es otro nivel.",
                  name: "Laura M.",
                  initial: "L",
                  color: "#b39a81",
                  place: "Team mucho queso",
                },
                {
                  text: "Uno dice “solo un pedacito” y termina pidiendo otra. El relleno es brutal y la masa, una locura.",
                  name: "Andrés R.",
                  initial: "A",
                  color: "#898d6c",
                  place: "Team no comparto",
                },
                {
                  text: "Nuestro plan favorito de viernes. Una Súper Estofada, buena compañía y cero ganas de cocinar.",
                  name: "Diana P.",
                  initial: "D",
                  color: "#ad7e74",
                  place: "Team viernes de pizza",
                },
              ].map((t) => (
                <figure className="testimonial" key={t.name}>
                  <div className="stars" aria-label="5 de 5 estrellas">
                    ★★★★★
                  </div>
                  <blockquote>“{t.text}”</blockquote>
                  <figcaption>
                    <span className="avatar" style={{ backgroundColor: t.color }}>
                      {t.initial}
                    </span>
                    <span>
                      <strong>{t.name}</strong>
                      <small>{t.place}</small>
                    </span>
                    <span className="quote-mark">”</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="testimonial-note">
              Una muestra del antojo que nos une. Testimonios ilustrativos.
            </p>
          </div>
        </section>

        <section className="final-cta" id="contacto">
          <div className="container final-cta-inner">
            <div>
              <span>DEJA DE MIRAR. EMPIEZA A DISFRUTAR.</span>
              <h2>
                ¿YA TE DIO <span>ANTOJO?</span>
              </h2>
            </div>
            <button className="button button-cream" onClick={() => openOrder()}>
              <Icon name="whatsapp" size={22} /> PIDE POR WHATSAPP <Icon name="arrow" />
            </button>
          </div>
          <span className="cta-background-word" aria-hidden="true">
            ANTOJO
          </span>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Logo footer />
              <p>
                No es cualquier pizza.
                <br />
                Es la original. Es la estofada.
              </p>
            </div>
            <div className="footer-column">
              <h3>EL ANTOJO</h3>
              <a href="#menu">Nuestro menú</a>
              <a href="#nosotros">Sabor original</a>
              <a href="#sedes">Nuestras sedes</a>
              <a href="#domicilios">Domicilios</a>
            </div>
            <div className="footer-column">
              <h3>HABLEMOS</h3>
              <a href={instagram} target="_blank" rel="noreferrer">
                <Icon name="instagram" size={16} /> @pizzaestofada_
              </a>
              <button onClick={() => openOrder()}>
                <Icon name="whatsapp" size={16} /> Haz tu pedido
              </button>
              <span>
                <Icon name="pin" size={16} /> Bogotá, Colombia
              </span>
            </div>
            <div className="footer-column footer-hours">
              <h3>SIEMPRE ES BUEN PLAN</h3>
              <span>
                <Icon name="clock" size={17} /> ¿A qué hora nos vemos?
              </span>
              <p>
                Consulta los horarios y la disponibilidad
                <br />
                de tu sede antes de visitarnos.
              </p>
              <a className="hours-link" href={instagram} target="_blank" rel="noreferrer">
                Consultar horarios <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Pizza Estofada. Todos los derechos reservados.</span>
            <span>HECHA CON ACTITUD. SERVIDA CON QUESO.</span>
            <a href="#inicio">VOLVER ARRIBA ↑</a>
          </div>
        </div>
      </footer>

      <button
        className="floating-whatsapp"
        onClick={() => openOrder()}
        aria-label="Pedir por WhatsApp"
      >
        <Icon name="whatsapp" size={29} />
        <span>¿Un antojito?</span>
      </button>

      <dialog
        ref={dialog}
        className="order-dialog"
        onCancel={() => setOrder(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOrder(null);
        }}
      >
        <div className="dialog-inner">
          <button
            className="dialog-close"
            onClick={() => setOrder(null)}
            aria-label="Cerrar pedido"
          >
            <Icon name="close" size={25} />
          </button>
          <span className="sticker">TU ANTOJO EMPIEZA AQUÍ</span>
          <h2>
            VAMOS POR
            <br />
            <span>ESA ESTOFADA.</span>
          </h2>
          <p>Elige tu favorito y la sede más cercana.</p>
          <label htmlFor="order-product">¿Qué se te antoja?</label>
          <select
            id="order-product"
            value={order?.product ?? products[0].name}
            onChange={(e) => setOrder((o) => (o ? { ...o, product: e.target.value } : o))}
          >
            {products.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
          </select>
          <label htmlFor="order-branch">Tu sede</label>
          <select
            id="order-branch"
            value={order?.branch ?? ""}
            onChange={(e) => setOrder((o) => (o ? { ...o, branch: e.target.value } : o))}
          >
            <option value="" disabled>
              Elige tu sede
            </option>
            {branches.map((b) => (
              <option key={b.address} value={branchLabel(b)}>
                {branchLabel(b)}
              </option>
            ))}
          </select>
          {!chosenBranch ? (
            <div className="contact-notice">
              Elige la sede más cercana y te llevamos directo a su WhatsApp.
            </div>
          ) : chosenBranch.whatsapp ? (
            <a
              className="button button-red order-send"
              href={`https://wa.me/${chosenBranch.whatsapp}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" /> PEDIR POR WHATSAPP <Icon name="arrow" />
            </a>
          ) : (
            <>
              <div className="contact-notice">
                La sede {chosenBranch.name} es nueva y pronto tendrá WhatsApp. Escríbenos por
                Instagram o elige otra sede.
              </div>
              <a className="button button-red" href={instagram} target="_blank" rel="noreferrer">
                <Icon name="instagram" /> ESCRIBIR POR INSTAGRAM <Icon name="arrow" />
              </a>
            </>
          )}
          <a className="share-order" href={menuPdf} target="_blank" rel="noreferrer">
            Ver la carta completa con precios <Icon name="arrow" size={16} />
          </a>
        </div>
      </dialog>
    </>
  );
}
