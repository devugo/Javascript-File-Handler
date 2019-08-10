<?php
   
    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        print_r($_FILES['file']);
       // die();
        $filename = $_FILES['file']['name'];
        echo $filename;
        //echo $filename; die();
        /* Location */
        $location = "upload/".$filename;
        $uploadOk = 1;
        $imageFileType = pathinfo($location,PATHINFO_EXTENSION);

        /* Valid Extensions */
        $valid_extensions = array("jpg","jpeg","png", "mp4");
        echo $imageFileType;
        /* Check file extension */
        if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
            $uploadOk = 0;
        }

        if($uploadOk == 0){
            echo 'error is here';
            echo 0;
        }else{
            echo 'got here';
        /* Upload file */
            if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
                echo $location;
            }else{
                echo 0;
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/test.php" method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" name="submit" value="submit">
    </form>
</body>
</html>