'use strict';
const fs = require('fs');
const needle = require('needle');
const url = require('url');
const _ = require('lodash');
const ipc = require('ipc');
const app = require('app');
const BrowserWindow = require('browser-window');

var appConfig = fs.readFileSync('./app.config', 'utf8', function(err, data) {
		if (err) {throw err;}
		console.log(err, data);
	});

app.settings = JSON.parse(appConfig);

ipc.on('getAccessToken', function(evt) {
	evt.returnValue = app.settings.accessToken;
	return evt;
});

// report crashes to the Electron project
// require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();
var indexFile = `${__dirname}/index.html`;
if (process.env['NODE_ENV'] == 'dev') {
	indexFile = "http://localhost:9999";
}

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function login() {
	const win = new BrowserWindow({
		width: 600,
		height: 400,
	});
	win.webContents.on('did-get-redirect-request', function(evt, old, newUrl) {
		var parsedUrl = url.parse(newUrl);
		if (parsedUrl.hostname === "instagram.com") {
			return;
		}
	    console.log('did-get-redirect-request', newUrl);
	    win.destroy();

	    var code = newUrl.split('code=')[1];
			console.log('123', _.extend(app.settings, {code: code}));
	    needle.post('https://api.instagram.com/oauth/access_token',
			_.extend(app.settings, {code: code}),
	    function(err, resp) {
	      console.log(err, resp.body['access_token']);

				app.settings.accessToken = resp.body['access_token'];

				console.log('appsettings:', app.settings);
				createMainWindow();
	    })

  });

	win.loadUrl("https://instagram.com/oauth/authorize/?client_id=0fe0a265c5b143e6ba72292b1b04d695&redirect_uri=http://www.jenstitterness.com&response_type=code");


}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 640,
		resizable: false,
		height: 800,
		center: true,
		title: "Pix"
	});

	if (process.env['NODE_ENV'] == 'dev') {
		// we need to wait until browsersync is ready
		setTimeout(function() {
			win.loadUrl(indexFile);
		}, 5000);
	} else {
		win.loadUrl(`file:${indexFile}`);
	}
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	if (!app.loggedIn) {
		login();
	} else {
		mainWindow = createMainWindow();
	}
});
