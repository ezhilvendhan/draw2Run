/*******************************************************
The predix-webapp-starter Express web application includes these features:
  * routes to mock data files to demonstrate the UI
  * passport-predix-oauth for authentication, and a sample secure route
  * a proxy module for calling Predix services such as asset and time series
*******************************************************/
var http = require('http'); // needed to integrate with ws package for mock web socket server.
var express = require('express');
var jsonServer = require('json-server'); // used for mock api responses
var path = require('path');
var cookieParser = require('cookie-parser'); // used for session cookie
var bodyParser = require('body-parser');
var passport;  // only used if you have configured properties for UAA
var session = require('express-session');
var proxy = require('./routes/proxy'); // used when requesting data from real services.
// get config settings from local file or VCAPS env var in the cloud
var config = require('./predix-config');
// configure passport for authentication with UAA
var passportConfig = require('./passport-config');
// getting user information from UAA
var userInfo = require('./routes/user-info');
var app = express();
var httpServer = http.createServer(app);
var ejs  = require('ejs');
var fs   = require('fs');




/**********************************************************************
       SETTING UP EXRESS SERVER
***********************************************************************/
app.set('trust proxy', 1);
app.set('view engine', 'ejs');

// if running locally, we need to set up the proxy from local config file:
var node_env = process.env.node_env || 'development';
console.log('************ Environment: '+node_env+'******************');

if (node_env === 'development') {
  var devConfig = require('./localConfig.json')[node_env];
	proxy.setServiceConfig(config.buildVcapObjectFromLocalConfig(devConfig));
	proxy.setUaaConfig(devConfig);
} else {
  app.use(require('compression')()) // gzip compression
}

// Session Storage Configuration:
// *** Use this in-memory session store for development only. Use redis for prod. **
var sessionOptions = {
  secret: 'predixsample',
  name: 'cookie_name', // give a custom name for your cookie here
  maxAge: 30 * 60 * 1000,  // expire token after 30 min.
  proxy: true,
  resave: true,
  saveUninitialized: true
  // cookie: {secure: true} // secure cookie is preferred, but not possible in some clouds.
};
var redisCreds = config.getRedisCredentials();
if (redisCreds) {
  console.log('Using Redis for session store.');
  var RedisStore = require('connect-redis')(session);
  sessionOptions.store = new RedisStore({
    host: redisCreds.host,
    port: redisCreds.port,
    pass: redisCreds.password,
    ttl: 1800 // seconds = 30 min
  });
}
app.use(cookieParser('predixsample'));
app.use(session(sessionOptions));

