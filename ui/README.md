# ahime-client
![ahime-client](/public/images/ahime-prod.png)
Client side of a full stack ecommerce project

<a href="https://ahimeecom.herokuapp.com/">Live preview</a>

Course: Ecommerce MERN project
Course author: Brad Traversy
Platform: Udemy

<a href="https://github.com/YellowFlash2012/ahime-server.git">Backend is available here</a>

Project scope: Full stack ecommerce MERN app with admin dashboard and PayPal payment integrated. Users can browse around, add products to cart and then login to checkout via paypal.

Tech stack: React + Redux

# Key learning points:
1- Didn't know about bootswatch before. Heard about it here first time.
https://bootswatch.com/

2- how to set default props value in a component without receiving the props from the parent component, e.g stars color in the Rating components

3- how to specify the type of each prop using PropTypes. Its effects are only visible in the console of the devtools not in the UI.
4- learned that for a component like cart, it needs to be rendered under 2 options: either from the single-product page or directly by clicking on "cart" in the navbar. Therefore, under RRDV6, 2 routes are needed in the app.js file to fully render the cart.
5- learned how to log users in immediately after signup by dispatching the login_success action immeditaely after the register_success action.
6- Cast to ObjectId failed for value "[object Object]" (type string) at path "_id" for model "Orders". I got this error message all throughout the project. Managed to fix some. The root cause is the route order as I have been told. Didn't know that route order in the backend could have such an influence on the frontend.
7- The pagination section was tough to digest. But seeing the big picture at the end of it started to make sense.
