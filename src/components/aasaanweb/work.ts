import { AASAANWEB_APP_URL } from "@/lib/aasaanweb";

/** Ported from the admin app's client/src/pages/studio-work.ts. Live pages load from the app. */
export const WORK = [
  {
    name: "Parmanand Industries",
    meta: "Jamnagar · brass parts",
    summary: "They make brass parts to a drawing, and have done so since 2001.",
    does: "Custom brass parts in Jamnagar. A drawing, a sample, or a small batch is enough to start.",
    page: "The page shows the machine at work, and 25 years in the trade.",
    reach: "Send a drawing on WhatsApp, see the parts, or call the shop.",
    menu: ["Home", "Products", "About", "FAQ", "Contact"],
    src: "/aasaanweb/examples/parmanand.jpg",
    alt: "Parmanand Industries homepage. A headline about custom brass parts, a photo of a turning machine, and a note of 25 years in Jamnagar.",
    live: `${AASAANWEB_APP_URL}/p/mp_p_Qdbp-RzBxUTfEUg174cDV-aR/preview/`,
    /** Link on this site; next.config redirects /p to the app. */
    open: "/p/mp_p_Qdbp-RzBxUTfEUg174cDV-aR/preview/",
  },
  {
    name: "Shivam Industries",
    meta: "Rajkot · fasteners",
    summary: "They make eye bolts and turned parts. A customer sends a drawing on WhatsApp.",
    does: "Eye bolts, fasteners, and parts turned on a machine, made to a drawing.",
    page: "The bolt is on the page, with the eye, the shank, and the thread marked.",
    reach: "Send a drawing on WhatsApp, or call.",
    menu: ["Home", "About", "Contact"],
    src: "/aasaanweb/examples/shivam.jpg",
    alt: "Shivam Industries homepage. A headline about eye bolts, a labeled photo of a bolt, and buttons to send a drawing or call.",
    live: `${AASAANWEB_APP_URL}/p/mp_p_lmz1hRegecakc8PiVg8Nro4c/preview/`,
    /** Link on this site; next.config redirects /p to the app. */
    open: "/p/mp_p_lmz1hRegecakc8PiVg8Nro4c/preview/",
  },
  {
    name: "EL360",
    meta: "Drawings and models",
    summary: "They turn a sketch into drawings and a 3D look at the product.",
    does: "A sketch, a sample, or an old drawing becomes a 2D drawing, a 3D model, and a view of how the part is installed.",
    page: "The page shows a brass valve taken apart, so a customer can see every piece.",
    reach: "Start a WhatsApp chat about the project.",
    menu: ["Home", "Services", "Products", "About", "Contact"],
    src: "/aasaanweb/examples/el360.jpg",
    alt: "EL360 homepage on a dark background. A headline about seeing a product from every angle, and an exploded brass valve.",
    live: `${AASAANWEB_APP_URL}/p/mp_p_rZPhSb_gLhx2zsCrc0bmrfRh/preview/`,
    /** Link on this site; next.config redirects /p to the app. */
    open: "/p/mp_p_rZPhSb_gLhx2zsCrc0bmrfRh/preview/",
  },
];
