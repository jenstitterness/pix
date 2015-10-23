import _ from 'lodash';
import ipc from 'ipc';
import https from 'https';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/lib/dialog';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

import Header from './Header';
import ImgCard from './ImgCard';


var accessToken = ipc.sendSync('getAccessToken');

console.log(accessToken);




window.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');


    loadApp();
});

function loadApp() {
  loadPopular();
  // loadProfileFeed();



  ReactDOM.render(<Header profile={loadProfileFeed} popular={loadPopular} />, document.getElementById('header'));
};

function loadPopular(imgs) {
  ReactDOM.unmountComponentAtNode(document.querySelector('#feedContainer'));
  ReactDOM.render(<Feed accessToken={accessToken} src="https://api.instagram.com/v1/media/popular?access_token=" />, document.querySelector('#feedContainer'));
};

function loadProfileFeed() {
  console.log("accessToken", accessToken);
  ReactDOM.unmountComponentAtNode(document.querySelector('#feedContainer'));
  ReactDOM.render(<Feed accessToken={accessToken} src="https://api.instagram.com/v1/users/self/feed?access_token=" />, document.querySelector('#feedContainer'));
  console.log('loadProfileFeed');

}

const Feed = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState () {
    return {
      res: {},
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    var self = this;
    var req = https.get(this.props.src + this.props.accessToken, function(res) {
        res.setEncoding('utf8');
        var popularJsonRes = '';
        res.on('data', function(d) {
          popularJsonRes += d;
        }).on('end', function() {
          if (self.isMounted()) {
            self.setState({
              res: JSON.parse(popularJsonRes)
            });
          }
        }.bind(this));
    });
    req.end();
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    let containerStyle = {
      textAlign: 'center',
      paddingTop: '40px',
      background: '#ddd'
    };

    let standardActions = [
      { text: 'Okay' },
    ];
    return (
      <div style={containerStyle}>
      {
        this.state.res.data && this.state.res.data.map(function(img, i) {
          return (
            <div>
              <ImgCard img={img} />
            </div>
          )
        })
      }

      </div>);
  },

/*
{
  this.state.res.data.map(function(img) {
    return (
      <div>
      </div>
    )
  })
}
*/

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  },

});

module.exports = Feed;
