# Image Upload API

This is a Node.js API that allows uploading, storing, filtering, and managing images with metadata using MongoDB and Express.



##  Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) installed using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```bash
nvm use
```
Enable corepack and install pnpm:
```bash
corepack enable
```
Clone the repository and install dependencies:
git clone <https://github.com/vishal814/task>
pnpm install
Create a .env file by running the following command. And add the value into .env

```bash
cp .env.sample .env
```
And add the following variables to .env:

PORT=8080
DB_CONNECT_STRING=mongodb://localhost:27017/imageDB
run the development server:
```bash
pnpm run dev
```
# Endpoints
POST /api/images
Upload an image with metadata.
Form-Data fields:
image (File, required)
title (Text, required)
category (Text, required)
tags (Text, comma-separated)
isPublic (Text, optional: true/false)

GET /api/images
Fetch images with optional filters.
Query Params:
cat=nature
tags=sunset,beach
showPrivate=true

PUT /api/images/:id
Update title, category, or tags of an image.

PATCH /api/images/:id/toggle
Toggle the isPublic status of an image.

DELETE /api/images/:id
Delete the image document and file.

# Static files
Uploaded images are stored in:/public/images
```bash
http://localhost:8080/public/images/<filename>
```
# Tech Stack
🛠️ Tech Stack

Node.js

Express

MongoDB + Mongoose

Multer 

dotenv


