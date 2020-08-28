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

    login(username, password, history){
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

        return Axios.post(`${process.env["REACT_APP_BASE_URL"]}/token`,
            qs.stringify(requestBody), config
        )
    }

    register(state, username, password, history){
        console.log(`${process.env["REACT_APP_BASE_URL"]}/users`);
        Axios.post(`${process.env["REACT_APP_BASE_URL"]}/users`,
           {
                username: state.username,
                email: state.email,
                full_name: state.full_name,
                password: state.password
            }
        ).then(response => {
            this.login(username, password, history)
        }).catch(err=>{
            console.warn(err);
        })
    }


}

export default AuthService;