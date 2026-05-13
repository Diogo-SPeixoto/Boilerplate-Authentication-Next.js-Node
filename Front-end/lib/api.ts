import { cookies } from 'next/headers';

export async function api(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const cookieslist = cookieStore.getAll()

  let res = await fetch(process.env.API_URL + url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      cookie: cookieStore.toString()
    },
  });

  //Refreshy Token Logic
  if (res.status === 401) {
    const resRefresh = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    const resnewAccessToken = await resRefresh.json()

    const newCookieslist = cookieslist.map(token =>{
      if(token.name == "accessToken"){
        return {...token, value: resnewAccessToken.newAccessToken}
      }

      return token
    }).filter(e => e.name == "accessToken" || e.name == "refreshToken")

    const cookieHeader = newCookieslist
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ')

    const newRes = await fetch(process.env.API_URL + url, {
      ...options,
      headers: {
        ...options.headers,
        cookie: cookieHeader
      },
    });

    const resFormatted = await newRes.json()

    return resFormatted
  }

  const resFormatted = await res.json()

  return resFormatted;
}