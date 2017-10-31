var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
var data = require('./ui/js/data.json')
var user_data;

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


/* Define all the routes here*/
app.use("/css", express.static(__dirname+'/ui/css'));
app.use("/img", express.static(__dirname+'/ui/img'));
app.use("/js", express.static(__dirname+'/ui/js'));

app.get('/', function (req, res) {
    user = 'vishal'
    // res.send(template_homepage(user));
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/trending/:location', function (req, res) {
    res.send(data[req.params.location]);
});

var port = process.env.PORT || 7998;  // Use 8080 for local development because you might already have apache running on 80
app.listen(port, function () {
        // config.password = 
        console.log(`Quora is listening on port ${port}!`);
});


function template_homepage(user){
	user_data = data[user]
	var htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
	<title>Quora</title>

	<!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

	<!-- Custom Javascript helper functions -->
	<script type="text/javascript" src="js/main.js"></script>

	<!--Import Fonts-->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Libre+Baskerville|Noto+Sans" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
 	
  	<!-- Custom stylesheet -->
  	<link rel="stylesheet" type="text/css" href="css/reset.css">
  	<link rel="stylesheet" type="text/css" href="css/style.css">
  	<link rel="stylesheet" type="text/css" href="css/sinusoid.css">

  	<!-- Google Maps -->
  	<script src="js/gmap.js"></script>
  	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzJfhQwg42E6p-8DekZP2_gQx0vdByyN4&callback=myMap"></script>
	
</head>
<body>

<div id="preloader">
	<div class="circle" id="id1"></div>
	<div class="circle" id="id2"></div>
	<div class="circle" id="id3"></div>
	<div class="circle" id="id4"></div>
	<div class="circle" id="id5"></div>
	<div class="circle" id="id6"></div>
	<div class="circle" id="id7"></div>
	<div class="circle" id="id8"></div>
	<div class="circle" id="id9"></div>
	<div class="circle" id="id10"></div>
</div>

<div id="main" class="hide">
	
	<nav id="nav-bar" class="card bg-white text-red">
		<div class="container">
			<h3 class="logo left">Quora</h3>
			<ul class="links left">
				<li class="search-bar left"><input type="search" cols="30" placeholder="Ask or Search Quora"></li>
				<li class="left ask"><a class="left bg-red text-white ask" href="" >Ask Question</a></li>
				<li class="left active hover"><a href="#"><i class="material-icons left text-red">receipt</i>Home</a></li>
				<li class="left hover"><a href="#"><i class="material-icons left text-grey">create</i>Answer</a></li>
				<li class="left hover"><a href="#"><i class="material-icons left text-grey">notifications</i>Notifications</a><span class="badge bg-red text-white">4</span></li>
				<li class="left hover"><a href="#googleMap" onclick="initMap()"><i class="material-icons left text-grey">location_on</i>Location</a></li>
				<li class="left hover"><a href="#" onclick="setCookie('loggedin',''); checkLogin()"><i class="material-icons left text-grey">exit_to_app</i>Log Out</a></li>
				<li class="left"><a href=""><img src="`+user_data['user-pic']+`" class="user-pic"></a></li>
				<hr class="clear hide">
			</ul>
			<hr class="clear hide">
		</div>
	</nav>

	<a name="googleMaps_higher"></a>
	<section class="content_space">
	<!-- <div id="googleMap" style="position: absolute; width:100%;height:400px; visibility: hidden; z-index: 5;"> </div> -->
	<a name="googleMaps"><div id="googleMap" style="width:100%;height:400px; position: fixed; display: none; z-index: 0;"></div></a>


	<div class="container aside-panel left bg-white text-black card">
		<h3 class="feeds-heading font-medium bold text-red left">Feeds</h3> 
		<a href="" class="right" style="position:relative;top:6px;">Edit</a>
		<hr class="clear">
		<div class="text-red font-medium" style="margin-top:10%;font-weight:900">Top Stories</div>
		<div class="text-grey font-medium" style="margin-top:10%">Bookmarks</div>
		
		<div class="text-black" style="margin-top:15%">Your Topics</div>

		<ul class="fa-ul">
		`;

	for (var i = 0; i < user_data["topics"].length; i++) {
		var colors = ["black", "orange", "blue", "green", "yellow", "grey"];
		htmlTemplate = htmlTemplate + `<li class="text-black"><i class="fa-li fa fa-circle text-`+colors[i]+`"></i>`+user_data["topics"][i]+`</li>`;
	}

	htmlTemplate = htmlTemplate + `
		</ul>

	</div>

	<div class="container aside-panel right bg-white text-black card">
		<h3 class="feeds-heading font-medium bold text-red left">Improve your Feed</h3> 
			<hr class="clear">
			<ul class="fa-ul">
				<li class="text-black">Coldplay <div class="upvote button right text-white bg-red"><a href="" >Follow</a></div></li>
				<li class="text-black">Michael Jackson <div class="upvote button right text-white bg-red"><a href="" >Follow</a></div></li>
				<li class="text-black">Elon Musk <div class="upvote button right text-white bg-red"><a href="" >Follow</a></div></li>
			</ul>			  
			 
			<div class="text-grey font-medium" style="margin-top:15%">Saved Questions</div>
			<div class="text-grey font-medium" style="margin-top:10%">Recommended Topics</div>

			<ul class="fa-ul">
			`;
		for (var i = 0; i < user_data["topics"].length; i++) {
			htmlTemplate = htmlTemplate + `<li class="text-black"><i class="fa-li fa fa-circle text-black"></i>`+user_data["topics"][i]+`</li>`;
		}

	htmlTemplate = htmlTemplate + `

			</ul>
	</div>

	<div class="container centre-panel left bg-white text-black card">
		<h3 class="panel-heading font-medium bold text-red"><span id="mapheading">Top Stories For You</span></h3>
		<hr>
`;

	for(var i=0; i<user_data['answers'].length;i++){
		htmlTemplate = htmlTemplate + 	
	`
		<div class="post">
			<div class="post-title">`+user_data['answers'][i]['title']+`</div>
			<div class="post-pic left fullheight"><img src="`+user_data['user-pic']+`" class="author-pic"></div>
			<div class="post-content left">
				<div class="author-details"><span class="bold">`+user_data['user-name']+`</span>, <span class="author-description">`+user_data['user-desc']+`</span>.</div>
				<div class="answer">
					`+user_data['answers'][i]['text']+`
				</div>
				<div class="date text-grey">Updated `+user_data['answers'][i]['date']+` &sdot; `+user_data['answers'][i]['num_views']+` Views</div>
				<div class="row">
					<div class="upvote button left text-white bg-red">
						<a href="" >Upvote | `+user_data['answers'][i]['num_upvotes']+`</a>
					</div>
					<div class="comments button left text-grey bg-white">
						<a href="" >Comments (`+user_data['answers'][i]['num_comments']+`+)</a>
					</div>
					<div class="downvote button left text-grey bg-white">
						<a href="" >Downvote</a>
					</div>
					<div class="social-share left listgroup text-grey">
						<div class="icon-wrapper"><i class="fa fa-facebook custom-icon"><span class="fix-editor">&nbsp;</span></i></div>
						<div class="icon-wrapper"><i class="fa fa-twitter custom-icon"><span class="fix-editor">&nbsp;</span></i></div>
						<div class="icon-wrapper"><i class="fa fa-share custom-icon"><span class="fix-editor">&nbsp;</span></i></div>
					</div>
					<hr class="clear hide">
				</div>
			</div>
			<hr class="clear hide">
		</div>
		`;
	}

htmlTemplate = htmlTemplate + `
		</div>
	</div>
</div>

<script type="text/javascript">
	document.body.style.zoom="80%";

    <!-- Check if user is logged in -->
	checkLogin();

</script>

</body>
</html>
	`

	return htmlTemplate;
}