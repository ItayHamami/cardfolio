import axios from "axios";
import Post from "../interfaces/Post";
import { getUserById } from "./usersService";

let api: string = `${process.env.REACT_APP_API}/users`;




export function createList(userId: number){
return axios.post(`${api}?id=${userId}`, {favorites: []})
}


export async function addToFavorites(userId: number, postIdToAdd: number) {
    try {
        let res = await getUserById(userId);
        res.data[0].favorites.push(postIdToAdd);
        return axios.patch(`${api}/${res.data[0].id}`, {
            favorites: res.data[0].favorites, // Use the correct property name
        });
    } catch (error) {
        console.log(error);
    }
}


export async function removeFromFavorites(userId: number, postIdToDelete: number) {
    try {
    let res = await getUserById(userId);
      // Remove the post from the favorites array
    res.data[0].favorites = res.data[0].favorites.filter(
        (id:number) => id !== postIdToDelete
    );

    return axios.patch(`${api}/${res.data[0].id}`, {
        favorites: res.data[0].favorites,
    });
    } catch (error) {
    console.log(error);
    }
}

export async function addToUserPosts(userId: number, postIdToAdd: number) {
    try {
        let res = await getUserById(userId);
        res.data[0].userPosts.push(postIdToAdd);
        return axios.patch(`${api}/${res.data[0].id}`, {
            userPosts: res.data[0].userPosts, // Use the correct property name
        });
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromUserPosts(userId: number, postIdToDelete: number) {
    console.log(postIdToDelete)
    try {
        let res = await getUserById(userId);
        // Remove the post from the userPosts array
        res.data[0].userPosts = res.data[0].userPosts.filter(
            (id: number) => id !== postIdToDelete
        );

        return axios.patch(`${api}/${res.data[0].id}`, {
            userPosts: res.data[0].userPosts, 
        });
    } catch (error) {
        console.log(error);
    }
}
