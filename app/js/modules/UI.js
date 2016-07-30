var TWEEN;
var Player = require("./Player.js")
var Fires = require("./Fires.js")
var WIDTH = window.SCREEN_WIDTH;
var HEIGHT = window.SCREEN_HEIGHT;
var FLOORY = 620;
var BARY = 475;

var STYLE_S = {
	    font : 'bold italic 40px Arial'
	};

var STYLE = {
	font : 'bold italic 80px Arial'
}

var STYLE_X = {
	font : 'bold italic 40px Arial'
}

function UI(stage){
	this.stage = stage;

	// this.addBG();
	// this.addScore();	
	// this.addTime();


	this.score = "00";
	this.time = 15;
}

PIXI.SCALE_MODES = "LINEAR";


UI.prototype.addClouds = function(){
	this.clouds = new PIXI.Container();
	var cloud1 = new PIXI.Sprite.fromFrame("cloud");
	cloud1.position.x = 30;
	cloud1.position.y = 50;
	this.clouds.addChild(cloud1);

	var cloud2 = new PIXI.Sprite.fromFrame("cloud");
	cloud2.position.x = 400;
	cloud2.position.y = 230;
	this.clouds.addChild(cloud2);


	var cloud3 = new PIXI.Sprite.fromFrame("cloud");
	cloud3.position.x = 760;
	cloud3.position.y = 60;
	this.clouds.addChild(cloud3);

	this.clouds.position.x = 0;

	this.stage.addChild(this.clouds);

}

UI.prototype.updateClouds = function(){
	var tween = new TWEEN.Tween(this.clouds.position);
	tween.to({x:-400},20000);
	tween.repeat(Infinity);
	tween.yoyo(true);
	tween.start();
}




UI.prototype.addBG = function(){
	this.bg = new PIXI.Sprite.fromImage("img/gamebg.jpg");
	this.stage.addChild(this.bg);
}
/**
 * [addPlayer description]
 * @Author   yursile
 * @DateTime 2016-07-19T19:03:39+0800
 * @param    {role}                 role 1:main 2: second
 */
UI.prototype.addPlayer = function(role){
	this.player = new Player(role,this.fires);
	this.stage.addChild(this.player);
}

UI.prototype.addFire = function(){
	this.fires = new Fires();
	this.stage.addChild(this.fires);
}




UI.prototype.addScore = function(){

	


	this.scoreText = new PIXI.Text("00",STYLE);
	this.scoreText.x = 520;
	this.scoreText.y = 10;
	this.stage.addChild(this.scoreText);



	var score_x = new PIXI.Text("x",STYLE_S);
	score_x.x = 490;
	score_x.y = 30;
	this.stage.addChild(score_x);


	var score_s = new PIXI.Sprite.fromFrame("saucer");
	// score_s.scale = 0.367;
	score_s.scale.x = 0.367;
	score_s.scale.y = 0.367;
	score_s.x = 405;
	score_s.y = 40;
	this.stage.addChild(score_s);



	
}

UI.prototype.addTime = function(){

	var time_s = new PIXI.Text('s',STYLE_S);
	time_s.x = 100;
	time_s.y = 40;
	this.stage.addChild(time_s);
	var _this = this;



	this.TimeText = new PIXI.Text(this.time,STYLE);
	this.TimeText.x = 5;
	this.TimeText.y = 10;
	this.stage.addChild(this.TimeText);

}

UI.prototype.updateTime = function(){
	var _this = this;
	this.timer = setInterval(function(){
		
		_this.TimeText.text = (--_this.time)>9?_this.time:("0"+_this.time);
		if(_this.time == 0) {
			clearInterval(_this.timer);
			_this.timer = null;
			_this.over();

		}
	},1000)
}


UI.prototype.setScore = function(score){
	if(score<10){
		this.scoreText.text = "0"+score;
	}else{
		this.scoreText.text  = score;
	}
	this.score = score;
	
}

UI.prototype.getTime = function(){
	return this.time;
}

UI.prototype.getScore = function(){
	return this.score;
}


UI.prototype.over = function(){
	this.state = "over";
}

UI.prototype.update = function(tween){
	this.state = "update";
	TWEEN = tween;
	this.updateTime();
	this.updateClouds();
}

UI.prototype.again = function(){
	this.TimeText.text = this.time = "0.00";
	this.scoreText = this.score = "000";
}





module.exports = UI;