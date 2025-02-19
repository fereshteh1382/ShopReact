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
import classes from './shop.module.css';
//import { stat } from 'fs';

const Brand = (props)=>{

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [categoryFromServer,setCategoryFromServer] = useState([]);
  const [categoryValue,setCategoryValue] = useState('');
  const [subCategoryFromServer,setSubCategoryFromServer] = useState([]);
  const [arrayHolder,setArrayHolder] = useState([]);
  const [file,setFile] = useState('');
  const [image,setImage] = useState('');
 // const [brands,setBrands] = useState([])
  //const token = GetToken();
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

  const handleTitle = (event)=>{     
    setTitle(event.target.value)
  }
  const handleDescription = (event)=>{
    setDescription(event.target.value)
  }
  const handleCategoryValue = (event)=>{
    setCategoryValue(event.target.value);
    const parentID = {
      parent: event.target.value
    } 
         
    axios({
      method: 'post',
     url: '/shop/handleGetAllCategory',
     data:parentID
     
     
      }).then((response)=>{
        const {allcategory} = response.data;
        setSubCategoryFromServer(allcategory);
    
        }).catch((error)=>{
          console.log(error)
        
      })
  }
  const addSubCategory = (event)=>{
    const categoryIndex = subCategoryFromServer.findIndex(subCategory=>{
        return subCategory._id==event.target.value;
    })
    //console.log(categoryIndex);
    const subCat ={...subCategoryFromServer[categoryIndex]};
    //console.log(subCat)
    const tempArray = [...arrayHolder];
    tempArray.push(subCat);
    setArrayHolder(tempArray);
    const response = [...subCategoryFromServer];
    response.splice(categoryIndex,1);
    setSubCategoryFromServer(response) 
   }
  const deleteSubCategory = (index,item)=>{
    const tempArray = [...arrayHolder];
    tempArray.splice(index,1);
    setArrayHolder(tempArray);
    const response = [...subCategoryFromServer];
    response.push(item);
    setSubCategoryFromServer(response);
  }
  const handleChange = (event)=>{
    setFile(event.target.files[0]);
    const preview = URL.createObjectURL(event.target.files[0]);
    setImage(preview)
}
const hanldeSubmit = ()=>{
      
     const newArray = [];
      for(let i=0;i<arrayHolder.length;i++)
      {
      newArray.push(arrayHolder[i]._id)
      }
  //console.log(newArray);
  //console.log(file);
   const variables ={
    "category" : newArray,
    "title" :title,
    "description" : description,
    "image" :null,
    }
    /*let map={
      0:['variables.image']
      } */
    axios({
       method: 'post',
       url: '/shop/handleSaveBrands',
       data:variables
     
     
  }).then((response)=>{
    console.log(response);
    toast.success('Created')
 
    }).catch((error)=>{
      console.log(error);
      toast.error(error)
     
  })
  /*  const formD = new FormData();
   formD.append('operations' , JSON.stringify(variables));
   formD.append('map', JSON.stringify(map));
   formD.append(0,file,file.name)
   let options ={
       method : 'POST',
       headers : {
           //'token':`${token}`
       },
       body: formD
   }
   let url = 'http://localhost:4000/shop/handleSaveBrands';
   fetch(url,options).
   then(res=>res.json()).
   then(response=>{
       console.log(response);
        const {status,message} =response.data.brand;
       if(status==200){
           toast.success(message)
       }
       else{
           toast.error('ثبت برند با مشکل مواجه شد')
       } 
   }).
   catch(err=>console.log(err)) */
}


    return(
      <div className="animated fadeIn">
           <ToastContainer /> 
            <Card>
                <CardHeader>
                    <h6>Add Brand</h6>
                </CardHeader>
                <CardBody>
                <Row>
                
                 <Col md={6}>
                  <Form.Control 
                   type="text"
                    placeholder="title" 
                    className="mb-3"
                     name="title"  
                     id="title"
                     value={title}
                      onChange={handleTitle}
                     required
                   
                     />
                  
                  <Form.Control type="text" placeholder="Description" className="mb-3" 
                  name="description"
                  id="description"
                  value={description}
                  onChange={handleDescription}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control  as="select" className="mb-3" 
                  
                  name="mainSubTitle" 
                  id="mainSubTitle"
                  value={categoryValue}
                  onChange={handleCategoryValue}
                  >
                    <option value=''>MainSubTitle</option> 
                    {
                        categoryFromServer.map((item)=>
                            <option value={item._id} key={item._id}>{item.title}</option>
                           )
                      } 
                  </Form.Control>
                  <Form.Control as="select" className="mb-3" 
                  name="multiple-select" 
                  id="multiple-select"
                  multiple 
                  onChange={addSubCategory}
                  >
                   
                    {
                     subCategoryFromServer.map((item)=>
                        <option key={item._id} value={item._id}>{item.title}</option>
                         )
                      }
                  </Form.Control>
                </Col>
                     {
                            arrayHolder.length !==0 &&  
                            <Col md="6" className={classes.brandSection}>
                                {
                                    arrayHolder.map((item,index)=>
                                        <div className={classes.brand} key={item._id}>
                                            <span>{item.title}</span>
                                             <i className="feather icon-trash" onClick={()=>deleteSubCategory(index,item)}></i> 
                                        </div>
                                        )
                                }
                                
                            
                            </Col>
                        }
                         <Col  md={6}>
                       
                                    <label htmlFor="file-multiple-input" >
                                        <div className={classes.fileSelection}>Select Image </div>
                                    </label>
                                    <input type="file" id="file-multiple-input" name="file-multiple-input"
                                        multiple
                                        onChange={handleChange}
                                        />
                        <span >&nbsp;</span>

                           <Button type="submit"  color="primary" onClick={hanldeSubmit}  >
                            <strong>Save </strong>
                        </Button>
                        </Col>
                        <Col  md={12}>
                            { image ?<img src={image} alt={image} className={classes.preview} />:null}
                        </Col>
              
              </Row>
                
                </CardBody>
              
                <CardFooter>
                         
                </CardFooter>  
            </Card>
            
        </div>
        
    )
}
export default Brand;