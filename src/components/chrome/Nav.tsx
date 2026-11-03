"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/lib/motion";
import { contact, services, site } from "@/data/site";
import { Magnetic } from "@/components/ui/Magnetic";

const LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nuestra empresa", href: "/nuestra-empresa" },
  { label: "Proyectos", href: "/proyectos" },
];

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useMotionValueEvent(scrollY, "change", (value) => setSolid(value > 60));

  // Close everything on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Clicking away from the services panel closes it.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [servicesOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const servicesActive = pathname.startsWith("/servicios");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-500 ${
          solid || menuOpen
            ? "bg-ink/88 backdrop-blur-md"
            : "bg-gradient-to-b from-ink/60 to-transparent"
        }`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-ivory/15 transition-opacity duration-500 ${
            solid && !menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="container-wide flex items-center justify-between gap-6 py-5 md:py-6">
          {/* Wordmark */}
          <Link
            href="/"
            className="group/logo flex items-baseline gap-3 text-ivory"
            aria-label={`${site.name} — inicio`}
          >
            <span className="font-display text-[1.65rem] leading-none tracking-tight md:text-[2rem]">
              {site.monogram}
            </span>
            <span className="label hidden opacity-55 transition-opacity group-hover/logo:opacity-90 sm:block">
              Carpintería y Ebanistería
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}

            <div
              ref={servicesRef}
              className="relative"
              onPointerEnter={() => {
                window.clearTimeout(closeTimer.current);
                setServicesOpen(true);
              }}
              onPointerLeave={() => {
                closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
              }}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((open) => !open)}
                className={`label relative inline-flex items-center gap-2 py-2 transition-opacity ${
                  servicesActive ? "text-ivory" : "text-ivory/65 hover:text-ivory"
                }`}
              >
                Servicios
                <motion.span
                  aria-hidden
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: ease.outExpo }}
                  className="text-[0.6em] leading-none"
                >
                  ▾
                </motion.span>
                {servicesActive && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-copper-2" />
                )}
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: ease.outExpo }}
                    className="absolute right-0 top-full w-[26rem] border border-ivory/12 bg-ink-2/97 p-2 backdrop-blur-md"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group/item flex items-baseline gap-4 px-4 py-3.5 transition-colors hover:bg-ivory/6"
                      >
                        <span className="label shrink-0 text-copper-2/80">{service.number}</span>
                        <span className="flex-1">
                          <span className="block font-display text-[1.15rem] leading-tight text-ivory">
                            {service.nav}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="shrink-0 translate-x-0 text-ivory/40 transition-transform duration-300 group-hover/item:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/contacto" active={isActive("/contacto")}>
              Contacto
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href={contact.phones[0].href}
              className="label hidden text-ivory/65 transition-colors hover:text-ivory xl:block"
            >
              {contact.phones[0].label}
            </a>
            <Magnetic>
              <Link
                href="/contacto"
                className="label hidden border border-ivory/35 px-5 py-3 text-ivory transition-colors duration-400 hover:border-copper-2 hover:bg-copper-2 hover:text-ink md:inline-block"
              >
                Presupuesto
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              className="label flex items-center gap-3 py-2 text-ivory lg:hidden"
            >
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
              {menuOpen ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} isActive={isActive} />
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`label relative py-2 transition-colors ${
        active ? "text-ivory" : "text-ivory/65 hover:text-ivory"
      }`}
    >
      {children}
      {active && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-copper-2" />}
    </Link>
  );
}

function MobileMenu({
  open,
  isActive,
}: {
  open: boolean;
  isActive: (href: string) => boolean;
}) {
  const items = [
    ...LINKS,
    ...services.map((s) => ({ label: s.nav, href: s.href })),
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-movil"
          className="fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-ink pt-24 lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.7, ease: ease.inOutQuint }}
        >
          <nav aria-label="Principal móvil" className="container-wide flex-1 py-8">
            <ul>
              {items.map((item, index) => (
                <li key={item.href} className="border-b border-ivory/10">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: ease.outExpo,
                      delay: 0.14 + index * 0.055,
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between gap-4 py-4"
                    >
                      <span
                        className={`font-display text-[clamp(1.6rem,7vw,2.4rem)] leading-tight ${
                          isActive(item.href) ? "text-copper-2" : "text-ivory"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span aria-hidden className="label shrink-0 text-ivory/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.span>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-wide space-y-1 pb-12 pt-4 text-ivory/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {contact.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className="block py-1 text-lede">
                {phone.label}
              </a>
            ))}
            <a href={`mailto:${contact.email}`} className="block break-all py-1 text-lede">
              {contact.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
