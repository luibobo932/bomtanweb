import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LiveChat } from "@/components/live-chat";
import { ZaloCta } from "@/components/zalo-cta";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhaphosg.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NhàPhốSG — Video review nhà phố trung tâm Sài Gòn",
    template: "%s | NhàPhốSG",
  },
  description:
    "Nền tảng video review nhà phố TP.HCM đầu tiên: xem thực tế, đọc kiến thức mua nhà từ chuyên gia, tìm listing chính xác tại Q1, Q3, Q5, Q10 dưới 20 tỷ.",
  keywords: [
    "nhà phố Sài Gòn",
    "mua nhà TP HCM",
    "video review nhà",
    "bất động sản quận 1",
    "nhà phố quận 3",
    "mua nhà dưới 20 tỷ",
    "kiến thức mua nhà",
  ],
  authors: [{ name: "NhàPhốSG" }],
  creator: "NhàPhốSG",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "NhàPhốSG",
    title: "NhàPhốSG — Video review nhà phố trung tâm Sài Gòn",
    description:
      "Xem video review nhà thực tế, kiến thức mua nhà từ chuyên gia, listing nhà phố Q1-Q3-Q5-Q10 dưới 20 tỷ.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "NhàPhốSG — Video review nhà phố TP.HCM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NhàPhốSG — Video review nhà phố Sài Gòn",
    description:
      "Video review thực tế + kiến thức mua nhà + listing nhà phố trung tâm TP.HCM.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${geistMono.variable}`}>
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body>
        {children}
        <Analytics />
        <ZaloCta />
        {process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID &&
          process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID && (
            <LiveChat
              propertyId={process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID}
              widgetId={process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID}
            />
          )}
      </body>
    </html>
  );
}
