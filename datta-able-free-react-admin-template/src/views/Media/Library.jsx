import React,{useEffect,useContext,useState} from 'react'
import { 
    Row,  
    Card,
    CardBody,
    CardHeader,  
    Input,
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

const Library = (props)=>{
    
    const [allMedia,setAllMedia] = useState([]);
    const [loading,setLoading]= useState(true);
    const [searchBarValue,setSearchBarValue] = useState('');
    const [arrayHolder,setArrayHolder] = useState([]);
    
    
    useEffect(()=>{
       
        axios({
            url:'/',
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
        }).then((response)=>{
            if(response.data.errors){
                const {message} = response.data.errors[0]
                toast.error(message)
            }
            else{
                const {getAllMultimedia} = response.data.data;
                for(let i=0;i<getAllMultimedia.length;i++){
                    getAllMultimedia[i].checked = false;
                }
                setAllMedia(getAllMultimedia);
                setArrayHolder(getAllMultimedia)
                setLoading(false)
            }
            
        }).catch((error)=>{
            console.log(error)
        })
      },[])
    
   const filterMedia = (event)=>{
        const newData = arrayHolder.filter((item)=>{
            const itemData = item.name.toUpperCase();
            const textData = event.target.value.toUpperCase();
            return itemData.indexOf(textData)>-1
        })
        setSearchBarValue(event.target.value)
        setAllMedia(newData);
   }
  const changeStatus=(id)=>{
      const newAllMedia =[...allMedia];
     const newData = newAllMedia.filter((item)=>{
          return item._id===id
      })
      newData[0].checked = !newData[0].checked;
      setAllMedia(newAllMedia);
      
  }
  const {modal,toggleLarge,addImage} = props
    return(
        <div className="animated fadeIn">
            <ToastContainer />
            <Card>
                
           
               
                <Modal isOpen={modal} toggle={toggleLarge}
                            className={'modal-lg ' + props.className}>
                    <ModalHeader toggle={toggleLarge}>
                        <Col xs="12">
                            <Input
                                type="text"
                                placeholder="جستجو"
                                value={searchBarValue}
                                onChange={filterMedia}
                            />
                        </Col>
                    </ModalHeader>
                    <ModalBody>
                    <div className={classes.mediaSection}>
                    {
                        loading ?<Spinner />:        
                        allMedia.map(item=>
                            <div className={classes.media} style={{width:'24.5%'}} key={item._id} >
                                <Input type="checkbox" checked={item.checked} onChange={()=>{addImage(item._id,item.dir);changeStatus(item._id)}} />
                                <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`} alt={item.dir} />
                            </div>
                            )
                    }
                        
                        
                    </div>
                    </ModalBody>
                </Modal>
                </Card>

                
           
        </div>
    )
}
export default Library;
