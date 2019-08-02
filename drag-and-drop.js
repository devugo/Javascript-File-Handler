let dropbox,
    type,
    size;
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
        type = files[0].type;
        size = files[0].size;
        if(type != 'image/png' && type != 'image/jpg' && type != 'image/jpeg'){
            alert('Image must be in jpg, jpeg or png format');
        } else if(size > 500000){
            alert('Maximum image size is 500kb');
        }else{
            handleFiles(files);

            fetch('sampleUsers.json')
            .then(function (res) {
                console.log(res);
                return res.json();
            })
            .then(function (data) {
                let result = `<h2> User Info From sampleUser.json </h2>`;
                data.forEach((user) => {
                    const { id, name, email } = user
                    result +=
                    `<div>
                        <h5> User ID: ${id} </h5>
                        <ul class="w3-ul">
                            <li> User Name : ${name}</li>
                            <li> User Email: ${email} </li>
                        </ul>
                    </div>`;

                    document.getElementById('result').innerHTML = result;
                });
            })
        }
    }

    function handleFiles(files){
        var file = files[0];

        var reader = new FileReader();
        reader.onloadend = function() {
            base64_img = reader.result;
            createImg.src = base64_img;
            
        }
        reader.readAsDataURL(file);
        document.getElementById("dropbox").style.background = "#ccffdd";
        document.getElementsByTagName("FORM")[0].style.display = "block";
        
    }