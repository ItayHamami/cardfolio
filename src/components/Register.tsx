import { Field, useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMsg, errorMsg } from "../services/feedbackService";
import { addUser, checkUser} from "../services/usersService";
import { createList } from "../services/favoriteService";



interface RegisterProps {
    setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({setUserInfo}) => 
{
    const handleCheckboxChange = (event:any) => {
        formik.setFieldValue("business", event.target.checked);
    };
    let navigate = useNavigate();
    if(sessionStorage.getItem("isLoggedIn")=="true"){
        navigate("/home");
    }
    let formik = useFormik({
        initialValues: {
            firstName: "",middleName:"",lastName:"",phone:"" ,email: "", password: "",country:"", state:"",city:"",street:"",houseNum:0,zip:"",business:false },
            validationSchema: yup.object({firstName: yup.string().required().min(2),middleName: yup.string().min(2),lastName: yup.string().required().min(2),phone: yup.string().required().min(10),email: yup.string().required().email(),password: yup.string().required().min(8),country: yup.string().required().min(2),state: yup.string().min(2),city: yup.string().required().min(2),street: yup.string().required().min(2),houseNum: yup.number().required().min(1),zip: yup.string().min(5),business: yup.boolean()
            }),
            onSubmit(values) {
                addUser({
                    ...values, isAdmin: false,
                    favorites: [], userPosts:[]
                })
                .then((res) => {

                    sessionStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        userEmail: res.data.email,
                        isAdmin: res.data.isAdmin,
                        business: res.data.business,
                        userId: res.data.id
                    })
                    );
                    
                    successMsg(`${values.email} was registered and logged in`);
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                    navigate("/");

                })
                .catch((err) => console.log(err));
            }
            
                ,});
    
                useEffect(() => {
                    formik.setFieldValue("houseNum", ""); 
                }, []);
    return (
        <>
        <div className="login">
        <div className="container">
    
        <h3 className="display-3">REGISTER</h3>

        <form className="mb-4" onSubmit={formik.handleSubmit}>
            <div className="row">
            <div className="col-md-6 my-1">
            <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="firstName" 
        placeholder="First Name"
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        onBlur={formik.handleBlur}/>
        <label htmlFor="firstName">First Name</label>
        {formik.touched.firstName && formik.errors.firstName && (<p className="text-danger">{formik.errors.firstName}</p>)}
        </div>
    
        <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="middleName" 
        placeholder="Middle name"
        name="middleName"
        onChange={formik.handleChange}
        value={formik.values.middleName}
        onBlur={formik.handleBlur}/>
        <label htmlFor="middleName">Middle Name</label>
        {formik.touched.middleName && formik.errors.middleName && (<p className="text-danger">{formik.errors.middleName}</p>)}
        </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="lastName" 
            placeholder="Last Name"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}/>
            <label htmlFor="floatingPassword">Last Name</label>
            {formik.touched.lastName && formik.errors.lastName && (<p className="text-danger">{formik.errors.lastName}</p>)}
            </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="country" placeholder="Country"name="country"onChange={formik.handleChange}value={formik.values.country} onBlur={formik.handleBlur
            }/>
            <label htmlFor="country">Country</label>
            {formik.touched.country && formik.errors.country && (<p className="text-danger">{formik.errors.country}</p>)}
            </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="state" placeholder="State"name="state"onChange={formik.handleChange} value={formik.values.state}onBlur={formik.handleBlur}/>
            <label htmlFor="state">State</label>
            {formik.touched.state && formik.errors.state && (<p className="text-danger">{formik.errors.state}</p>)}
            </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="city" placeholder="City"name="city"onChange={formik.handleChange}value={formik.values.city}onBlur={formik.handleBlur}/>
            <label htmlFor="city">City</label>
            {formik.touched.city && formik.errors.city && (<p className="text-danger">{formik.errors.city}</p>)}
            </div> 

            </div>
            <div className="col-md-6 my-1">
            <div className="form-floating">
        <input type="text" className="form-control" id="phone" placeholder="Phone Number:"name="phone"onChange={formik.handleChange}value={formik.values.phone} onBlur={formik.handleBlur}/>
        <label htmlFor="floatingName">Phone Number</label>
        {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
        </div>
    
        <div className="form-floating">
        <input type="email" className="form-control" id="email" placeholder="name@example.com"name="email"onChange={formik.handleChange}value={formik.values.email}onBlur={formik.handleBlur}/>
        <label htmlFor="email">Email address</label>
        {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
        </div>
        <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"name="password"onChange={formik.handleChange}value={formik.values.password}onBlur={formik.handleBlur}/>
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
            </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="street" placeholder="Street name:"name="street"onChange={formik.handleChange}value={formik.values.street}onBlur={formik.handleBlur}/>
            <label htmlFor="floatingPassword">Street:</label>
            {formik.touched.street && formik.errors.street && (<p className="text-danger">{formik.errors.street}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="number" 
            className="form-control" 
            id="houseNum" 
            placeholder="House number:"
            name="houseNum"
            onChange={formik.handleChange}
            value={formik.values.houseNum}
            onBlur={formik.handleBlur}/>
            <label htmlFor="houseNum">House Number:</label>
            {formik.touched.houseNum && formik.errors.houseNum && (<p className="text-danger">{formik.errors.houseNum}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="zip" 
            placeholder="Zip Code:"
            name="zip"
            onChange={formik.handleChange}
            value={formik.values.zip}
            onBlur={formik.handleBlur}/>
            <label htmlFor="zip">Zip Code:</label>
            {formik.touched.zip && formik.errors.zip && (<p className="text-danger">{formik.errors.zip}</p>)}
            </div>
            </div>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" id="business" name="business" checked={formik.values.business} onChange={(event) =>formik.setFieldValue("business", event.target.checked)
                }
            />
            <label className="form-check-label" htmlFor="business">Sign up as Business
            </label>
            </div>
            {formik.touched.business && formik.errors.business && (
            <div className="text-danger">{formik.errors.business}</div>
            )}
<button onClick={()=>{if(window.confirm("Are you sure?")){navigate(-1)}}} className="btn btn-danger w-50 mt-1">CANCEL</button>
<button type="reset" onClick={()=>{if(window.confirm("Are you sure you want to clear the form?")){formik.resetForm()}}} className="btn btn-primary w-50 mt-1"><i className="fa-solid fa-rotate-left" ></i></button>

<button disabled={!formik.isValid || !formik.dirty} type="submit" className="btn btn-success w-100 mt-2">Register</button>
        </form>
    <Link to="/">Already have a user? Login here.</Link>
        </div>
        </div>
    
        </>

);
}

export default Register;