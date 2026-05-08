import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Método Magnético — Domina la Atracción por Mensaje",
  description: "Pack Método Magnético: 6 ebooks con +250 mensajes listos para copiar y pegar. De 'visto' a '¿cuándo nos vemos?'. Aprende a generar atracción real por WhatsApp e Instagram.",
  keywords: ["método magnético", "mensajes de atracción", "bundle dominación", "conquistar por mensaje", "whatsapp atracción", "mensajes para conquistar"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Método Magnético — Domina la Atracción por Mensaje",
    description: "6 ebooks con +250 mensajes listos para copiar y pegar. De 'visto' a '¿cuándo nos vemos?'. Solo $14 USD.",
    url: "https://metodo-magnetico.pages.dev",
    siteName: "Método Magnético",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Método Magnético — Domina la Atracción por Mensaje",
    description: "6 ebooks con +250 mensajes listos para copiar y pegar. Solo $14 USD.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1364626208842548');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1364626208842548&ev=PageView&noscript=1" alt="" />
        </noscript>
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
