//@ts-nocheck
import { useLayoutEffect, useRef } from 'react';

export default function useAppleLogin(onSuccess, onFail?) {
  const ref = useRef<any>(null);
  const throttleRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    if (!ref.current) return;
    else {
      let target = document.getElementById('appleid-signin');

      if (!target) {
        target = document.createElement('div');
        target.style.display = 'none';
        target.id = 'appleid-signin';
        ref.current.appendChild(target);
      }

      let script = document.getElementById('apple-oauth2-script');

      if (!script) {
        script = document.createElement('script');

        script.id = 'apple-oauth2-script';
        script.async = true;
        script.defer = true;
        script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';

        target.appendChild(script);

        script.onload = async () => {
          AppleID.auth.init({
            clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
            scope: 'name email',
            redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
            usePopup: true,
          });
        };
      }
      const clickHandler = (e) => {
        e.preventDefault();
        target?.children[0].click();
      };

      const successHandler = async (e) => {
        if (throttleRef.current) return;
        else {
          console.log('success apple login', e);
          throttleRef.current = true;
          await onSuccess(e);
          throttleRef.current = false;
        }
      };

      ref.current.addEventListener('click', clickHandler);
      document.addEventListener('AppleIDSignInOnSuccess', successHandler);
      if (onFail) {
        document.addEventListener('AppleIDSignInOnFailure', onFail);
      }

      return () => {
        ref.current.removeEventListener('click', clickHandler);
        document.removeEventListener('AppleIDSignInOnSuccess', successHandler);
        if (onFail) {
          document.removeEventListener('AppleIDSignInOnFailure', onFail);
        }
      };
    }
  }, [ref]);

  return ref;
}
