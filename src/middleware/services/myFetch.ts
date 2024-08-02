import { SERVICE_PATH } from "@/src/constants/path.constant";

export { myFetch };

async function myFetch(pathname: string, fetchOptions: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_API_HOST;
  const url = baseUrl + pathname;

  const res = await fetch(url, {
    ...fetchOptions,
  });

  if (res.ok) return res;
  else {
    if (pathname === SERVICE_PATH.TOKEN_REFRESH) return res;
    else {
      console.log("토큰이 만료되었습니다. 토큰 갱신을 시도합니다.");
      const refreshUrl = baseUrl + SERVICE_PATH.TOKEN_REFRESH;
      const refreshRes = await fetch(refreshUrl, {
        ...fetchOptions,
        method: "get",
      });

      console.log(refreshRes);

      if (refreshRes.ok) {
        console.log("토큰 갱신이 완료되었습니다. 이전 요청을 재시도합니다.");
        return await fetch(url, {
          ...fetchOptions,
        });
      } else {
        console.log("토큰 갱신에 실패했습니다.");
        return refreshRes;
      }
    }
  }
}
