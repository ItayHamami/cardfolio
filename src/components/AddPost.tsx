import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { addPost } from "../services/postsService";
import { successMsg } from "../services/feedbackService";
import { addToUserPosts } from "../services/favoriteService";

interface AddPostProps {
    userInfo: any
}
 
const AddPost: FunctionComponent<AddPostProps> = ({userInfo}) => {
    let userId:number;
    if(userInfo.userEmail){
        userId = userInfo.userId;
    }
    else{
        userId = 0;
    } 
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            title: "",subtitle:"",description:"",phone:"" ,email: "", website: "",imageUrl:"", imageAlt:"",country:"",state:"",city:"",street:"",houseNum:0,zip:"" },
            validationSchema: yup.object({
                title: yup.string().required().min(2),
                subtitle: yup.string().min(2),
                description: yup.string().required().min(2),
                phone: yup.string().required().min(10),
                email: yup.string().required().email(),
                website: yup.string(),
                imageURL: yup.string(),
                imageAlt: yup.string(),
                country: yup.string().required().min(2),
                state: yup.string().min(2),
                city: yup.string().required().min(2),
                street: yup.string().required().min(2),
                houseNum: yup.number().required().min(1),
                zip: yup.string().min(5),

            }),
            onSubmit(values) {
                addPost(values)
                .then((res)=> {
                    successMsg("Post successfully added!");
                    addToUserPosts(userId , res.data.id)
                    navigate(-1)
                })
                .catch((err)=> console.log(err))

            }
            
                ,});
    
                useEffect(() => {
                    formik.setFieldValue("houseNum", ""); 
                }, []);
    return ( 
        <>
        <div className="login">
        <div className="container">
    
        <h3 className="display-3">ADD POST</h3>

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
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
            onBlur={formik.handleBlur}/>
            <label htmlFor="country">Country</label>
            {formik.touched.country && formik.errors.country && (<p className="text-danger">{formik.errors.country}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="state" 
            placeholder="State:"
            name="state"
            onChange={formik.handleChange}
            value={formik.values.state}
            onBlur={formik.handleBlur}/>
            <label htmlFor="state">State:</label>
            {formik.touched.state && formik.errors.state && (<p className="text-danger">{formik.errors.state}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="city" 
            placeholder="City:"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            onBlur={formik.handleBlur}/>
            <label htmlFor="city">City:</label>
            {formik.touched.city && formik.errors.city && (<p className="text-danger">{formik.errors.city}</p>)}
            </div>
            <div className="form-floating">
            <input 
            type="houseNum" 
            className="form-control" 
            id="houseNum" 
            placeholder="House Number:"
            name="houseNum"
            onChange={formik.handleChange}
            value={formik.values.houseNum}
            onBlur={formik.handleBlur}/>
            <label htmlFor="city">Number:</label>
            {formik.touched.houseNum && formik.errors.houseNum && (<p className="text-danger">{formik.errors.houseNum}</p>)}
            </div>
            </div>
            <div className="col-md-6 my-1">
            <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="imageUrl" 
        placeholder="Image URL:"
        name="imageUrl"
        onChange={formik.handleChange}
        value={formik.values.imageUrl}
        onBlur={formik.handleBlur}/>
        <label htmlFor="imageUrl">Image URL</label>
        {formik.touched.imageUrl && formik.errors.imageUrl && (<p className="text-danger">{formik.errors.imageUrl}</p>)}
        </div>
    
        <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="imageAlt" 
        placeholder="Image description"
        name="imageAlt"
        onChange={formik.handleChange}
        value={formik.values.imageAlt}
        onBlur={formik.handleBlur}/>
        <label htmlFor="imageAlt">Image description</label>
        {formik.touched.imageAlt && formik.errors.imageAlt && (<p className="text-danger">{formik.errors.imageAlt}</p>)}
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
            name="street"
            onChange={formik.handleChange}
            value={formik.values.street}
            onBlur={formik.handleBlur}/>
            <label htmlFor="street">Street:</label>
            {formik.touched.street && formik.errors.street && (<p className="text-danger">{formik.errors.street}</p>)}
            </div>

            <div className="form-floating">
            <input 
            type="number" 
            className="form-control" 
            id="zip" 
            placeholder="Zip Code:"
            name="zip"
            onChange={formik.handleChange}
            value={formik.values.zip}
            onBlur={formik.handleBlur}/>
            <label htmlFor="zip">Zip:</label>
            {formik.touched.zip && formik.errors.zip && (<p className="text-danger">{formik.errors.zip}</p>)}
            </div>
            </div>
            </div>


<button onClick={()=>{if(window.confirm("Are you sure?")){navigate(-1)}}} className="btn btn-danger w-50 mt-1">CANCEL</button>
<button type="reset" onClick={()=>{if(window.confirm("Are you sure you want to clear the form?")){formik.resetForm()}}} className="btn btn-primary w-50 mt-1"><i className="fa-solid fa-rotate-left" ></i></button>

<button disabled={!formik.isValid || !formik.dirty} type="submit" className="btn btn-success w-100 mt-2">Add Post</button>
        </form>

        </div>
        </div>
    
        </>
    );
}
 
export default AddPost;