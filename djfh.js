// Get file input
let djfhForm = document.getElementById('djfh-form');
let djfhInput = document.getElementById('djfh-input');
let djfhPreview = document.getElementById('djfh-preview');
let djfhDropbox = document.getElementById('djfh-dropbox');
let djfhDropFile = false;


djfhForm.addEventListener('submit', function(e){
    e.preventDefault();
    preview(); //  use function if input is not empty
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
 * @param {* integer Minimum file size} min 
 * @param {* integer Maximum file Size} max 
 * @param {* Array Allowed file extension in array} typesArr 
*/
const initializeDjfh = (min, max, typesArr) => {
    minImgSize = min; maxImgSize = max; types = typesArr;

    minImgSize && maxImgSize ? isDjfhInitialized = true : isDjfhInitialized = false;
}

/**
 * CHeck if file has been selected
 */
const isFileSelected = () => {
    return djfhInput.value == '' && !djfhDropFile ? false : true;
}

/**
 * Preview File
 */
const preview = () => {
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
    let file;
    if(djfhInput.value != ''){
        file = djfhInput.files[0];
    }else{
        file = djfhDropFile;
    }
    // console.log(file)
    
    let blobURL = URL.createObjectURL(file);
    // console.log(blobURL)
    let size = file.size; // File size
    let name = file.name; // File name
    let type = file.type; // File type

    let allDots = name.split("."); // Split filename to extract actual file extension

    let fileExtension = allDots[allDots.length - 1]; // Get the actual file extension

    let result = validateType(fileExtension, size);
    
    if(!result){
        return addErrors();
    }
    if(result){
        let base64_img = 'prev';
        let tagToCreate = 'p';

        //  Set the HTML tag to create based on the file extension
        if(fileExtension == 'pdf' || fileExtension == 'csv' || fileExtension == 'xlsx'){
            tagToCreate = 'embed';
        }else if(fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'webp'){
            tagToCreate = 'img';
        }else if(fileExtension == 'mp3'){
            tagToCreate = 'audio';
        }else if(fileExtension == 'mp4'){
            tagToCreate = 'video';
        }

        if(createPreviewElement(tagToCreate, 'success', type)){
            let blobURL = URL.createObjectURL(file);
            let prev = document.getElementById('preview-element');
            prev.src = blobURL;
            return djfhDropbox.style.background = "#ccffdd";
            
            // var reader = new FileReader();
            // reader.onloadend = function() {
            //     base64_img = reader.result;
            //     // console.log(base64_img);
            //     let prev = document.getElementById('preview-element');
            //     prev.src = base64_img;
                
                
            // }
            // reader.readAsDataURL(file);
            // djfhDropbox.style.background = "#ccffdd";
            
            // uploadToServer(file);
        }
    }
}

/**
 * Validate File Type
 * 
 * @param {Name of file} name 
 * @param {Size of file} size 
 */
const validateType = (fileType, size) => {
    
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

/**
 * Validate file size
 * 
 * @param {Size of file to validate} size 
 */
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

/**
 * Create Error Message Node
 * 
 * @param {Error message} errorMess 
 */
const addErrors = async (errorMess = false) => {
    let createTag = await createPreviewElement('p');
    if(createTag){
        if(errorMess){ 
            errors = errorMess;
        }
        displayError();
        // let errorTag = document.getElementById('error-element');
        // errorTag.innerText = errors;
    }
}

/**
 * Bind error message to DOM
 * 
 * @param {Error message} message 
 */
const displayError = (message = null) => {
    let errorTag = document.getElementById('error-element');
    errorTag.innerText = errors;
}
/**
 * Create DOM Element
 * 
 * @param {HTML tag being created} tag 
 * @param {Type of tag i.e a success or an error tag} type 
 * @param {File type being created for } fileType 
 */
const createPreviewElement = (tag, type, fileType = '') => {
    // djfhPreview.addEventListener
    let previewElement = '';
    djfhPreview.innerHTML = ''; // Cleat all fields
    if(tag == 'audio'){
        previewElement = '<audio controls><source id="preview-element" type="audio/mpeg">Your browser does not support the audio element.</audio>';
        return djfhPreview.innerHTML = previewElement;
    }
    if(tag == 'video'){
        previewElement = '<video controls><source id="preview-element" type="audio/mpeg">Your browser does not support the audio element.</video>';
        return djfhPreview.innerHTML = previewElement;
    }
    previewElement = document.createElement(tag);
    // console.log(previewElement)
    previewElement.setAttribute('id', type == 'success' ? 'preview-element' : 'error-element');
    previewElement.setAttribute('class', 'animate__animated animate__zoomIn');
    //  If a file type is specified, add the file type to the embed attribute
    if(fileType != ''){
        previewElement.setAttribute('type', fileType);
    }
    
    return djfhPreview.insertBefore(previewElement, djfhPreview.childNodes[0]);

    
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
 * DROP PREVIEW PHASE
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
    e.stopPropagation();
    e.preventDefault();
    
    const dt = e.dataTransfer;
    const files = dt.files;
    djfhDropFile = files[0];
    djfhInput.value = ''; // Empty file input if a file has been dragged
}

// function isFileSelected



//     //document.querySelector("input[type=file]").onchange = function(event) {
//         //let file = event.target.files[0];
//         // let file = img.files[0];
//         let blobURL = URL.createObjectURL(file);
//         console.log(blobURL);
//         document.querySelector("video").src = blobURL;
//         this.uploadToServer(file);
//     //}