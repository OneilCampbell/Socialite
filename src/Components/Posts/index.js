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
      content: props.postInfo.content
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
      userId: this.props.userInfo.userId
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
      userId: this.props.userInfo.userId,
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

  componentDidMount() {
    this.getUsersCommentsData();
  }


  render(){
    const usersComments = this.state.usersComments;
    const allUsersComments = usersComments === null ? usersComments :
    usersComments.map(comment => ( <Comments key={comment.id} {...comment} reRender={this.getUsersCommentsData} />));
    const edit = this.state.canEdit;
    const create = this.state.canCreate;
    return (
      <div className="user-posts" >
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img className="posts-picture" src={this.props.postInfo.image}/>
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{`${this.props.userInfo.firstname} ${this.props.userInfo.lastname}`}</strong> <small>@{this.props.userInfo.username}</small> <small>31m</small>
                <br/>
                {this.props.postInfo.content}
                <br/>
                <a href="#">@dreamteam</a> <a href="#">#dopeapp🔥</a> <a href="#">#butwhydidtheygosohardtho</a>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small"><i className="fas fa-reply"></i></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fas fa-heart"></i></span>
                </a>
              </div>
            </nav>
          </div>
          <div className="media-right">
            <button className="delete"></button>
          </div>
        </article>
        <button onClick={this.toggleEdit}><i className="fas fa-user-edit"></i></button>
        <button onClick={this.deletePost}><i className="far fa-trash-alt"></i></button>
        {edit ? (
            <div>
                <input onChange={this.handleChange} placeholder="edit" type="text" name="content" value={this.state.content} />
                <button onClick={this.updatePost}>SUBMIT</button>
            </div>
        ) :
            null
        }
        {allUsersComments}
        <button onClick={this.toggleCreate}><i className="fas fa-comment-medical"></i></button>
        <div className="create-comment">
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