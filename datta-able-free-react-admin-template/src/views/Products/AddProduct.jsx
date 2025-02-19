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
  import {checkType , checkFileSize} from '../Media/Funcs';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import classes from './product.module.css';
   /* import CKEditor from '@ckeditor/ckeditor5-react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';  */
  
  import { CKEditor } from '@ckeditor/ckeditor5-react';
  import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
   
  import 'ckeditor5/ckeditor5.css';
  import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

 
  
 
const AddProduct = (props)=>{
  const [name,setName] = useState('');
  const [englishName,setEnglishName] = useState('');
  const [mainCategory,setMainCategory] = useState(true)
  const [parentCategory, setParentCategory] = useState(false);
  const [catId,setCatId] = useState(null);
  const [subCatId,setSubCatId] = useState(null);
  const [mainSubTitleFromServer,setMainSubTitleFromServer] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sellers,setSellers] = useState([]);
  const [brands,setBrands] = useState([]);
  const [thirdSubCategory,setThirdSubCategory] = useState([]);
  const [warranty,setWarranty]= useState([]);
  const [thirdSubCatId,setThirdSubCatId] = useState(null);
  const [brandId,setBrandId] = useState(null);
  const [sellerId,setSellerId] = useState(null);
  const [warrantyId,setWarrantyId] = useState(null);
  const [color,setColor] = useState('black');
  const [numberOfProduct,setNumberOfProduct] = useState(1);
  const [price,setPrice] = useState(0);
  const [discountedPrice,setDiscountedPrice] = useState(0)
  const [info,setInfo] = useState([]);
  const [specs,setSpecs] = useState([]);
  const [description,setDescription] = useState('');
  const [file,setFile] = useState('');
  const [image,setImage] = useState('');
 

   useEffect(()=>{

          
    axios({
      method: 'post',
     url: '/product/handleGetAllWarrenty',
    
     
     
  }).then((response)=>{console.log(response.data);
    if(response.data.errors){
      const message = response.data.errors[0];
      toast.error(message)
    }else{
    const {allwarranty} = response.data;
    setWarranty(allwarranty);
    //console.log(result);
    }
    }).catch((error)=>{
      console.log(error)
     
  })
 },[]) 
 
 useEffect(()=>{

  const parentID = {
    parent: null
  } 
       
  axios({
    method: 'post',
   url: '/shop/handleGetAllCategory',
   data:parentID
   
   
}).then((response)=>{//console.log(response.data)
  const {allcategory} = response.data;


   // if(mainCategory){
          setMainSubTitleFromServer(allcategory)
    /*   }
      else if(parentCategory){
          setSubCategory(allcategory);
          console.log(allcategory)
      } */
  }).catch((error)=>{
    console.log(error)
   
})
},[])

 

 const categoryHanlder = (event)=>{

  setCatId(event.target.value);
  setMainCategory(false);
  setParentCategory(true);

  const parentID = {
    parent: event.target.value,
   
  } 
   
  axios({
    method: 'post',
   url: '/shop/handleGetAllCategory',
   data:parentID
   
   
    }).then((response)=>{
      const {allcategory} = response.data;
      setSubCategory(allcategory);
  
      }).catch((error)=>{
        console.log(error)
      
    })
    axios({
      method: 'post',
     url: '/product/handleGetAllSeller',
     data:parentID
     
     
  }).then((response)=>{
      if(response.data.errors){
          const message = response.data.errors[0];
          toast.error(message)
          
         }
         else{
          const {allseller} = response.data;
          setSellers(allseller);

        
         }
  
    }).catch((error)=>{
      console.log(error)
     
  }) 
  
}

