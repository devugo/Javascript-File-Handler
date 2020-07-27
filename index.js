// Get file input
let djfhForm = document.getElementById('djfh-form');
let djfhInput = document.getElementById('djfh-input');
let djfhPreview = document.getElementById('djfh-preview');

djfhForm.addEventListener('submit', function(e){
    
    e.preventDefault();
    upload.upload();

})

class Upload{
    errors = '';
    validation = false;

    constructor(minImgSize, maxImgSize, types){
        this.minImgSize = minImgSize;
        this.maxImgSize = maxImgSize;
        this.types = types;
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

    getElementById(id) {

    }

    validateSize(size){

        if(size < this.minImgSize || size > this.maxImgSize){
            var error = new Object();
            error.name = `Please provide a file size between ${this.minImgSize/1000}kb  and ${this.maxImgSize/1000}kb`;
            this.errors = error;
            return false;
        }
        return true;

    }

    validateType(type, size){
        let trailSlashIndex = type.indexOf('/');

        let fileType = type.slice(trailSlashIndex + 1);
        
        if(this.types.indexOf(fileType) === -1 && this.types.length > 0){
            var error = new Object();
            
            error.name = `Please uplaod only ${this.types} file type(s)`;
            this.errors = error;
            return false;
        }
        return this.validateSize(size);
        
        // //  Check if file type is required
        // fileType
    }

    createPreviewElement(tag, type) {
        // djfhPreview.addEventListener
        
        let previewElement = document.createElement(tag);
        previewElement.setAttribute('id', type == 'success' ? 'preview-element' : 'error-element');
        previewElement.setAttribute('class', 'animate__animated animate__zoomIn');
        // console.log(djfhPreview);
        // return console.log(previewElement);
        return djfhPreview.insertBefore(previewElement, djfhPreview.childNodes[0]);

        // img.classList.add('preview');
    }

    upload () 
    {

        let file = djfhInput.files[0];
        let size = file.size;
        let type = file.type;

        let result = this.validateType(type, size);
        if(!result){
            return this.addErrors();
        }
        if(result){
            let base64_img = 'prev';
            if(this.createPreviewElement('img', 'success')){
                var reader = new FileReader();
                reader.onloadend = function() {
                    base64_img = reader.result;
                    let prev = document.getElementById('preview-element');
                    prev.src = base64_img;
                    
                    
                }
                reader.readAsDataURL(file);
                document.getElementById("dropbox").style.background = "#ccffdd";
                // document.getElementsByTagName("FORM")[0].style.display = "block";
                
                this.uploadToServer(file);
            }
        }
        // console.log(type);
        // console.log(size);
        // console.log(file);

        // let img = document.getElementById('photo');
        // let size = document.getElementById('photo').files[0].size;
        // let type = document.getElementById('photo').files[0].type;
        // let preview = document.getElementById('preview-img');

        
        
        // let base64_img = 'prev';
        // console.log(type);
        // if(type != 'image/png' && type != 'image/jpg' && type != 'image/jpeg' && type != 'video/mp4'){
        //     alert('Image must be in jpg, jpeg or png format');
        // } else if(size > this.maxImgSize){
        //     alert('Maximum image size is 500kb');
        // }else if(type == 'video/mp4'){
        //     //document.querySelector("input[type=file]").onchange = function(event) {
        //         //let file = event.target.files[0];
        //         // let file = img.files[0];
        //         let blobURL = URL.createObjectURL(file);
        //         console.log(blobURL);
        //         document.querySelector("video").src = blobURL;
        //         this.uploadToServer(file);
        //     //}
        // }else{
        //     // var file = img.files[0];
        //     console.log(file);
        //     //console.log(file);
        //    // console.log(file.slice(0,0));
        //     //console.log(file.slice(0,1));
          
           
        // }
    }

    addErrors() {
        if(this.createPreviewElement('p')){
            let errorTag = document.getElementById('error-element');
            console.log(this.errors);
            errorTag.innerText = this.errors.name;
        }
    }
}

let upload = new Upload(4000, 20000000, ['jpg', 'jpeg', 'png']);


// document.querySelector("input[type=file]")
// .onchange = function(event) {
//   let file = event.target.files[0];
//   let blobURL = URL.createObjectURL(file);
//   document.querySelector("video").src = blobURL;
// }