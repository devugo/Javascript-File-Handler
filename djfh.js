// Get file input
let djfhForm = document.getElementById('djfh-form');
let djfhInput = document.getElementById('djfh-input');
let djfhPreview = document.getElementById('djfh-preview');
let djfhDropbox = document.getElementById('djfh-dropbox');


djfhForm.addEventListener('submit', function(e){
    e.preventDefault();
    !djfhInput.value == '' && upload(); //  use function if input is not empty
})

let initializedDjfh = false;
let errors = '';
let validation = false;
let minImgSize, 
    maxImgSize, 
    types;

const initializeDjfh = (min, max, typesArr) => {
    minImgSize = min; maxImgSize = max; types = typesArr;

    minImgSize && maxImgSize ? initializedDjfh = true : initializedDjfh = false;
}

const upload = () => {
    if(!initializedDjfh){
        return;
    }
    let file = djfhInput.files[0];
    let size = file.size;
    let type = file.type;

    let result = validateType(type, size);
    if(!result){
        return addErrors();
    }
    if(result){
        let base64_img = 'prev';
        if(createPreviewElement('img', 'success')){
            var reader = new FileReader();
            reader.onloadend = function() {
                base64_img = reader.result;
                
                let prev = document.getElementById('preview-element');
                prev.src = base64_img;
                
                
            }
            reader.readAsDataURL(file);
            djfhDropbox.style.background = "#ccffdd";
            // document.getElementsByTagName("FORM")[0].style.display = "block";
            
            uploadToServer(file);
        }
    }
}

const validateType = (type, size) => {
    console.log(type); console.log(size);
    console.log(types)
    let trailSlashIndex = type.indexOf('/');

    let fileType = type.slice(trailSlashIndex + 1);
    
    if(types.indexOf(fileType) === -1 && types.length > 0){
        var error = new Object();
        
        error.name = `Please uplaod only ${types} file type(s)`;
        errors = error;
        return false;
    }
    return validateSize(size);
    
    // //  Check if file type is required
    // fileType
}

const validateSize = (size) => {

    if(size < minImgSize || size > maxImgSize){
        var error = new Object();
        error.name = `Please provide a file size between ${minImgSize/1000}kb  and ${maxImgSize/1000}kb`;
        errors = error;
        return false;
    }
    return true;

}

const addErrors = () => {
    if(createPreviewElement('p')){
        let errorTag = document.getElementById('error-element');
        console.log(errors);
        errorTag.innerText = errors.name;
    }
}

const createPreviewElement = (tag, type) => {
    // djfhPreview.addEventListener
    
    let previewElement = document.createElement(tag);
    previewElement.setAttribute('id', type == 'success' ? 'preview-element' : 'error-element');
    previewElement.setAttribute('class', 'animate__animated animate__zoomIn');
    // console.log(djfhPreview);
    // return console.log(previewElement);
    return djfhPreview.insertBefore(previewElement, djfhPreview.childNodes[0]);

    // img.classList.add('preview');
}

const uploadToServer = (data) => {
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