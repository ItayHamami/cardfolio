import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../interfaces/Post";
import { removeFromFavorites, removeFromUserPosts } from "../services/favoriteService";
import { successMsg } from "../services/feedbackService";
import { deletePost, getPosts } from "../services/postsService";
import { getUserById } from "../services/usersService";

interface MyCardsProps {
    userInfo:any;
}
 
const MyCards: FunctionComponent<MyCardsProps> = ({userInfo}) => {
    let userId:number;
    if(userInfo.userEmail){
        userId = userInfo.userId;
    }
    else{
        userId = 0;
    }

let [postsArray, setPostsArray] = useState<Post[]>([]);
let [userCreatedArray, setUserCreatedArray] = useState<number[]>([]);

let handleDelete = (id: number, postToDelete: Post) => {
    if (window.confirm("This will also remove your cards from the website , are you sure?")) {
    removeFromUserPosts(id, postToDelete.id as number)
        .then((res) => {
            setUserCreatedArray((prevPosts) =>
            prevPosts.filter((postId) => postId !== postToDelete.id)
        );
        })
        .catch((err) => console.log(err));
        deletePost(postToDelete.id as number).then((res)=> {successMsg("Card was successfully deleted!");})
        .catch((err)=> console.log(err))
    }
};

function filterPostsById(posts: Post[], numbersArray: number[]): Post[] {
    const postIdsSet = new Set(numbersArray);
    return posts.filter((post) => postIdsSet.has(post.id as number));
}

useEffect(() => {
    getPosts()
    .then((res) => setPostsArray(res.data))
    .catch((err) => console.log(err));

    getUserById(userId)
    .then((res) => setUserCreatedArray(res.data[0].userPosts))
    .catch((err) => console.log(err));
}, [userId]);

const filteredPosts = filterPostsById(postsArray, userCreatedArray);

    
    return (
            <>
            <div className="page-container">
            <div className="container">


<h1>Manage Your Digital Portfolio:</h1>
<p>Empower your brand with a digital showcase.</p>
<button className="custom-button"><Link to="/newpost">Add a business card</Link></button>
{userCreatedArray?.length ? (
<div className="container">
    <div className="row">
    {filteredPosts.map((post: Post) => (
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
            {
                userInfo.userEmail && (
                <>
                <a onClick={()=> handleDelete(userId as number, post)} ><i className="fa-solid fa-trash-can fa-lg"></i></a>
                <Link to={`/editpost/${post.id}`}><i className="fa-solid fa-pencil fa-lg m-2" style={{color: "#000000"}}></i></Link>

                </>

                )
            }

        </div>
        
    </div>
    ))}

</div>
</div>
) : (
<p></p>
)}
</div>
            </div>

</>
    );
}

export default MyCards;