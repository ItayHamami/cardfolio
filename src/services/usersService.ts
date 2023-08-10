import axios from "axios";
import User from "../interfaces/User";

let api:string = `${process.env.REACT_APP_API}/users`;

export function checkUser(email:string , password:string){
    return axios.get(`${api}?email=${email}&password=${password}`)
}
export function addUser(newUser: User){
    return axios.post(api,newUser);
}

export function getUserByEmail(email:string){
    return axios.get(`${api}?email=${email}`);
}
export function getUserById(id: number){
    return axios.get(`${api}?id=${id}`);
}

    

