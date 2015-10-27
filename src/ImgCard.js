import React from 'react';
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
var self = this;

    let element;

    if (this.props.img.type === 'video') {
      element = <video controls src={this.props.img.videos.standard_resolution.url} />;
    } else if (this.props.img.type === "image") {
      element = <img src={this.props.img.images.standard_resolution.url} />;
    }

    return (
      <div>

      <Card style={cardStyle}>
        <CardHeader  onClick={this.clickUserLink} title={this.props.img.user.username}
        avatar={<Avatar src={this.props.img.user.profile_picture}></Avatar>}/>

        <CardMedia>
          {element}
        </CardMedia>

        <CardText>
          {this.props.img.caption && this.props.img.caption.text}
        </CardText>
        <CardText expandable={true} initiallyExpanded={true}>
          {this.props.img.link}
        </CardText>
      </Card>
      </div>
    );
  }
});

module.exports = ImgCard;
