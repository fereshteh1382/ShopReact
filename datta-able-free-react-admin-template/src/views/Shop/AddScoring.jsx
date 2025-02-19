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
//import { stat } from 'fs';

const AddScoring = (props)=>{

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [categoryFromServer,setCategoryFromServer] = useState([]);
  const [categoryValue,setCategoryValue] = useState('');
  const [subCategoryFromServer,setSubCategoryFromServer] = useState([]);
  const [ownerState,setOwnerState] = useState([]);
    const [ID,setID] = useState(null);
    const [result,setResult] = useState([]);
    const [categorySelected,setCategorySelected] = useState('');
    const [modal,setModal] = useState(false);
    const [subCatId,setSubCatId] = useState(null)
 
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
const addField = ()=>{
  const newState = [...ownerState];
  newState.push({
      name:'',
      label:''
  })
  setOwnerState(newState);
}        
const getId = (event)=>{
  setID(event.target.value);
}   
const handleChange = (event,id)=>{
  const field = {...ownerState[id]};
  field.name = event.target.value;
  const newOwnerState = [...ownerState];
  newOwnerState[id]=field;
  setOwnerState(newOwnerState);
 
}
const handleLabelChange = (event,id)=>{
const field = {...ownerState[id]};
field.label = event.target.value;
const newOwnerState = [...ownerState];
newOwnerState[id]=field;
setOwnerState(newOwnerState);

}
const onsubmitForm = ()=>{
  if(ownerState.length===0){
      toast.error('Add One Field');
      return false;
  }
  for(let i=0;i<ownerState.length;i++){
      ownerState[i].category=ID;
  }
   const variables ={
    "data" : ownerState,
    
    } 
    
    axios({
       method: 'post',
       url: '/shop/handleSaveScoring',
      data:variables
     
     
  }).then((response)=>{
   // console.log(response);
    const message = response.data.message;
    toast.success(message)
    setOwnerState([])
    }).catch((error)=>{
      console.log(error);
      toast.error(error)
     
  })
 /*  axios({
      url:'/',
      method:'post',
      data:{
          query:`
          mutation addsurvey($list : [InputSurveyList!]!) {
              survey(input : {list : $list}) {
                status,
                message
              }
            } `,
            variables:{
              "list": ownerState
            }
      },
     
  }).then((response)=>{
     const{message} = response.data.data.survey;
     toast.success(message);
     setOwnerState([])
  }).catch((error)=>{
      console.log(error)
  }) */
}
    return(
      <div className="animated fadeIn">
           <ToastContainer /> 
            <Card>
                <CardHeader>
                    <h6>Add Scoring</h6>
                </CardHeader>
                <CardBody>
                <Row>
                <Form className="d-inline-flex">
               
                <Col md={2}>
               
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
                  <Col md={2}>
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
                <Col  md={8} className={classes.addButton}>
                        <Button color="danger" className="btn-pill" onClick={addField}>
                        AddField <i className="fa fa-plus fa-lg"></i>
                        </Button>
                </Col>
            </Form>     
             </Row>

                    <Row>     
                    {
                        ownerState.map((item,idx)=>{
                            const scoreId = `name-${idx}`;
                            const labelId = `label-${idx}`;
                            return(       
                              <Col md={12}>
                              <Form.Control 
                               type="text"
                                placeholder="title" 
                                className="mb-3"
                                 name={scoreId}  
                                 id={scoreId}
                                 value={item.name}
                                  required
                                  onChange={(event)=>handleChange(event,idx)}
                               
                                 />
                              
                              <Form.Control type="text" placeholder="Description" className="mb-3" 
                              name={labelId}
                              id={labelId}
                              value={item.label}
                              onChange={(event)=>handleLabelChange(event,idx)}
                             
                              />
                            </Col>
                              )
                            })
                    }          
                
               
              </Row>
                
                </CardBody>
              
                <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={onsubmitForm}>
                            <strong>Save </strong>
                        </Button>

                          
                </CardFooter>  
            </Card>
            
        </div>
        
    )
}
export default AddScoring;