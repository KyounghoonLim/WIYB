import myAxios from "../utils/axios/myAxios";

export { healthApi };

function healthApi() {
  return myAxios.get("/health").then(console.log);
}
