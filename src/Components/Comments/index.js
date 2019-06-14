import React, { Component } from 'react';
import "./style.css";
import axios from 'axios';

class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: props.content,
      canEdit: false,
      user: "",
    }
  }

  toggleEdit = () => {
    this.setState(prevState => ({canEdit: !prevState.canEdit}))
  }

  reRender = () => {
      this.props.reRender();
      this.setState({canEdit: false});
  }

  deleteComment = async () => {
    const deleteComments = { content: this.state.content }
    await axios
    .delete(`/comments/${this.props.id}`, deleteComments)
    .then(() => {
      this.reRender();
    })
  }

  updateComment = async () => {
      const updatedComments = { content: this.state.content }
      await axios
      .put(`/comments/${this.props.id}`, updatedComments)
      .then(() => {
          this.reRender();
      })
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value })
  }

  getCommentUser = async () => {
    await axios
    .get(`/users/${this.props.userId}`)
    .then(response => {
      let user = response.data;
      let isOwnComment = (this.props.currentUserId === user.id);
      this.setState(prevState => ({...prevState, user, isOwnComment}));
    })
  }

  componentDidMount(){
    this.getCommentUser();
  }

  render(){
    const edit = this.state.canEdit;
    const user = this.state.user;
    const isOwnComment = this.state.isOwnComment;
    return (
      <div className="post-comments">
        <div className="card">
          <div className="card-content">
            <div className="comment-user-content">
              <img className="comment-user-picture" src={user ? user.image : ""} alt="user" />
              <h1 className="comments-user"> {user ? `${((user.username.charAt(0)).toUpperCase())+ user.username.slice(1)}:` : null} </h1>
            </div>
            <p className="comments-content">{this.props.content}</p>
          </div>
          { isOwnComment
            ?
            <footer className="card-footer">
              <span>
                <button className="card-footer-item" onClick={this.toggleEdit}>
                  <i className="fas fa-user-edit"></i>
                </button>
              </span>
              <span>  
                <button className="card-footer-item" onClick={this.deleteComment}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </span>
            </footer>
            :
            (  this.props.isOwnPost
              ?
              <footer className="card-footer">
                <span>  
                  <button className="card-footer-item" onClick={this.deleteComment}>
                    <i className="far fa-trash-alt"></i>
                  </button>
                </span>
              </footer>
              :
              null 
            )
          }
        </div>
        {edit ? (
          <div>
            <input
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <button onClick={this.updateComment}>submit</button>
          </div>
        ) : null}
      </div>
      )
  }
}

export default Comments;