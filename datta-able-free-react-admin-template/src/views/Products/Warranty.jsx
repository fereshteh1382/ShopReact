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
import { FaCameraRetro,FaTrashCan,FaRegSquarePlus,FaEye,FaFileSignature  } from "react-icons/fa6";


const Warranty = (props)=>{

  const [title,setTitle] = useState('');
  const [label,setLabel] = useState('');

  const [result,setResult] = useState([]);

  useEffect(()=>{

          
    axios({
      method: 'post',
     url: '/product/handleGetAllWarrenty',
    
     
     
  }).then((response)=>{console.log(response.data);
    if(response.data.errors){
      const message = response.data.errors[0];
      toast.error(message)
    }else{
    const {allwarranty} = response.data;
    setResult(allwarranty);
    //console.log(result);
    }
    }).catch((error)=>{
      console.log(error)
     
  })
 },[])



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
       
    } 
    
    axios({
       method: 'post',
       url: '/product/handleSaveWarranty',
      data:variables
     
     
  }).then((response)=>{
    console.log(response);
      if(response.data.errors){
        const message = response.data.errors[0];
        toast.error(message)
      }else{
        const message = response.data.message;
        toast.success(message)
         const arrayHolder = [...result];
      
        arrayHolder.push({
            _id : response.data.result._id,
            title : response.data.result.title,
            label:response.data.result.label,
           
        })
        setResult(arrayHolder);
        setTitle('');
        setLabel('')
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
                    <h6>Add Warranty</h6>
                </CardHeader>
                <CardBody>
                <Row>
                
          
                  
                <Col md={3}>
                  <Form.Control 
                   type="text"
                    placeholder="Warranty" 
                    className="mb-3"
                     name="title"  
                     id="title"
                     value={title}
                      onChange={handleTitle}
                     required
                    
                     />
                     </Col>
                     <Col md={3}>
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
                    <thead lassName={classes.thead}>
                        <tr>
                            <th>Warranty</th>
                           <th>Description</th>
                           <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                result.map(item=>
                                    
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                       
                                        <td>
                                            {item.label}
                                        </td>
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
export default Warranty;