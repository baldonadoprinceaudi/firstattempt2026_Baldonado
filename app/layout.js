import ServiceWorkerRegistry from '../components/ServiceWorkerRegistry';
import './globals.css';

export const metadata = {
  title: 'ADDU Nation - Alumni Portal',
  description: 'Ateneo de Davao University Alumni Portal',
  manifest: '/manifest.json',
  themeColor: '#050454',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ADDU Nation',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden">
        <ServiceWorkerRegistry />
        {children}
      </body>
    </html>
  );
}