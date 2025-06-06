# Image Upload API

This is a Node.js API that allows uploading, storing, filtering, and managing images with metadata using MongoDB and Express.



##  Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) installed if not go to this link [https://nodejs.org/en/download]

Clone the repository and install dependencies:
git clone <https://github.com/vishal814/task>
cd task
```bash
npm install
```
Create a .env file and add the following variables to .env:

PORT=8080

DB_CONNECT_STRING=mongodb://localhost:27017/imageDB

run the development server:
```bash
npm run dev
```
# Endpoints
| Method | Endpoint                        | Description                                     |
|--------|----------------------------------|-------------------------------------------------|
| POST   | `/api/images`                   | Upload an image with metadata (form-data)       |
| GET    | `/api/images`                   | Get all public images or filter by category/tags |
| PUT    | `/api/images/:id`               | Update title, category, or tags of an image     |
| PATCH  | `/api/images/:id/toggle`        | Toggle `isPublic` status of an image            |
| DELETE | `/api/images/:id`               | Delete image from database and filesystem       |

# Static files
Uploaded images are stored in:/public/images
```bash
http://localhost:8080/public/images/<filename>
```
#  Dependencies

Node.js

Express

MongoDB + Mongoose

Multer 

dotenv



