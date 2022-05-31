# Lost Items

This is a web app developed by [John Katua](https://github.com/johnkatua).

This project is to help people who have either lost an item or found an item which does not belong to them, you can search through the app to see if you can find you item

## Technologies Used:

  - Node.js
  - Express.js
  - MongoDB
  - Cloudinary
  - Multer

## Installing Dependencies

You can install all dependencies for this app by running the command:

  ```
  npm install
  ```

Running the application

  - You can run the hosted app from heroku with the command below:

  ```
  https://powerful-tundra-02406.herokuapp.com/
  ```

  - You can run the command below to start the project locally after cloning it:

  ```
  npm run start:dev
  ```

## The Server

This is a web server which currently has 10 endpoints

  | Endpoint  | Details |
  | -------------------------- | ---------------------------------------------- |
  | /auth/login                | User can login through endpoint |
  | /auth/register             | User can register through this endpoint |
  | /items/get-single-item/id         | get single item endpoint  |
  | /items/get-all-items              | get all items endpoint  |
  | /items/create | Add new item endpoint |
  | /items/update-item/id | update a single item endpoint |
  | /items/get-items-by-category/id | get items by category |
  | /delete/id | delete an item endpoint |
  | /genre | get all categories |
  | /genre/create | create category endpoint |

