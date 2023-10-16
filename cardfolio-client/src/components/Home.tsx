import { FunctionComponent, useEffect, useState } from "react";
import Post from "../interfaces/Post";
import { deletePost, getPosts, updatePost } from "../services/postsService";
import { errorMsg, successMsg } from "../services/feedbackService";
import axios from "axios";
import { addRemoveFavorites, getFavorites } from "../services/favoriteService";

import { Link } from "react-router-dom";



interface HomeProps {
    userInfo: any

}

const Home: FunctionComponent<HomeProps> = ({userInfo}) => {
    let userId:string;
if(userInfo.userEmail){
    userId = userInfo.userId;
}
else{
    userId = "";
} 

    let [posts , setPosts] = useState<Post[]>([]);
    let [favorites, setFavorites] = useState<string[]>([])
    let [postsChanged , setPostsChanged]= useState<boolean> (false);
    let render = () => {
        setPostsChanged(!postsChanged);
    };
let handleDelete = (id:string)=> { 
    if(window.confirm("Are you sure you would like to delete this card?"))
    {
        deletePost(id).then((res)=> {successMsg("Card was successfully deleted!"); render()})
        .catch(()=> errorMsg(`Sorry! Something went wrong.`))
    }
}

let handleFavorite = (post: Post) => {
    if (favorites.includes(post._id as string)) {
    addRemoveFavorites(post)
        .then((res) => {
        setFavorites(favorites.filter((id) => id !== post._id));
        successMsg(`${post.title} business post was removed from favorites!`);
        })
        .catch((err) => { console.log(err); });
    } else {
    addRemoveFavorites(post)
        .then((res) => {
        setFavorites([...favorites, post._id as string]);
        successMsg(`${post.title} business card was added to favorites!`);
        })
        .catch((err) => { errorMsg("Sorry, something went wrong!"); });
    }
};
    useEffect(() => {
        if (userInfo.userId) {
            getFavorites(userInfo.userId)
            .then((res) => {
                let postsId: string[] = res.data?.posts.map((post: any) => post._id) || [];
                setFavorites(postsId);
            })
            .catch(() => errorMsg("Error getting posts, Try again later."))};


        getPosts()
        .then((res)=> {
            
            setPosts(res.data);
        })
        .catch((err)=> console.log(err));

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
                <Link to={`/biz-details/${post._id}`}><i className="fa-solid fa-circle-info fa-lg mx-2" style={{color: "#000000"}}></i></Link>
                    {
                        userInfo.userEmail && (
                            
                        <>
                        
                        <a onClick={()=> handleFavorite(post)}>
                            {favorites.includes(post._id as string)? (<><i className="fa-solid fa-heart fa-lg " style={{color: "#ff0000"}}></i></>) : (<><i className="fa-solid fa-heart fa-lg m-2"></i></>)} </a>
                        </> 

                        )
                    }
                    {userInfo.isAdmin && (
                        
                        <>
                    <a onClick={()=> handleDelete(post._id!)}><i className="fa-solid fa-trash-can fa-lg mx-2"></i></a>
                    <Link to={`/editpost/${post._id}`}><i className="fa-solid fa-pencil fa-lg m-2" style={{color: "#000000"}}></i></Link>
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



