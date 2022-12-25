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
