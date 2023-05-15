require("dotenv").config();
const express = require('express');
const fileUpload = require('express-fileupload')
const app = express();
const cors = require('cors');
app.use(cors());
const json = express.json();
const PORT = 3017;
const AWS = require('aws-sdk');

AWS.config.update({region:'eu-north-1'});

app.use(json);
app.use(fileUpload({
    limits: {fileSize: 50*1024*1024},
}))

s3 = new AWS.S3({
  accessKeyId: process.env["AccessKeyId"],
  secretAccessKey: process.env["secretAccessKey"],
});

app.post('/', async (req, res) => {

    const uploadParams = {
    Bucket: 'thishans3bucket',
    Key: req.files.file.name,
    Body: Buffer.from(req.files.file.data),
    ContentType: req.files.file.mimetype,
    //ACL: 'public-read'
    }

    s3.upload(uploadParams, function(err,data){
        err && console.log("Error : ", err)
        data && console.log("Upload Success: ", data.Location)
    })

    res.send('Ok!');
})

const server =  app.listen(PORT,function(){console.log(`port started in ${PORT}`)})


