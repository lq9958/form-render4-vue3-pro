import axios from "axios";


export const getPathValue = (data, path) => {
  let ret = data
  const paths = path.split(".");
  paths.forEach(path => {
    ret = ret[path];
  });
  return ret
}


export const requestData = async (url, method, params, path) => {
  const response = await axios({
    url,
    method,
    params: method === "get" ? params : {},
    data: method !== "get" ? params : {},
  })
  return getPathValue(response.data, path)
}