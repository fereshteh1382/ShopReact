import React,{useEffect,useContext,useState} from 'react'
import { 
    Row,  
    Card,
    CardBody,
    CardHeader,  
   
    Spinner,
    Col,
    Modal,
    ModalBody,
    ModalHeader
  } from 'react-bootstrap';
import classes from './media.module.css';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllMedia = (props)=>{
    
    const [allMedia,setAllMedia] = useState([]);
    const [loading,setLoading]= useState(true);
    const [searchBarValue,setSearchBarValue] = useState('');
    const [arrayHolder,setArrayHolder] = useState([]);
    const [modal,setModal] = useState(false);
    const [selectedItem,setSelectedItem] = useState(null)
  /*   useEffect(()=>{
       
        axios({
            url:'/users/handleGetImages',
            method:'post',
             data:{
                query:`
                query getAllMedia($page : Int, $limit : Int) {
                    getAllMultimedia(page : $page, limit : $limit) {
                      _id,
                      dir,
                      name,
                      format,
                      dimwidth,
                      dimheight,
                      createdAt
                    }
                  }`,
                  variables:{
                    "page": 1,
                    "limit": 50
                  }
            } 
        }).then((response)=>{ console.log(response.data);
            if(response.data.errors){
              //  const {message} = response.data.errors[0]
                toast.error(message)
            }
            else{
                const {getAllMultimedia} = response.data.data;
                setAllMedia(getAllMultimedia);
                setArrayHolder(getAllMultimedia)
                setLoading(false)
            }
            
        }).catch((error)=>{
            console.log(error)
        })
      },[]) */
    
   const filterMedia = (event)=>{
        const newData = arrayHolder.filter((item)=>{
            const itemData = item.name.toUpperCase();
            const textData = event.target.value.toUpperCase();
            return itemData.indexOf(textData)>-1
        })
        setSearchBarValue(event.target.value)
        setAllMedia(newData);
   }
   const toggleLarge=()=> {
    setModal(!modal);
  }
  const setChange=(item)=>{
      setModal(true);
      setSelectedItem(item);
  }
    return(
        <div className="animated fadeIn">
            <ToastContainer />
            <Card>
                <CardHeader>
                    <Col xs="7">
                        <input
                            type="text"
                            placeholder="Search In Media"
                            value={searchBarValue}
                            onChange={filterMedia}
                        />
                    </Col>
                </CardHeader>
                <CardBody>
                    <div className={classes.mediaSection}>
                    {
                        loading ?<Spinner />:        
                        allMedia.map(item=>
                            <div className={classes.media} key={item._id} onClick={()=>setChange(item)}>
                                <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`} alt={item.dir} />
                            </div>
                            )
                    }
                        
                        
                    </div> 
                </CardBody>
                 
            </Card>
               {/*  {
                    selectedItem ?
                    <Modal isOpen={modal} toggle={toggleLarge}
                            className={'modal-lg ' + props.className}>
                    <ModalHeader toggle={toggleLarge}>اطلاعات پرونده</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="8">
                            <img src={`${process.env.REACT_APP_PUBLIC_URL}${selectedItem.dir}`} alt={selectedItem.dir} style={{width:'100%'}} />
                            </Col>
                            <Col xs="4">
                                <Row>
                                    <Col xs="6">
                                        نام :
                                    </Col>
                                    <Col xs="6">
                                        {selectedItem.name}
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs="6">
                                        نوع پرونده :
                                    </Col>
                                    <Col xs="6">
                                        {selectedItem.format}
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs="6">
                                        ابعاد پرونده  :
                                    </Col>
                                    <Col xs="6">
                                    px {selectedItem.dimwidth} * {selectedItem.dimheight} 
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs="8">
                                        ناریخ ایجاد پرونده  :
                                    </Col>
                                    <Col xs="4">
                                    {new Date(selectedItem.createdAt).toLocaleDateString('fa-IR')} 
                                    </Col>
                                </Row>
                                <hr />
                            </Col>
                        </Row>
                    </ModalBody>
                 </Modal>:null

                } */}
           
        </div>
    )
}
export default AllMedia;
