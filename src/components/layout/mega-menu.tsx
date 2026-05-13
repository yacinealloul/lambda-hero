"use client";

import { motion } from "motion/react";
import { HyperText } from "@/components/effects/hyper-text";
import type { MenuColumn, MenuLink } from "./nav-config";

const BORDER = "border-[color:var(--color-neutral-800,#262625)]";
const HEADING_STATIC =
  "text-[11px] tracking-[0.15em] uppercase text-[color:var(--color-neutral-400,#95948c)] mb-5 leading-none";
// HyperText injects its own defaults (py-2 / text-4xl / font-bold) — override with `!`.
const HEADING_HYPER =
  "!py-0 !text-[11px] !font-normal tracking-[0.15em] uppercase text-[color:var(--color-neutral-400,#95948c)] mb-5 leading-none";
const LINK_CLS =
  "text-[12px] tracking-[0.12em] uppercase text-[color:var(--color-shell)] hover:text-white transition-colors";

interface MegaMenuProps {
  columns: MenuColumn[];
  /** X-coordinate (viewport-relative) of the trigger's horizontal center */
  centerX: number;
}

export function MegaMenu({ columns, centerX }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -6, x: "-50%" }}
      transition={{ duration: 0.18, ease: [0.6, 0, 0.4, 1] }}
      className="absolute top-[100px]"
      style={{ left: `${centerX}px` }}
    >
      <div
        className={`flex border border-t-0 bg-black ${BORDER}`}
        style={{ fontFamily: "var(--font-suisse-mono)" }}
      >
        {columns.map((col, i) => (
          <MegaColumn
            key={col.heading}
            column={col}
            isLast={i === columns.length - 1}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface MegaColumnProps {
  column: MenuColumn;
  isLast: boolean;
  /** Position used to stagger the heading scramble animation */
  index: number;
}

function MegaColumn({ column, isLast, index }: MegaColumnProps) {
  return (
    <div
      className={`flex flex-col px-8 py-7 w-[230px] ${
        isLast ? "" : `border-r ${BORDER}`
      }`}
    >
      <HyperText
        as="div"
        duration={500}
        delay={index * 100}
        animateOnHover
        className={HEADING_HYPER}
      >
        {column.heading}
      </HyperText>

      <LinkList items={column.items} />

      {column.extra && (
        <>
          <DottedDivider />
          <LinkList items={column.extra} />
        </>
      )}
    </div>
  );
}

function LinkList({ items }: { items: MenuLink[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((item) => (
        <li key={item.label}>
          <a href={item.href} className={LINK_CLS}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function DottedDivider() {
  return (
    <div
      className="my-5 h-px"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-neutral-700,#42413e) 50%, transparent 50%)",
        backgroundSize: "6px 1px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

/** Static single-column variant used by the Get-Started button hover panel. */
export function MegaColumnStatic({ column }: { column: MenuColumn }) {
  return (
    <div
      className={`flex flex-col px-8 py-7 w-[230px] border border-t-0 bg-black ${BORDER}`}
      style={{ fontFamily: "var(--font-suisse-mono)" }}
    >
      <div className={HEADING_STATIC}>{column.heading}</div>
      <LinkList items={column.items} />
      {column.extra && (
        <>
          <DottedDivider />
          <LinkList items={column.extra} />
        </>
      )}
    </div>
  );
}
