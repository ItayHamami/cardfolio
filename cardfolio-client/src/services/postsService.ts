import Post from "../interfaces/Post";
import axios from "axios";

let api:string = `${process.env.REACT_APP_API}/cards`;

export function getPosts(){
    return axios.get(api);
}


export function getPostById(id: string){
    return axios.get(`${api}/${id}`, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}


export function addPost(newPost:Post){
    return axios.post(api, newPost, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}


export function updatePost(newPost:Post , id:string){
    return axios.put(`${api}/${id}`, newPost, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}


export function deletePost(id:string){
    return axios.delete(`${api}/${id}`, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }});
}

export function getUserPosts(){
    return axios.get(`${api}/my-cards`, {headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }})
}


