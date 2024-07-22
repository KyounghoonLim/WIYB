//@ts-nocheck
import { useCallback, useLayoutEffect, useRef } from 'react';

export default function useGoogleLogin(
  onSuccess,
  onFail = () => {
    window.dispatchEvent(new CustomEvent('google-login-failed'));
  },
) {
  const ref = useRef<any>(null);

  const clickHandler = useCallback(async (e) => {
    // e.preventDefault();

    let script = document.getElementById('google-oauth2-script');

    if (!script) {
      script = document.createElement('script');

      if (window.location.origin.includes('http')) {
        script.referrerPolicy = 'no-referrer-when-downgrade';
      }
      script.id = 'google-oauth2-script';
      script.async = true;
      script.defer = true;
      script.src = 'https://accounts.google.com/gsi/client';

      ref.current.appendChild(script);

      script.onload = async () => {
        const tokenClient = await google.accounts.oauth2.initTokenClient({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/userinfo.email',
          callback: (tokenResponse) => {
            console.log(tokenResponse);
            onSuccess(tokenResponse.access_token);
          },
          error_callback: (err) => {
            console.log(err);
            err.type !== 'popup_closed' && onFail();
          },
        });
        tokenClient.requestAccessToken();
      };

      script.onerror = () => {
        onFail();
        ref.current.removeChild(script);
      };
    } else {
      const tokenClient = await google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        callback: (tokenResponse) => {
          console.log(tokenResponse);
          onSuccess(tokenResponse.access_token);
        },
        error_callback: (err) => {
          console.log(err);
          err.type !== 'popup_closed' && onFail();
        },
      });
      tokenClient.requestAccessToken();
    }
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;
    else {
      ref.current.addEventListener('click', clickHandler);

      return () => {
        ref.current.removeEventListener('click', clickHandler);
      };
    }
  }, [ref]);

  return ref;
}
