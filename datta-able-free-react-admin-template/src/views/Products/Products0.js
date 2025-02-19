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
    Spinner
  } from 'reactstrap';

import axios from 'axios';
import {NavLink} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './product.module.css';
import ProductSellers from './ProductSellers';
import AddSeller from './AddSeller';
const Products  = (props)=>{
    const [products,setProducts] = useState([])
    const [modalInfoSeller,setModalInfoSeller] = useState(false);
    const [modalAddSeller,setModalAddSeller] = useState(false);
    const [attribute,setAttribut] = useState([]);
    const [productName,setProductName] = useState('');
    const [mainSubTitleFromServer,setMainSubTitleFromServer] = useState([]);
    const [catId,setCatId] = useState(null);
    const [sellers,setSellers] = useState([])
    const [sellerId,setSellerId]  = useState(null);
    const [warranty,setWarranty] = useState([]);
    const [warrantyId,setWarrantyId] = useState(null)
    const [color,setColor] = useState('black')
    const [numberOfProducts,setNumberOfProducts] = useState(0)
    const [price,setPrice] = useState(0);
    const [discountedPrice,setDiscountedPrice] = useState(0);
    const [productId,setProductId] = useState(null)
    useEffect(()=>{
        axios({
            url:'/',
            method:'post',
            data:{
                query:`
                query getProduct($page : Int, $limit : Int, $productId : ID) {
                    getProduct(page : $page, limit : $limit, productId : $productId){
                      _id,
                      fname,
                      ename,           
                      brand {
                        name
                      },
                      attribute {
                        _id,
                        seller {
                          _id,
                          name
                        },
                        warranty{
                          _id,
                          name
                        },
                        color,
                        stock,
                        price,
                        discount,
                        suggestion
                      },
                      rate,          
                      original
                    }
                  }    `,
                  variables:{
                    "page": 1,
                    "limit": 10,
                    "productId": null
                  }
            },
           
        }).then((response)=>{
            if(response.data.errors){
                toast.error('خطلا در دریافت اطلاعات محصولات')
            }
            else{
                const{getProduct} = response.data.data
                setProducts(getProduct);
                console.log(getProduct);
            }
            
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    useEffect(()=>{
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
                    "mainCategory": true,
                    "parentCategory": false,
                    "catId": null
                  }
            },
           
        }).then((response)=>{
            const {getAllCategory} = response.data.data;
            
                setMainSubTitleFromServer(getAllCategory)
            
            
        }).catch((error)=>{
            console.log(error)
        })


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
    const toggleinfoSeller = (attribute,name)=>{
        if(!modalInfoSeller){
            setAttribut(attribute);
            setModalInfoSeller(true)
            setProductName(name)
        }
        else{
            setAttribut([]);
            setModalInfoSeller(false)
            setProductName('')
        }
    }
    const toggleAddSeller = (name,id)=>{
        if(!modalAddSeller){
            setProductName(name);
            setModalAddSeller(true);
            setProductId(id)
        }
        else{
            setProductName('');
            setModalAddSeller(false)
            setProductId(null)
        }
    }
    const handleChangeColor = (event,id)=>{
        const field = {...attribute[id]};
        field.color = event.target.value;
        const newAttributeState = [...attribute];
        newAttributeState[id] = field;
        setAttribut(newAttributeState)
    }
    const handleChangeStock = (event,id)=>{
        const field = {...attribute[id]};
        field.stock = event.target.value;
        const newAttributeState = [...attribute];
        newAttributeState[id] = field;
        setAttribut(newAttributeState)
    }
    const handleChangePrice= (event,id)=>{
        const field = {...attribute[id]};
        field.price = event.target.value;
        const newAttributeState = [...attribute];
        newAttributeState[id] = field;
        setAttribut(newAttributeState)
    }
    const handleChangeDiscount = (event,id)=>{
        const field = {...attribute[id]};
        field.discount = event.target.value;
        const newAttributeState = [...attribute];
        newAttributeState[id] = field;
        setAttribut(newAttributeState)
    }
    const handleSuggestion = (id,flag) =>{
        const field = {...attribute[id]};
        if(field.discount<5){
            toast.error('برای اضافه شدن محصول به پیشنهاد ویژه باید درصد تخفیف بیشتر از 5 درصد باشد')
        }else{
            field.suggestion = flag;
            const newAttributeState = [...attribute];
            newAttributeState[id] = field;
            setAttribut(newAttributeState)
        }
    }
    const editSellers = ()=>{
        const attributeHolder = [];
        attribute.map((item)=>{
            attributeHolder.push({
                id : item._id,
                seller : item.seller._id,
                warranty : item.warranty._id,
                color:item.color,
                price : parseInt(item.price),
                discount : parseInt(item.discount),
                stock : parseInt(item.stock),
                suggestion : item.suggestion
            })
        })
        axios({
            url:'/',
            method:'post',
            data:{
                query:`
                mutation updateProductAttribute($addSeller : Boolean, $attribute : [InputAttribute!]!) {
                    UpdateProductAttribute (input : {addSeller : $addSeller, attribute : $attribute}) {
                      status,
                      message
                    }
                  }   `,
                  variables:{
                    "addSeller":false,
                    "attribute": attributeHolder
                  }
            },
           
        }).then((response)=>{
            if(response.data.errors){
                toast.error('خطلا در ویرایش اطلاعات فروشندگان')
            }
            else{
               const {message} =response.data.data.UpdateProductAttribute;
               toast.success(message)
            }
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    const categoryHandler = (event)=>{
        setCatId(event.target.value);
        axios({
            url:'/',
            method:'post',
            data:{
                query:`
                query getAllSeller($categoryId : ID!) {
                    getAllSeller(categoryId : $categoryId) {
                      _id,
                      name,
                      label
                    }
                  } `,
                  variables:{
                    "categoryId": event.target.value
                  }
            },
           
        }).then((response)=>{
            if(response.data.errors){
                const {message} = response.data.errors[0];
                toast.error(message)
            }else{
             const {getAllSeller} = response.data.data;
             setSellers(getAllSeller)
            }
        }).catch((error)=>{
            console.log(error)
        })
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
    const numberOfProductsHandler = (event)=>{
        setNumberOfProducts(event.target.value)
    }
    const priceHandler = (event)=>{
        setPrice(event.target.value)
    }
    const discountedPriceHandler  = (event)=>{
        setDiscountedPrice(event.target.value)
    }
    const addSellerToProduct = ()=>{
        console.log(productId);
        console.log(sellerId);
        console.log(warrantyId)
        console.log(color);
        console.log(numberOfProducts);
        console.log(price);
        console.log(discountedPrice);
        axios({
            url: '/',
            method: 'post',
            data: {
              query: `
              mutation updateProductAttribute($addseller : Boolean, $attribute : [InputAttribute!]!) {
                UpdateProductAttribute (input : {addSeller : $addseller, attribute : $attribute}) {
                  status,
                  message
                }
              }      
                `,
                variables :{
                  "addseller": true,
                  "attribute": {
                    "id": productId,
                    "seller": sellerId,
                    "warranty": warrantyId,
                    "color": color,
                    "price": parseInt(price),
                    "stock": parseInt(numberOfProducts),
                    "discount": parseInt(discountedPrice)
                  }
                }
          }
        }).then((result) => {
            
          if(result.data.errors){
            toast.error('خطا در ثبت اطلاعات فروشنده جدید  ')
          }
          else{
                const {message}=result.data.data.UpdateProductAttribute;
                toast.success(message);
                //setModalAddSeller(false)
            }
            
        }).catch(error=>{
          console.log(error)
        })
    }
    return(
        <div className="animated fadeIn">
            <ToastContainer />
            <Row>
                <Col xl="12">
                    <Card>
                    <CardHeader>
                        <h6> محصولات</h6>
                    </CardHeader>
                        <CardBody>
                            {
                                products.length>0 ?
                                <Table responsive>
                                <thead>
                                    <tr>
                                        <th>نام محصول</th>
                                        <th>عکس</th>
                                        <th>برند</th>
                                        <th>فروشندگان</th>
                                        <th>امتیاز</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((item)=>{
                                                const link = `/products/product/${item._id}`;
                                                const pictureLink = `/products/product/picture/${item._id}`;
                                            return(
                                                <tr className={classes.productDetalis} key={item._id}>
                                                    <td className={classes.bothName}> 
                                                         <span>{item.fname}</span> 
                                                         <span>{item.ename}</span>
                                                    </td>
                                                    <td>
                                                        <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.original}`} alt={item.original} />
                                                    </td>
                                                    <td>
                                                        {item.brand.name}
                                                    </td>
                                                    <td>
                                                        <Button size="sm" color="primary" onClick={()=>toggleinfoSeller(item.attribute,item.fname)}>
                                                            <i className="fa fa-eye fa-lg"></i>
                                                        </Button>
                                                        <Button size="sm" color="danger" onClick={()=>toggleAddSeller(item.fname,item._id)}>
                                                            <i className="fa fa-plus fa-lg"></i>
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        {item.rate ? item.rate : 0}
                                                    </td>
                                                    <td className={classes.opreation}>
                                                        <Button size="sm" color="primary">
                                                            <NavLink to={link}><i className="fa fa-edit fa-lg"></i></NavLink>
                                                        </Button>
                                                        <Button size="sm" color="warning">
                                                            <NavLink to={pictureLink}><i className="fa fa-file-image-o fa-lg"></i></NavLink>
                                                        </Button>
                                                        <Button size="sm" color="danger">
                                                           <i className="fa fa-trash fa-lg"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </Table>
                            :
                            <center><Spinner size="lg" /></center>
                            }
                           
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {
            modalInfoSeller?
            <ProductSellers
                modal={modalInfoSeller}
                toggleLarge={toggleinfoSeller}
                attribute={attribute}
                productName={productName}
                handleChangeColor={handleChangeColor}
                handleChangeStock={handleChangeStock}
                handleChangePrice={handleChangePrice}
                handleChangeDiscount={handleChangeDiscount}
                handleSuggestion={handleSuggestion}
                editSellers={editSellers}
            />:null
            }
            {
                modalAddSeller ?
                <AddSeller
                    modal={modalAddSeller}
                    toggleLarge={toggleAddSeller}
                    productName={productName}
                    allCategory={mainSubTitleFromServer}
                    categoryHandler={categoryHandler}
                    sellers={sellers}
                    sellerHandler={sellerHandler}
                    warranty={warranty}
                    warrantyHandler={warrantyHandler}
                    colorHandler={colorHandler}
                    numberOfProducts={numberOfProducts}
                    numberOfProductsHandler={numberOfProductsHandler}
                    priceHandler={priceHandler}
                    price={price}
                    color={color}
                    discountedPrice={discountedPrice}
                    discountedPriceHandler={discountedPriceHandler}
                    addSellerToProduct={addSellerToProduct}
                />:null
            }
        </div>
    )
}
export default Products;