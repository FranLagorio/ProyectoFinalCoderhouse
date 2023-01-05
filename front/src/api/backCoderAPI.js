import axios from "axios";

export const backendAPI = axios.create({
  baseURL: "http://localhost:8080/",
});

export const loginUser = (body, setUser, setAlert) => {
  axios
    .post("http://localhost:8080/login", body)
    .then(function (response) {
      const user = { ...response.data };
      setUser(user);
      localStorage.setItem("authUser", JSON.stringify(user));
      return;
    })
    .catch(function (error) {
      setAlert(error.response.data);
      //console.log(error.response.data);
    });
};

export const registerUser = (body, setSuccess, setAlert, setLoading) => {
  axios
    .post("http://localhost:8080/signup", body)
    .then(function (response) {
      const user = { ...response.data };
      return user;
    })
    .then((user) => {
      console.log(user);
      setLoading(false);
      setSuccess(true);
      return;
    })
    .catch(function (error) {
      //console.log(error.response.data);
      setLoading(false);
      return setAlert(error.response.data);
    });
};
