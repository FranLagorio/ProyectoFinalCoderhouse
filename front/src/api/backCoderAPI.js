import axios from 'axios'

export const backendAPI = axios.create({
  baseURL: 'http://localhost:8080/',
})

export const loginUser = (userLogging, setUser, setAlert) => {
  axios
    .post('http://localhost:8080/login', userLogging)
    .then(function (response) {
      const user = { ...response.data }
      setUser(user)
      localStorage.setItem('authUser', JSON.stringify(user))
    })
    .catch(function (error) {
      setAlert(error.response.data)
      // console.log(error.response.data);
    })
}

export const registerUser = (body, setSuccess, setAlert, setLoading) => {
  axios
    .post('http://localhost:8080/signup', body)
    .then(function (response) {
      const user = { ...response.data }
      return user
    })
    .then((user) => {
      console.log(user)
      setLoading(false)
      setSuccess(true)
    })
    .catch(function (error) {
      // console.log(error.response.data);
      setLoading(false)
      return setAlert(error.response.data)
    })
}

export const googleLogin = () => {
  axios
    .get('http://localhost:8080/login/google')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
