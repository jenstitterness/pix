import _ from 'lodash';
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import DropDownIcon from 'material-ui/lib/drop-down-icon';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import RaisedButton from 'material-ui/lib/raised-button';

const Header = React.createClass({
  getStyles: function() {
      let styles = {
        button: {
          margin: '10px',
          display: 'inline'
        },
        pullRight: {
          float: "right"
        }
      };

      return styles;
  },

  render: function() {
    var headerStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100
    };

    const styles = this.getStyles();
    const rightButton = _.extend({}, styles.button, styles.pullRight);
    console.log(this);
    return (
      <div style={headerStyle}>
        <button label="Popular" onClick={this.props.popular}>Popular</button>
        <button label="Profile" onClick={this.props.profile}>Profile</button>
        <RaisedButton label="Popular" primary={false} onClick={this.props.popular} />
        <RaisedButton label="Profile" primary={false} onClick={this.props.profile} />
      </div>
    );
  }
});

module.exports = Header;
