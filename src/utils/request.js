import Axios from "axios";

let url_prefix = {
  test: '/',
}

const url = {
  // 标签类操作 API
  test: url_prefix.test + '',
}

let methods = {
  get: 'get',
  put: 'put',
  post: 'post',
  delete: 'delete',
}

function replaceUrlPrefix(url) {
  let tmp = url
  let urlRegex = /(\/api\/)/
  if (urlRegex.test(tmp)) {
    return tmp.replace(urlRegex, '/')
  }
  return tmp
}

let request = async function request(url, method, param, headers) {
  url = process.env.VUE_APP_API_URL + url
  url = replaceUrlPrefix(url)
  let header = headers === {} ? {headers: headers,} : {}
  switch (method) {
    case methods.get:
      return Axios({
        url: url,
        method: method,
        params: param,
      }, header)
    case methods.put:
    case methods.post:
    case methods.delete:
      // eslint-disable-next-line no-case-declarations
      let paramsData = new URLSearchParams();
      for (let tmp in param) {
        // eslint-disable-next-line no-prototype-builtins
        if (param.hasOwnProperty(tmp)) {
          paramsData.set(tmp, param[tmp]);
        }
      }
      return Axios({
        url: url,
        method: method,
        data: paramsData,
      }, header)
  }
}

const variables = {
  url,
  methods,
  request,
}

export default variables