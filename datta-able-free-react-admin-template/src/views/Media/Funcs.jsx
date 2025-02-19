import { toast } from 'react-toastify';
export const checkType = (event)=>{
    let files = event.target.files;
    let err='';
    const types =['image/png','image/jpeg','image/jpg'];
    for(let x=0;x<files.length;x++){
        if(types.every(type=>files[x].type!==type))
        {
           
            err='Allowed formats are Png,Jpg,Jpeg'
        }
    }
    if(err!==''){
        event.target.value=null;
        toast.error(err);
        return false;
    }
    return true;
}
export const maxSelectedFile = (event)=>{
    let files = event.target.files;
    let err='';
    if(files.length>3){
        event.target.value = null;
        err = 'You cannot upload more than 3 photos at the same time.';
        toast.error(err);
        return false;
    }
    return true;
}
export const checkFileSize = (event)=>{
    let files = event.target.files;
    let err='';
    let size = 3000000;
    for(let x=0;x<files.length;x++){
        if(files[x].size>size){
            err += files[x].name + 'The file size is larger than 3 Meg.'
        }
    }
    if(err!==''){
        event.target.value=null;
        toast.error(err);
        return false;
    }
    return true;
}