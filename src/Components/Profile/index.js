import React, {Component} from 'react';
import Posts from '../Posts'
import axios from "axios";
import "./style.css";
import mp3_file from "../../Assets/Humble.mp3";

class Profile extends Component {
   constructor() {
      super();
      this.state = {
         usersPosts: null,
         posts:[],
         content:"",
         create:false
      }
   }
  
   createPost = () =>{
      this.setState(prevstate => ({create: !prevstate.create}))
   }

   handleChange = (event) => {
      this.setState({content: event.target.value })
   }

   handleCreatePost = async () =>{
      const createdPost ={
          content: this.state.content,
          image: 'https://wallpaperstock.net/wallpapers/thumbs1/40737wide.jpg',
          userId:this.props.id
      }
      await axios.post('/posts',createdPost)
      .then( () => this.getUsersPostsData());
  }

   getUsersPostsData = async() => {
      await axios.get(`/posts/${this.props.id}`)
      .then(response => {
         const usersPosts = response.data;
         this.setState({ usersPosts, create: false });
      })
   }

   componentDidMount(){
      this.getUsersPostsData();
   }

   render() {
      const usersPosts = this.state.usersPosts;
      const allTheirPosts = usersPosts === null ? usersPosts : usersPosts.map(post => <Posts key={post.id} reRender={this.getUsersPostsData} postInfo={{ ...post }} userInfo={{ ...this.props }} />)
      const userInfo = this.props;
      const create = this.state.create
      return (
         <div  className="profile-page">
            <div className="center">
               <div className="card info-card">
                     <div className="card-image">
                        <img src={userInfo.image}  />
                     </div>
                  <div className="card-content">
                     <div className="media">
                        <div className="media-left">
                        </div>
                        <div className="media-content">
                           <p className="users-name subtitle is-6">{`${userInfo.firstname} ${userInfo.lastname}`}</p>
                           <span>
                              <p className="handle"> @{userInfo.username}</p>
                              <p className="email">{userInfo.email}</p>
                           </span>
                           <br />
                           <br />
                        </div>
                     </div>
                     <div className="content">
                        <a>@ socialite</a>.
                        <a href="#">#👑</a> <a href="#">#tech-enthusiast</a>
                        <p className="tagline">they believed they could so they did</p>
                     </div>
                  </div>
               </div>
            </div>
            <div>
            <button className="info" onClick={this.createPost}>Tell Us Your Thoughts</button>
            {create ? (
               <div>
                  <input className="info" onChange={this.handleChange} name="content"/>
                  <button onClick={this.handleCreatePost}>Submit</button>
               </div>
                  ) :
                     null}
            {allTheirPosts}
            </div>
            <audio src={mp3_file} autoPlay/>
         </div>
      )
   }
}

export default Profile;