import { FunctionComponent, useEffect, useState } from "react";
import Post from "../interfaces/Post";
import { removeFromFavorites } from "../services/favoriteService";
import { successMsg } from "../services/feedbackService";
import { getUserById } from "../services/usersService";
import { getPosts } from "../services/postsService";

interface FavoritePageProps {
userInfo:any;   
}

const FavoritePage: FunctionComponent<FavoritePageProps> = ({userInfo}) => {


    let userId:number;
    if(userInfo.userEmail){
        userId = userInfo.userId;
    }
    else{
        userId = 0;
    }

  let [postsArray, setPostsArray] = useState<Post[]>([]);
  let [favorites, setFavorites] = useState<number[]>([]);

  let handleDelete = (id: number, postToDelete: Post) => {
    if (window.confirm("Are you sure you want to delete post from favorites?")) {
      removeFromFavorites(id, postToDelete.id as number)
        .then((res) => {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav !== postToDelete.id)
          );
          successMsg("Post has been removed from favorites");
        })
        .catch((err) => console.log(err));
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
      .then((res) => setFavorites(res.data[0].favorites))
      .catch((err) => console.log(err));
  }, [userId]);

  const filteredPosts = filterPostsById(postsArray, favorites);

    
    return (
            <>
            <div className="page-container">
            <div className="container">


<h1>Favorite Cards Page</h1>
<p>Here you can find your favorite cards!</p>

{favorites?.length ? (
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