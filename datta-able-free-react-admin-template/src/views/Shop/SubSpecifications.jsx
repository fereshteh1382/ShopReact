import React,{useEffect,useContext,useState} from 'react'
import { 
  Button,  
  Card,
  CardBody,
  CardFooter,
  CardHeader,  
FormGroup,Form,
Col,Row,Table,Spinner
  } from 'react-bootstrap'; 

import axios from 'axios';
//import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './shop.module.css';
import { FaCameraRetro,FaTrashCan,FaRegSquarePlus,FaEye,FaFileSignature  } from "react-icons/fa6";


const Specifications = (props)=>{

  const [title,setTitle] = useState('');
  const [label,setLabel] = useState('');
  const [categoryFromServer,setCategoryFromServer] = useState([]);
  const [categoryValue,setCategoryValue] = useState('');
  const [subCategoryFromServer,setSubCategoryFromServer] = useState([]);
  const [ID,setID] = useState(null);
  const[allProductSpecs,setAllProductSpecs] = useState([]);
  const [titleId,setTitleId] = useState(null);
  const[allProductSpecsDetails, setAllProductSpecsDetails] = useState([]);
  useEffect(()=>{

    const parentID = {
      parent: null
    } 
         
    axios({
      method: 'post',
     url: '/shop/handleGetAllCategory',
     data:parentID
     
     
  }).then((response)=>{
    const {allcategory} = response.data;
    setCategoryFromServer(allcategory);
 
    }).catch((error)=>{
      console.log(error)
     
  })
 },[])

 const handleCategoryValue = (event)=>{
  setCategoryValue(event.target.value);
  const parentID = {
    parent: event.target.value
  } 
       
  axios({
    method: 'post',
   url: '/shop/handleGetAllCategory',
   data:parentID
   
   
    }).then((response)=>{
      const {allcategory} = response.data;
      setSubCategoryFromServer(allcategory);
  
      }).catch((error)=>{
        console.log(error)
      
    })
} 
     
const handleTitle = (event)=>{
  setTitle(event.target.value)
}

const handleLabel = (event)=>{
  setLabel(event.target.value)
}

const getId = (event)=>{

  setID(event.target.value);
  const parentID = {
    categoryId: event.target.value
  } 
       
  axios({
    method: 'post',
   url: '/shop/handleGetAllSpecifications',
   data:parentID
   
   
}).then((response)=>{//console.log(response);
    if(response.data.errors){
        const message = response.data.errors[0];
        toast.error(message)
        
       }
       else{
        const {allspecifications} = response.data;
         setAllProductSpecs(allspecifications);
       }

  }).catch((error)=>{
    console.log(error)
   
}) 
  
}

const onsubmitForm = ()=>{
  
   const variables ={
    "title" : title,
    "label":label,
    "spec":titleId
    
    } 
    
    axios({
       method: 'post',
       url: '/shop/handleSaveSubSpecifications',
      data:variables
     
     
  }).then((response)=>{
   // console.log(response);
   
   if(response.data.errors){
    const message = response.data.errors[0];
    toast.error(message)
    }else{
    const message = response.data.message;
    toast.success(message)
     const arrayHolder = [...allProductSpecsDetails];
    arrayHolder.push({
        _id :response.data.subspec._id,
         title :response.data.subspec.title,
        label:response.data.subspec.label
    });
    setAllProductSpecsDetails(arrayHolder); 
    setTitle('');
    setLabel('')
    }
    }).catch((error)=>{
      console.log(error);
      toast.error(error)
     
  })
 
}
const getTitleId = (event) =>{
  setTitleId(event.target.value)
  const parentID = {
    specsId: event.target.value
  } 
       
  axios({
    method: 'post',
   url: '/shop/handleGetAllSubSpecifications',
   data:parentID
   
   
}).then((response)=>{//console.log(response);
    if(response.data.errors){
        const message = response.data.errors[0];
        toast.error(message)
        
       }
       else{
        const {allsubspecifications} = response.data;
        setAllProductSpecsDetails(allsubspecifications);
       }

  }).catch((error)=>{
    console.log(error)
   
}) 
  
}
    return(
      <div className="animated fadeIn">
           <ToastContainer /> 
            <Card>
                <CardHeader>
                    <h6>Add SubSpecifications</h6>
                </CardHeader>
                <CardBody>
                <Row>
                
               
                <Col md={3}>
               
                <Form.Group className="d-inline-flex mx-3 align-items-center">
                  
                  <Form.Control  as="select" className="mb-3" 
                  
                      name="mainSubTitle" 
                      id="mainSubTitle"
                      value={categoryValue}
                      onChange={handleCategoryValue}
                      >
                        <option value=''>Select Category</option> 
                        {
                            categoryFromServer.map((item)=>
                                <option value={item._id} key={item._id}>{item.title}</option>
                              )
                          } 
                  </Form.Control>
                  </Form.Group>
                  </Col>
                  <Col md={3}>
                  <Form.Group className="d-inline-flex mx-3 align-items-center">
                  <Form.Control as="select" className="mb-3" 
                      name="multiple-select" 
                      id="multiple-select"
                      
                       onChange={getId} 
                      >
                         <option value=''>Select SubCategory</option> 

                        {
                        subCategoryFromServer.map((item)=>
                            <option key={item._id} value={item._id}>{item.title}</option>
                            )
                          }
                  </Form.Control>
                  </Form.Group>
                 
                </Col>
                <Col md={3}>
                  <Form.Control  as="select"
                   
                    type="select"    
                    className="mb-3"
                     name="multiple-select"  
                     id="multiple-select"
                     
                     onChange={getTitleId}
                     >
                         <option>Select</option>
                         {
                              allProductSpecs.map((item)=>
                                 <option key={item._id} value={item._id}>{item.title}</option>
                             )
                         }
                     </Form.Control>      
                     </Col>
                     <Col md={6}>
                  <Form.Control 
                   type="text"
                    placeholder="Name" 
                    className="mb-3"
                     name="title"  
                     id="title"
                     value={title}
                      onChange={handleTitle}
                     required
                    
                     />
                     </Col>
                     <Col md={6}>
                  <Form.Control type="text" placeholder="Label" className="mb-3"
                   name="label"
                   id="label" 
                    value={label}
                   onChange={handleLabel}
                   />
                  
                </Col>
               
             
             </Row>

                    
                
                </CardBody>
              
                <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={onsubmitForm}>
                            <strong>Save </strong>
                        </Button>

                          
                </CardFooter>  
            </Card>
            <Row>
          <Col>
            <Card>
              <CardHeader>
                 
              </CardHeader>
              <CardBody>
                  
                <Table   responsive className={classes.table}>
                    <thead className={classes.thead}>
                        <tr>
                            <th>Title</th>
                           <th>Description</th>
                           <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allProductSpecsDetails.map((item)=>
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>{item.label}</td>
                                    <td className={classes.opreation}>
                                                        <Button size="sm" variant="primary">
                                                        {/* <i className="fa fa-edit"></i> */}
                                                        <FaFileSignature />

                                                        </Button>
                                                        
                                                        <Button size="sm" variant="danger">
                                                        <FaTrashCan />

                                                        </Button>
                                                    </td>
                                </tr>
                            
                            )
                        }   
                    </tbody>
                        
                 </Table> 
                
                
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
        
    )
}
export default Specifications;