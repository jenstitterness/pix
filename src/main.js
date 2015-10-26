import _ from 'lodash';
import ipc from 'ipc';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Feed from './Feed';

var app = window.app = {
  accessToken: "",
  currentFeed: "",
  viewUserFeed: "",

  refreshFeed:function() {
    console.log("refreshFeed", this);
    switch(this.currentFeed) {
      case "popular":
        this.loadPopular();
        break;
      case "profile":
        this.loadProfileFeed();
        break;
      case "user":
        this.loadUserFeed(this.viewUserFeed);
        break;
    };
  },

  loadApp: function() {
    this.loadPopular();
    ReactDOM.render(<Header profile={this.loadProfileFeed} popular={this.loadPopular} />, document.getElementById('header'));
  },

  loadPopular: function() {
    app.currentFeed = "popular";
    ReactDOM.unmountComponentAtNode(document.querySelector('#feedContainer'));
    ReactDOM.render(<Feed accessToken={app.accessToken} src="https://api.instagram.com/v1/media/popular?access_token=" />, document.querySelector('#feedContainer'));
  },

  loadProfileFeed: function() {
    console.log(this);
    app.currentFeed = "profile";
    ReactDOM.unmountComponentAtNode(document.querySelector('#feedContainer'));
    ReactDOM.render(<Feed accessToken={app.accessToken} src="https://api.instagram.com/v1/users/self/feed?access_token=" />, document.querySelector('#feedContainer'));
    console.log('loadProfileFeed');
  },

  loadUserFeed: function(id) {
    app.currentFeed = "user";
    app.viewUserFeed = id;
    ReactDOM.unmountComponentAtNode(document.querySelector('#feedContainer'));
    var userFeedUrl = "https://api.instagram.com/v1/users/"+id+"/media/recent/?access_token=";
    ReactDOM.render(<Feed accessToken={app.accessToken} src={userFeedUrl} />, document.querySelector('#feedContainer'));
    console.log('loadUserFeed');
  }
};

app.accessToken = ipc.sendSync('getAccessToken');

console.log(app.accessToken);

window.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    app.loadApp();
});
