import axios from "axios";
export const Signup = async (email, password, photo) => {
  var formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);
  formData.set("photo", photo);
  var response;
  await axios
    .post("http://localhost:8082/api/v1/signup", formData)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
};

export const PinSubmit = async (email, pin) => {
  var response;
  await axios
    .post("http://localhost:8082/api/v1/verify", {
      pin,
      email,
    })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
};

export const Signin = async (email, password) => {
    var response;
    await axios
      .post("http://localhost:8082/api/v1/signin", {
        email,
        password,
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };

export const ForgotPassWord = async (email) => {
    var response;
    await axios
      .post("http://localhost:8082/api/v1/forgot_password", {
        email,
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };

  export const AccessResetPage = async (token,pin) => {
    var response;
    await axios
      .post("http://localhost:8082/api/v1/reset_password_access", {
        token,pin
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };

  export const ResetPassword = async (token,pin,newPassword) => {
    var response;
    await axios
      .post("http://localhost:8082/api/v1/reset_password", {
        token,pin,newPassword
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };