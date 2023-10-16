# CardFolio - Digital Business Card Platform

CardFolio is a web-based platform designed to connect between businesses and customers. With CardFolio, users can create stunning digital business cards, explore a wide range of professional cards, and make lasting connections within the digital networking community.

## Users for Testing

- Admin user: admin@gmail.com, password: 12345678
- Business user: business@gmail.com, password: 12345678
- Regular user: regular@gmail.com, password: 12345678

## Features

CardFolio offers the following user functions:
=**Register as regular or Business user**:In the register proccess , the user can choose between being a regular user or a business user , business users have a wider range of functions in the website , such as adding posts.

- **Add to Favorites**: Users can add digital business cards to their favorites list for quick access and networking. Favorite cards are easily accessible within the platform.

- **Remove from Favorites**: If a user no longer wishes to keep a digital business card in their favorites list, they can easily remove it.

- **Add to User Posts**: Business users and admins have the option to add and manage multiple listings, showcasing their products and services to attract potential clients and partners.

- **Remove from User Posts**: Business users can also remove listings from their profile when they are no longer relevant.

**Casual users functionality:**

1.View existing business cards and details.
2.Mark favorite business cards and view them/remuve them on the main/fav tabs.


**business users functionality:**

1.All Casual users functionality is available.
2.Ability to add new business cards.
3.Ability to Delete & Update the cards they created.
4.Additional My Cards tab to manage your own cards.


**Admin users functionality:**
1.All Business users functionality is available.
2.Additional Admin tab - to manage all existing users.
3.Delete Users.


## Technologies Used

- React.js
- TypeScript
-Javascript
-node.js
- Bootstrap
- Axios
- HTML5
- CSS3

## Installation

1. Clone the repository- in the code editor you will find 3 folders:
**Cardfolio-client** :contains all front-end files and functionality
**Cardfolio-server** :contains all back-end files and functionality
DB - contains backup of all the required collections

**Front-end installation**
1.On the code editor - open a terminal and navigate to "cardfolio-client" folder root.
2. Run 'npm install' to get all the required node_modules.

**Back-end installation**
1.On the code editor - open a terminal and navigate to "cardfolio-server" folder root.
2. Run 'npm install' to get all the required node_modules.



**Front-end environment variables(.env)**
REACT_APP_API="http://localhost:8000/api"

**Back-end environment variables(.env)**
NODE_ENV =development
PORT = 8000
DB_LOCAL  = "mongodb://localhost:27017/cardfolio"
DB_ATLAS = "Atlas connection string"
jwtKey= "cardfolio"

The client is running on "http://localhost:3000"
The server is running on "http://localhost:8000"

**Author**
If you have any problem cloning/using this project , please dont hesitate to contact me! 
Itay Hamami - ItayHamami26@gmail.com

