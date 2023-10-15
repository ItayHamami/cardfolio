import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../interfaces/Post";

import { successMsg } from "../services/feedbackService";
import { deletePost, getUserPosts } from "../services/postsService";


interface MyCardsProps {
    userInfo:any;
}

const MyCards: FunctionComponent<MyCardsProps> = ({userInfo}) => {
    let userId:string;
    if(userInfo.userEmail){
        userId = userInfo.userId;
    }
    else{
        userId = "";
    }
let [isPostsChanged,  setIsPostsChanged] = useState<boolean>(false)
let [postsArray, setPostsArray] = useState<Post[]>([]);


let handleDelete = (postId: string,) => {
    if (window.confirm("This will also remove your cards from the website , are you sure?")) {
    deletePost(postId)
        .then((res) => {

        setIsPostsChanged(true);
        })
        .catch((err) => console.log(err));
        deletePost(postId).then((res)=> {successMsg("Card was successfully deleted!");})
        .catch((err)=> console.log(err))
    }
};


useEffect(() => {
    getUserPosts()
    .then((res) => setPostsArray(res.data))
    .catch((err) => console.log(err));

}, [isPostsChanged]);


    return (
            <>
            <div className="page-container">
            <div className="container">


<h1>Manage Your Digital Portfolio:</h1>
<p>Empower your brand with a digital showcase.</p>
<button className="custom-button"><Link to="/newpost">Add a business card</Link></button>
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
                <a onClick={()=> handleDelete(post._id as string)} ><i className="fa-solid fa-trash-can fa-lg"></i></a>
                <Link to={`/editpost/${post._id}`}><i className="fa-solid fa-pencil fa-lg m-2" style={{color: "#000000"}}></i></Link>

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