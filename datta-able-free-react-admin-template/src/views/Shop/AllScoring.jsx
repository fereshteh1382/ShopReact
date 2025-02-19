import React,{useEffect,useState} from 'react'
import { 
 
  Card,
  CardBody,
  CardFooter,
  CardHeader,  
Form,
Col,Row,Table
  } from 'react-bootstrap'; 

import axios from 'axios';
//import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './shop.module.css';
import ScoringItems from './ScoringItems';
import { FaCameraRetro,FaTrashCan,FaRegSquarePlus,FaEye,FaFileSignature  } from "react-icons/fa6";

const AddScoring = (props)=>{

  
  const [categoryFromServer,setCategoryFromServer] = useState([]);
 
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

    const getIdSubCategory = (event)=>{

      setCategorySelected(event.target.value)
      const parentID = {
        parent: event.target.value
      } 
           
      axios({
        method: 'post',
       url: '/shop/handleGetAllCategory',
       data:parentID
       
       
        }).then((response)=>{
          const {allcategory} = response.data;
       setResult(allcategory)
         // console.log(result);
      
          }).catch((error)=>{
            console.log(error)
          
        })
     
  }

  const showModal = (id)=>{  

    setModal(true);
    setSubCatId(id);
}
const toggleLarge=()=> {
    setModal(!modal);
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
               
               
                <Col md={12}>
               
                <Form.Group className="d-inline-flex mx-3 align-items-center">
                <Form.Label className="mb-3"> Select Category: </Form.Label>
                  <Form.Control  as="select" className="mb-3" 
                  
                      name="mainSubTitle" 
                      id="mainSubTitle"
                      value={categorySelected}
                      onChange={getIdSubCategory}
                      >
                      
                        {
                            categoryFromServer.map((item)=>
                                <option value={item._id} key={item._id}>{item.title}</option>
                              )
                          } 
                  </Form.Control>
                  </Form.Group>
                  </Col>
                  
            
             <Col md={12}>
             <Table responsive hover className={classes.table}>
                <thead className={classes.thead}>
                  <tr>
                   
                    <th>Title</th>
                    <th>Setting</th>
                   
                  </tr>
                </thead>
                
                    <tbody>
                    {
                                result.map(item=>
                                    
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>
                                            <Col xs="6">
                                                <span 
                                                    className={classes.showSurvey}
                                                    onClick={()=>showModal(item._id)}
                                                >
                                                مشاهده معیار های امتیاز دهی
                                                </span>
                                            </Col>

                                        </td>
                                        
                                    </tr>
                                
                                    )
                            }
                  
                  </tbody>
                   
                  
                
              </Table>
              </Col>
              </Row>
                </CardBody>
              
                <CardFooter>
               
                </CardFooter>  
            </Card>
            {
            modal?
        <ScoringItems
            modal={modal}
            toggleLarge={toggleLarge}
            id={subCatId}
            />:null
        }
        </div>
        
    )
}
export default AddScoring;