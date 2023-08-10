import { FunctionComponent, useEffect, useState } from "react";
import Post from "../interfaces/Post";
import { deletePost, getPosts, updatePost } from "../services/postsService";
import { successMsg } from "../services/feedbackService";
import axios from "axios";
import { addToFavorites,  removeFromFavorites } from "../services/favoriteService";

import { Link } from "react-router-dom";
import { getUserById } from "../services/usersService";


interface HomeProps {
    userInfo: any

}

const Home: FunctionComponent<HomeProps> = ({userInfo}) => {
    let userId:number;
if(userInfo.userEmail){
    userId = userInfo.userId;
}
else{
    userId = 0;
} 

    let [posts , setPosts] = useState<Post[]>([]);
    let [favorites , setFavorites] = useState<number[]>([])
    let [postsChanged , setPostsChanged]= useState<boolean> (false);
    let render = () => {
        setPostsChanged(!postsChanged);
    };
let handleDelete = (id:number)=> { 
    if(window.confirm("Are you sure you would like to delete this card?"))
    {
        deletePost(id).then((res)=> {successMsg("Card was successfully deleted!"); render()})
        .catch((err)=> console.log(err))
    }
}
let handleFavorite=(favPost:Post, id:number) =>{

if(isPostInFavorites(favPost.id as number))
{
removeFromFavorites(userId, favPost.id as number)
updatePost({...favPost , isFavorite:false} , favPost.id as number)
.then((res)=> {successMsg("Post has been removed from favorites."); render()})
.catch((err)=> console.log(err));

}
else{
    addToFavorites(userId,favPost.id as number)
    .then((res)=>{

        successMsg("Post Added to favorites!")
        updatePost({...favPost , isFavorite:true}, favPost.id as number)
        .then((res)=> render())
        .catch((err)=> alert("error"))
    })
    .catch((err)=> console.log(err));
}

    }
    
    let isPostInFavorites = (postId: number) => {
        if (favorites!= undefined) {
        return favorites.includes(postId);

        }
        return false;
    };
    useEffect(() => {
        getPosts()
        .then((res)=>  setPosts(res.data))
        .catch((err)=> console.log(err));
        getUserById(userId)
        .then((res:any)=> {setFavorites(res.data[0].favorites);})
        .catch((err:any)=> console.log(err))
    }, [postsChanged]);
    return ( 
        <>
<div className="page-container">


<div className="container">
<h1 className="display-5">Unlock Your Professional Potential with CardFolio:</h1>
    
    <p>Welcome to CardFolio, where innovation meets networking proccess. Showcase your professional identity with our stunning digital business cards, and connect with ease in the digital realm. Join us today and revolutionize how you network.</p>



{posts?.length ? (
        <div className="container card-container"  style={{ marginBottom: '3rem' }}>
            <div className="row ">
            {posts.map((post: Post) => (
                <div
                key={post.id}
                className="card col-md-4 my-2 mx-auto"
                style={{ width: "20rem" }}
                >
                <img
                    src={post.imageUrl}
                    className="card-img-top"
                    alt={post.imageAlt}
                />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.subtitle}</p>
                    <hr />
                    <p><b>Phone:</b>{post.phone}</p>
                    <p><b>Address:</b>{post.street} {post.houseNum},{post.city}</p>
                </div>
                <div className="card-footer">
                <Link to={`/biz-details/${post.id}`}><i className="fa-solid fa-circle-info fa-lg" style={{color: "#000000"}}></i></Link>
                    {
                        userInfo.userEmail && (
                        <>
                        
                        <a onClick={()=> handleFavorite(post , post.id as number)}>
                            {(isPostInFavorites(post.id as number))? (<><i className="fa-solid fa-heart fa-lg" style={{color: "#ff0000"}}></i></>) : (<><i className="fa-solid fa-heart fa-lg m-2"></i></>)} </a>
                        </>
                        )
                    }
                    {userInfo.isAdmin && (
                        <>
                    <a onClick={()=> handleDelete(post.id as number)}><i className="fa-solid fa-trash-can fa-lg "></i></a>
                    <Link to={`/editpost/${post.id}`}><i className="fa-solid fa-pencil fa-lg m-2" style={{color: "#000000"}}></i></Link>
                        </>
                    )}
                </div>
                
            </div>
            ))}
        
        </div>
        </div>
    ) : (
        <p>No Posts at the moment , stay tuned!</p>
    )}

</div>
</div>
    </>
    //   
    );
}

export default Home;