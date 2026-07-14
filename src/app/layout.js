import "./globals.css";

export const metadata = {
  title: "EMBER & OAK — Artisan Coffee House",
  description:
    "An artisan coffee house crafted for quiet mornings, warm conversations, and perfectly balanced brews. Experience slow-brewed coffee in Bengaluru.",
  keywords: "coffee, cafe, artisan coffee, Bengaluru, Ember and Oak, slow brew",
  openGraph: {
    title: "EMBER & OAK — Artisan Coffee House",
    description:
      "An artisan coffee house crafted for quiet mornings, warm conversations, and perfectly balanced brews.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: '#12100E', color: '#F3E6D0' }}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
