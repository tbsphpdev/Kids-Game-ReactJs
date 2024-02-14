import axios from 'axios';

// export const baseURL = 'http://192.168.1.116:3003/api/';
export const baseURL = 'http://3.238.185.85:3000/api/';

const http = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {},
});

const post = (endpoint, payload, header) => {
  return new Promise((resolve, reject) => {
    http
      .post(endpoint, payload, {
        headers: header,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("API Response:",res, " Resolve:", resolve(res))
          resolve(res);
        } else {
          // console.log("API Response:",res, " Reject:", reject(res))
          reject(res);
        }
      })
      .catch((err) => {
        // debugger
        // console.log("API Response:",err.response,  " Reject:", reject(err))
        if(err.code == "ECONNABORTED" )
        {
          err.response = {
            data: {
              error: "Request Time out"
            }
          }
        }
        reject(err);
      });
  });
};



const put = (endpoint, payload, header) => {
  return fetch(baseURL+endpoint, {
        method:"POST",
        headers: header,
        body:payload
      }
     )
      .then((res) => {
        if (res.status === 200) {
          console.log("API Response:",res)
          return res;
        } else {
         console.log("API Response:",res)
          return res;
        }
      })
      .catch((err) => {
        console.log('Got an error while login', err);
        return err;
      });
};

const get = (endpoint, header) => {
  return new Promise((resolve, reject) => {
    http
      .get(endpoint, {
        headers: header,
      })
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        console.log('Got an error while login2', err);
        reject(err.response);
      });
  });
};

export { post, get, put };
