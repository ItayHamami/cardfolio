import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

let api:string = `${process.env.REACT_APP_API}`;

export function checkUser(userToCheck:Object){
    return axios.post(`${api}/users/login`, userToCheck)
}
export function addUser(newUser: User){
    return axios.post(`${api}/users`,newUser);
}

export function getUserDetails(){
    return axios.get(`${api}/profile`,{headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}
export function getAllUsers(){
    return axios.get(`${api}/users`,{headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}
export function getUserById(id: string){
    return axios.get(`${api}/users/${id}`, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}


export function getTokenDetails(){
let token = JSON.parse(sessionStorage.getItem("token") as string).token;
return jwt_decode(token)
}

export function updateBusiness(userId:string , isBusiness:boolean){

    return axios.patch(`${api}/users/${userId}` , {isBusiness} ,{headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }} )
}

export function deleteUser(userId:string){
return axios.delete(`${api}/users/${userId}`, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }})
}

export function updateUser(newUser:User , id:string){
    return axios.put(`${api}/${id}`, newUser, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}