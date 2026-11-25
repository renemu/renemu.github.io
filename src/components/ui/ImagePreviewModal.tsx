"use client";

import { useEffect, useRef } from "react";

export interface PreviewItem {
  src: string;
  alt: string;
}

interface ImagePreviewModalProps {
  items: PreviewItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export function ImagePreviewModal({
  items,
  index,
  onClose,
  onNavigate,
}: ImagePreviewModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.body.classList.add("preview-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && items.length > 1) {
        onNavigate((index - 1 + items.length) % items.length);
      } else if (event.key === "ArrowRight" && items.length > 1) {
        onNavigate((index + 1) % items.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("preview-open");
    };
  }, [index, items.length, onClose, onNavigate]);

  const current = items[index];
  if (!current) return null;

  return (
    <div id="image-preview-modal" className="image-preview-modal">
      <div className="image-preview-backdrop" onClick={onClose} />
      <div
        className="image-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
      >
        <button
          ref={closeButtonRef}
          className="image-preview-close"
          type="button"
          aria-label="Close preview"
          onClick={onClose}
        >
          &times;
        </button>

        {items.length > 1 && (
          <button
            className="image-preview-prev"
            type="button"
            aria-label="Previous image"
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          >
            &#8249;
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="image-preview-image"
          src={current.src}
          alt={current.alt}
        />

        {items.length > 1 && (
          <button
            className="image-preview-next"
            type="button"
            aria-label="Next image"
            onClick={() => onNavigate((index + 1) % items.length)}
          >
            &#8250;
          </button>
        )}

        <div className="image-preview-count" aria-live="polite">
          {index + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}
