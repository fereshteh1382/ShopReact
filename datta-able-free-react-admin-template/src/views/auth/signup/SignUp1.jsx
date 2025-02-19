import React , { useState }from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const initialValues={
  fullname:'',
  username: '',
  password: '',
  confirmpassword:'',
  submit: null
}
const validate = Yup.object({
  fullname: Yup.string().required("Fullname Required!"),
  username: Yup.string().required("Username Required!"),
 // email: Yup.string().email("Email is invalid!").required("Email Required!"),
  password: Yup.string()
    .min(4, "Password must be minimum 4 digits!")
    .required("Password Required!"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match!")
    .required("Confirm password is reqired!"),
  /* age: Yup.number()
    .min(14, "Age must be minimum 14 Years!")
    .required("Age must be required!"), */
});




const SignUp1 = () => {

  const [formData, setFormData] = useState({

    password : '',
    confirmpassword:'',
    username: '',
    fullname:'',
    
    });
  
  const handleChange = (e) => {

    const { name, value } = e.target;
    
    setFormData({ formData, [name]: value });
    
    };
    
  return (
   
    <React.Fragment>
      <Breadcrumb />
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
       /*  onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }} */
       
        onSubmit={(formData, { setSubmitting, resetForm }) => {
          console.log(formData);
          axios({
            method: 'post',
            url: '/users/handleRegister',
            data: formData
        })
       
        
          .then(function (response) {
          //  console.log(response);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });  
        }}
      >
      
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
      <form  onSubmit={handleSubmit}>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Sign up</h3>
                  <div className="form-group mb-3">
                      <input
                        className="form-control"
                        label="fullname "
                        name="fullname"
                        placeholder="fullname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                       
                      />
                      {touched.fullname && errors.fullname && <small className="text-danger form-text">{errors.fullname}</small>}
                  </div>
                  <div className="form-group mb-3">
                      <input
                        className="form-control"
                        label="username"
                        name="username"
                        placeholder="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="username"
                       
                      />
                      {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
                  </div>
                  
                  <div className="form-group mb-4">
                      <input
                        className="form-control"
                        label="Password"
                        name="password"
                        placeholder="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        
                      />
                     {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
                 </div>
                 <div className="form-group mb-4">
                       <input
                          className="form-control"
                          label="ConfirmPassword"
                          id="confirmpassword"
                          type="password"
                          name="confirmpassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="confirm password..."
/*                           {...formik.getFieldProps("confirmpassword")}
 */                     />
                
                     {touched.confirmpassword && errors.confirmpassword && <small className="text-danger form-text">{errors.confirmpassword}</small>}
                 </div>
                  <div className="form-check  text-start mb-4 mt-2">
                    <input type="checkbox" className="form-check-input" id="customCheck1" defaultChecked={false} />
                    <label className="form-check-label" htmlFor="customCheck1">
                      Send me the <Link to="#"> Newsletter</Link> weekly.
                    </label>
                  </div>
                  {errors.submit && (
                    <Col sm={12}>
                      <Alert>{errors.submit}</Alert>
                    </Col>
                  )}
                   
                  <button className="btn btn-primary mb-4" disabled={isSubmitting} type="submit">Sign up</button>
                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to={'/auth/signin-1'} className="f-w-400">
                      Login
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      </form>
      )}
    </Formik>
    </React.Fragment>
  );
};

export default SignUp1;
