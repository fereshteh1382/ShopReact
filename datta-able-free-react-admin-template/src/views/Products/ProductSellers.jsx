import React,{useEffect,useContext,useState} from 'react'
import { 
    Row,  
    Card,
    Form,
    FormGroup,
    Col,
    Modal,Button,
    ModalBody,
    ModalHeader,
   
  } from 'react-bootstrap';


import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './product.module.css';
const ProductSellers = (props)=>{
    const {modal,toggleLarge,attribute,productName,handleChangeColor,handleChangeStock,handleChangePrice,handleChangeDiscount,handleSuggestion,editSellers} = props
   
     
      return(
        <div className="animated fadeIn">
            <ToastContainer />
            <Card>
             
    

<Modal.Dialog isOpen={modal} toggle={toggleLarge}>
  
        <Modal.Header closeButton toggle={toggleLarge}>
          <Modal.Title>  فروشندگان {productName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {
                            attribute.map((item,idx)=>
                                <Row key={idx}>
                                    <Col md={4}>
                                    <Form.Group className="d-inline-flex mb-3 align-items-center">
                                    <Form.Label className="mb-0">Seller Name:</Form.Label>
                                    <Form.Control className="mx-2" type="text" placeholder={item.sellerDetails.title} disabled />
                                    </Form.Group>
                                        
                                    </Col>
                                    <Col md={4}>
                                    <Form.Group className="d-inline-flex  align-items-center">
                                    <Form.Label className="mb-0">warranty:</Form.Label>
                                    <Form.Control className="mx-2" type="text" placeholder={item.warrentyDetails.title} disabled />
                                    </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                    <Form.Group className="d-inline-flex  align-items-center">
                                    <Form.Label className="mb-0">Color:</Form.Label>
                                    <Form.Control  as="select" className="mb-3"   id="color" value={item.color}
                                                onChange={(event)=>handleChangeColor(event,idx)}
                                                >
                                                <option value="black">مشکی</option>
                                                <option value="red">قرمز</option>
                                                <option value="blue">آبی</option>
                                                <option value="green">سبز</option>
                                                <option value="yellow">زرد</option>
                                   </Form.Control>
                                                                                
                                    </Form.Group>
                                    </Col>

                                    <Col md={2}>
                                    <Form.Group className="d-inline-flex  align-items-center">
                                    <Form.Label className="mb-0">Number:</Form.Label>
                                    <Form.Control className="mx-2" type="number"   value={item.stock}
                                                    
                                                    onChange={(event)=>handleChangeStock(event,idx)}
                                                   />
                                    </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                    <Form.Group className="d-inline-flex  align-items-center">
                                    <Form.Label className="mb-0">Price:</Form.Label>
                                    <Form.Control className="mx-2" type="number"   value={item.price}
                                                    
                                      onChange={(event)=>handleChangePrice(event,idx)}
                                                   />
                                    </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                    <Form.Group className="d-inline-flex  align-items-center">
                                    <Form.Label className="mb-0">Discount:</Form.Label>
                                    <Form.Control className="mx-2" type="number"   value={item.discount}
                                                    
                                     onChange={(event)=>handleChangeDiscount(event,idx)}
                                                   />
                                    </Form.Group>
                                    </Col>
                                    <Col md={2} className={classes.deleteButton}>
                                        <Form.Group style={{display:'flex',flexFlow:'column'}}>
                                            <Form.Label>پیشنهاد ویژه</Form.Label>
                                            {
                                                item.suggestion ?
                                                <i className="fa fa-star fa-lg" style={{color:'red'}} onClick={()=>handleSuggestion(idx,false)}></i>
                                                :<i className="fa fa-star-o fa-lg" style={{color:'black'}} onClick={()=>handleSuggestion(idx,true)}></i>
                                            }
                                           
                                        </Form.Group>
                                      </Col>
                                      <Col md={2} className={classes.deleteButton}>
                                        <Button type="submit" size="lg" color="danger">
                                            <i className="fa fa-trash fa-lg"></i>
                                        </Button>
                                      </Col>
                                    <div className={classes.line} />
                                </Row>
                            )
                        } 
        </Modal.Body>

        <Modal.Footer>
         <Button color="danger" onClick={editSellers}>Save Edit</Button>
         <Button color="secondary" onClick={toggleLarge}>Cancel</Button>
        </Modal.Footer>
      </Modal.Dialog>

                </Card>

                
           
        </div>
    )
   
}
export default ProductSellers;
