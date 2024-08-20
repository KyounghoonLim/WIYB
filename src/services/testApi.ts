import myAxios from "../utils/axios/myAxios";

export { createDummies };

function createDummies() {
  return myAxios("/product/test");
}
