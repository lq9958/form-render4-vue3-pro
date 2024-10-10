import axios from "axios";


export const getPathValue = (data, path) => {
  let ret = data
  const paths = path.split(".");
  paths.forEach(path => {
    const matchRet = path.match(/(.*)\[(\d+)\]$/)
    if (matchRet) {
      ret = ret[matchRet[1]][Number(matchRet[2])]
    } else {
      ret = ret[path];
    }
  });
  return ret
}


export const composeParams = (params) => {
  const result = {}
  params.forEach(param => {
    result[param.key] = param.value
  })
  return result
}
/**
 * 
 * @param {string} url 
 * @param {'get'|'post'} method 
 * @param {any} params 
 * @param {url} path 
 * @returns 
 */
export const requestData = async (url, method, params, dataPath) => {
  params = composeParams(params)
  const response = await axios({
    url,
    method,
    params: method === "get" ? params : {},
    data: method !== "get" ? params : {},
  })
  return getPathValue(response.data, dataPath)
}