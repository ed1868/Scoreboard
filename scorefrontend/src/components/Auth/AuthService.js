import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth/`,
    });
  }

  signup = (user) => {

 
    

    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    const userData = {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      position: user.position,
      jerseyNumber: user.jerseyNumber,
    };
    console.log("THE FORM DATA RECEIVED IN AUTH SERVICE : ", userData);
    console.log("IN AUTH SERVICE : ", formData);

  return  axios({
      method: 'post',	
      url: `${process.env.REACT_APP_API_URL}/auth/`,
      data: userData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}	
      }).then((response) => {console.log(response)}).catch((err) => {
        if(err){
          console.log('THIS IS THE ERROR: ', err);
        }
      });


  
  };

  // login = (user) => {

  //   return this.service.post('/login', user)
  //   .then(response => response.data)
  // }

  // loggedin = () => {
  //   return this.service.get('/loggedin')
  //   .then(response => response.data);
  // }

  // logout = () => {
  //   return this.service.get('/logout')
  //   .then(response => response.data);
  // }
}

export default AuthService;
