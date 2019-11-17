const HttpMethods = {
  GET:'GET',
  PUT:'PUT',
  POST:'POST',
  DELETE:'DELETE',
};
const baseUrl = 'https://graph.microsoft.com/v1.0';

let accessToken = null;
export function setAccessTokenApi(_accessToken) {
  accessToken = _accessToken;
}

class Request {
  constructor(build) {
    this.path = build.path;
    this.method = build.method;
    this.pathParams = build.pathParams;
    this.queryParams = build.queryParams;
    this.body = build.body;
    this.headerParams = build.headerParams;
    this.contentType = build.contentType;
  }

  execute() {
    const _this = this;
    return new Promise(function(resolve, reject) {

      let URL = `${baseUrl}/${_this.path}`;

      for(const param of _this.pathParams) {
        URL = `${URL}/${param}`
      }

      if(Object.keys(_this.queryParams).length>0) {
        URL+='?';
        for(const key of Object.keys(_this.queryParams)) {
          URL = `${URL}${key}=${_this.queryParams[key]}&`
        }
        URL = URL.slice(0, -1);// remove terminal '&'
      }

      if(_this.contentType) {
        _this.headerParams['Content-Type'] = _this.contentType;
      }

      if(accessToken) {
        _this.headerParams['Authorization'] = `Bearer ${accessToken}`;
      }

      const options = {
        method: _this.method,
        headers: _this.headerParams,
      };

      if(_this.body) {
        if(_this.contentType==='application/json') {
          options.body = JSON.stringify(_this.body);
        } else {
          options.body = _this.body;
        }
      }

      return fetch(URL, options)
        .then((response)=>{
          if(response.status>=400) {
            return response.json().then((obj)=>{
              reject(obj);
            });
          }
          resolve(response);
        })
        .catch(err=>{
          reject(err);
        });
    })
      .then(response =>response.json())
      ;
  };

  static get Builder() {
    class Builder {
      constructor(path='') {
        // Request default values
        this.path = path;
        this.method = HttpMethods.GET;
        this.pathParams = [];
        this.queryParams = {};
        this.body = null;
        this.headerParams = {};
        this.contentType = 'application/json';
      }

      //   e.g. "me"
      setPath(path) {
        this.path = path;
        return this;
      }

      // [GET|POST|PUT|DELETE|...]
      setMethod(method) {
        this.method = method;
        return this;
      }

      addPathParam(param) {
        this.pathParams.push(param);
        return this;
      }

      addQueryParam(key,value) {
        this.queryParams[key] = value;
        return this;
      }

      setBody(body) {
        this.body = body;
        return this;
      }

      addHeaderParam(key, value) {
        this.headerParams[key] = value;
        return this;
      }

      setContentType(contentType) {
        this.contentType = contentType;
        return this;
      }

      build() {
        return new Request(this);
      }
    }
    return Builder;
  }
}

export function fetchMyTeamsApi() {
  return new Request.Builder('me/memberOf')
    .build()
    .execute();
}

export function fetchGroupMembersApi(groupId) {
  return new Request.Builder(`groups/${groupId}/members`)
    .build()
    .execute();
}

export function submitMemberApi(member) {
  return Promise.resolve();
}
