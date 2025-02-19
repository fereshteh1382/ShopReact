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
    import classes from '../Media/media.module.css'
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { FaCameraRetro,FaTrashCan,FaRegSquarePlus,FaEye,FaFileSignature  } from "react-icons/fa6";



const Category = (props)=>{

  const [modal,setModal] = useState(false);
  const [images,setImages] = useState([]);
 // const [title,setTitle] = useState('');
 // const [label,setLabel] = useState('');
 const [mainSubTitle,setMainSubTitle] = useState('');
  const [subTitle,setSubTitle] = useState('');
  const [mainCategory,setMainCategory] = useState(false);
  const [parentCategory,setParentCategory] = useState(false);
  const [catId,setCatId] = useState(null);
  const [mainSubTitleFromServer,setMainSubTitleFromServer] = useState([]);
  const [subTitleFromServer,setSubTitleFromServer ] = useState([]);
  const [status,changeStatus] = useState(false);
 

  
/************************************** */
  useEffect(()=>{
    
     const parentID = {
      parent: catId
    } 

    axios({
      method: 'post',
     url: '/shop/handleGetAllCategory',
      data:parentID
      
     
  }).then((response)=>{
    const {allcategory} = response.data;
    
    if(mainCategory){
        setMainSubTitleFromServer(allcategory)
    }
    else if(parentCategory){
      setSubTitleFromServer(allcategory);
      //console.log(allcategory)
   }
  }).catch((error)=>{
      console.log(error)
      toast.error(error);
  })
},[status])

const toggleLarge=()=> {
  setModal(!modal);
}
const  selectImage = ()=>{
  if(images.length>0){
      toast.error('ابتدا عکس انتخاب شده را حذف نمایید سپس عکس جدید را انتخاب کنید');
      return false;
  }
  setModal(true)
}
const addImage = (id,dir)=>{
  const newImages = [...images];
  newImages.push({
      "_id":id,
      "dir":dir
  });
  setImages(newImages);
  setModal(false)
}
const removeImage=(index)=>{
  const newImages = [...images];
  newImages.splice(index,1);
  setImages(newImages)
}
const handleSubTitle = (event)=>{
  setSubTitle(event.target.value)
}

const handlemainSubTitle = (event)=>{
 
  setMainSubTitle(event.target.value);
    setMainCategory(false);
    setParentCategory(true);
    setCatId(event.target.value);
    changeStatus(!status)
}


  const [values, setValues] = useState({title : '',label:'',description:'',parent:''});
  
  const handleChange = e => {
    const {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    });
};
const onBlurHandler = ()=>{
  setMainCategory(true);
  changeStatus(!status)
}
   /* const  selectImage = ()=>{
        if(images.length>0){
            toast.error('ابتدا عکس انتخاب شده را حذف نمایید سپس عکس جدید را انتخاب کنید');
            return false;
        }
        setModal(true)
    } */


    const handleSubmit = ()=>{
    
    
      let parent = null;
        
        if(mainSubTitle!==''&&subTitle===''){
          parent = mainSubTitle
      }
      else if(mainSubTitle!==''&&subTitle!==''){
          parent = subTitle
      }
     // console.log(parent);
     const category = {
      title: values.title,
      label:values.label,
      parent:parent,
      description:values.description,
      
       };
      // console.log(category);
       
      axios({
        method: 'post',
       url: '/shop/handleSaveCategory',
        data:category,
        
       
    }).then((response)=>{console.log(response);
        const status = response.status
        if(status==200){
          toast.success('Created')
        }
    }).catch((error)=>{
        console.log(error)
        toast.error(error);
    })

  }
  
    return(
        <div className="animated fadeIn">
           <ToastContainer /> 
            <Card>
                <CardHeader>
                    <h6>Add Category</h6>
                </CardHeader>
                <CardBody>
                <Row>
                
                 <Col md={6}>
                  <Form.Control 
                   type="text"
                    placeholder="Name" 
                    className="mb-3"
                     name="title"  
                     id="title"
                     value={values.title}
                      onChange={handleChange}
                     required
                     onBlur={onBlurHandler} 
                     />
                  <Form.Control  type="text" placeholder="Label" className="mb-3"
                   name="label"
                   id="label" 
                    value={values.label}
                   onChange={handleChange}
                   />
                  <Form.Control type="text" placeholder="Description" className="mb-3" 
                  name="description"
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control  as="select" className="mb-3" 
                  name="mainSubTitle" 
                  id="mainSubTitle"
                  value={values.mainSubTitle}
                  onChange={handlemainSubTitle}
                  >
                    <option value=''>MainSubTitle</option> 
                    {
                        mainSubTitleFromServer && mainSubTitleFromServer.map((item)=>
                            <option value={item._id} key={item._id}>{item.title}</option>
                           )
                      }
                  </Form.Control>
                  
                                     
                  <Form.Control as="select" className="mb-3" 
                  name="subTitle" 
                  id="subTitle"
                  value={values.subTitle}
                  onChange={handleSubTitle}
                  >
                    <option value='' >SubTitle</option>
                    {
                                        subTitleFromServer.map((item)=>
                                            <option value={item._id} key={item._id}>{item.title}</option>
                                        )
                                    }
                  </Form.Control>
                </Col>
                <Col md={6}>
                          {/* <Button type="submit" size="sm" color="primary" onClick={selectImage}>
                                <strong>انتخاب عکس </strong>
                            </Button> 
                        */}
                         <label htmlFor="file-multiple-input" >
                                        <div  className={classes.fileSelection}>Select Image </div>
                                    </label>
                                    <input type="file" id="file-multiple-input" name="file-multiple-input"
                                        multiple
                                        onChange={handleChange}
                                        />

                        <span >&nbsp;</span>
                       <Button type="submit"  color="primary" onClick={handleSubmit} >
                            <strong>Save </strong>
                        </Button>
                </Col>
              </Row>
                
                </CardBody>
              
                <CardFooter>
                         
                </CardFooter>  
            </Card>
            
        </div>
    )
}
export default Category;
