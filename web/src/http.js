import axios from "axios";
import Vue from "vue";
import router from "./router";
const http = axios.create({
  baseURL: "http://localhost:3000/web/api"
});
http.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    localStorage.token &&
      (config.headers.Authorization = "Bearer " + localStorage.token || "");
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
  );
  http.interceptors.response.use(
    res => {
      
      if (res.status === 200) {
        return res.data;
      }
    },
    err => {
      if (err.response.data.message) {
        let message = "";
        switch (err.response.status) {
          case 401:
            message = "token已失效，请登录";
          break;
          case 422:
            message = "账号或密码错误";
          break;
          default:
            message = "接口报错" + err.response.data.message + err.response.status;
          break;
        }
        Vue.prototype.$message({
          type: "error",
          message
        });
        if (err.response.status == 401) {
          router.push("/login");
        }
      }
      return Promise.reject(err);
    }
);
export default http;
