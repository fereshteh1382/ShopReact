import React,{useEffect,useContext,useState} from 'react'
import { 
    Button,  
    Card,
    CardBody,
    CardFooter,
    CardHeader,  
    Col,
    FormGroup,
    Label,
    Input,
    Table,
    Row,
  } from 'reactstrap';

import axios from 'axios';
import {checkType , checkFileSize} from '../Media/Funcs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './product.module.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
        url:'/',
        method:'post',
        data:{
            query:`
            query getAllSWarranty {
                getAllWarranty {
                  _id,
                  name,
                  label
                }
              } `
        }
       
    }).then((response)=>{
        const {getAllWarranty} = response.data.data;
        setWarranty(getAllWarranty)
    }).catch((error)=>{
        console.log(error)
    })  
   },[])
   /* useEffect(()=>{
    axios({
        url:'/',
        method:'post',
        data:{
            query:`
            query getAllCategory($page : Int, $limit : Int, $mainCategory : Boolean, $parentCategory : Boolean, $catId : ID) {
                getAllCategory(input : {page : $page, limit : $limit, mainCategory : $mainCategory, parentCategory : $parentCategory, catId : $catId}) {
                  _id,
                  name,
                  label,
                  parent {
                    name
                  }
                }
              } `,
              variables:{
                "page": 1,
                "limit": 30,
                "mainCategory": mainCategory,
                "parentCategory": parentCategory,
                "catId": catId
              }
        },
       
    }).then((response)=>{
        const {getAllCategory} = response.data.data;
        if(mainCategory){
            setMainSubTitleFromServer(getAllCategory)
        }
        else if(parentCategory){
            setSubCategory(getAllCategory);
            console.log(getAllCategory)
        }
    }).catch((error)=>{
        console.log(error)
    })
   },[catId])
 */
   const nameHandler = (event)=>{
       setName(event.target.value);
   }
   const englishNameHandler= (event)=>{
    setEnglishName(event.target.value);
   }
 /*   const categoryHanlder = (event)=>{
       setCatId(event.target.value);
       setMainCategory(false);
       setParentCategory(true);
       axios({
        url:'/',
        method:'post',
        data:{
            query:`
            query addProductInfo($categoryId : ID, $getSubCategory : Boolean!, $subCategoryId : ID){
                getAddProductInfo(categoryId : $categoryId, getSubCategory : $getSubCategory, subCategoryId : $subCategoryId) {
                  sellers {
                    _id,
                    name
                  }
                }
              }   `,
              variables:{
                "categoryId":event.target.value,
                "getSubCategory": false,
                "subCategoryId": null
              }
        },
       
    }).then((response)=>{
        if(response.data.errors){
            toast.error('خطلا در دریافت اطلاعات فروشندگان')
        }
        else{
            const{sellers} =response.data.data.getAddProductInfo;
            setSellers(sellers);
        }
    }).catch((error)=>{
        console.log(error)
    })
   } */
   const subCategoryHanlder = (event)=>{
    setSubCatId(event.target.value);
    axios({
        url:'/',
        method:'post',
        data:{
            query:`
            query addProductInfo($categoryId : ID, $getSubCategory : Boolean!, $subCategoryId : ID){
                getAddProductInfo(categoryId : $categoryId, getSubCategory : $getSubCategory, subCategoryId : $subCategoryId) {
                  specs {
                    _id,
                    specs,
                    details {
                      _id,
                      name
                    }
                  },
                  
                  brands {
                    _id,
                    name
                  },
                  
                  subcats {
                    _id,
                    name
                  },
      
                }
              }    `,
              variables:{
                "categoryId":null,
                "getSubCategory": true,
                "subCategoryId": event.target.value
              }
        },
       
    }).then((response)=>{
        if(response.data.errors){
            toast.error('خطلا در دریافت اطلاعات');
        }
        else{
            const {specs,brands,subcats} = response.data.data.getAddProductInfo;
            setBrands(brands);
            setThirdSubCategory(subcats);
            for(let  i=0;i<specs.length;i++)
                for(let j=0;j<specs[i].details.length;j++){
                    specs[i].details[j].value="";
                    specs[i].details[j].label="";
                }
            console.log(specs);
            setSpecs(specs)
        }
    })
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
    return newData[0].name
}
const getNameWarranty = (id)=>{
    const newData =  warranty.filter((item)=>{
        return item._id===id
    })
    return newData[0].name
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
    let data = 
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
    }))
}
    return(
        <div className="animated fadeIn">
            <ToastContainer />
            <Row>
                <Col xl="12">
                    <Card>
                    <CardHeader>
                        <h6>اضافه کردن  محصول جدید </h6>
                    </CardHeader>
                    <CardBody>
                        
                        <Row>
                        <Col xs="10">
                                <FormGroup>
                                    <Label>نام</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="نام محصول را وارد کنید"
                                        required
                                        value={name}
                                        onChange={nameHandler}
                                        />
                                </FormGroup>
                            </Col>
                            <Col xs="10">
                                <FormGroup>
                                    <Label>نام انگلیسی</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="نام انگلیسی محصول را وارد کنید"
                                        required
                                        value={englishName}
                                        onChange={englishNameHandler}
                                        />
                                </FormGroup>
                            </Col>
                        </Row>
                            
                            <Row>
                                <Col xs="3">
                                    <FormGroup>
                                        <Label>دسته اصلی</Label>
                                        <Input
                                            type="select"
                                            id="maincategory"
                                            onChange={categoryHanlder}
                                            >
                                            <option></option>
                                            {
                                                mainSubTitleFromServer.map((item,index)=>
                                                    <option key={index} value={item._id}>{item.name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col  xs="3">
                                        <FormGroup>
                                            <Label>زیر دسته</Label>
                                            <Input
                                                type="select"
                                                id="submaincategory"
                                                onChange={subCategoryHanlder}
                                                >
                                                <option></option>
                                                {
                                                    subCategory.map((item,index)=>
                                                        <option key={index} value={item._id}>{item.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col  xs="3">
                                        <FormGroup>
                                            <Label> زیر دسته دوم</Label> 
                                            <Input
                                                type="select"
                                                id="thirdmaincategory"
                                                onChange={thirdSubCategoryHandler}
                                                >
                                                <option></option>
                                                {
                                                    thirdSubCategory.map((item,index)=>
                                                        <option key={index} value={item._id}>{item.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col  xs="3">
                                        <FormGroup>
                                            <Label> برند</Label> 
                                            <Input
                                                type="select"
                                                id="brands"
                                                onChange={brandHandler}
                                                >
                                                <option></option>
                                                {
                                                    brands.map((item,index)=>
                                                        <option key={index} value={item._id}>{item.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                            </Row>
                            <hr style={{marginTop:'19px'}} />
                            <Row>
                                    <Col  xs="4">
                                        <FormGroup>
                                            <Label> فروشنده</Label> 
                                            <Input
                                                type="select"
                                                id="seller"
                                                name="seller"
                                                onChange={sellerHandler}
                                                >
                                                <option></option>
                                                {
                                                    sellers.map((item)=>
                                                        <option key={item._id} value={item._id}>{item.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col  xs="4">
                                        <FormGroup>
                                            <Label> گارانتی</Label> 
                                            <Input
                                                type="select"
                                                id="warranty"
                                                name="warranty"
                                                onChange={warrantyHandler}
                                                >
                                                <option></option>
                                                {
                                                    warranty.map((item)=>
                                                        <option key={item._id} value={item._id}>{item.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                            </Row>
                            <Row>
                                    <Col  xs="3">
                                        <FormGroup>
                                            <Label> رنگ</Label> 
                                            <Input
                                                type="select"
                                                id="color"
                                                name="color"
                                                onChange={colorHandler}
                                                >
                                                <option value="black">مشکی</option>
                                                <option value="red">قرمز</option>
                                                <option value="blue">آبی</option>
                                                <option value="green">سبز</option>
                                                <option value="yellow">زرد</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col  xs="2">
                                        <FormGroup>
                                            <Label> تعداد</Label> 
                                            <Input
                                                type="number"
                                                id="number"
                                                name="number"
                                                onChange={numberOfProductHandler}
                                                value={numberOfProduct}
                                                required
                                                />
                                        </FormGroup>
                                    </Col>
                                    <Col  xs="3">
                                        <FormGroup>
                                            <Label> قیمت (تومان)</Label> 
                                            <Input
                                                type="number"
                                                id="price"
                                                name="price"
                                                onChange={priceHandler}
                                                value={price}
                                                required
                                                />
                                        </FormGroup>
                                    </Col> 
                                    <Col  xs="3">
                                        <FormGroup>
                                            <Label>درصد تخفیف</Label> 
                                            <Input
                                                type="number"
                                                id="priceOff"
                                                name="priceOff"
                                                onChange={discountedPriceHandlder}
                                                value={discountedPrice}
                                                required
                                                />
                                        </FormGroup>
                                    </Col> 
                                    <Col xs="1" className={classes.add_button_style}>
                                            <FormGroup>
                                                    <Button color="danger" className="btn-pill" onClick={addInfo}>
                                                        <i className="fa fa-plus fa-lg"></i>
                                                    </Button>
                                            </FormGroup>
                                    </Col>        
                            </Row>
                            {
                                info.map((item,index)=>{
                                    let nameSeller = getNameSeller(item.seller);
                                    let nameWarranty = getNameWarranty(item.warranty);
                                    let color = item.color;
                                    return(
                                        <Row key={index}>
                                            <Col  xs="2">
                                                <FormGroup>
                                                    <Label> فروشنده</Label> 
                                                    <Input
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
                                                    <Label> گارانتی</Label> 
                                                    <Input
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
                                                    <Label> رنگ</Label> 
                                                    <div className={classes.colorBox} style={{background:color}}></div>                                               
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="1">
                                                <FormGroup>
                                                    <Label> تعداد</Label> 
                                                    <Input
                                                        type="text"
                                                        id="wasdf"
                                                        name="wa"
                                                        disabled
                                                        value={item.stock}
                                                        />                                                   
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="2">
                                                <FormGroup>
                                                    <Label> قیمت</Label> 
                                                    <Input
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
                                                    <Label> درصد تخفیف</Label> 
                                                    <Input
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
                                                    <Button color="danger" className="btn-pill" onClick={()=>deleteItemInfo(index)}>
                                                        <i className="fa fa-trash fa-lg"></i>
                                                    </Button>
                                            </FormGroup>
                                    </Col>
                                        </Row>
                                    )
                                })
                            }
                            <hr />
                            {
                                specs.map((spec,idx)=>
                                    <Card key={spec._id}>
                                        <CardHeader>
                                            {spec.specs}
                                        </CardHeader>
                                        <CardBody>
                                            {
                                                spec.details.map((item,index)=>{
                                                    const Id = `name-${item._id}`;
                                                    const LabelId = `label-${item._id}`
                                                    return(
                                                        <Row key={item._id}>
                                                            <Col xl="4">
                                                                <FormGroup>
                                                                    <Input 
                                                                     type="text"
                                                                     value={item.name}
                                                                     disabled
                                                                     />

                                                                </FormGroup>
                                                            </Col>
                                                            <Col xl="4">
                                                                <FormGroup>
                                                                    <Input 
                                                                     type="text"
                                                                     value={item.value}
                                                                     id={Id}
                                                                     name={Id}
                                                                     required
                                                                     onChange={(event)=>handleChangeSpecName(event,idx,index)}
                                                                     />

                                                                </FormGroup>
                                                            </Col>
                                                            <Col xl="4">
                                                                <FormGroup>
                                                                    <Input 
                                                                     type="text"
                                                                     value={item.label}
                                                                     id={LabelId}
                                                                     name={LabelId}
                                                                     placeholder="توضیحات در صورت نیاز"
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
                                      <Label for="ckEditor">توضیحات</Label>
                                      <CKEditor 
                                        editor={ClassicEditor}
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
                                            <Label htmlFor="file-multiple-input" >
                                                <div className={classes.fileSelection}>گزینش پرونده</div>
                                            </Label>
                                            <Input type="file" id="file-multiple-input" name="file-multiple-input"
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
                                <strong>ثبت </strong>
                            </Button>
                    </CardFooter>  
                </Card>
                </Col>
            </Row>
            
            

        
       
        
    </div>
        
    )
}
export default AddProduct;
