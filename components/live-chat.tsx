"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      setAttributes?: (attrs: Record<string, string>, cb?: () => void) => void;
      customize?: (opts: Record<string, unknown>) => void;
    };
    Tawk_LoadStart?: Date;
  }
}

interface LiveChatProps {
  propertyId: string;
  widgetId: string;
}

export function LiveChat({ propertyId, widgetId }: LiveChatProps) {
  useEffect(() => {
    // Customize widget appearance after load
    window.Tawk_API = window.Tawk_API ?? {};
    window.Tawk_API.onLoad = function () {
      window.Tawk_API?.customize?.({
        // Dịch các label sang tiếng Việt
        strings: {
          "Start Chat": "Bắt đầu chat",
          "Chat With Us": "Chat với chúng tôi",
          "Leave a message": "Để lại tin nhắn",
          "Your name": "Họ tên bạn",
          "Email address": "Email",
          "Your message": "Nội dung",
          "Send": "Gửi",
          "We typically reply within a few minutes": "Chúng tôi thường trả lời trong vài phút",
        },
      });
    };
    window.Tawk_LoadStart = new Date();
  }, []);

  const src = `https://embed.tawk.to/${propertyId}/${widgetId}`;

  return (
    <Script
      id="tawkto-widget"
      src={src}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
