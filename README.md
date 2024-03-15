# FullStyle

FullStyle is a web application designed for style developers to create a social platform where they can share their style codes, knowledge, and inspiration with others. Users can create profiles, post their style codes, comment on other users' posts, and add posts to their favorites.

## Project Description

This repository contains the frontend code for the FullStyle application, built using React.js. The backend code (Express API) can be found in a separate repository at the FullStyle GitHub organization.

## About the Team

We are two young web developers studying at Iron Hack. Dilan is Web Developer Fullstack and her work is visible on her [Github](https://github.com/karkelo1) Profile. Pauline is UX/UI Designer and Web Dev Fullstack as well, her work is also available on her [Github](https://github.com/Paulinecvt). You'll be able to find our portfolios as well. 

## Instructions to Run the Application

To run this application on your local machine, follow these steps:

Clone this repository to your local machine using the following command:


    git clone https://github.com/FullStyle-app/fullstyle-app-backend.git

Navigate to the project directory:

    cd fullstyle-app-backend

Install the dependencies by running:

    npm install

Create a .env file in the root directory of the project and configure the following environment variables:

    PORT=<port-number>
    MONGODB_URI=<mongodb-uri>
    JWT_SECRET=<jwt-secret>
    CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<cloudinary-api-key>
    CLOUDINARY_API_SECRET=<cloudinary-api-secret>

You also need to set-up a [Cloudinary](https://cloudinary.com/documentation) account to use it as a file uploader.

Run the application for production using:

    npm start

Run it also for development (with automatic restart on code changes):

    npm run dev

**Access the API**: 
Once the server is running, you can access the API endpoints using a tool like [Postman](https://www.postman.com/downloads/) or by integrating them into your frontend application.

## Demo

You can view the final version of the FullStyle application on here:
https://fullstyle.netlify.app/

For the backend code and other related repositories, please visit the FullStyle GitHub organization:
https://github.com/FullStyle-app

To know more about the project, the challenges we faced and the improvements we are thinking about to make FullStyle evolve, you can see the slides of our final presentation here :
[Canva Slides](https://www.canva.com/design/DAF_gX2Tn6s/D8_Ly-5U_V0nznVgD76x5A/view?utm_content=DAF_gX2Tn6s&utm_campaign=designshare&utm_medium=link&utm_source=editor) 

## STAY STYLISH! <3