const subCategoryHanlder = (event)=>{
  setSubCatId(event.target.value);
  const parentID = {
    categoryId: event.target.value
  } 
       
  axios({
    method: 'post',
   url: '/product/handleGetAllProductDepend',
   data:parentID
   
   
}).then((response)=>{//console.log(response);
    if(response.data.errors){
        const message = response.data.errors[0];
        toast.error(message)
        
       }
       else{
        const {allbrands,allspecifications,allcategory} = response.data;
        setBrands(allbrands);
        setThirdSubCategory(allcategory);
        

         
          for(let  i=0;i<allspecifications.length;i++)
              for(let j=0;j<allspecifications[i].details.length;j++){
                
                allspecifications[i].details[j].value="";
                allspecifications[i].details[j].label="";
              } 
              
          setSpecs(allspecifications)
         console.log(specs);
       }

  }).catch((error)=>{
    console.log(error)
   
}) 
  
 }

 const nameHandler = (event)=>{
  setName(event.target.value);
}
const englishNameHandler= (event)=>{
setEnglishName(event.target.value);
}
const thirdSubCategoryHandler = (event)=>{
  setThirdSubCatId(event.target.value);
}
const brandHandler = (event)=>{
  setBrandId(event.target.value);
}
const sellerHandler = (event)=>{
  setSellerId(event.target.value)
}
const warrantyHandler = (event)=>{
  setWarrantyId(event.target.value)
}
const colorHandler = (event)=>{
  setColor(event.target.value)
}
const numberOfProductHandler = (event)=>{
  setNumberOfProduct(event.target.value)
}
const priceHandler = (event)=>{
  setPrice(event.target.value)
}
const discountedPriceHandlder = (event)=>{
  setDiscountedPrice(event.target.value)
}
const addInfo = ()=>{
  const arrayHolder = [...info];
  arrayHolder.push({
      seller: sellerId,
      warranty : warrantyId,
      price : parseInt(price),
      stock : parseInt(numberOfProduct),
      discount : parseInt(discountedPrice),
      color: color
  });
  console.log(arrayHolder);
  setInfo(arrayHolder);
}
const getNameSeller = (id)=>{
  const newData =  sellers.filter((item)=>{
        return item._id===id
    })
    return newData[0].title
}
const getNameWarranty = (id)=>{
    const newData =  warranty.filter((item)=>{
        return item._id===id
    })
    return newData[0].title
}
const deleteItemInfo = (index)=>{
    const infoItems = [...info];
    infoItems.splice(index,1);
    setInfo(infoItems)
}
const handleChangeSpecName = (event,specId,id)=>{
    const tempSpecs = {...specs[specId]};
    const tempSpecsDetails = {...tempSpecs.details[id]};
    tempSpecsDetails.value = event.target.value;
    const newState = [...specs];
    newState[specId].details[id] = tempSpecsDetails;
    setSpecs(newState)
}
const handleChangeSpecLabel = (event,specId,id)=>{
    const tempSpecs = {...specs[specId]};
    const tempSpecsDetails = {...tempSpecs.details[id]};
    tempSpecsDetails.label = event.target.value;
    const newState = [...specs];
    newState[specId].details[id] = tempSpecsDetails;
    setSpecs(newState)
}
const descriptionHandler = (event,editor)=>{
    const data = editor.getData();
    setDescription(data)
}
const handleChangePicture = (event)=>{
    if(checkType(event) && checkFileSize(event)){
        setFile(event.target.files[0]);
        const preview = URL.createObjectURL(event.target.files[0]);
        setImage(preview)
    }
    
}
const addProductHandler = ()=>{
  let IDforServer = null;
  if(thirdSubCatId){
      IDforServer = thirdSubCatId;
  }
  else{
      IDforServer = subCatId;
  }
  const SpecArray = [];
  specs.map(spec=>
      spec.details.map(item=>{
          SpecArray.push({
              p_details : item._id,
              value : item.value,
              label:item.label
          })
      })
  )
   const variables ={
    "fname" : name,
    "ename": englishName,
    "category" : IDforServer,
    "brand": brandId,
    "attribute": info,
    "description": description,
    "details": SpecArray,
    "original":null,
    "images":null
  } 
     
    axios({
       method: 'post',
       url: '/product/handleSaveProduct',
      data:variables
     
     
  }).then((response)=>{
    console.log(response);
      if(response.data.errors){
        const message = response.data.errors[0];
        toast.error(message)
      }else{
        const message = response.data.message;
        toast.success(message)
         
      } 
    }).catch((error)=>{
      console.log(error);
      toast.error(error)
     
  })
  /* let data = 
  {
    query: `
    mutation addProduct($fname : String!, $ename : String!, $category : ID!, $brand : ID!, $attribute : [InputAttribute!]!, $description : String!, $details : [InputDetails!]!, $original : Upload!, $images:[ID]) {
      product(input : {fname : $fname, ename : $ename, category : $category, brand : $brand, attribute : $attribute, description : $description, details : $details, original : $original, images:$images }) {
        status,
        message
      }
    }    
      `,
      variables :{
        "fname" : name,
        "ename": englishName,
        "category" : IDforServer,
        "brand": brandId,
        "attribute": info,
        "description": description,
        "details": SpecArray,
        "original":null,
        "images":null
      }
      
}
let map={
  0:['variables.original']
  }
  const formD = new FormData();
  formD.append('operations' , JSON.stringify(data));
  formD.append('map', JSON.stringify(map));
  formD.append(0,file,file.name);
  axios({
      url:'/',
      method : 'post',
      data : formD
  }).then((response=>{
      if(response.data.errors){
          toast.error('خطا دز ثبت محصول')
      }
      else{
          const {message} = response.data.data.product;
          toast.success(message)
      }
  })) */
}


    return(
      <div className="animated fadeIn">
           <ToastContainer /> 
            <Card>
                <CardHeader>
                    <h6>Add Product</h6>
                </CardHeader>
                <CardBody>
                <Row>
                
          
                  
                <Col md={3}>
                  <Form.Control 
                   type="text"
                    placeholder="Product Name" 
                    className="mb-3"
                     name="name"  
                     id="name"
                     value={name}
                      onChange={nameHandler}
                    
                    
                     />
                </Col>
                <Col md={3}>
                  <Form.Control 
                   type="text"
                    placeholder="English Product Name" 
                    className="mb-3"
                     name="name"  
                     id="name"
                     value={englishName}
                      onChange={englishNameHandler}
                  
                     />
                </Col>
                     
               
             
             </Row>
             <Row>

              <Col md={3}>
                       <Form.Control  as="select" className="mb-3" 
                            id="maincategory"
                                            onChange={categoryHanlder}
                                            >
                                            <option>Maincategory</option>
                                            {
                                                mainSubTitleFromServer.map((item,index)=>
                                                    <option key={index} value={item._id}>{item.title}</option>
                                                )
                                            }
                  </Form.Control>
               </Col>
               <Col md={3}>
                   <Form.Control as="select" className="mb-3" 
                   
                  id="submaincategory"
                  
                   onChange={subCategoryHanlder} 
                  >
                   
                   <option>Submaincategory</option>
                                                {
                                                    subCategory.map((item,index)=>
                                                        <option key={index} value={item._id}>{item.title}</option>
                                                    )
                                                }
                  </Form.Control> 
                </Col>
                <Col md={3}>
                   <Form.Control as="select" className="mb-3" 
                   
                  id="thirdmaincategory"
                  
                    onChange={thirdSubCategoryHandler}  
                  >
                   
                   <option>Thirdmaincategory</option>
                                                {
                                                    thirdSubCategory.map((item,index)=>
                                                        <option key={index} value={item._id}>{item.title}</option>
                                                    )
                                                }
                  </Form.Control> 
                </Col>
                <Col md={3}>
                   <Form.Control as="select" className="mb-3" 
                  
                  id="brands"
                  
                    onChange={brandHandler}  
                  >
                   
                   <option>Brand</option>
                                                {
                                                    brands.map((item,index)=>
                                                        <option key={index} value={item._id}>{item.title}</option>
                                                    )
                                                }
                  </Form.Control> 
                </Col>
                </Row>
                <hr style={{marginTop:'19px'}} />
                <Row>

                  <Col md={3}>
                          <Form.Control  as="select" className="mb-3" 
                                id="seller"
                                                onChange={sellerHandler}
                                                >
                                                <option>Seller</option>
                                                {
                                                    sellers.map((item,index)=>
                                                        <option key={index} value={item._id}>{item.title}</option>
                                                    )
                                                }
                      </Form.Control>
                  </Col>
                  <Col md={3}>
                          <Form.Control  as="select" className="mb-3" 
                                id="warranty"
                                                onChange={warrantyHandler}
                                                >
                                                <option>Warranty</option>
                                                {
                                                    warranty.map((item)=>
                                                        <option key={item._id}  value={item._id}>{item.title}</option>
                                                    )
                                                }
                      </Form.Control>
                  </Col>
                  </Row>
                  <Row>

                  <Col md={2}>
                  <Form.Label className="mb-3">Color:</Form.Label>
                          <Form.Control  as="select" className="mb-3" 
                                id="color"
                                                onChange={colorHandler}
                                                >
                                                <option>Color</option>
                                                <option value="black">Black</option>
                                                <option value="red">Red</option>
                                                <option value="blue">Blue</option>
                                                <option value="green">Green</option>
                                                <option value="yellow">Yellow</option>
                      </Form.Control>
                  </Col>
                  <Col md={3}>
                  <Form.Label className="mb-3">Number:</Form.Label>
                  <Form.Control  className="mb-3" 
                                id="number"
                                type="number"
                                onChange={numberOfProductHandler}
                                value={numberOfProduct}
                                required
                                                >
                                                
                      </Form.Control>
                  </Col>
                  <Col md={3}>
                  <Form.Label className="mb-3">Price:</Form.Label>
                  <Form.Control  className="mb-3" 
                                id="price"
                                type="number"
                                onChange={priceHandler}
                                value={price}
                                required
                                                >
                                                
                      </Form.Control>
                  </Col>
                  <Col md={3}>
                   <Form.Label>Discount percentage</Form.Label> 
                  <Form.Control  className="mb-3" 
                               
                                id="priceOff"
                                type="number"
                                onChange={discountedPriceHandlder}
                                value={discountedPrice}
                                required
                                                >
                                                
                      </Form.Control>
                  </Col>
                  <Col md={1} >
                                            <FormGroup>
                                                    <Button variant="primary" className="btn-pill" onClick={addInfo}>
                                                        <i className="fa fa-plus "></i>
                                                    </Button>
                                            </FormGroup>
                                    </Col>       
                  </Row>
                  <hr />
                          {
                                info.map((item,index)=>{
                                    let nameSeller = getNameSeller(item.seller);
                                    let nameWarranty = getNameWarranty(item.warranty);
                                    let color = item.color;
                                    return(
                                        <Row key={index}>
                                            <Col  xs="2">
                                                <FormGroup>
                                                    <label> Seller</label> 
                                                    <Form.Control
                                                        type="text"
                                                        id="seller1"
                                                        name="seller1"
                                                        disabled
                                                        value={nameSeller}
                                                        />                                                   
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="3">
                                                <FormGroup>
                                                    <label> Warranty</label> 
                                                    <Form.Control
                                                        type="text"
                                                        id="wa"
                                                        name="wa"
                                                        disabled
                                                        value={nameWarranty}
                                                        />                                                   
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="1">
                                                <FormGroup>
                                                    <label> Color</label> 
                                                    <div className={classes.colorBox} style={{background:color}}></div>                                               
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="1">
                                                <FormGroup>
                                                    <label> Number</label> 
                                                    <Form.Control
                                                        type="text"
                                                        placeholder='Number'
                                                        id="wasdf"
                                                        name="wa"
                                                        disabled
                                                        value={item.stock}
                                                        />                                                   
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="2">
                                                <FormGroup>
                                                    <label> Price</label> 
                                                    <Form.Control
                                                        type="text"
                                                        id="wasdf"
                                                        name="wa"
                                                        disabled
                                                        value={item.price}
                                                        />                                                   
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="2">
                                                <FormGroup>
                                                    <label> Discount percentage</label> 
                                                    <Form.Control
                                                        type="text"
                                                        id="wasdf"
                                                        name="wa"
                                                        disabled
                                                        value={item.discount}
                                                        />                                                   
                                                </FormGroup>
                                            </Col>
                                            <Col xs="1" className={classes.add_button_style}>
                                            <FormGroup>
                                                    <Button variant="danger" className="btn-pill" onClick={()=>deleteItemInfo(index)}>
                                                        <i className="fa fa-trash fa-lg"></i>
                                                    </Button>
                                            </FormGroup>
                                    </Col>
                                    <Col  md={12}>&nbsp;</Col>
                                        </Row> 
                                    )
                                })
                            }
                        <hr />
                            {
                                specs.map((spec,idx)=>
                                    <Card key={spec._id}>
                                        <CardHeader>
                                            {spec.title}
                                        </CardHeader>
                                        <CardBody>
                                               {
                                                spec.details.map((item,index)=>{
                                                    const Id = `name-${item._id}`;
                                                    const LabelId = `label-${item._id}`
                                                 return(
                                                        <Row key={item._id}>
                                                            <Col md={4}>
                                                                <FormGroup>
                                                                <Form.Control
                                                                     type="text"
                                                                     value={item.title}
                                                                     disabled
                                                                     />

                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={4}>
                                                                <FormGroup>
                                                                <Form.Control
                                                                     type="text"
                                                                     value={item.value}
                                                                     id={Id}
                                                                     name={Id}
                                                                     required
                                                                      onChange={(event)=>handleChangeSpecName(event,idx,index)}
                                                                      />

                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={4}>
                                                                <FormGroup>
                                                                <Form.Control
                                                                     type="text"
                                                                     value={item.label}
                                                                     id={LabelId}
                                                                     name={LabelId}
                                                                     placeholder="Description"
                                                                      onChange={(event)=>handleChangeSpecLabel(event,idx,index)}
                                                                      />

                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }


                                        </CardBody>
                                    </Card>
                                )
                            }


                            <Row>
                               <Col xl="12">
                                  <FormGroup>
                                      <label for="ckEditor">Description</label>
                                      
                                       <CKEditor 
                                        editor={ClassicEditor}
                                        config={ {
                                          plugins: [ Essentials, Bold, Italic, Paragraph ],
                                          toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                                        } }
                                        data={description}
                                        dir="rtl"
                                        onChange={ ( event, editor ) => descriptionHandler(event,editor) }
                                        /> 
                                 </FormGroup>  
                                </Col>
                            </Row>       
                            <Row>
                                <Col xs="6">
                                    <FormGroup row>
                                            <label htmlFor="file-multiple-input" >
                                                <div className={classes.fileSelection}>Select Image </div>
                                            </label>
                                            <Form.Control type="file" id="file-multiple-input" name="file-multiple-input"
                                                multiple
                                                onChange={handleChangePicture}
                                                />

                                    </FormGroup>
                                </Col>
                                <Col xs="8">
                                    { image ?<img src={image} alt={image} className={classes.preview} />:null}
                                </Col>
                            </Row>
                            
                </CardBody>
              
                <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={addProductHandler}>
                            <strong>Save </strong>
                        </Button>

                          
                </CardFooter>  
            </Card>
            
        </div>
        
    )
}
export default AddProduct;