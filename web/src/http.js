import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/web/api"
});
http.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default http;
