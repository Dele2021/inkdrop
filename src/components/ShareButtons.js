"use client";

import { copyToClipboard } from "@/lib/utils";
import toast from "react-hot-toast";

export function ShareButtons({ url, title }) {
  const text = "Pay me via InkDrop: " + title;

  const shareWhatsApp = () => {
    window.open(
      "https://wa.me/?text=" + encodeURIComponent(text + "\n" + url),
      "_blank"
    );
  };

  const shareTelegram = () => {
    window.open(
      "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text),
      "_blank"
    );
  };

  const shareX = () => {
    window.open(
      "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url),
      "_blank"
    );
  };

  const handleCopy = async () => {
    await copyToClipboard(url);
    toast.success("Link copied!");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, text, url }); } catch {}
    }
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button onClick={handleCopy} className="ghost-btn-secondary !py-2 text-sm" title="Copy link">
        📋 Copy
      </button>
      <button onClick={shareWhatsApp} className="ghost-btn-secondary !py-2 !px-3 text-sm" title="WhatsApp">
        💬 WhatsApp
      </button>
      <button onClick={shareTelegram} className="ghost-btn-secondary !py-2 !px-3 text-sm" title="Telegram">
        ✈️ Telegram
      </button>
      <button onClick={shareX} className="ghost-btn-secondary !py-2 !px-3 text-sm" title="Share on X">
        𝕏 Post
      </button>
      {hasNativeShare && (
        <button onClick={handleNativeShare} className="ghost-btn-secondary !py-2 !px-3 text-sm" title="More...">
          📤
        </button>
      )}
    </div>
  );
}
