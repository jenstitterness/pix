import React from 'react';
import https from 'https';
import $ from 'jquery';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';

const ImgCard = React.createClass({

    childContextTypes: {
      muiTheme: React.PropTypes.object,
    },

    getInitialState () {
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

  clickUserLink: function() {
        console.log('user link clicked', this.props);
        window.app.loadUserFeed(this.props.img.user.id);
  },
  render: function() {
    let cardStyle = {
      margin: "20px",
      maxWidth: "640px"
    };

    let headerStyle = {
      float: 'left',
      fontSize: '24px',
      margin: '10px',
      verticalAlign: 'middle'
    };
    let headerTextStyle = {
      float: 'left',
      fontSize: '24px',
      margin: '15px',
    };

    let titleBar = {
      float: 'left',
      width: '100%',
      fontSize: '12px'
    };

    let titleBarIcons = {
      float: 'left',
      margin: '12px'
    };


var self = this;
    return (
      <div>

      <Card style={cardStyle}>
        <CardHeader  onClick={this.clickUserLink} title={this.props.img.user.username}
        avatar={<Avatar src={this.props.img.user.profile_picture}></Avatar>}/>

        <CardMedia>
          <img src={this.props.img.images.standard_resolution.url}/>
        </CardMedia>


        <CardTitle style={titleBar}>
          <div style={titleBarIcons}>
            {(this.props.img.user_has_liked
                ? <FontIcon className="material-icons" color={Colors.red500}>&#xE87D;</FontIcon>
                : <FontIcon className="material-icons" color={Colors.red500}>&#xE87E;</FontIcon>
            )}
            <div>{this.props.img.likes.count} likes</div>
          </div>
          <div style={titleBarIcons}>
            <FontIcon className="material-icons" color={Colors.blue500}>&#xE0B9;</FontIcon>
            <div>{this.props.img.comments.count} comments</div>
          </div>
        </CardTitle>

        <CardText>
          {this.props.img.caption && this.props.img.caption.text}
        </CardText>
      </Card>
      </div>
    );
  }
});

module.exports = ImgCard;
