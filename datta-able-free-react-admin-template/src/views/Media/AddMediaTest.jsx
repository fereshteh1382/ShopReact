import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button,  
  Card,
  CardBody,
  CardFooter,
  CardHeader,  
  Form,FormGroup,
  } from 'react-bootstrap';
const AddMedia = (props)=>{


 // const [file, setFile] = useState();
  const [test, setTest] = useState();

  const handleFileChange0 = (e) => {
   /*  if (e.target.files) {
      setFile(e.target.files[0]);
    } */
  //  setTest('hhhhhhhhh');
  };
  const [values, setValues] = useState({file : ''});
  
  const handleFileChange = e => {
    const {name, value} = e.target.files
    setValues({
        ...values,
        [name]: value
    });
};

  const handleUpload = async () => {
   
        console.log(selectedImage.files[0]);
      
     
  
      
      const category = {
        file: values.file
         };
      axios({
        method: 'post',
       url: '/shop/handleUploadImage',
      /*  headers: {
        'Content-Type':
          'application/json',
      },  */
      /* headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        
    }, */
       data: category,
       
       
     }).then((response)=>{console.log(response.data);
        
    }).catch((error)=>{
        console.log(error)
    })
      
    
  };

  return (
    <div className="animated fadeIn">
     
        <input id="file" name="file" type="file" onChange={handleFileChange} value={values.file}/>
     
        <button 
          onClick={handleUpload}
          className="submit"
        >Upload a file</button>
     
    </div> 
   
  )

 }
      export default AddMedia;
