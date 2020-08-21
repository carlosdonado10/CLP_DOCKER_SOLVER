import Axios from "axios";

class AuthService{

    getTokenHeaders(localStorage){
        const token = JSON.parse(localStorage.getItem('login'));
        return {
            headers:{
                'Authorization': 'Bearer ' + token.access_token
            }
        }
    }

    is_logged(localStorage){
        return localStorage.getItem('token') != null;
    }

    login(username, password){
        var qs = require('qs');

        const requestBody = {
            "username": username,
            "password": password
        };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        Axios.post(`${process.env["REAC VCT_APP_BASE_URL"]}/token`,
            qs.stringify(requestBody), config
        ).then(response => {
            console.log(response.data)
            localStorage.setItem('login', JSON.stringify(response.data));
        }).catch(er=>{
            console.warn(er);
        })
    }

    register(state){
        Axios.post(`${process.env["REACT_APP_BASE_URL"]}/users`,
           {
                username: state.username,
                email: state.email,
                full_name: state.full_name,
                password: state.password
            }
        ).then(response => {
            console.log(response);
        }).catch(err=>{
            console.warn(err);
        })
    }


}

export default AuthService;