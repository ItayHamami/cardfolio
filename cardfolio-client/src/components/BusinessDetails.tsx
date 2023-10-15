import React, { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../interfaces/Post";
import { getPostById } from "../services/postsService";

interface BusinessDetailsProps {}

const BusinessDetails: FunctionComponent<BusinessDetailsProps> = () => {
const {currentId} = useParams();
const [post, setPost] = useState<Post | null>(null);

useEffect(() => {
    const fetchPost = async () => {
    try {
        const response = await getPostById(currentId!);
        setPost(response.data);
    } catch (error) {
        console.error("Error fetching post:", error);
    }
    };

    fetchPost();
}, [currentId]);

return<>
<div className="post-details">
    {post ? (
        <div className="container mt-4">
<div className="row">
    <div className="col-md-4">
    <img src={post.image.imageURL} alt={post.image.imageAlt} className="img-fluid" />
    </div>
    <div className="col-md-8">
    <h2>{post.title}</h2>
    <p>{post.subtitle}</p>
    <p>{post.description}</p>
    <p>{post.phone}</p>
    <p>{post.email}</p>
    <p>{post.website}</p>
    <address>
        {post.address.street}, {post.address.houseNum}
        {post.address.city}, {post.address.state}, {post.address.country}, {post.address.zip}
    </address>
<Link to="/">Return to posts page:</Link>
    </div>
</div>
</div>
    ) : (
        <p>Loading...</p>
    )}
    </div>
</>
};

export default BusinessDetails;
