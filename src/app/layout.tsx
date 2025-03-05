import { Providers } from '@/shared/providers/Providers';
import '@/shared/config/globals.css';
import { Footer } from '@/widgets/layout/Footer/Footer';
import { Header } from '@/widgets/layout/Header/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My test App',
  description: 'Generated test app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="root-layout">
        <Providers>
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
