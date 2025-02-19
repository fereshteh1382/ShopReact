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

    //import Library from '../Media/Library';
    import axios from 'axios';
  /*   import classes from '../Media/media.module.css' */
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import classes from './shop.module.css'
    import { FaCameraRetro,FaTrashCan,FaRegSquarePlus,FaEye,FaFileSignature  } from "react-icons/fa6";


const AllCategory = () => {
    const [result,setResult] = useState([]);

    useEffect(()=>{
    
         
       axios({
         method: 'post',
        url: '/shop/handleGetAllCategoriez',
         
         
        
     }).then((response)=>{console.log(response)
       const {allcategory} = response.data;
       setResult(allcategory)
    
       }).catch((error)=>{
         console.log(error)
        
     })
    },[])
  return (
    <React.Fragment>
      <Row>
        <Col>
     <Card>
            <Card.Header>
              <Card.Title as="h5">Category List</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover  className={classes.table}>
                <thead className={classes.thead}>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Parent</th>
                    <th></th>
                  </tr>
                </thead>
                {
                      result.length>0?
                    <tbody>
                      {
                          result.map((item)=>
                          <tr>
                             <th scope="row">   </th>
                            <td>{item.title}</td>
                            <td>{item.parent?item.parent:'دسته اصلی'}</td>
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
                  
                  
                  </tbody>:
                    <center><Spinner /></center>
                  }
                
              </Table>
            </Card.Body>
          </Card>
          </Col>
      </Row>
    </React.Fragment>
  );
};

export default AllCategory;
