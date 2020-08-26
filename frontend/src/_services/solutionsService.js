import Axios from "axios";

class SolutionsService {
    constructor() {
        this.url = `${process.env["REACT_APP_BASE_URL"]}/solution`
        this.urlBoxes = `${process.env["REACT_APP_BASE_URL"]}/allocatedBox`
        this.urlContainer = `${process.env["REACT_APP_BASE_URL"]}/Container`
        this.url_user = `${process.env["REACT_APP_BASE_URL"]}/users/me`
    }

    optimize(boxes, container){
        let config = {
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('login')).access_token
            }
        }

        Axios.get(this.url_user, config).then(response =>{
            let user_id = response.data.id
            Axios.post(this.url,
                {
                    "boxes": boxes,
                    "container": container,
                    "user_id": user_id
                },
                config).then(response =>{
                console.log(response.data)
            }).catch(err => {
                console.warn('Error:' + err);
            })
        }).catch(error =>{
            console.warn(error);
        })

    }

    getUserId(){
        let config = {
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('login')).access_token
            }
        }
        return Axios.get(this.url_user, config)
    }

    getSolutions(user_id){
        let config = {
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('login')).access_token
            }
        }
        return(Axios.get(`${this.url}/1`, config))
    }

    getSolutionBoxes(solutionId){
        let config = {
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('login')).access_token
            }
        }
        return Axios.all(
            [
                Axios.get(`${this.urlBoxes}/${solutionId}`, config),
                Axios.get(`${this.urlContainer}/${solutionId}`, config)
            ]
        )
    }
}



export default SolutionsService;