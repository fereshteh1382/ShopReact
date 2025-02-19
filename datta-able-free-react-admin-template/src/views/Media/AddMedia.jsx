import React,{useEffect,useContext,useState} from 'react'
import classes from './media.module.css';
import {AuthContext} from '../../context/Auth/AuthContext';
import {checkType, maxSelectedFile, checkFileSize} from './Funcs';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import { 
    Button,  
    Card,
    CardBody,
    CardFooter,
    CardHeader,  
    Form,FormGroup,
    } from 'react-bootstrap'; 


const AddMedia = (props)=>{
    const {dispatch} = useContext(AuthContext);
    const [loadedFiles,setLoadedFiles] = useState([]);

    useEffect(() => {
        dispatch({type:'check',payload:props});
      }, [])
      
    const onFilesLoad = (event)=>{
        if(checkType(event) /* && maxSelectedFile(event) */ && checkFileSize(event))
        {
            const files = event.target.files;
            //console.log(files);
            const newLoadedFiles =[...loadedFiles];
            for(let x=0;x<files.length;x++){
                newLoadedFiles.push({
                    file:files[x],
                    preview:URL.createObjectURL(files[x]),
                    loaded:0
                })
            }
            setLoadedFiles(newLoadedFiles)
            
           
        }
       
    }  
    const removeLoadedFile = (fileProperty)=>{
        const newFile = loadedFiles.filter(idFile=>idFile!==fileProperty);
        setLoadedFiles(newFile)
    }
    const onDragOverHandler = (e)=>{
       // console.log(e);
        e.preventDefault();
    }
    const onDropHandler = (e)=>{
        //console.log(e.dataTransfer);
        //console.log(e.dataTransfer.files);
        e.preventDefault();
        const files = e.dataTransfer.files;
        const newLoadedFiles =[...loadedFiles];
        for(let x=0;x<files.length;x++){
            newLoadedFiles.push({
                file:files[x],
                preview:URL.createObjectURL(files[x]),
                loaded:0
            })
        }
        setLoadedFiles(newLoadedFiles)
        
    }
   
       
    
    const Upload = ()=>{
        
        const tempLoadedFiles = [...loadedFiles];
        for(let x=0;x<loadedFiles.length;x++){
            if(loadedFiles[x].loaded!==100){
               /* let data ={
                    query:`
                    mutation addmultimedia($image : Upload!) {
                        multimedia(image : $image) {
                          status,
                          message
                        }
                      }`,
                      variables:{
                        "image" : null,
                      }
                };
                let map={
                    0:['variables.image']
                }*/
               // const formD = new FormData();
                //formD.append('operations' , JSON.stringify(data));
               // formD.append('map', JSON.stringify(map));
               // formD.append(0, loadedFiles[x].file,loadedFiles[x].file.name);
             //  formD.append("name", 'fereshteh');
            //   formD.append("file", loadedFiles[x].file);
          //  formD.append("filename", loadedFiles[x].file.name);
            
              // console.log(loadedFiles[x].file);
                 
              //console.log(...formD);
          /*  for (var key of  formD.entries()) {
            console.log(key[0] + ", " + key[1]);
             //res.status(200).send( key[0] + ", " + key[1]);
           }   */
                
                /* axios({
                    url:'/',
                    method:'post',
                    data:formD,
                    onUploadProgress : ProgressEvent=>{
                        tempLoadedFiles[x].loaded = ProgressEvent.loaded/ProgressEvent.total*100
                    }
                }) */
                console.log(loadedFiles[x]);
               const category = {
                filename: loadedFiles[x].file.name,
                filetype: loadedFiles[x].file.type,
                filesize: loadedFiles[x].file.size,
                file: loadedFiles[x],
               // file2: loadedFiles[x].file

                 };
                // console.log(category);
                axios({
                    method: 'post',
                   url: '/shop/handleUploadImage',
                    /* headers:{
                    
                    'Content-Type': "multipart/form-data"
                   },   */
                   data: category
                   //body: JSON.stringify(formD),
                   //body: JSON.stringify(formData),
                 }).then((response)=>{console.log(response.data);
                    /* if(response.data.errors){ 
                        const {message} = response.data.errors[0]
                        toast.error(message)
                    }else{
                        setLoadedFiles(tempLoadedFiles)
                    } */
                }).catch((error)=>{
                    console.log(error)
                })
            }
        }
    } 
    return(
        <div className="animated fadeIn">
           <ToastContainer /> 
            <Card>
                <CardHeader>
                    <h6>Add Media</h6>
                </CardHeader>
                <CardBody>
                   <div className={classes.addMediaSection}
                         onDragOver={onDragOverHandler}
                        onDrop={onDropHandler} 
                    > 
                    <div className={classes.filePreview}>
                    <div className={classes.dragdropSection}>
                            <h3>Drag & Drop Files </h3>
                            <span>OR</span>
                            
                            <form action="#" className="form-horizontal" >
                                <FormGroup row>
                                    <label htmlFor="file-multiple-input" >
                                        <div className={classes.fileSelection}>Upload</div>
                                    </label>
                            
                                    <input type="file" id="file-multiple-input" name="file-multiple-input"
                                        multiple
                                        onChange={onFilesLoad} 
                                        />

                                </FormGroup>
                            </form>
                        </div> 
                    </div>
                      <div className={classes.filePreview}>
                        {
                            loadedFiles.map((file,index)=>{
                                return(
                                    <div className={classes.file} key={index}>
                                        {
                                            file.loaded ===0 ?
                                            <span className={classes.removeIcons}  onClick={()=>removeLoadedFile(file)} >
                                               {/*  <i className="fa fa-remove fa-lg mt-4"></i> */}
                                                <i className="feather icon-trash" />
                                             </span>
                                        :null
                                        }
                                        
                                        <img src={file.preview} alt={file.preview} />
                                        {/* <progress bar color="success" value={file.loaded} >
                                            {Math.round(file.loaded,2)}%
                                        </progress> */}
                                    </div>
                                )
                            })

                        }
                          
                            
                        </div> 
                        
                    </div>
                </CardBody>
                <CardFooter>
                         <Button type="submit" size="sm" color="primary"  onClick={Upload} >
                            <strong>آپلود </strong>
                        </Button> 
                </CardFooter>  
            </Card>
        </div>
    )
}
export default AddMedia;
