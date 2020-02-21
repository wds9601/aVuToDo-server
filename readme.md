## aVuToDo
https://vu-todo-client.herokuapp.com/
Simplify your life and accomplish all your goals! aVuToDo is the next evolution of a todo-app.  Sign up, add tasks to your ToDo list, and delete them!  WOW! 
    
## Technologies used
* MongoDB/Mongoose ODM
* Express/NodeJS
    * CORS - Enables secure cross-domain resource sharing
    * Bcrypt - User authentication via password hashing
    * JWT - JSON Web Token securing user interaction throughout the app with SSO
* Vue.js
    * vue-router
    * Bootstrap-vue
## Routes/Models
 * Routes
    * Auth
     - `POST /auth/signup` - Creates a user and generates a token
     - `POST /auth/login` - Verifies user credentials and signs them in
    * Pets
     - `GET /posts` - Finds all ToDo items registered to the signed in user and displays them on a list in the user's personal page
     - `POST /posts` - Creates a ToDo item with title and content data in MongoDB
     - `DELETE /posts/:id` - Removes a ToDo item from the list and its data from the database and the user's profile
 * Models
    - Post
     author, id, title, content
    - User
     firstname, lastname, username, email, password, verify password
    
## Use cases
Keep track of your ToDos all in one place and reduce mental clutter!
- As a user, I can:
   - Create a user
   - Add ToDo items to my list
   - Remove ToDo items from my list
## Development process
   - Feb 17 2020
    Settled on learning a new framework (Vue.js) and attempting to create a simple app to display what I learned
    Developed wireframes and planned out the expected user-flow
    Data schema/models in MongoDB
    Created app and made first commits to GitHub
   - Feb 18 2020
    Basic route implementation to get around home page and signup portal
    Continue to reseach state management and integrating authentication, how to pass data around Vue.js
   - Feb 19 2020
    Completed back-end routing for data accessibility
    Updated user-flow plans to account for struggling with Vue 
    Continue to wrap my head around holding user tokens and data within the app
   - Feb 20 2020
    Finally got user authentication to work fairly well.  Getting token and user data to front end
    Continue to work on posting and deleting ToDo items
    Finalize Vue component schema and basic functionality, including pages with vue-router
    Finalize styling, logo, and basic functionality
   - Feb 21 2020
    Update ReadMe.md
## If I had another week...
    - So much to do still!
    - Add nav bar and Logout functionality
    - Add a PUT route to edit existing ToDo items on user list
    - Add error page to show when url is wrong
    - Integrate VUEX state-management library to aid in predictable state-management and efficiency
## Setup Guide
To run this application on your own local server:
* Fork and clone this repository
* Run `npm install` to install node module dependancies
* Run `nodemon` in the server directory
* Run `npm run serve` in the client directory
* Create .env file with JWT_SECRET for token usage
Collapse

