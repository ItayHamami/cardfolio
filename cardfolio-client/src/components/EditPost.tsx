import { FunctionComponent, useEffect, useState } from "react";
import { getPostById, updatePost } from "../services/postsService";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../interfaces/Post";
import * as yup from "yup"; 
import { Formik, useFormik } from "formik";
import { successMsg } from "../services/feedbackService";


interface EditPostProps {
    userInfo:any
}
 
const EditPost: FunctionComponent<EditPostProps> = ({userInfo}) => {
    let navigate = useNavigate();
    let {postId} = useParams();
    let [currentPost , setCurrentPost] = useState<Post>({title: "",subtitle:"",description:"",phone:"" ,email: "", website: "",image:{imageURL:"", imageAlt:""},address:{country:"",state:"",city:"",street:"",houseNum:0,zip:"" }});

    useEffect(() => {
        getPostById(postId as string)
        .then((res)=> setCurrentPost(res.data))
        .catch((err)=> console.log(err))
    }, []);


    let formik = useFormik({
        initialValues: {
            title: currentPost?.title,subtitle:currentPost?.subtitle,description:currentPost?.description,phone:currentPost?.phone ,email: currentPost?.email, website: currentPost?.website,image:{imageURL:currentPost?.image.imageURL, imageAlt:currentPost?.image.imageAlt},address:{ country:currentPost?.address.country,state:currentPost?.address.state,city:currentPost?.address.city,street:currentPost?.address.street,houseNum:currentPost?.address.houseNum,zip:currentPost?.address.zip} },
            enableReinitialize:true,
            validationSchema: yup.object({
                title: yup.string().required().min(2),
                subtitle: yup.string().min(2),
                description: yup.string().required().min(2),
                phone: yup.string().required().min(10),
                email: yup.string().required().email(),
                website: yup.string(),
                image:yup.object({
                    imageURL: yup.string(),
                    imageAlt: yup.string(),
                }),
                address: yup.object({
                    state: yup.string().min(2),
                    country: yup.string().required().min(2),
                    city: yup.string().required().min(2),
                    street: yup.string().required().min(2),
                    houseNum: yup.number().required().min(1),
                    zip: yup.string().required().min(3)
                })
            }),
            onSubmit(values) {
                let postUserId:string = JSON.parse(sessionStorage.getItem("userInfo") as string).userId;
                updatePost({...values, userId: postUserId} , postId as string)
                .then((res)=> {
                    successMsg("Post has been updated!");

                    navigate(-1)
                })
                .catch((err)=> console.log(err))

            }
            
                ,});
    

    return (  
        <>
        <div className="login">
        <div className="container">
    
        <h3 className="display-3">UPDATE POST</h3>

        <form className="mb-4" onSubmit={formik.handleSubmit}>
            <div className="row">
            <div className="col-md-6 my-1">
            <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="title" 
        placeholder="Post Title"
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        onBlur={formik.handleBlur}/>
        <label htmlFor="firstName">Title</label>
        {formik.touched.title && formik.errors.title && (<p className="text-danger">{formik.errors.title}</p>)}
        </div>
    
        <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="subtitle" 
        placeholder="Subtitle"
        name="subtitle"
        onChange={formik.handleChange}
        value={formik.values.subtitle}
        onBlur={formik.handleBlur}/>
        <label htmlFor="subtitle">SubTitle</label>
        {formik.touched.subtitle && formik.errors.subtitle && (<p className="text-danger">{formik.errors.subtitle}</p>)}
        </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="description" 
            placeholder="Post description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}/>
            <label htmlFor="description">Description</label>
            {formik.touched.description && formik.errors.description && (<p className="text-danger">{formik.errors.description}</p>)}
            </div>

            <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="country" 
            placeholder="Country"
            name="address.country"
            onChange={formik.handleChange}
            value={formik.values.address.country}
            onBlur={formik.handleBlur}/>
            <label htmlFor="country">Country</label>
            {formik.touched.address?.country && formik.errors.address?.country && (<p className="text-danger">{formik.errors.address?.country}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="state" 
            placeholder="State:"
            name="address.state"
            onChange={formik.handleChange}
            value={formik.values.address?.state}
            onBlur={formik.handleBlur}/>
            <label htmlFor="state">State:</label>
            {formik.touched.address?.state && formik.errors.address?.state && (<p className="text-danger">{formik.errors.address?.state}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="city" 
            placeholder="City:"
            name="address.city"
            onChange={formik.handleChange}
            value={formik.values.address?.city}
            onBlur={formik.handleBlur}/>
            <label htmlFor="city">City:</label>
            {formik.touched.address?.city && formik.errors.address?.city && (<p className="text-danger">{formik.errors.address?.city}</p>)}
            </div>
            <div className="form-floating">
            <input 
            type="houseNum" 
            className="form-control" 
            id="houseNum" 
            placeholder="House Number:"
            name="address.houseNum"
            onChange={formik.handleChange}
            value={formik.values.address?.houseNum}
            onBlur={formik.handleBlur}/>
            <label htmlFor="city">Number:</label>
            {formik.touched.address?.houseNum && formik.errors.address?.houseNum && (<p className="text-danger">{formik.errors.address?.houseNum}</p>)}
            </div>
            </div>
            <div className="col-md-6 my-1">
            <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="imageURL" 
        placeholder="Image URL:"
        name="image.imageURL"
        onChange={formik.handleChange}
        value={formik.values.image.imageURL}
        onBlur={formik.handleBlur}/>
        <label htmlFor="imageURL">Image URL</label>
        {formik.touched.image?.imageURL && formik.errors.image?.imageURL && (<p className="text-danger">{formik.errors.image?.imageURL}</p>)}
        </div>
    
        <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="imageAlt" 
        placeholder="Image description"
        name="image.imageAlt"
        onChange={formik.handleChange}
        value={formik.values.image.imageAlt}
        onBlur={formik.handleBlur}/>
        <label htmlFor="imageAlt">Image description</label>
        {formik.touched.image?.imageAlt && formik.errors.image?.imageAlt && (<p className="text-danger">{formik.errors.image?.imageAlt}</p>)}
        </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="website" 
            placeholder="Website"
            name="website"
            onChange={formik.handleChange}
            value={formik.values.website}
            onBlur={formik.handleBlur}/>
            <label htmlFor="website">Website</label>
            {formik.touched.website && formik.errors.website && (<p className="text-danger">{formik.errors.website}</p>)}
            </div> 

            <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="phone" 
            placeholder="Phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}/>
            <label htmlFor="phone">Phone</label>
            {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}/>
            <label htmlFor="state">Email</label>
            {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
            </div>
            <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="street" 
            placeholder="Street:"
            name="address.street"
            onChange={formik.handleChange}
            value={formik.values.address?.street}
            onBlur={formik.handleBlur}/>
            <label htmlFor="street">Street:</label>
            {formik.touched.address?.street && formik.errors.address?.street && (<p className="text-danger">{formik.errors.address?.street}</p>)}
            </div>

            <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="zip" 
            placeholder="Zip Code:"
            name="address.zip"
            onChange={formik.handleChange}
            value={formik.values.address?.zip}
            onBlur={formik.handleBlur}/>
            <label htmlFor="zip">Zip:</label>
            {formik.touched.address?.zip && formik.errors.address?.zip && (<p className="text-danger">{formik.errors.address?.zip}</p>)}
            </div>
            </div>
            </div>


<button type="button" onClick={()=>{if(window.confirm("Are you sure?")){navigate(-1)}}} className="btn btn-danger w-50 mt-1">CANCEL</button>
<button type="reset" onClick={()=>{if(window.confirm("Are you sure you want to clear the form?")){formik.resetForm()}}} className="btn btn-primary w-50 mt-1"><i className="fa-solid fa-rotate-left" ></i></button>

<button disabled={!formik.isValid || !formik.dirty} type="submit" className="btn btn-success w-100 mt-2">Update Post</button>
        </form>

        </div>
        </div>
    
        </>
    );
}
 
export default EditPost;