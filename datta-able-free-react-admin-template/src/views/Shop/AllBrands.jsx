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
    //import classes from '../Media/media.module.css'
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import classes from './shop.module.css'
    import { FaCameraRetro,FaTrashCan,FaRegSquarePlus,FaEye,FaFileSignature  } from "react-icons/fa6";


const AllBrands = () => {
  const [brands,setBrands] = useState([])

    useEffect(()=>{
    
         
       axios({
         method: 'post',
        url: '/shop/handleGetAllBrands',
         
         
        
     }).then((response)=>{
       const {allbrands} = response.data;
       setBrands(allbrands)
       console.log(allbrands)
    
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
              <Card.Title as="h5">Brands List</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className={classes.table}>
                <thead className={classes.thead}>
                  <tr>
                  
                    <th>Title</th>
                    <th>Parent</th>
                    <th>Image</th>
                    <th>Desc</th>
                    <th></th>
                  </tr>
                </thead>
                {
                      brands.length>0?
                    <tbody>
                      {
                                brands.map(item=>
                                    
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        {/*  <td>{item.category}</td>  */}
                                        <td>
                                            {
                                                item.category.map(subCat=>
                                                    <React.Fragment key={subCat._id}>
                                                        <span>{subCat}</span><br />
                                                    </React.Fragment>
                                                    )
                                            }
                                        </td>
                                        <td>
{/*                                             <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.image}`} alt={item.image} className={classes.preview} />
 */}                                        </td> 
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

export default AllBrands;
