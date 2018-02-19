import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  onHandleChange = (e) => {
    let {dispatch} = this.props;
    dispatch({type: 'UPDATE_USERNAME' , username: e.target.value})
  }

  onUserSearch = () => {
    let {dispatch} = this.props;
    let {username} = this.props;
    fetch(`https://api.github.com/users/${username}`)
      .then(res => {
        return res.json()
    })
      .then(res => {
        dispatch({type: 'UPDATE_USERPROFILE', userprofile: res})
    })
  }
  
  onRepoFetch = () => {
    let {dispatch} = this.props;
    let {repos_url} = this.props.userprofile;

    fetch(repos_url)
    .then(res => {
      return res.json()
    })
    .then(res => {
      dispatch({type: 'UPDATE_REPOS', repos: res})
    })
  }

  render() {
    let {userprofile} = this.props;
    let repos = this.props.repos.map((repo, i) => {
      return <li key={i}>{repo.name}</li>
    })
    return(
      <div>
        <h1>{this.props.username}</h1>
        <input type='text' placeholder="Enter Github Username"
          onChange={this.onHandleChange}
          value={this.props.user} />
          <br/>
          <button onClick={this.onUserSearch}>Search</button>
          <br/>
          <h3>{userprofile.login}</h3>
          <br/>
          <img src={userprofile.avatar_url} alt=""/>
          <br/>
          <button onClick={this.onRepoFetch}>Get Repos</button>
          <br/>
          <h4>{repos}</h4>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  }
}

export default connect(mapStateToProps)(App);

