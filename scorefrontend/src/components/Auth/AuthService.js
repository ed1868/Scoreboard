import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true
    
    });
    this.service = service;  
  }

 signup = (user) => {
  


    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));
    console.log('THE FORM DATA RECEIVED IN AUTH SERVICE : ' , formData);

    console.log('THE REAL SHIT : ', user);

const payload = {
  username: user.username,
  email: user.email,
  firstName:user.firstName,
  lastName: user.lastName,
  password: user.password,
  url: user.url,
  position:"Center",

}
   let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "POST"
    }
  };


   console.log('the payload is : ', formData)
   return this.service.post('/signup', payload,axiosConfig).then(response => console.log(response.data)).catch(err => console.log('ERROR: ', err));
 }

  login = (user) => {

    return this.service.post('/login', user)
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data);
  }

  logout = () => {
    return this.service.get('/logout')
    .then(response => response.data);
  }
}

export default AuthService;