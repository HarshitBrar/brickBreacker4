var ground;
var ball,paddle;
var brick,brick1,brick2;
var edges;
var brickGroup;
function setup() {
  createCanvas(800,500);

  paddle = createSprite(400,440,60,10);
  ball = createSprite(400,300,10,10);
  ball.velocityY = 3;
  ball.velocityX = 1;
  
  edges = createEdgeSprites();
  brickGroup = new Group();
  for(var i = 50;i < 800;i = i + 50){
    for(var j = 50;j < 200;j = j + 30){
      brick = createSprite(i,j,40,10);
      brickGroup.add(brick);
    
    }
  }

  
}

function draw() {
  background(0); 
  spawnBrick();
 
 // if(keyDown(LEFT_ARROW)){
  //  paddle.x = paddle.x - 4
  //}
 // if(keyDown(RIGHT_ARROW)){
 //   paddle.x = paddle.x + 4
 // }
 ball.bounceOff(paddle);
 ball.bounceOff(edges);
for(var i = 0;i < brickGroup.length;i = i + 1){
  if(ball.isTouching(brickGroup.get(i))){
    brickGroup.get(i).destroy();
    ball.velocityX = Math.round(random(-3,3))
    ball.velocityY = Math.round(random(4,1))
  }
}
if(ball.isTouching(paddle)){
  ball.velocityY = Math.round(random(1,4))
  ball.velocityX = Math.round(random(-3,3))
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