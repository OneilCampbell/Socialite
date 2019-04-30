import React, {Component} from 'react';
import Posts from '../Posts'
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
      const allPosts = this.state.allPosts;
      const everyPost = allPosts && allPosts.map(post => <Posts key={post.id} postInfo={{...post}} userInfo={{ ...this.props }}/>)
      return (
        <div className="timeline-page">
          <h1>Timeline</h1>
          {everyPost}
        </div>
      );
   }
}

export default Timeline;