const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileUpload -->handler function

exports.localFileUpload = async(req, res) => {
    try{
        // Fetch file from console
        const file = req.files.file;
        console.log("File aagyi", file);

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        // add path to move the function
        file.mv(path, (err) => {
            console.log(err);
        });

        // create asuccessful response

        res.json({
            success:true,
            message:'Loacal File Updated sucessfully'
        });
    }
    catch(error){

        console.log("not able to upload file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }
    
    options.resource_type = "auto"; 
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image Uplaod ka handler

exports.imageUpload = async (req, res) => {
    try{
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        
        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                success:'file format not supported',
            })
        }

        // file format supported hai 
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // Db me entry save karni h 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        });

    }
}

// Video Upload handler

exports.videoUpload = async (req, res) => {
    try{
         // data fetch
         const {name, tags, email} = req.body;
         console.log(name, tags, email);

         const file = req.files.videoFile;

          // Validation
        const supportedTypes = ["mp4", "mov"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);
       
        // Add file limit of 5MB for video

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                success:'file format not supported',
            })
        }

         // file format supported hai 
         const response = await uploadFileToCloudinary(file, "Codehelp");
         console.log(response);

         
        // Db me entry save karni h 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong'
        })
    }
}

// Image Size Reducer

exports.imageSizeReducer = async (req, res) => {
    try{
         // data fetch
         const {name, tags, email} = req.body;
         console.log(name, tags, email);
         
         const file = req.files.imageFile;
         console.log(file);
 
         // Validation
         const supportedTypes = ["jpg", "jpeg", "png"];
 
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log("File Type:", fileType);
 
         if(!isFileTypeSupported(fileType, supportedTypes)) {
             return res.status(400).json({
                 success:false,
                 success:'file format not supported',
             })
         }
 
         // file format supported hai 
         const response = await uploadFileToCloudinary(file, "Codehelp", 30);
         console.log(response);
 
         // Db me entry save karni h 
         const fileData = await File.create({
             name,
             tags,
             email,
             imageUrl:response.secure_url,
         });
 
         res.json({
             success:true,
             imageUrl:response.secure_url,
             message:'Image Successfully Uploaded',
         })
     }
     catch(error) {
         console.error(error);
         res.status(400).json({
             success:false,
             message:'something went wrong',
         });
    }
    

}