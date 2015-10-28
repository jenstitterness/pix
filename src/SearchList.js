import https from 'https';
import React from 'react';
import ReactDOM from 'react-dom';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import CircularProgress from 'material-ui/lib/circular-progress';


const SearchList = React.createClass({

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

  searchThis: function(item) {
    console.log("search this", item.currentTarget.firstChild.lastChild.firstChild.outerText);
    const tag = item.currentTarget.firstChild.lastChild.firstChild.outerText;
    app.loadTagFeed(tag);
  },

  render() {
    console.log('feed state:', this.state);
    let containerStyle = {
      textAlign: 'center',
      paddingTop: '50px',
      background: '#ddd',
      height: '100%'
    };

    let standardActions = [
      { text: 'Okay' },
    ];

    let displayList = {
      display: this.state.res.data ? '' : 'none'
    }

    let loading;
    if (!this.state.res.data) {
      loading = <CircularProgress id="circularProgress" mode="indeterminate" />;
    }

    let self = this;

    return (
      <div style={containerStyle}>
      {loading}

        <div style={displayList}>
          <List subheader="tags:">
          {
            this.state.res.data && this.state.res.data.map(function(item, i) {
              return (
                <div key={i}>
                  <ListItem primaryText={item.name} secondaryText={item.media_count} onClick={self.searchThis}/>
                </div>
              )
            })
          }
          </List>
        </div>
      </div>);
  },
  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  },

});

module.exports = SearchList;
