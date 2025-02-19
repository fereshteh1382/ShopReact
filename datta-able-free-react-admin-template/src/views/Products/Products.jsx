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
  import {NavLink} from 'react-router-dom';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import classes from './product.module.css';
   
  import ProductSellers from './ProductSellers';
  //import AddSeller from './AddSeller';
  import { FaCameraRetro,FaTrashCan,FaRegSquarePlus,FaEye } from "react-icons/fa6";

  
 
const Products = (props)=>{

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
            method: 'post',
           url: '/product/handleGetAllProducts',
          
           
           
        }).then((response)=>{console.log(response.data);
          if(response.data.errors){
            const message = response.data.errors[0];
            toast.error(message)
          }else{
            const{getProduct} = response.data
                setProducts(getProduct);
             //   console.log(getProduct);
          
          }
          }).catch((error)=>{
            console.log(error)
           
        })
        
    },[])
    
    const toggleinfoSeller = (attribute,name)=>{ //console.log(attribute);
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
    return(
        <div className="animated fadeIn">
            <ToastContainer />
            <Row>
                <Col xl="12">
                    <Card>
                    <CardHeader>
                        <h6> All Products</h6>
                    </CardHeader>
                        <CardBody>
                            {
                                products.length>0 ?
                                <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Brand</th>
                                        <th>Sellers</th>
                                        <th>Score</th>
                                        <th>setting</th>
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
                                                      {/*   <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.original}`} alt={item.original} /> */}
                                                    </td>
                                                    <td>
                                                       {/*  {item.brandDetails.title} */}
                                                        {item.brand}
                                                    </td>
                                                    <td>
                                                       <Button size="sm" variant="dark" onClick={()=>toggleinfoSeller(item.attributeDetails,item.fname)}>
                                                            {/* <i className="fa fa-eye fa-lg"></i> */}
                                                            <FaEye />

                                                        </Button>
                                                        <Button size="sm" variant="secondary" onClick={()=>toggleAddSeller(item.fname,item._id)}>
                                                        <FaRegSquarePlus/>
                                                        </Button> 
                                                    </td>
                                                    <td>
                                                        {item.rate ? item.rate : 0}
                                                    </td>
                                                    <td className={classes.opreation}>
                                                        <Button size="sm" variant="success">
                                                            <NavLink to={link}><i className="fa fa-edit"></i></NavLink>
                                                        </Button>
                                                        <Button size="sm" variant="warning">
                                                            <NavLink to={pictureLink}><FaCameraRetro/></NavLink>
                                                        </Button>
                                                        <Button size="sm" variant="danger">
                                                        <FaTrashCan />

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
            {/*{
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
            } */}
        </div>
    )
}
export default Products;