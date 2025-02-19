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
import classes from '../Shop/shop.module.css'



const Seller = (props)=>{

  const [title,setTitle] = useState('');
  const [label,setLabel] = useState('');
  const [categoryFromServer,setCategoryFromServer] = useState([]);
  const [categoryValue,setCategoryValue] = useState('');
  const [result,setResult] = useState([]);

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
   url: '/product/handleGetAllSeller',
   data:parentID
   
   
}).then((response)=>{console.log(response);
    if(response.data.errors){
        const message = response.data.errors[0];
        toast.error(message)
        
       }
       else{
        const {allseller} = response.data;
        allseller.map(item=>item.flag = false);
        setResult(allseller);
       }

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


const onsubmitForm = ()=>{
  
   const variables ={
    "title" : title,
    "label":label,
    "category":categoryValue
    
    } 
    
    axios({
       method: 'post',
       url: '/product/handleSaveSeller',
      data:variables
     
     
  }).then((response)=>{
    console.log(response);
  
    const message = response.data.message;
    toast.success(message)
    const arrayHolder = [...result];
   
    arrayHolder.push({
        _id : response.data.selleradd._id,
        title : response.data.selleradd.title,
        label:response.data.selleradd.label,
        flag:false
    })
    setResult(arrayHolder);
    setTitle('');
    setLabel('')
    
    }).catch((error)=>{
      console.log(error);
      toast.error(error)
     
  })
 
}
const handleEdit = (id)=>{
  const newSellers = [...result];
  const newData = newSellers.filter((item)=>{
      return item._id===id
  })
  newData[0].flag = true;
  setResult(newSellers);
}
const changeNameHandler = (event,id)=>{
  const newSellers = [...result];
  const newData = newSellers.filter((item)=>{
      return item._id===id
  })
  newData[0].title = event.target.value;
  setResult(newSellers);
}
const changeLableHandler = (event,id)=>{
  const newSellers = [...result];
  const newData = newSellers.filter((item)=>{
      return item._id===id
  })
  newData[0].label = event.target.value;
  setResult(newSellers);
}
const submitEdit = (id) =>{
  const newSellers = [...result];
  const newData = newSellers.filter((item)=>{
      return item._id===id
  })
  //console.log(newData);
  const {_id, title, label} = newData[0];
  const variables ={
    "title" : title,
    "label":label,
    "id":_id
    
    } 
    
    axios({
       method: 'post',
       url: '/product/handleUpdateSeller',
      data:variables
     
     
  }).then((response)=>{
    console.log(response);
          if(response.data.errors){
            const message = response.data.errors[0];
            toast.error(message)
        }else{
          const message = response.data.message;
          toast.success(message)
          newData[0].flag = false;
          setResult(newSellers)
        }
    }).catch((error)=>{
      console.log(error);
      toast.error(error)
     
  })
  
}
    return(
      <div className="animated fadeIn">
           <ToastContainer /> 
            <Card>
                <CardHeader>
                    <h6>Add Seller</h6>
                </CardHeader>
                <CardBody>
                <Row>
                
               
                <Col md={6}>
               
                <Form.Group className="d-inline-flex mx-3 align-items-center">
                <Form.Label className="mb-3"> Select Category: </Form.Label>
                  <Form.Control  as="select" className="mb-3" 
                  
                      name="mainSubTitle" 
                      id="mainSubTitle"
                      value={categoryValue}
                       onChange={handleCategoryValue} 
                      >
                        <option value=''>Category</option> 
                        {
                            categoryFromServer.map((item)=>
                                <option value={item._id} key={item._id}>{item.title}</option>
                              )
                          } 
                  </Form.Control>
                  </Form.Group>
                  </Col>
                  <Col md={6}></Col>
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
                            <th> seller</th>
                           <th>description</th>
                           <th>setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.map((item)=>
                                <tr key={item._id}>
                                    <td>{
                                        item.flag
                                        ?
                                        <Form.Control type="text" placeholder="Title" className="mb-3"
                                        name="title"
                                        id="title" 
                                        value={item.title}
                                                onChange={(event)=>changeNameHandler(event,item._id)}
                                        />
                                            
                                                :
                                            item.title
                                        }</td>
                                    <td>{
                                        item.flag
                                        ?
                                        <Form.Control type="text" placeholder="Label" className="mb-3"
                                        name="label"
                                        id="label" 
                                        value={item.label}
                                                onChange={(event)=>changeLableHandler(event,item._id)}
                                        />
                                            
                                                :
                                            item.label
                                        }
                                        </td>
                                    <td>
                                    {
                                        item.flag ? 
                                        <Button type="submit" size="sm" color="primary" onClick={()=>submitEdit(item._id)} >
                                            <i className="fa fa-check fa-lg"></i>
                                        </Button>
                                        :
                                        <Button type="submit" size="sm" color="primary" onClick={()=>handleEdit(item._id)} >
                                            <strong>Edit </strong>
                                        </Button>
                                    }
                                     <Button type="submit" size="sm" color="primary"  >
                                            <strong>Delete </strong>
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
export default Seller;