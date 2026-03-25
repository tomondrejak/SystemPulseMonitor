import type { Metadata } from 'next';

import { appFont } from '@/fonts/fonts';
import SideBar from './components/ui/SideBar';
import SiteHeader from './components/ui/SiteHeader';

import '@/styles/styles.scss';

export const metadata: Metadata = {
  title: 'System Pulse Monitor',
  description: 'System Pulse Monitor application built with Next.js, React, and Chart.js to visualize real-time sensor data and performance metrics.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${appFont.variable}`}>
        <div id="appRoot">
          <SiteHeader />
          <div className="main-container">
            <SideBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