console.log('UAA is configured?', config.isUaaConfigured());
if (config.isUaaConfigured()) {
	passport = passportConfig.configurePassportStrategy(config);
  app.use(passport.initialize());
  // Also use passport.session() middleware, to support persistent login sessions (recommended).
  app.use(passport.session());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/****************************************************************************
	SET UP EXPRESS ROUTES
*****************************************************************************/


if (!config.isUaaConfigured()) {
  // no restrictions
  app.use(express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../public')));

  // mock UAA routes
  app.get(['/login', '/logout'], function(req, res) {
    res.redirect('/');
  })
  app.get('/userinfo', function(req, res) {
      res.send({user_name: 'Sample User'});
  });
  app.post('/layout', function (req, res) {


  var config = req.body;

  if(Object.keys(req.body).length === 0) {
    return res.send(null);
  }


  var data={
     element1:'',
     import1:'',
     element2:'',
     import2:'',
     element3:'',
     import3:'',
     element4:'',
     import4:'',
     element5:'',
     import5:'',
     element6:'',
     import6:''

  }
  config.components.forEach(function(entry,i) {
    //console.log(entry);
    let ele;
    let imp;
    ele='element'+(i+1);
    imp='import'+(i+1);

    if(entry == "square"){

      data[ele]='<new-production-region-view id=\"square'+i+'\" elementid=\"square'+i+'\"></new-production-region-view>';
      data[imp]='<link rel=\"import\" href=\"../../new-production-region-view/new-production-region-view.html\">';
    }
    if(entry == "vbar"){

      data[ele]='<bar-chart-view id=\"bar'+i+'\" elementid=\"bar'+i+'\"></bar-chart-view>';
      data[imp]='<link rel=\"import\" href=\"../../bar-chart-view/bar-chart-view.html\">';
    }
    if(entry == "hbar"){

      data[ele]='<hbar-chart-view id=\"bar'+i+'\" elementid=\"bar'+i+'\"></hbar-chart-view>';
      data[imp]='<link rel=\"import\" href=\"../../hbar-chart-view/hbar-chart-view.html\">';
    }
    if(entry == "line"){
      data[ele]='<line-chart-view id=\"line'+i+'\" elementid=\"line'+i+'\"></line-chart-view>';
      data[imp]='<link rel=\"import\" href=\"../../line-chart-view/line-chart-view.html\">';
    }
    if(entry == "donut"){
      data[ele]='<donut-chart-view id=\"donut'+i+'\" elementid=\"donut'+i+'\"></donut-chart-view>';
      data[imp]='<link rel=\"import\" href=\"../../donut-chart-view/donut-chart-view.html\">';
    }

    if(entry == "pie"){
      data[ele]='<pie-chart-view id=\"pie'+i+'\" elementid=\"pie'+i+'\"></pie-chart-view>';
      data[imp]='<link rel=\"import\" href=\"../../pie-chart-view/pie-chart-view.html\">';
    }

    if(entry == "bubble"){
      data[ele]='<production-region-view id=\"bubble'+i+'\" elementid=\"bubble'+i+'\"></production-region-view>';
      data[imp]='<link rel=\"import\" href=\"../production-region-view/production-region-view.html\">';
    }

});


    var render='dashboard5layout.ejs';
    if(config.layout == "6") {
      render='dashboard6layout.ejs';
    }
    else if(config.layout == "4") {
      render='dashboard4layout.ejs';
    }
    var template = fs.readFileSync('./views/'+render, 'utf-8');
    var html     = ejs.render ( template , data );
    fs.writeFileSync("./html.html", html, 'utf8');
    res.render(render, data);

// var template = fs.readFileSync('./views/index.ejs', 'utf-8');
// var html     = ejs.render ( template , data );
//
//
//
// fs.writeFileSync("./html.html", html, 'utf8');
//
//
//
//   res.render('index', data);

});
} else {
  //login route redirect to predix uaa login page
  app.get('/login',passport.authenticate('predix', {'scope': ''}), function(req, res) {
    // The request will be redirected to Predix for authentication, so this
    // function will not be called.
  });

  // route to fetch user info from UAA for use in the browser
  app.get('/userinfo', userInfo(config.uaaURL), function(req, res) {
    res.send(req.user.details);
  });

  // access real Predix services using this route.
  // the proxy will add UAA token and Predix Zone ID.
  app.use(['/predix-api', '/api'],
  	passport.authenticate('main', {
  		noredirect: true
  	}),
  	proxy.router);

  //callback route redirects to secure route after login
  app.get('/callback', passport.authenticate('predix', {
  	failureRedirect: '/'
  }), function(req, res) {
  	console.log('Redirecting to secure route...');
  	res.redirect('/');
    });

  //Use this route to make the entire app secure.  This forces login for any path in the entire app.
  app.use('/', passport.authenticate('main', {
    noredirect: false //Don't redirect a user to the authentication page, just show an error
  }),
    express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../public'))
  );

  //Or you can follow this pattern to create secure routes,
  // if only some portions of the app are secure.
  app.get('/secure', passport.authenticate('main', {
    noredirect: true //Don't redirect a user to the authentication page, just show an error
    }), function(req, res) {
    console.log('Accessing the secure route');
    // modify this to send a secure.html file if desired.
    res.send('<h2>This is a sample secure route.</h2>');
  });

}

/*******************************************************
SET UP MOCK API ROUTES
*******************************************************/
// NOTE: these routes are added after the real API routes.
//  So, if you have configured asset, the real asset API will be used, not the mock API.
// Import route modules

// This will expose JSON files in sample-data directory. If there is a file name 'abc.json'
// data can be access at eg :  http://localhost:5000/api/abc
var mockDataRoutes = require('./routes/mock-data.js');
app.use('/api/:path',mockDataRoutes.getStaticData);

var mockAssetRoutes = require('./routes/mock-asset.js')();
// add mock API routes.  (Remove these before deploying to production.)
app.use(['/mock-api/predix-asset', '/api/predix-asset'], jsonServer.router(mockAssetRoutes));

//logout route
app.get('/logout', function(req, res) {
	req.session.destroy();
	req.logout();
  passportConfig.reset(); //reset auth tokens
  res.redirect(config.uaaURL + '/logout?redirect=' + config.appURL);
});

app.get('/favicon.ico', function (req, res) {
	res.send('favicon.ico');
});

app.get('/config', function(req, res) {
  let title = "OG Intellistream";
  res.send({wsUrl: config.websocketServerURL, appHeader: title});
});

// Sample route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
//currently not being used as we are using passport-oauth2-middleware to check if
//token has expired
/*
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
*/

////// error handlers //////
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler - prints stacktrace
if (node_env === 'development') {
	app.use(function(err, req, res, next) {
		if (!res.headersSent) {
			res.status(err.status || 500);
			res.send({
				message: err.message,
				error: err
			});
		}
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	if (!res.headersSent) {
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: {}
		});
	}
});

httpServer.listen(process.env.VCAP_APP_PORT || 5000, function () {
	console.log ('Server started on port: ' + httpServer.address().port);
});

module.exports = app;
