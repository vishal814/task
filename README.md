# Express Task
# 📸 Express Image Upload API

A simple Node.js Express app that allows users to upload images, store them on the server, and retrieve all uploaded images through a REST API.

---

## Project Structure
project/
├── public/
│ └── images/ # Uploaded images are saved here
├── server.js # Main Express server file
├── package.json
└── README.md
Install Dependencies
npm install
Start Server 
node server.js
API Endpoints
URL: POST /api/upload

Content-Type: multipart/form-data

Field Name: image

Using Postman:
Method: POST

Body → form-data

Key: image

Type: File

Choose any image file

 Sample Response:
Edit
{
  "isSuccess": true,
  "message": "File uploaded successfully",
  "data": {
    "originalName": "bg1.png",
    "savedName": "1748244176791-bg1.png",
    "url": "http://localhost:8080/public/images/1748244176791-bg1.png"
  }
}
 Get All Images
URL: GET /api/images

Sample Response:
json
Edit
{
  "isSuccess": true,
  "message": "All images fetched",
  "data": [
    "http://localhost:8080/public/images/bg1.png",
    "http://localhost:8080/public/images/bg2.jpg"
  ]
}
🔧 Built With
Node.js

Express.js

Multer – Middleware for file uploads

