import React, {Component} from 'react';
import Posts from '../Posts';
import Header from '../Header';
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
          image: '',
          userId:this.props.location.state.id
      }
      await axios.post('/posts',createdPost)
      .then( () => this.getUsersPostsData());
  }

   getUsersPostsData = async() => {
      await axios.get(`/posts/${this.props.location.state.id}`)
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
      const allTheirPosts = usersPosts === null ? usersPosts : usersPosts.map(post => <Posts key={post.id} reRender={this.getUsersPostsData} postInfo={{ ...post }} currentUserInfo={{ ...this.props.location.state }} />)
      const userInfo = this.props.location.state;
      const create = this.state.create
      return (
         <div  className="profile-page">
            <Header userInfo={userInfo} comingFrom={"profile"}/>
            <div className="center">
               <div className="card info-card">
                     <div className="card-image">
                        <img src={userInfo.image || "http://www.3ccc.co.nz/wp-content/uploads/2015/02/Profile-Placeholder.png"}  alt="profile avatar"/>
                     </div>
                  <div className="card-content">
                     <div className="media">
                        <div className="media-left">
                        </div>
                        <div className="media-content">
                           <p className="users-name subtitle is-6">{`${userInfo.firstname} ${userInfo.lastname}`}</p>
                           <div className="users-handle-email">
                              <p className="handle"> @{userInfo.username}</p>
                              <p className="email">{userInfo.email || `${userInfo.username}@socialite.com`}</p>
                           </div>
                           <br />
                           <br />
                        </div>
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