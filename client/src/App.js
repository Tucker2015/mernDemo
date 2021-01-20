import React from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar';
class App extends React.Component {

  state = {
    username: '',
    title: '',
    body: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  }

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received');
      })
      .catch(() => {
        alert('Error retriving data');
      });
  };

  handleChange = ({ target }) => {

    const { name, value } = target;
    this.setState({ [name]: value });
  };
  submit = (event) => {
    event.preventDefault();
    const payload = {
      username: this.state.username,
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Error sending to Server');
      });;
  };

  resetUserInputs = () => {
    this.setState({
      username: '',
      title: '',
      body: ''

    });
  };

  displayBlogPost = (posts) => {

    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="card mt-2" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="card">
          <div className="card-header" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {post.title}
          </div>
          <div className="card-body">
            <h5 className="card-title">Author : {post.username}</h5>
            <p className="card-text">{post.body}</p>
            <div class="card-footer text-muted">
              {post.date}
            </div>
          </div>
        </div>

      </div>
    ));
  };


  render() {
    console.log('State: ', this.state);

    return (

      <div className="app mt-5">
        <NavBar />
        <h1>Kevin's Blog</h1>
        <div className="mt-2" style={{ width: "100%", }}>
          <form onSubmit={this.submit}>
            <div className="form-input">
              <input
                type="text"
                name="username"
                placeholder="Enter Your Name"
                value={this.state.username}
                onChange={this.handleChange}
              /></div>
            <div className="form-input">
              <input
                type="text"
                name="title"
                placeholder="Enter Your Title"
                value={this.state.title}
                onChange={this.handleChange}
              /></div>
            <div className="form-input">
              <textarea
                placeholder="Enter your Blog Post"
                name="body"
                cols="30"
                rows="10"
                value={this.state.body}
                onChange={this.handleChange}

              >

              </textarea>
            </div>
            <button className="btn-primary mb-1">Submit Post</button>

          </form>
        </div>
        <div className="blog-post">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }

}

export default App;