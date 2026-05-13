import { CookieSerializeOptions } from "@fastify/cookie"

const isProd = process.env.NODE_ENV === "production"

export const optionsAccessToken: CookieSerializeOptions = {
  httpOnly: true,
  signed: false,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  domain: isProd ? "" : "localhost",
  maxAge: 60 * 15,
}

export const optionsRefreshToken: CookieSerializeOptions = {
  httpOnly: true,
  signed: false,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  domain: isProd ? "" : "localhost",
  maxAge: 60 * 60 * 24 * 3,
}

export const accessTokenExpires ="15m"
export const refreshTokenExpires ="3d"

export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_BLOCK_TIME = 60 * 15;