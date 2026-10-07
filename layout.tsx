import "./globals.css";

export const metadata = {
  title: "Groww First",
  description: "A guided first-investment experience for GenZ investors"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
