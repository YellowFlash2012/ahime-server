# ahime-server
Full stack MERN ecommerce project

<a href="https://ahimeecom.herokuapp.com/">Live preview</a>

Project scope: Full stack ecommerce MERN app with admin dashboard and PayPal payment integrated. Users can browse around, add products to cart and then login to checkout via paypal.

Tech stack: node/express + mongodb
# Key learning points:
client:
1- Didn't know about bootswatch before. Heard about it here first time. https://bootswatch.com/

2- how to set default props value in a component without receiving the props from the parent component, e.g stars color in the Rating components

3- how to specify the type of each prop using PropTypes. Its effects are only visible in the console of the devtools not in the UI. 4- learned that for a component like cart, it needs to be rendered under 2 options: either from the single-product page or directly by clicking on "cart" in the navbar. Therefore, under RRDV6, 2 routes are needed in the app.js file to fully render the cart. 5- learned how to log users in immediately after signup by dispatching the login_success action immeditaely after the register_success action. 6- Cast to ObjectId failed for value "[object Object]" (type string) at path "_id" for model "Orders". I got this error message all throughout the project. Managed to fix some. The root cause is the route order as I have been told. Didn't know that route order in the backend could have such an influence on the frontend. 7- The pagination section was tough to digest. But seeing the big picture at the end of it started to make sense.

server:
1- learned how to use "concurrently" to run both client and server from a single command line
2- how to turn nodejs imports into es5 module imports by adding "type":"module" to the package.json file
3- learned how to use the data seeder script to create a batch of products in the db with one command line. Never heard of it before but now when I come tot hink of it, it makes sense. Adding products manually to the db must be painful especially when we are dealing with hundreds of products!
4- learned a cool way to add meaningful descriptions to routes for future references which is way better than what I used to do.
5- learned how to use express-async-handler tp handle exceptions in the routes without resorting to the traditional try/catch method.
6- learned how to add .env to postman for routes testing. Been using postman for a while but didn't know about this.
7- learned how to create custom error middleware to be used in lieu of the default node error messages
8- learned how to use custom middleware to hash the password for the login and signup routes in the models files rather than in the routes file.
9- learned how to set the login and register tokens in postman .env

EDIT: 6/22/2022
- learned of a new and better way to structure MERN app and implemented it in this update. I created a Ui folder inside the root folder of the app to host the client part of the app.
- Cast to ObjectId failed for value "[object Object]" (type string) at path "_id" for model "Orders". This error bedeviled me throughout the first version of this app but I finally sorted it out. let {id}=useParams() was the wholesome solution.
- I modified the navbar to render only one dropdown menu irrespective to who is logged in: admin or simple user.
- Conditionally rendered the reviews so that review is either plural or singular depending on how many rating a product has.
