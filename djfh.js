// Get file input
let djfhForm = document.getElementById('djfh-form');
let djfhInput = document.getElementById('djfh-input');
let djfhPreview = document.getElementById('djfh-preview');
let djfhDropbox = document.getElementById('djfh-dropbox');


djfhForm.addEventListener('submit', function(e){
    e.preventDefault();
    upload(); //  use function if input is not empty
})

let isDjfhInitialized = false;
let errors = '';
let validation = false;
let minImgSize, 
    maxImgSize, 
    types;

/**
 * Initialize library
 * 
 * @param {* integer} min 
 * @param {* integer} max 
 * @param {* Array} typesArr 
*/
const initializeDjfh = (min, max, typesArr) => {
    minImgSize = min; maxImgSize = max; types = typesArr;

    minImgSize && maxImgSize ? isDjfhInitialized = true : isDjfhInitialized = false;
}

const isFileSelected = () => {
    return djfhInput.value == '' ? false : true;
}

const upload = () => {
    if(!isDjfhInitialized){
        // var error = new Object();
        // error.name = `Please select a file`;
        // errors = error;
        // errors = `Please, initialize djfh!`;
        return addErrors(`Please, initialize djfh!`);
        
    }
    
    if(!isFileSelected()){
        return addErrors(`Please, select a file!`);
    }
    let file = djfhInput.files[0];
    let size = file.size;
    let name = file.name;
    let type = file.type;
    console.log(type);

    let result = validateType(name, size);
    
    if(!result){
        return addErrors();
    }
    if(result){
        let base64_img = 'prev';
        if(createPreviewElement('embed', 'success', type)){
            // if(createPreviewElement('img', 'success')){
            
            var reader = new FileReader();
            reader.onloadend = function() {
                base64_img = reader.result;
                console.log(base64_img);
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

const validateType = (name, size) => {
    let allDots = name.split(".");

    let fileType = allDots[allDots.length - 1];
    console.log(fileType)
    
    if(types.indexOf(fileType) === -1 && types.length > 0){
        // var error = new Object();
        // error.name = `Please uplaod only ${types} file type(s)`;
        // errors = error;
        errors = `Please uplaod only ${types} file type(s)`;
        return false;
    }
    return validateSize(size);
    
    // //  Check if file type is required
    // fileType
}

const validateSize = (size) => {

    if(size < minImgSize || size > maxImgSize){
        // var error = new Object();
        // error.name = `Please provide a file size between ${minImgSize/1000}kb  and ${maxImgSize/1000}kb`;
        // errors = error;
        errors = `Please provide a file size between ${minImgSize/1000}kb  and ${maxImgSize/1000}kb`;
        return false;
    }
    return true;

}

const addErrors = async (errorMess = false) => {
    let createTag = await createPreviewElement('p');
    if(createTag){
        if(errorMess){ 
            errors = errorMess;
        }
        let errorTag = document.getElementById('error-element');
        errorTag.innerText = errors;
    }
}

const displayError = (message) => {
    let errorTag = document.getElementById('error-element');
    errorTag.innerText = errors;
}

const createPreviewElement = (tag, type, fileType = '') => {
    // djfhPreview.addEventListener
    
    let previewElement = document.createElement(tag);
    previewElement.setAttribute('id', type == 'success' ? 'preview-element' : 'error-element');
    previewElement.setAttribute('class', 'animate__animated animate__zoomIn');
    //  If a file type is specified, add the file type to the embed attribute
    if(fileType != ''){
        previewElement.setAttribute('type', fileType);
    }
    // console.log(djfhPreview);
    // return console.log(previewElement);
    djfhPreview.innerHTML = ''; // Cleat all fields
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





/**
 * DROP UPLOAD
 */
dropbox = document.getElementById("djfh-dropbox");

dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
    
    const dt = e.dataTransfer;
    const files = dt.files;
    console.log(files);
    type = files[0].type;
    size = files[0].size;
    // if(type != 'image/png' && type != 'image/jpg' && type != 'image/jpeg'){
    //     alert('Image must be in jpg, jpeg or png format');
    // } else if(size > 5000000){
    //     alert('Maximum image size is 500kb');
    // }else{
    //     handleFiles(files);
    // }
}