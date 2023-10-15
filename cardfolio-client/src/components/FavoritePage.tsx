import { FunctionComponent, useEffect, useState } from "react";
import Post from "../interfaces/Post";
import { successMsg } from "../services/feedbackService";
import { getPosts } from "../services/postsService";
import { addRemoveFavorites, getFavorites } from "../services/favoriteService";

interface FavoritePageProps {
userInfo:any;   
}

const FavoritePage: FunctionComponent<FavoritePageProps> = ({userInfo}) => {


    let userId:string;
    if(userInfo.userEmail){
        userId = userInfo.userId;
    }
    else{
        userId = "";
    }

let [postsArray, setPostsArray] = useState<Post[]>([]);
let [postsChanged , setPostsChanged]= useState<boolean> (false);
let [favorites, setFavorites] = useState<string[]>([]);


let handleFavorite = (post: Post) => {
    if (favorites.includes(post._id as string)) {
    addRemoveFavorites(post)
        .then((res) => {
        setFavorites(favorites.filter((id) => id !== post._id));
        setPostsChanged(!postsChanged);
        successMsg(`${post.title} business post was removed from favorites!`);
        })
        .catch((err) => { console.log(err); });
    } 
};

useEffect(() => {
getFavorites(userInfo.userId).then((res) => {
    let postIds: string[] = res.data?.posts.map((post: any) => post._id) || [];
    setFavorites(postIds)
}).catch((err) => console.log(err))
}, [postsChanged]);

useEffect(() => {
getPosts().then((res) => {
    setPostsArray(res.data.filter((post: Post) => favorites.includes(post._id as string)));
}).catch((err) => console.log(err));
}, [favorites]);



    
    return (
            <>
            <div className="page-container">
            <div className="container">


<h1>Favorite Cards Page</h1>
<p>Here you can find your favorite cards!</p>

{postsArray?.length ? (
<div className="container">
    <div className="row">
    {postsArray.map((post: Post) => (
        <div
        key={post._id}
        className="card col-md-4 my-2 mx-auto"
        style={{ width: "20rem" }}
        >
        <img
            src={post.image.imageURL}
            className="card-img-top"
            alt={post.image.imageAlt}
        />
        <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.subtitle}</p>
            <hr />
            <p><b>Phone:</b>{post.phone}</p>
            <p><b>Address:</b>{post.address.street} {post.address.houseNum},{post.address.city}</p>
        </div>
        <div className="card-footer">
            {
                userInfo.userEmail && (
                <>
                <a onClick={()=> handleFavorite(post)} ><i className="fa-solid fa-trash-can fa-lg"></i></a>

                </>

                )
            }



        </div>
        
    </div>
    ))}

</div>
</div>
) : (
<p>No Favorite posts yet</p>
)}
</div>
            </div>

</>
    );
}

export default FavoritePage;