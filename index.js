class Upload{
    constructor(minImgSize, maxImgSize, arr){
        this.minIS = minImgSize;
        this.maxIS = maxImgSize;
    }

    uploadToServer(data)
    {
        var fd = new FormData();
        fd.append('file', data);

        fetch("/upload.php", {
            method: "POST", // or 'PUT'
            body: fd, // data can be `string` or {object}!
           
        })
        .then(response => {
            console.log('File was uploaded successfully');
            //console.log('Success:', JSON.stringify(response))
        })
        .catch(error => {
            console.log('there was an error uploading file');
        });
    }

    uploadImage () 
    {
        let img = document.getElementById('photo');
        let size = document.getElementById('photo').files[0].size;
        let type = document.getElementById('photo').files[0].type;
        let preview = document.getElementById('preview-img');
        
        let base64_img = 'prev';
        if(type != 'image/png' && type != 'image/jpg' && type != 'image/jpeg' && type != 'video/mp4'){
            alert('Image must be in jpg, jpeg or png format');
        } else if(size > this.maxIS){
            alert('Maximum image size is 500kb');
        }else if(type == 'video/mp4'){
            //document.querySelector("input[type=file]").onchange = function(event) {
                //let file = event.target.files[0];
                let file = img.files[0];
                let blobURL = URL.createObjectURL(file);
                console.log(blobURL);
                document.querySelector("video").src = blobURL;
                this.uploadToServer(file);
            //}
        }else{
            var file = img.files[0];
            //console.log(file);
           // console.log(file.slice(0,0));
            //console.log(file.slice(0,1));
            var reader = new FileReader();
            reader.onloadend = function() {
                base64_img = reader.result;
                preview.src = base64_img;
                console.log(base64_img);
                console.log(base64_img.length);
                
            }
            reader.readAsDataURL(file);
            document.getElementById("dropbox").style.background = "#ccffdd";
            document.getElementsByTagName("FORM")[0].style.display = "block";
            
            this.uploadToServer(file);
        }
    }
}

let upload = new Upload(400000, 20000000);