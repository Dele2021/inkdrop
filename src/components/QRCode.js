"use client";

import { useState, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";

export function QRCode({ url, size = 200, className = "" }) {
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);

  const handleDownload = useCallback(() => {
    const canvas = document.querySelector("#qr-modal-canvas canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `inkdrop-qr-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  return (
    <>
      <div
        className={`inline-block cursor-pointer ${className}`}
        onClick={() => setShowModal(true)}
        title="Click to enlarge"
      >
        <QRCodeCanvas
          value={url}
          size={size}
          bgColor="#0f0d1a"
          fgColor="#e2e0ea"
          level="M"
          marginSize={2}
        />
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-ink-surface rounded-2xl p-6 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div id="qr-modal-canvas" className="flex justify-center mb-4">
              <QRCodeCanvas
                value={url}
                size={300}
                bgColor="#0f0d1a"
                fgColor="#e2e0ea"
                level="M"
                marginSize={4}
              />
            </div>
            <p className="text-sm text-ink-text-secondary mb-4 break-all">
              {url}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="btn-primary flex-1 text-sm"
              >
                Download PNG
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary flex-1 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
