document.getElementById("imageUpload").onclick = function () {
    //function upload() {
    let xhttp = new XMLHttpRequest(); // create new AJAX request
    const selectedImage = document.getElementById("selectedImage");
    console.log(selectedImage.files[0]);
    const imageStatus = document.getElementById("imageStatus");
    const progressDiv = document.getElementById("progressDiv");
    const progressBar = document.getElementById("progressBar");
    const uploadResult = document.getElementById("uploadResult");

    //xhttp.responseType = "json";
    xhttp.open("POST", "/realty/image-upload");

    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200) {
            //imageStatus.innerHTML = "آپلود عکس موفقیت آمیز بود"; //this.response.message
            uploadResult.innerHTML = this.responseText; //this.response.address
            selectedImage.value = ""; //? Input file clear
        } else {
            //imageStatus.innerHTML = this.responseText;
        }
    };


    /* xhttp.upload.onprogress = function (e) {
         if (e.lengthComputable) {
             let result = Math.floor((e.loaded / e.total) * 100);
             console.log(result + "%");
             if (result !== 100) {
                 progressBar.innerHTML = result + "%";
                 progressBar.style = "width:" + result + "%";
             } else {
                 progressDiv.style = "display: none";
             }
         }
     };*/

    let formData = new FormData();
    //alert(selectedImage.files.length);
    if (selectedImage.files.length > 0) {
        progressDiv.style = "display: block";
        //console.log(selectedImage.files[0]);
        formData.append("image", selectedImage.files[0]);
        // formData.append("image", "sample");

        console.log(formData);
        result = xhttp.send(formData);
        // console.log(result);
    } else {
        //  imageStatus.innerHTML = "برای آپلود باید عکسی انتخاب کنید";
    }
};
