'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistry() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log('ADDU Nation SW registered with scope: ', registration.scope);
          },
          function (err) {
            console.log('ADDU Nation SW registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return null;
}