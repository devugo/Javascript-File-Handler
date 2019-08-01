class Upload{
    constructor(minImgSize, maxImgSize, arr){
        this.minIS = minImgSize;
        this.maxIS = maxImgSize;
    }

    alertMe(){
        alert('ready to go');
    }

    uploadImage () {
        let img = document.getElementById('photo');
        let size = document.getElementById('photo').files[0].size;
        let type = document.getElementById('photo').files[0].type;
        let preview = document.getElementById('preview-img');
        
        let base64_img = 'prev';
        if(type != 'image/png' && type != 'image/jpg' && type != 'image/jpeg'){
            alert('Image must be in jpg, jpeg or png format');
        } else if(size > this.maxIS){
            alert('Maximum image size is 500kb');
        }else{
            var file = img.files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                //console.log('RESULT', reader.result);
                base64_img = reader.result;
                preview.src = base64_img;
                console.log(base64_img);
                //$("#img").attr("src", base64_img); 
               // $(".preview img").show(); // Display image element
                
            }
            reader.readAsDataURL(file);
        }
    }
}

let upload = new Upload(400000, 2000000);