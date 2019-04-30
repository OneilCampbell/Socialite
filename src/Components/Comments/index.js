import React, { Component } from 'react';
import "./style.css";
import axios from 'axios';

class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: props.content,
      canEdit: false
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

  render(){
    const edit = this.state.canEdit
    return (
      <div className="post-comments">
        <div className="card">
          <header className="card-header">
            <a href="#" className="card-header-icon" aria-label="more options">
            </a>
          </header>
          <div className="card-content">
            <div className="content">
            {this.props.content}
            </div>
          </div>
          <footer className="card-footer">
            <a href="#" className="card-footer-item">Save</a>
            <a href="#" className="delete" className="card-footer-item">
              <button className="card-footer-item" onClick={this.toggleEdit}>
                <i className="fas fa-user-edit"></i>
              </button>
            </a>
            <a href="#" className="card-footer-item">  
              <button onClick={this.deleteComment}>
                <i className="far fa-trash-alt"></i>
              </button>
            </a>
          </footer>
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