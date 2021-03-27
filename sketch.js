var ground;
var ball,paddle;
var brick,brick1,brick2;
var edges;
var brickGroup;
var backGroundImg,ballImg,paddleImg,endImage;
var gameState;
var PLAY = 1;
var START = 0;
var END = 2;
var life = 3;
var end,endImg;
var sound1;
function preload(){
  backGroundImg = loadImage("backGroundImg.jpg");
  ballImg = loadImage("ball.png");
  paddleImg = loadImage("paddle.png");
  sound1 = loadSound("pop1.mp3");
  endImage = loadImage("END.jpg");
}
function setup() {
  createCanvas(800,500);
  gameState = START;

  paddle = createSprite(400,440,60,10);
  paddle.addImage(paddleImg);
  paddle.scale = 0.3
  paddle.setCollider("rectangle",0,0,170,20);
  ball = createSprite(400,300,10,10);
  ball.addImage(ballImg);
  ball.scale = 0.05
  end = createSprite(400,250,20,20);
  end.addImage(endImage);
  end.visible = false;
  
  edges = createEdgeSprites();
  brickGroup = new Group();
  for(var i = 50;i < 800;i = i + 50){
    for(var j = 50;j < 200;j = j + 30){
      brick = createSprite(i,j,40,10);
      brick.shapeColor = color(random(0,255),random(0,0),random(0,0));
      brickGroup.add(brick);
    
    }
  }

  ball.debug = true;
  paddle.debug = true;
  
}

function draw() {
  background(backGroundImg); 
  spawnBrick();
 
  if(keyDown("space")&& gameState === START){
    gameState = PLAY;
    ball.velocityY = 3;
    ball.velocityX = 0;
  }
 // if(keyDown(LEFT_ARROW)){
  //  paddle.x = paddle.x - 4
  //}
 // if(keyDown(RIGHT_ARROW)){
 //   paddle.x = paddle.x + 4
 // }
 ball.bounceOff(paddle);
 ball.bounceOff(edges[0]);
 ball.bounceOff(edges[1]);
 ball.bounceOff(edges[2]);
for(var i = 0;i < brickGroup.length;i = i + 1){
  if(ball.isTouching(brickGroup.get(i))){
    brickGroup.get(i).destroy();
    ball.velocityX = Math.round(random(-3,3))
    ball.velocityY = Math.round(random(4,1))
    sound1.play();
  }
}
if(ball.isTouching(paddle)){
  ball.velocityY = Math.round(random(1,4))
  ball.velocityX = Math.round(random(-3,3))
}
  if(ball.y > 500 && gameState === PLAY){
    ball.x = 400;
    ball.y = 300;
    ball.velocityX = 0;
    ball.velocityY = 0;
    paddle.x = 400; 
    life = life - 1;
    gameState = START;
  }
  if(life === 0){
    gameState = END;
  }
  if(gameState === END){
    brickGroup.destroyEach();
    paddle.destroy();
    ball.destroy();
    end.visible = true;
  }
  drawSprites();
}
function spawnBrick(){
 
}
function keyPressed(){
  if(keyCode === LEFT_ARROW){
    paddle.x = paddle.x - 10
  }
  if(keyCode === RIGHT_ARROW){
    paddle.x = paddle.x + 10
  }
}