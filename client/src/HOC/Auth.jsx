import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3300/api";
axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("jwt");

    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    toLogin = () => {
      this.props.history.push("/login");
    };
    toRegister = () => {
      this.props.history.push("/register");
    };
    render() {
      const token = localStorage.getItem("jwt");
      const notLoggedIn = (
        <div>
          <h1>To see the jokes, please log in or register.</h1>
        </div>
      );

      return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  };
}