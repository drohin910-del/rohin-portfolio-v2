"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { src: string; thumb: string; caption: string; w?: number; h?: number };

export function Gallery({
  items,
  label,
  wide = false,
}: {
  items: readonly Item[];
  label: string;
  wide?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);

  const open = useCallback((i: number, el: HTMLElement) => {
    triggerRef.current = el;
    setIndex(i);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i + d + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => triggerRef.current?.focus();
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = items[index];

  return (
    <>
      <ul className={wide ? "grid gap-5 sm:grid-cols-2" : "grid grid-cols-2 gap-4 lg:grid-cols-4"} aria-label={label}>
        {items.map((it, i) => (
          <li key={it.src}>
            <a
              href={it.src}
              onClick={(e) => {
                e.preventDefault();
                open(i, e.currentTarget);
              }}
              className="group block border border-rule bg-surface p-2 transition-colors hover:border-navy"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.thumb}
                alt=""
                width={it.w ?? 640}
                height={it.h ?? 905}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
              <span className="mt-2 block text-[0.8rem] leading-snug text-muted group-hover:text-ink">
                {it.caption}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${label} — enlarged view`}
        className={`m-auto max-h-[96vh] ${wide ? "w-[min(96vw,1440px)]" : "w-[min(96vw,980px)]"} border border-rule bg-surface p-0 backdrop:bg-ink/70`}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {current ? (
          <figure className="flex max-h-[96vh] flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2">
              <p className="num text-[0.8rem] text-muted">
                {index + 1} / {items.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="min-h-10 rounded-[3px] border border-rule px-3 text-[0.85rem] hover:border-navy"
                  aria-label="Previous image"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="min-h-10 rounded-[3px] border border-rule px-3 text-[0.85rem] hover:border-navy"
                  aria-label="Next image"
                >
                  Next →
                </button>
                <button
                  type="button"
                  onClick={close}
                  autoFocus
                  className="min-h-10 rounded-[3px] bg-navy px-3 text-[0.85rem] text-white"
                  aria-label="Close enlarged view"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="overflow-auto bg-tint p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={`${label}: image ${index + 1} of ${items.length}, enlarged`} className={`mx-auto h-auto w-full ${wide ? "max-w-[1400px]" : "max-w-[900px]"}`} />
            </div>
            <figcaption className="border-t border-rule px-4 py-3 text-[0.9rem] text-body">
              {current.caption}{" "}
              <a href={current.src} target="_blank" rel="noopener noreferrer" className="text-navy underline">
                Open full size
              </a>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
