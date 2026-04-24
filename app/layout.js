import './globals.css';

export const metadata = {
  title: 'ADDU Nation - Alumni Portal',
  description: 'Ateneo de Davao University Alumni Portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}