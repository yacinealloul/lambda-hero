"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  NAV_ITEMS,
  GET_STARTED_MENU,
  type NavItem,
  type MenuColumn,
} from "./nav-config";

const BORDER = "border-[color:var(--color-neutral-800,#262625)]";
const ROW =
  `flex items-center justify-between w-full h-[64px] px-6 text-[14px] tracking-[0.12em] uppercase text-[color:var(--color-shell)] border-b ${BORDER}`;

/* ============================================================
   Hamburger trigger — toggles to X when open
   ============================================================ */

interface MobileMenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ open, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="md:hidden flex h-full items-center justify-center w-[60px] text-[color:var(--color-shell)]"
    >
      {open ? <CloseIcon /> : <HamburgerIcon />}
    </button>
  );
}

/* ============================================================
   Drawer — slides in below the navbar from the right
   ============================================================ */

interface MobileDrawerProps {
  onClose: () => void;
}

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const toggle = (key: string) =>
    setExpandedKey((prev) => (prev === key ? null : key));

  const getStartedAsItem: NavItem = {
    key: "get-started",
    label: "Get started",
    href: "/sign-up",
    menu: [GET_STARTED_MENU],
  };

  return (
    <>
      {/* Backdrop — covers viewport below the navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="md:hidden fixed top-[100px] left-0 right-0 bottom-0 bg-black/60 z-40"
      />

      {/* Drawer panel — right side, sits below the navbar */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.28, ease: [0.6, 0, 0.4, 1] }}
        className={`md:hidden fixed top-[100px] right-0 bottom-0 w-[70%] min-w-[300px] max-w-[460px] bg-black z-50 flex flex-col border-l ${BORDER}`}
        style={{ fontFamily: "var(--font-suisse-mono)" }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <DrawerRow
                key={item.key}
                item={item}
                expanded={expandedKey === item.key}
                onToggle={() => toggle(item.key)}
                onLinkClick={onClose}
              />
            ))}
          </nav>

          <div className="mt-auto">
            <a href="/login" onClick={onClose} className={`${ROW} hover:text-white`}>
              Log in
            </a>
            <DrawerRow
              item={getStartedAsItem}
              expanded={expandedKey === "get-started"}
              onToggle={() => toggle("get-started")}
              onLinkClick={onClose}
            />
          </div>
        </div>
      </motion.aside>
    </>
  );
}

/* ============================================================
   Drawer row — direct link or accordion when item has a submenu
   ============================================================ */

interface DrawerRowProps {
  item: NavItem;
  expanded: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}

function DrawerRow({ item, expanded, onToggle, onLinkClick }: DrawerRowProps) {
  const hasMenu = !!item.menu?.length;

  if (!hasMenu) {
    return (
      <a href={item.href} onClick={onLinkClick} className={`${ROW} hover:text-white`}>
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <div className={`border-b ${BORDER}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex items-center justify-between w-full h-[64px] px-6 text-[14px] tracking-[0.12em] uppercase text-[color:var(--color-shell)] hover:text-white"
      >
        <span>{item.label}</span>
        <PlusMinusIcon expanded={expanded} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.6, 0, 0.4, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {item.menu!.map((column) => (
                <SubColumn
                  key={column.heading}
                  column={column}
                  onLinkClick={onLinkClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubColumn({
  column,
  onLinkClick,
}: {
  column: MenuColumn;
  onLinkClick: () => void;
}) {
  const all = column.extra ? [...column.items, ...column.extra] : column.items;
  return (
    <div className="px-6 pt-3 pb-1">
      <div className="text-[11px] tracking-[0.15em] uppercase text-[color:var(--color-neutral-400,#95948c)] mb-3">
        {column.heading}
      </div>
      <ul className="flex flex-col gap-3">
        {all.map((sub) => (
          <li key={sub.label}>
            <a
              href={sub.href}
              onClick={onLinkClick}
              className="text-[13px] tracking-[0.1em] uppercase text-[color:var(--color-shell)] hover:text-white"
            >
              {sub.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   Icons
   ============================================================ */

function HamburgerIcon() {
  return (
    <span className="relative block w-[22px] h-[14px]" aria-hidden="true">
      <span className="absolute left-0 right-0 top-0 h-[1.5px] bg-current" />
      <span className="absolute left-0 right-0 top-[6px] h-[1.5px] bg-current" />
      <span className="absolute left-0 right-0 top-[12px] h-[1.5px] bg-current" />
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PlusMinusIcon({ expanded }: { expanded: boolean }) {
  return (
    <span className="relative inline-block w-[14px] h-[14px]" aria-hidden="true">
      <span className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 bg-current" />
      <motion.span
        className="absolute top-0 bottom-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current"
        animate={{ scaleY: expanded ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
    </span>
  );
}
