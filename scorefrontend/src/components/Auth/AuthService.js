import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true
    })
  }

 signup = (user) => {
   const formData = new FormData();
   
   console.log('THE FORM DATA RECEIVED IN AUTH SERVICE : ' , formData);

   console.log('THE REAL SHIT : ', user);

   Object.keys(user).forEach(key => {
     formData.append(key,user[key]);
   });

   return this.service.post('/signup', formData,{
     headers: {
        "Content-Type": "multipart/form-data"     
     }
   }).then(response => console.log(response.data))
 }

  // signup = (user) => {
  //   const formData = new FormData();
  //   Object.keys(user).forEach(key => formData.append(key, user[key]));
  //   console.log(user)
    
  //   return this.service.post('/signup', formData,{
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     }
  //   }
    
       
    
  // ).then(response => response.data)
  //   }


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