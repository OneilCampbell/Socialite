import React, {Component} from 'react';
import Comments from '../Comments';
import axios from 'axios'
import "./style.css";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersComments: null,
      canEdit: false,
      canCreate: false,
      content: props.postInfo.content,
      postUser: "",
    };
  }

  toggleEdit = () => {
    this.setState(prevState => ({ canEdit: !prevState.canEdit }));
  };

  toggleCreate = () => {
    this.setState(prevState => ({ canCreate: !prevState.canCreate }));
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  reRender = () => {
    this.props.reRender();
    this.setState({
        canEdit: false,
        canCreate: false
    });
  }

  updatePost = async () => {
    const updatedPost = {
      content: this.state.content,
      userId: this.props.currentUserInfo.userId
    };
    await axios
      .put(`/posts/${this.props.postInfo.id}`, updatedPost)
      .then(() => { this.reRender() } );
  };

  deletePost = async () => {
    const deletedPost = {
      content: this.state.content
    };
    await axios
      .delete(`/posts/${this.props.postInfo.id}`, deletedPost)
      .then(() => { this.reRender() });
  };

  createComment = async () => {
    const createComment = {
      content: this.state.content,
      userId: this.props.currentUserInfo.id,
      postId: this.props.postInfo.id
    };
    await axios
    .post(`/comments`, createComment)
    .then(() => { this.getUsersCommentsData() });
  };

  getUsersCommentsData = async () => {
    await axios
      .get(`/comments/post/${this.props.postInfo.id}`)
      .then(response => {
        const usersComments = response.data;
          this.setState({
              usersComments, 
              canEdit: false,
              canCreate: false 
          });
      });
  };

  getPostsUsersInfo = async () => {
    await axios
      .get(`/users/${this.props.postInfo.userId}`)
      .then(response => {
        const postUser = response.data;
        this.setState({postUser});
      })
  }

  convertToDateFormat = timeString => {
    let firstBreak = timeString.indexOf("T");
    let firstHalf = timeString.substring(0, firstBreak);
    firstHalf = firstHalf.replace("-", "/");
    let secondBreak = timeString.indexOf(".");
    let secondHalf = timeString.substring(firstBreak+1, secondBreak);
    return `${firstHalf} ${secondHalf}`;
  }

  convertToMinutesAgo = numOfMs => {
    let amount = 0;
    let timeIn = "";
    switch(true){
      case numOfMs >= 1000 && numOfMs < 60000:
        amount = numOfMs / 1000;
        timeIn = "s";
      break;

      case numOfMs >= 60000 && numOfMs < 3600000:
        amount = numOfMs / 60000;
        timeIn = "m";
      break;

      case numOfMs >= 3600000 && numOfMs < 86400000:
        amount = numOfMs / 3600000;
        timeIn = "h";
      break;

      case numOfMs >= 86400000:
        amount = numOfMs / 86400000;
        timeIn = "d";
      break;

      default:
      break;
    }
    amount = Math.floor(amount);
    return amount+timeIn;
  }

  getTimeSince = () =>{
    let currentTime = new Date();
    let postLastUpdated = this.convertToDateFormat(this.props.postInfo.updatedAt);
    let diff = Math.abs(currentTime - new Date(postLastUpdated));
    let timeSince = this.convertToMinutesAgo(diff);
    return `  ${timeSince}`;
  }

  componentDidMount() {
    this.getPostsUsersInfo();
    this.getUsersCommentsData();
  }


  render(){
    const timeSince = this.getTimeSince();
    const usersComments = this.state.usersComments;
    const postUser = this.state.postUser;
    const isOwnPost = (this.props.currentUserInfo.id === this.props.postInfo.userId);
    const allUsersComments = usersComments === null ? usersComments :
    usersComments.map(comment => ( <Comments key={comment.id} {...comment} reRender={this.getUsersCommentsData} isOwnPost={isOwnPost} currentUserId={this.props.currentUserInfo.id} />));
    const edit = this.state.canEdit;
    const create = this.state.canCreate;
    return (
      <div className="user-posts" >
        <article className="media">
        { this.props.postInfo.image ?
          <figure className="media-left">
            <p className="image is-64x64">
              <img className="posts-picture" src={this.props.postInfo.image} alt="users post"/>
            </p>
          </figure>
          : null
          }
          <div className="media-content">
            <div className="content">
              <p className="post-info">
                <strong>{`${postUser.firstname || ""} ${postUser.lastname || ""}     `}</strong> <small>@{postUser.username || ""}</small> <small>{timeSince}</small>
                <br/>
                {this.props.postInfo.content}
                <br/>
                <span className="post-hashtags">@Socialite</span> <span className="post-hashtags">#DopeApp<span role="img" aria-label="fire">🔥</span></span>
                <span className="post-hashtags">#SocializeWithSocialite</span>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <span className="level-item">
                  <span className="icon is-small"><i className="fas fa-reply"></i></span>
                </span>
                <span className="level-item">
                  <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                </span>
                <span className="level-item">
                  <span className="icon is-small"><i className="fas fa-heart"></i></span>
                </span>
              </div>
            </nav>
          </div>
        </article>
        { isOwnPost 
          ?
          <div>
            <button className="post-edit-buttons" onClick={this.toggleEdit}><i className="fas fa-user-edit"></i></button>
            <button className="post-edit-buttons" onClick={this.deletePost}><i className="far fa-trash-alt"></i></button>
          </div>
          :
          null
        }
        {edit ? (
            <div>
                <input onChange={this.handleChange} placeholder="edit" type="text" name="content" value={this.state.content} />
                <button onClick={this.updatePost}>SUBMIT</button>
            </div>
        ) :
            null
        }
        {allUsersComments}
        <button className="create-comment" onClick={this.toggleCreate}><i className="fas fa-comment-medical"></i></button>
        <div>
          {create
          ? (
            <div>
            <input type="text" onChange={this.handleChange} name="content"/>
            <button onClick={this.createComment}>submit</button>
            </div>
          )
          :
          null
        }
        </div>
    </div>
    )
  }
}

export default Posts;