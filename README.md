# The S.O.C.ialite App
 ![react S.O.Calite App wireframes](https://res.cloudinary.com/sandi29/image/upload/v1549291716/web.png)

## Deployed App: 

 - A **link to your deployed working app** in the URL section of your Github repo
[Click here to sample!](insert link)


 ####  *Project Description*

This app is designed to allow users to post updates (tweets) of what is going on in their lives along with links to things they think are interesting.Users will be able to login via the login page as well as post and favorite(save) a post that they like! Users will also be able to delete a post they do not like.


#### *Project Functionality*

The app itself is vaguely like twitter/tumblr. There are users that make posts. They follow other users. You can look at follows and their posts. The features (or styling) isn't the main point. At this time, we're mostly demonstrating architectural concepts.


#### Features

  **Feature List** 
- Login Page: user has to sign in to access account

- Profile Page: user can see all the posts they have ever made in one place

- Timeline: user can see all the posts that other users have made, and comment on those posts, should they so choose

- Posting: user can make new posts, or update or delete existing posts.

- Commenting: user can make comments on particular posts, change existing comments on posts or remove them altogether


## Bonus Features (POST MVP)

- Filter / Search Feature:Create a filter and/or search function that returns posts by keywords.

- Likes: Ability to like posts and affix an emoji to convey the users reaction to the post

- Newsfeed: Page that allows the user access to articles and media of their choosing

- Music: Allow users to play music on their profile page that other users can enjoy when they visit that users page

- Gamepage: A page where users can go to play unique games created by our developers


## Project Setup

#### Dependencies

- PostgresSQL (pg)
-   pg-hstore
- Sequelize
- Nodemon
- Express
-   body-parser
-   morgan
- axios
- concurrently
- react-router-dom


 #### Trello Board Link

https://trello.com/b/Rkz8tTUv/project-3


#### Wireframes

 - **Wireframes** sketches of the user interface with notes of how the user will interact with the UI

 ![react S.O.Calite App wireframes](https://res.cloudinary.com/sandi29/image/upload/v1549291784/signup.png)

![react S.O.Calite App wireframes](https://res.cloudinary.com/sandi29/image/upload/v1549291763/webpost.png)


#### Component Heirarchy

- **Component Heirarchy** 

![react S.O.Calite App Heirarchy](https://res.cloudinary.com/sandi29/image/upload/v1549291816/component-hierarchy.jpg)


#### Component Architecture

	/src/...
	├── App (renders the Header, Footer , Login ,Profile, Footer)
	├── Profile (renders one user profile)
	├── CreatePostPage (create a new Post)
	├── UpdatePostpage (update a user profile by posting something new)
	├── Login (user authentification page)
	├── SearchForm (optional)
	├── Header (includes navbar)
	├── Footer (optional)


#### ERDs

- **Entity Relationship Diagram (ERD)** diagram of the database tables, schemas, and relations 


![react S.O.Calite App ERDs](https://res.cloudinary.com/sandi29/image/upload/v1549291744/Project_3_diagram_1.jpg)





### Server

There is a server that the app hits for data. The data is only stored in memory, but it should produce a more realistic environment.

In the `server` directory

* Install dependencies: `npm install`
* Run it: `npm start`

 Sample data has already been configured in the `models.js` file. For example, there is a user "insert example user name" (password: "sample") that you can log in as.


### Navigation

The sole method of navigation (what's showing on the screen and where the back button goes) is via urls. We parse urls to determine the route stack. There is some stuff to make "related" url navigation look "right" (push and pop). Making everything addressable by URL is great for deep linking and forces each screen to be able to load all on it's own from simple data.

The Router handles parsing different routes depending if you are logged in or not. The urls must be able to represent the entire navigation stack, so that means they can be recursive like my friend's friend's friend's feed (sample://dashboard/follows/john/follows/sarah/follows/amy/posts).


#### API Endpoint Documentation

**Endpoints**

   **USERS**

**.get(‘/users’, loginInfo)**

- gets the username and password for all users, then checks against the currently inputted login information to see if the user exists in the database or if they inputted their information properly.
- info is passed directly into the route as an object, and is accessed via body parsing (req.body). That information is then checked against the data returned from the database
- If the info is in the database/not in the database, then the login information is correct/incorrect, a boolean is returned  (via res.send) and the react app changes/updates state accordingly.


**.get(‘users/:id’)**

- gets all information relevant to the current user, specified by id (req.params.id).
- allows the profile page and account page to be populated with all information (username, password, email, picture, etc.) that pertains to the current user
- information is received from the database as an object (res.json()) and can then be used within the react app to display that info to the users


**.post(‘/users’, signupInfo)**

- signup page: adds a new user account to the database
- info is passed directly into the route as an object, and is accessed via body parsing (req.body). That information is then added to the database.
- once the information is successfully added to the database, a boolean is returned (res.send), the react app can then use this boolean as an indication to signal the user that they have successfully signed up.


**.put(‘/users/:id’, updatedInfo)**

- allows the current user to update or change their account information
- info is passed directly into the route as an object, and is accessed via body parsing (req.body). That information is then used to update the appropriate account in the database, accessed by id (req.params.id).
- once the information is successfully update in the database, a boolean is returned (res.send), the react app can then use this boolean as an indication to signal the user that they have successfully updated their account.


**.delete(‘/users/:id’)**

- allows the current user to terminate their account
- account is accessed in the database by an id (req.params.id). Once the correct account is found, it is then destroyed, permanently removing it from the database.
- once the account is successfully deleted, a boolean is returned (res.send), which the react app can then use to change state and bring the user back to the login page. 


   **POSTS**

**.get(‘/posts’)**

- gets all posts from all users
- used to populate the timeline page, so that the user can see all the posts made by all members
- posts are sent to react app as a collection of objects (res.json()) that are then parsed through and used to display the necessary information


**.get(‘/posts/:userId’)**

- allows current user to access all of their own posts
- used to populate the profile page, so that the user can see all the posts they have ever made
- subset of posts that are specific to the current user are accessed by that user’s id (req.params.id). Posts are then sent to react app as a collection of objects (res.json()) that are then parsed through and used to display the necessary information


**.post(‘/posts’, newPost)**

- allows user to make a new post
- post information is passed directly into the route as an object and is accessed via body parsing (req.body). The post is then added to the database
- after the post is successfully added to the database a boolean is returned (res.send), the react app can then use this boolean to re-render the profile page, effectively displaying the new post


**.put(‘/posts/:id’, updatedPost)**

- allows the user to make a change to an existing post
- change is passed directly into the route as an object and is accessed via body parsing (req.body). The post to be updated in the database is accessed by id (req.params.id) and then updated using the new info.
- when the post is successfully updated, a boolean is returned (res.send), the react app can then use this boolean to re-render the profile page, displaying the updated post


**.delete(‘/posts/:id)**

- allows the user to delete one of their own posts
- specific post in the database is accessed by id (req.params.id) and then destroyed, permanently removing it from the database.
- when the post is successfully deleted, a boolean is returned (res.send), the react app can then use this boolean to re-render the profile page, so that the post is no longer displayed


   **COMMENTS**

**.get(‘/comments/:postId’)**

- gets all the comments for a particular post
- comments are chosen from the database only if their post id matches the postId provided (via req.params.id), then all of the comments are returned (res.json())
- once the react app receives this information it can then be displayed to the user in some manner


**.post(‘/comments’, newComment)**

- allows user to make a new comment on a post
- the comment information is passed directly into the route as an object and is accessed via body parsing (req.body). The comment is then added to the database with the appropriate postId affixed so that it can later be appropriately displayed
- after the comment is successfully added to the database a boolean is returned (res.send), the react app can then use this boolean to re-render the page, effectively displaying the new comment on the post


**.put(‘/comments/:id’, updatedComment)**

- allows the user to make a change to an existing comment on a post
- changes are passed directly into the route as an object and that object is accessed via body parsing (req.body). The comment to be updated in the database is accessed by id (req.params.id) and then updated using the new info.
- when the comment is successfully updated, a boolean is returned (res.send), the react app can then use this boolean to re-render the page, displaying the updated comment on the post


**.delete(‘/comments/:id)**

- allows the user to delete one of their own comments
- specific comment in the database is accessed by id (req.params.id) and then destroyed, permanently removing it from the database and the post that it was on.
- when the comment is successfully deleted, a boolean is returned (res.send), the react app can then use this boolean to re-render the page, so that the comment is no longer displayed on the post


## Acknowledgements
