import { Field, useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMsg, errorMsg } from "../services/feedbackService";
import { addUser, checkUser, getTokenDetails} from "../services/usersService";




interface RegisterProps {
    setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({setUserInfo}) => 
{

    let navigate = useNavigate();
    if(sessionStorage.getItem("isLoggedIn")=="true"){
        navigate("/home");
    }
    let formik = useFormik({
        initialValues: {
        name: {firstName: "",middleName: "",lastName: "",},
        phone: "",email: "",password: "",
        address: {state: "",country: "",city: "",street: "",houseNum: 0,zip: "",
        },
        isBusiness: false,
        },
        validationSchema: yup.object({
        name: yup.object({firstName: yup.string().required().min(2),
        middleName: yup.string().min(0).nullable().default(null),
        lastName: yup.string().required().min(2),
        }),
        phone: yup.string().required().min(10),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        address: 
        yup.object({state: yup.string().min(2).required(),country: yup.string().required().min(2),city: yup.string().required().min(2),street: yup.string().required().min(2),houseNum: yup.number().required(),zip: yup.string().min(3).nullable().default(null),
        }),
        isBusiness: yup.boolean(),
        isAdmin: yup.boolean(),
        }),
            onSubmit(values) {
                const valuesToServer = {...values,  address: {...values.address,
                    zip: formik.values.address.zip === "" ? null : formik.values.address.zip,
                },name:{...values.name , middleName:formik.values.name.middleName === "" ? null : formik.values.name.middleName,}, isAdmin: false   }

                addUser(valuesToServer)
                .then((res) => {
                    sessionStorage.setItem(
                    "token",
                    JSON.stringify({
                    token: res.data
                    }));
                    sessionStorage.setItem(
                        "userInfo",
                        JSON.stringify({
                        isAdmin: (getTokenDetails() as any).isAdmin,
                        business: (getTokenDetails() as any).isBusiness,
                        userId: (getTokenDetails() as any)._id,
                        userEmail: (getTokenDetails() as any).email,

                        })
                        );
                    
                    successMsg(`${values.email} was registered and logged in`);
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                    navigate("/");

                })
                .catch((err) => errorMsg(`Sorry! ${err.response.data}`));
            }
                ,});
                useEffect(() => {
                    formik.setFieldValue("address.houseNum", ""); 
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
        name="name.firstName"
        onChange={formik.handleChange}
        value={formik.values.name.firstName}
        onBlur={formik.handleBlur}/>
        <label htmlFor="firstName">First Name</label>
        {formik.touched.name?.firstName && formik.errors.name?.firstName && (<p className="text-danger">{formik.errors.name?.firstName}</p>)}
        </div>
    
        <div className="form-floating">
        <input 
        type="text" 
        className="form-control" 
        id="middleName" 
        placeholder="Middle name"
        name="name.middleName"
        onChange={formik.handleChange}
        value={formik.values.name.middleName}
        onBlur={formik.handleBlur}/>
        <label htmlFor="middleName">Middle Name</label>
        {formik.touched.name?.middleName && formik.errors.name?.middleName && (<p className="text-danger">{formik.errors.name?.middleName}</p>)}
        </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="lastName" 
            placeholder="Last Name"
            name="name.lastName"
            onChange={formik.handleChange}
            value={formik.values.name.lastName}
            onBlur={formik.handleBlur}/>
            <label htmlFor="floatingPassword">Last Name</label>
            {formik.touched.name?.lastName && formik.errors.name?.lastName && (<p className="text-danger">{formik.errors.name?.lastName}</p>)}
            </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="country" placeholder="Country"name="address.country"onChange={formik.handleChange}value={formik.values.address.country} onBlur={formik.handleBlur
            }/>
            <label htmlFor="country">Country</label>
            {formik.touched.address?.country && formik.errors.address?.country && (<p className="text-danger">{formik.errors.address?.country}</p>)}
            </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="state" placeholder="State"name="address.state"onChange={formik.handleChange} value={formik.values.address.state}onBlur={formik.handleBlur}/>
            <label htmlFor="state">State</label>
            {formik.touched.address?.state && formik.errors.address?.state && (<p className="text-danger">{formik.errors.address?.state}</p>)}
            </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="city" placeholder="City"name="address.city"onChange={formik.handleChange}value={formik.values.address.city}onBlur={formik.handleBlur}/>
            <label htmlFor="city">City</label>
            {formik.touched.address?.city && formik.errors.address?.city && (<p className="text-danger">{formik.errors.address?.city}</p>)}
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
            <input type="text" className="form-control" id="street" placeholder="Street name:"name="address.street"onChange={formik.handleChange}value={formik.values.address?.street}onBlur={formik.handleBlur}/>
            <label htmlFor="floatingPassword">Street:</label>
            {formik.touched.address?.street && formik.errors.address?.street && (<p className="text-danger">{formik.errors.address?.street}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="number" 
            className="form-control" 
            id="houseNum" 
            placeholder="House number:"
            name="address.houseNum"
            onChange={formik.handleChange}
            value={formik.values.address?.houseNum}
            onBlur={formik.handleBlur}/>
            <label htmlFor="houseNum">House Number:</label>
            {formik.touched.address?.houseNum && formik.errors.address?.houseNum && (<p className="text-danger">{formik.errors.address?.houseNum}</p>)}
            </div>
        <div className="form-floating">
            <input 
            type="text" 
            className="form-control" 
            id="zip" 
            placeholder="Zip Code:"
            name="address.zip"
            onChange={formik.handleChange}
            value={formik.values.address.zip}
            onBlur={formik.handleBlur}/>
            <label htmlFor="zip">Zip Code:</label>
            {formik.touched.address?.zip && formik.errors.address?.zip && (<p className="text-danger">{formik.errors.address?.zip}
            </p>)}
            </div>
            </div>
            </div>
            <div className="form-check">
            <select
id="isBusiness"
name="isBusiness"
  value={formik.values.isBusiness.toString()} // Convert boolean to string
onChange={(event) => {
    formik.setFieldValue("isBusiness", event.target.value === "true");

}}
>
<option value="true">Sign up as Business</option>
<option value="false">Sign up as Individual</option>
</select>

            </div>
            {formik.touched.isBusiness && formik.errors.isBusiness && (
            <div className="text-danger">{formik.errors.isBusiness}</div>
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
