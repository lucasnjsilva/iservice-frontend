import "./globals.css";

export const metadata = {
  title: "iService",
  description: "Encontre o serviço que está procurando.",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

export default RootLayout;
