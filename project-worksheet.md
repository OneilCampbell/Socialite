# Project Overview



## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Feb 2, 2019| Project Description | Complete
|Feb 3, 2019| Wireframes / Priority Matrix / Functional Components | Complete
|Feb 4, 2019| Core Application / File Structure (HTML, CSS, React) | Complete
|Feb 4, 2019| Pseudocode / actual code | Complete
|Feb 5, 2019| Initial Clickable Model  | Complete
|Feb 6, 2019| MVP | Complete
|Feb 8, 2019| Present | Complete


## Project Description

Socialite(S.O.C.ialite) is a new website that will allow you to connect to other people all around the world. You can add posts, read other user's posts, delete your own posts, like others' posts, etc... It is a perfect app for networking and socializing since you will be connecting to the people who share your interests.

## Wireframes | Component Hierarchy | ERD

### Wireframes

 - **Wireframes** sketches of the user interface with notes of how the user will interact with the UI
![react S.O.Calite App wireframes](https://res.cloudinary.com/sandi29/image/upload/v1549234311/Image_from_iOS_1.jpg)
(https://res.cloudinary.com/sandi29/image/upload/v1549234314/Image_from_iOS.jpg)

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


### ERD

- **Entity Relationship Diagram (ERD)** diagram of the database tables, schemas, and relations 

![react S.O.Calite ERD](https://res.cloudinary.com/sandi29/image/upload/v1549234311/Image_from_iOS_2.jpg)

### Priority Matrix

<a href="https://ibb.co/2YLKjpG"><img src="https://i.ibb.co/2YLKjpG/Blank-Diagram.jpg" alt="Blank-Diagram" border="0"></a>

### MVP/PostMVP - 5min

#### MVP

##### The application sould be able to Create, Read, Update and Delete data. We want to make it interactive and user friendly. 
- Create Database
- Creat React App
- Use both sequelize and express
- Add a 'liked' section
- Style with grid or flexbox

#### Post-MVP
##### Focus on making in responsive and well designed
- Should be interacive and easy to use
- Add aditional styling
- Add extra features (connections, music, gallery)


## React Architectural Design

Define the the React components and the architectural design of your app.

#### Component Heirarchy

![react S.O.Calite App Heirarchy](https://res.cloudinary.com/sandi29/image/upload/v1549234311/Image_from_iOS_2.jpg)
