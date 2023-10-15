import axios from "axios";
import Post from "../interfaces/Post";

let api: string = `${process.env.REACT_APP_API}/favorites`;


// get all user's favorits cards
export function getFavorites(userId: string) {
return axios.get(`${api}/${userId}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// add or remove user's favorits 
export function addRemoveFavorites(favPost: Post) {

return axios.post(api, favPost, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function deleteFavorites(userId:string)  {

    return axios.delete(`${api}/${userId}`);

};