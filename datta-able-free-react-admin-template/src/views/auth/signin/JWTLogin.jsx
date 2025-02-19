import React, { useState, useContext} from 'react';
import { Row, Col, Alert, Button,Spinner} from 'react-bootstrap';
import {AuthContext} from '../../../context/Auth/AuthContext';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const JWTLogin = (props) => {
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const [isVerifed,setIsVerifed] = useState(false);
  const errors = {};
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const verifyCallback = (response)=>{
    if(response){
      setIsVerifed(true)
    }
  }
  const [formData, setFormData] = useState({

    
    });
  const handleChange = (e) => {

    const { name, value } = e.target;
    
    setFormData({ formData, [name]: value });
    
    };
    
  return (
    
    <Formik
      initialValues={{
        username: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        //email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        username: Yup.string().required("Username Required!"),
        password :  Yup.string().min(6,'Your password must be longer than 6 characters.').max(30,'too large').required('Password is required'),
      })}

     
      
      
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        
       /* if(!isVerifed){
          setMessage('لطفا من ربات نیستم را تیک بزنید');
          return false;
        }*/
        setMessage('')
        setLoading(true)
       // ${this.state.id}
      
      
         axios({
           method: 'post',
          url: '/users/handleLogin',
          data: formData
        }).then((response)=>{
          
          setLoading(false)
        // console.log(response);
          if(response.status=='201'){
          
             const message = response.data
            
            
             /* setTimeout(() => {
              alert(JSON.stringify(errors, null, 2));
              setSubmitting(false);
            }, 1000); */
             
           setMessage(message);
           setSubmitting(false);
           resetForm();
            
          }
          else{
            const token = response.data.token
           // console.log(token);
            dispatch({type:'login',payload:token})
            setSubmitting(false);
            
            navigate('/dashboard')
           // props.history.replace('/dashboard');
            //  props.history.replace({ pathname: '/dashboard', search: '?query=abc', state:{isActive: true}});
          } 
        }).catch((error)=>{
          console.log(error)
        })

 
      }}
    
      
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
       
        <form  onSubmit={handleSubmit} >
         
          <div style={{margin:'15px',color:'red'}}>{message}</div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Username"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.username}
            
            />
            {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                
                { loading ? <Spinner size="sm" /> : "Signin"  }
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
