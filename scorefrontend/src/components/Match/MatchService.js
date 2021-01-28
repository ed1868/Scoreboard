import axios from "axios";

class MatchService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/match`,
      withCredentials: true
    
    });
    this.service = service;  
  }

 add = (matchInfo) => {
  
console.log("hitting the match service : ", matchInfo)
// const payload = {
//   username: user.username,
//   email: user.email,
//   firstName:user.firstName,
//   lastName: user.lastName,
//   password: user.password,
//   url: user.url,
//   position:"Center",

// }
   let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "POST"
    }
  };


  //  console.log('the payload is : ', formData)
  //  return this.service.post('/add', payload,axiosConfig).then(response => console.log(response.data)).catch(err => console.log('ERROR: ', err));
 }



  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data);
  }


}

export default MatchService;