# ahime-server
Server side of a full stack MERN ecommerce project

<a href="https://github.com/YellowFlash2012/ahime-client.git">Frontend is available here</a>

Project scope: Full stack ecommerce MERN app with admin dashboard and PayPal payment integrated. Users can browse around, add products to cart and then login to checkout via paypal.

Tech stack: node/express + mongodb
# Key learning points:
1- learned how to use "concurrently" to run both client and server from a single command line
2- how to turn nodejs imports into es5 module imports by adding "type":"module" to the package.json file
3- learned how to use the data seeder script to create a batch of products in the db with one command line. Never heard of it before but now when I come tot hink of it, it makes sense. Adding products manually to the db must be painful especially when we are dealing with hundreds of products!
4- learned a cool way to add meaningful descriptions to routes for future references which is way better than what I used to do.
5- learned how to use express-async-handler tp handle exceptions in the routes without resorting to the traditional try/catch method.
6- learned how to add .env to postman for routes testing. Been using postman for a while but didn't know about this.
7- learned how to create custom error middleware to be used in lieu of the default node error messages
8- learned how to use custom middleware to hash the password for the login and signup routes in the models files rather than in the routes file.
9- learned how to set the login and register tokens in postman .env