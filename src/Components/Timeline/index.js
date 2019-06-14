import React, {Component} from 'react';
import Posts from '../Posts';
import Header from '../Header';
import axios from "axios";
import "./style.css";

class Timeline extends Component {
   constructor() {
      super()
      this.state = {
         allPosts: null
      }
   }

   getAllPostsData = async () => {
      await axios.get("/posts").then(response => {
        const allPosts = response.data;
        this.setState({ allPosts });
      });
   }

   componentDidMount(){
      this.getAllPostsData();
   }

   render() {
      console.log(this.props);
      const allPosts = this.state.allPosts;
      let userInfo = this.props.location.state.userInfo;
      const everyPost = allPosts && allPosts.map(post => <Posts key={post.id} postInfo={{...post}} currentUserInfo={{...userInfo}}/>)
      return (
        <div className="timeline-page">
         <Header userInfo={{...userInfo}} comingFrom={"timeline"}/>
          <h1>Timeline</h1>
          {everyPost}
        </div>
      );
   }
}

export default Timeline;