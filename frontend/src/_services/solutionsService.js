import Axios from "axios";

class SolutionsService {
    constructor() {
        let url = "http://localhost:8080"
        this.url = `${url}/solution`
        this.urlBoxes = `${url}/allocatedBox`
        this.urlContainer = `${url}/Container`
        this.url_user = `${url}/users/me`
    }

    optimize(boxes, container, history) {
        boxes.forEach(box => {
            box.color = box.color.hex
        })
        delete container.color
        let config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYXJsb3Nkb25hZG8iLCJleHAiOjE2MDcyNzY3MDJ9.Q9EgKOYwZWq6pVBw3OCD8fh2G-USgsss28lp7UafUIc'
            }
        }

        Axios.get(this.url_user, config).then(response => {
            let user_id = response.data.id
            Axios.post(this.url,
                {
                    "boxes": boxes,
                    "container": container,
                    "user_id": user_id
                },
                config).then(response => {
                history.push('/')
                console.log(response.data)
            }).catch(err => {
                console.warn('Error:' + err);
            })
        }).catch(error => {
            console.warn(error);
        })

    }

    getUserId() {
        let config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYXJsb3Nkb25hZG8iLCJleHAiOjE2MDcyNzY3MDJ9.Q9EgKOYwZWq6pVBw3OCD8fh2G-USgsss28lp7UafUIc'
                    // + JSON.parse(localStorage.getItem('login')).access_token
            }
        }
        return Axios.get(this.url_user, config)
    }

    getSolutions(user_id) {
        let config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYXJsb3Nkb25hZG8iLCJleHAiOjE2MDcyNzY3MDJ9.Q9EgKOYwZWq6pVBw3OCD8fh2G-USgsss28lp7UafUIc'
            }
        }
        return (Axios.get(`${this.url}/`, config))
    }

    getSolutionBoxes(solutionId) {
        let config = {
            headers: {
                // 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('login')).access_token
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYXJsb3Nkb25hZG8iLCJleHAiOjE2MDcyNzY3MDJ9.Q9EgKOYwZWq6pVBw3OCD8fh2G-USgsss28lp7UafUIc"
            }
        }
        return Axios.all(
            [
                Axios.get(`${this.urlBoxes}/${solutionId}`, config),
                Axios.get(`${this.urlContainer}/${solutionId}`, config),
                Axios.get(`${this.urlBoxes}/summary/${solutionId}`, config),
                Axios.get(`${this.url}/maxIteration/${solutionId}`, config)
            ]
        )
    }

}

export default SolutionsService;