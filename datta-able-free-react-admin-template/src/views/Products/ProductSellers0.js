import React,{useEffect,useContext,useState} from 'react'
import { 
    Row,  
    Card,
    CardBody,
    CardHeader,  
    Input,
    FormGroup,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Label,
    Button,
    ModalFooter
  } from 'reactstrap';


import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './product.module.css';

const ProductSellers = (props)=>{
    const {modal,toggleLarge,attribute,productName,handleChangeColor,handleChangeStock,handleChangePrice,handleChangeDiscount,handleSuggestion,editSellers} = props
   console.log(attribute);
 
    return(
        <div className="animated fadeIn">
            <ToastContainer />
            <Card>
                
           
               
                <Modal isOpen={modal} toggle={toggleLarge}
                            className={'modal-lg ' + props.className}>
                    <ModalHeader toggle={toggleLarge}>
                        فروشندگان {productName}
                    </ModalHeader>
                    <ModalBody>
                      {
                          attribute.map((item,idx)=>{
                              
                              return(
                                  <Row key={idx}>
                                      <Col xl="4">
                                            <FormGroup>
                                                <Label>فروشنده</Label>
                                                <Input
                                                    type="text"
                                                    disabled
                                                    value={item.seller.name}
                                                    ></Input>
                                            </FormGroup>
                                      </Col>
                                      <Col xl="4">
                                            <FormGroup>
                                                <Label>گارانتی</Label>
                                                <Input
                                                    type="text"
                                                    disabled
                                                    value={item.warranty.name}
                                                    ></Input>
                                            </FormGroup>
                                      </Col>
                                      <Col  xl="4">
                                        <FormGroup>
                                            <Label> رنگ</Label> 
                                            <Input
                                                type="select"
                                                value={item.color}
                                                required
                                                onChange={(event)=>handleChangeColor(event,idx)}
                                                >
                                                <option value="black">مشکی</option>
                                                <option value="red">قرمز</option>
                                                <option value="blue">آبی</option>
                                                <option value="green">سبز</option>
                                                <option value="yellow">زرد</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xl="2">
                                            <FormGroup>
                                                <Label>تعداد</Label>
                                                <Input
                                                    type="number"
                                                    value={item.stock}
                                                    required
                                                    onChange={(event)=>handleChangeStock(event,idx)}
                                                    ></Input>
                                            </FormGroup>
                                      </Col>
                                      <Col xl="3">
                                            <FormGroup>
                                                <Label>قیمت (تومان)</Label>
                                                <Input
                                                    type="number"
                                                    value={item.price}
                                                    required
                                                    onChange={(event)=>handleChangePrice(event,idx)}
                                                    ></Input>
                                            </FormGroup>
                                      </Col>
                                      <Col xl="3">
                                            <FormGroup>
                                                <Label>درصد تخفیف</Label>
                                                <Input
                                                    type="number"
                                                    value={item.discount}
                                                    required
                                                    onChange={(event)=>handleChangeDiscount(event,idx)}
                                                    ></Input>
                                            </FormGroup>
                                      </Col>
                                      <Col xl="2" className={classes.deleteButton}>
                                        <FormGroup style={{display:'flex',flexFlow:'column'}}>
                                            <Label>پیشنهاد ویژه</Label>
                                            {
                                                item.suggestion ?
                                                <i className="fa fa-star fa-lg" style={{color:'red'}} onClick={()=>handleSuggestion(idx,false)}></i>
                                                :<i className="fa fa-star-o fa-lg" style={{color:'black'}} onClick={()=>handleSuggestion(idx,true)}></i>
                                            }
                                           
                                        </FormGroup>
                                      </Col>
                                      <Col xl="2" className={classes.deleteButton}>
                                        <Button type="submit" size="lg" color="danger">
                                            <i className="fa fa-trash fa-lg"></i>
                                        </Button>
                                      </Col>
                                      <div className={classes.line} />
                                  </Row>
                              )
                          })
                      }
                    </ModalBody>
                    <ModalFooter> 
                        <Button color="danger" onClick={editSellers}>ویرایش</Button>
                        <Button color="secondary" onClick={toggleLarge}>لغو</Button>
                    </ModalFooter>
                </Modal>
                </Card>

                
           
        </div>
    )
}
export default ProductSellers;
