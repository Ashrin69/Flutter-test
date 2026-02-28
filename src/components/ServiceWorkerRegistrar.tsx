'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
        console.log('[SW] Registration successful, scope is:', registration.scope);
      } catch (error) {
        console.error('[SW] Registration failed:', error);
      }
    };

    window.addEventListener('load', registerServiceWorker);

    // This is the seamless reload setup for instant updates.
    // When a new SW takes control, the controllerchange event is fired.
    let refreshing = false;
    const handleControllerChange = () => {
      if (refreshing) return;
      console.log('[SW] Controller changed, reloading page for new content.');
      window.location.reload();
      refreshing = true;
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    // Cleanup the event listener on component unmount
    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  return null;
}
