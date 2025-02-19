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

const ScoringItems = (props)=>{
    const {modal,toggleLarge,id} = props
    const [allSurvey,setAllSurvey] = useState([]);
    const [message,setMessage] = useState('')
    
    useEffect(()=>{

        const parentID = {
            categoryId: id
          } 
               
          axios({
            method: 'post',
           url: '/shop/handleGetAllScoring',
           data:parentID
           
           
        }).then((response)=>{console.log(response);
            if(response.data.errors){
                const message = response.data.errors[0];
                toast.error(message)
                setMessage(message)
               }
               else{
                const {allscoring} = response.data;
                setAllSurvey(allscoring);
               }
       
          }).catch((error)=>{
            console.log(error)
           
        }) 
       
        
      },[])
    
 
  
    return(
        <div 
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
            <ToastContainer />
            <Card>
                
           
               
               {/*  <Modal isOpen={modal} toggle={toggleLarge}
                            className={'modal-lg ' + props.className}>
                    <ModalHeader toggle={toggleLarge}>
                        <strong>{message}</strong>
                    </ModalHeader>
                    <ModalBody>***** 
                         {
                            allSurvey.map((item,index)=>
                                <Row key={item._id}>
                                    <Col xs="6">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>عنوان</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="text" name="disabled-input" placeholder={item.name} disabled />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>توضیحات</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="text" name="disabled-input" placeholder={item.label} disabled />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )
                        } 
                    </ModalBody>
                </Modal> */}
                <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {
                            allSurvey.map((item,index)=>
                                <Row key={item._id}>
                                    <Col md={6}>
                                    <Form.Group className="d-inline-flex mb-3 align-items-center">
                                    <Form.Label className="mb-0">Name:</Form.Label>
                                    <Form.Control className="mx-2" type="text" placeholder={item.name} disabled />
                                    </Form.Group>
                                        
                                    </Col>
                                    <Col md={6}>
                                    <Form.Group className="d-inline-flex  align-items-center">
                                    <Form.Label className="mb-0">Label:</Form.Label>
                                    <Form.Control className="mx-2" type="text" placeholder={item.label} disabled />
                                    </Form.Group>
                                    </Col>
                                </Row>
                            )
                        } 
        </Modal.Body>

        <Modal.Footer>
         
        </Modal.Footer>
      </Modal.Dialog>
                </Card>

                
           
        </div>
       
    )
}
export default ScoringItems;
