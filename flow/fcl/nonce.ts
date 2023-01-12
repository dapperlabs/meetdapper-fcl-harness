import crypto from 'crypto';
import { setCookie, getCookie } from 'cookies-next';
import type { OptionsType } from 'cookies-next/lib/types';

const NONCE_COOKIE_KEY = 'fcl-nonce';

export const getNonce = (options: OptionsType): string => {
  const nonceCookie = getCookie(NONCE_COOKIE_KEY, options);

  if (nonceCookie) {
    return nonceCookie as string;
  }

  const nonce = crypto.randomBytes(32).toString('hex');

  setCookie(NONCE_COOKIE_KEY, nonce, {
    ...options,
    maxAge: 60 * 60 * 24, // expire in 24 hours
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return nonce;
};

export const getNonceServerSide = <P>(options: OptionsType, props?: P) => {
  const nonce = getNonce(options);
  return nonce;
};

export const validateNonce = (options: OptionsType, nonce: string) => {
  const nonceCookie = getCookie(NONCE_COOKIE_KEY, options);
  return nonceCookie === nonce;
};
