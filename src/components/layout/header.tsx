"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Logo } from "./logo";
import { MegaMenu, MegaColumnStatic } from "./mega-menu";
import { MobileMenuButton, MobileDrawer } from "./mobile-menu";
import { NAV_ITEMS, GET_STARTED_MENU } from "./nav-config";

const BORDER = "border-[color:var(--color-neutral-800,#262625)]";
const LINK_CLS =
  "text-[12px] tracking-[0.12em] uppercase text-[color:var(--color-shell)] hover:text-white transition-colors";

export function Header() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [centerX, setCenterX] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const active = NAV_ITEMS.find((n) => n.key === activeKey);
  const showMenu = !!active?.menu;

  const openMenuFor = (key: string) => {
    setActiveKey(key);
    const el = itemRefs.current[key];
    if (el) {
      const rect = el.getBoundingClientRect();
      setCenterX(rect.left + rect.width / 2);
    }
  };
  const closeMenu = () => setActiveKey(null);

  // Auto-close mobile drawer when crossing the md breakpoint
  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  return (
    <div
      className="fixed top-0 left-0 right-0 lg:right-[40px] z-40"
      onMouseLeave={closeMenu}
    >
      <header
        className={`relative h-[100px] border-b bg-black ${BORDER}`}
        style={{ fontFamily: "var(--font-suisse-mono)" }}
      >
        <div className="flex h-full w-full max-w-[1500px] mx-auto px-4 justify-between">
          <LeftCluster
            activeKey={activeKey}
            itemRefs={itemRefs}
            onItemEnter={openMenuFor}
            onLogoEnter={closeMenu}
          />
          <RightCluster onEnter={closeMenu} />
          <MobileMenuButton
            open={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          />
        </div>
      </header>

      <AnimatePresence>
        {showMenu && active?.menu && (
          <MegaMenu key={active.key} columns={active.menu} centerX={centerX} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Left cluster — Logo + divider + nav tabs
   ============================================================ */

interface LeftClusterProps {
  activeKey: string | null;
  itemRefs: React.RefObject<Record<string, HTMLAnchorElement | null>>;
  onItemEnter: (key: string) => void;
  onLogoEnter: () => void;
}

function LeftCluster({
  activeKey,
  itemRefs,
  onItemEnter,
  onLogoEnter,
}: LeftClusterProps) {
  return (
    <div className="flex items-center pl-2 md:pl-6 lg:pl-10">
      <a
        href="/"
        className="flex h-full items-center"
        aria-label="Lambda — Home"
        onMouseEnter={onLogoEnter}
      >
        <Logo />
      </a>

      <span
        aria-hidden="true"
        className={`hidden md:block h-full w-px ml-6 lg:ml-10 bg-[color:var(--color-neutral-800,#262625)]`}
      />

      <nav className="hidden md:flex h-full items-center pl-4 lg:pl-6">
        {NAV_ITEMS.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <a
              key={item.key}
              ref={(el) => {
                itemRefs.current[item.key] = el;
              }}
              href={item.href}
              onMouseEnter={() => onItemEnter(item.key)}
              onFocus={() => onItemEnter(item.key)}
              aria-expanded={isActive}
              className="flex h-full items-center justify-center px-5 md:px-8 lg:px-14 text-[color:var(--color-shell)] transition-colors"
            >
              <span
                className={`text-[12px] tracking-[0.12em] uppercase px-2 py-1 transition-colors ${
                  isActive
                    ? "bg-[color:var(--color-shell)] text-[color:var(--color-terminal)]"
                    : "text-[color:var(--color-shell)]"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

/* ============================================================
   Right cluster — Log in + Get started (md+ only)
   ============================================================ */

function RightCluster({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="hidden md:flex items-center">
      <a
        href="/login"
        onMouseEnter={onEnter}
        className={`flex h-full items-center border-l px-5 lg:px-10 ${LINK_CLS} ${BORDER}`}
      >
        Log in
      </a>
      <GetStartedButton onMouseEnter={onEnter} />
    </div>
  );
}

function GetStartedButton({ onMouseEnter }: { onMouseEnter: () => void }) {
  return (
    <div className="relative h-full group" onMouseEnter={onMouseEnter}>
      <a
        href="/sign-up"
        className={`lambda-btn lambda-btn--nav flex h-full items-center border-l ${BORDER}`}
      >
        Get started
      </a>
      <div className="absolute top-full right-0 hidden group-hover:block">
        <MegaColumnStatic column={GET_STARTED_MENU} />
      </div>
    </div>
  );
}
