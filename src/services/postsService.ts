import Post from "../interfaces/Post";
import axios from "axios";

let api:string = `${process.env.REACT_APP_API}/posts`;

export function getPosts(){
    return axios.get(api);
}


export function getPostById(id: number){
    return axios.get(`${api}/${id}`);
}


export function addPost(newPost:Post){
    return axios.post(api, newPost);
}


export function updatePost(newPost:Post , id:number){
    return axios.put(`${api}/${id}`, newPost);
}


export function deletePost(id:number){
    return axios.delete(`${api}/${id}`);
}

