let dropbox;
//let preview = document.getElementById('preview-img');
var createImg = document.createElement("img");
var preview = document.getElementById("preview");
preview.appendChild(createImg); 
createImg.setAttribute("id", "preview-img");
createImg.setAttribute("height", "200");
createImg.setAttribute("width", "200");

var para1 = document.createElement("p");         
var textnode = document.createTextNode("Select from gallery or Drag file here");        
para1.appendChild(textnode);  

/* var para2 = document.createElement("p");         
var textnode2 = document.createTextNode("Or");        
para2.appendChild(textnode2); 

var para3 = document.createElement("p");         
var textnode3 = document.createTextNode("Drag file here");        
para3.appendChild(textnode3); */


    dropbox = document.getElementById("dropbox");
    dropbox.appendChild(para1);
    
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
        handleFiles(files);
    }

    function handleFiles(files){
        var file = files[0];

        var reader = new FileReader();
        reader.onloadend = function() {
            base64_img = reader.result;
            createImg.src = base64_img;
            console.log(base64_img);
            
        }
        reader.readAsDataURL(file);
        document.getElementById("dropbox").style.background = "#ccffdd";
        //alert(file);
    }