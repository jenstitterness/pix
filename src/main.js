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

import ImgCard from './ImgCard';

var accessToken = ipc.sendSync('getAccessToken');

console.log(accessToken);

var req = https.get('https://api.instagram.com/v1/media/popular?access_token='+accessToken, function(res) {
  console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    res.setEncoding('utf8');
    var popularJsonRes = '';
    res.on('data', function(d) {
      popularJsonRes += d;
    }).on('end', function() {
      popularJsonRes = JSON.parse(popularJsonRes);
      console.log(popularJsonRes);
      loadPopular(popularJsonRes);
    });
});

req.end();

function loadPopular(imgs) {
  ReactDOM.render(<Main imgs={imgs.data}/>, document.querySelector('#feedContainer'));
    console.log(imgs.data);
};

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState () {
    console.log(this.props);
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
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
      paddingTop: '10px',
      background: '#ddd'
    };

    let standardActions = [
      { text: 'Okay' },
    ];

    return (
      <div style={containerStyle}>
      {
        this.props.imgs.map(function(img) {
          return (
            <div>
              <ImgCard img={img} />
            </div>
          )
        })
      }
      </div>);
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  },

});

module.exports = Main;
