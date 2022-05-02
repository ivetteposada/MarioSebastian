var mario;
var PLAY=1,END=0, gameState=PLAY;
var score=0;
var fc=0;



function preload(){
  marioImage=loadAnimation("mario1.png","mario2.png")
  mariosImg=loadAnimation("mario5.png")
  groundImage=loadImage("suelo2.png")
  gameOverImage=loadImage("gameover.png")
  restartImg=loadImage("restart.png")
  goombaImg=loadImage("goomba.png")
  treeImg=loadImage("tree.png")
  tunelgreImg=loadImage("tunelgre.png")
  tunelorgImg=loadImage("tunelorg.png")
  turtleImg=loadImage("turtle.png")
  cloudImg=loadImage("cloud.png")
  gameOverSound=loadSound("gameOver.mp3")
  jumpSound=loadSound("jump.mp3")
  supermariobrosSound=loadSound("super-mario-bros.mp3")

  
}

function setup(){
  createCanvas(600,300);

  mario=createSprite (50,225,20,50)
mario.addAnimation("marioImage",marioImage)
mario.addAnimation("mariosImg",mariosImg)
mario.scale=1.5;

ground=createSprite(0,280,600,20);
ground.addImage(groundImage);
ground.velocityX=-5

suelo=createSprite(0,260,400,10);
suelo.visible=false;

gameOver=createSprite(300,200);
gameOver.addImage(gameOverImage)
gameOver.visible=false;
gameOver.scale=0.5;

restart=createSprite(300,50);
restart.addImage(restartImg);
restart.visible=false;
restart.scale=0.28;
nube2=createSprite(150,50);
nube2.addImage(cloudImg);
nube2.velocityX=-6;
nube2.lifetime=300
nube3=createSprite(300,70);
nube3.addImage(cloudImg);
nube3.velocityX=-6;
nube3.lifetime=300
nube4=createSprite(450,60);
nube4.addImage(cloudImg);
nube4.velocityX=-6;
nube4.lifetime=300
nube5=createSprite(600,50);
nube5.addImage(cloudImg);
nube5.velocityX=-6;
nube5.lifetime=300

obstaculogrupo=new Group();

nubegrupo=new Group();

supermariobrosSound.loop()
}
  
function draw (){
 background("blue");


 fill("white");
 text("score "+score,520,30)
 

 if(gameState===PLAY){
ground.velocityX=-4;
ground.visible=true;

score=score+Math.round(frameCount/150)

  if(ground.x<250){
    ground.x=300;
  }   
  

  if(keyDown("space")&&mario.y>=190){
    mario.velocityY=-18;
    mario.changeAnimation("mariosImg",mariosImg)
   
  }

  if(mario.isTouching(suelo)&&keyDown("space")){
    jumpSound.play()
  }

  mario.velocityY=mario.velocityY+1.3;

  if(mario.isTouching(suelo)){
 mario.changeAnimation("marioImage",marioImage)

  }

  obstaculos();
nubes();

if(obstaculogrupo.isTouching(mario)){
  gameState=END;
  gameOverSound.play();
  supermariobrosSound.stop();
}
}else if(gameState===END){
  ground.velocityX=0;
  mario.velocityY=0;
  ground.visible=false;
  obstaculogrupo.setLifetimeEach(-1);
  obstaculogrupo.setVelocityXEach(0);
  obstaculogrupo.destroyEach();
  nubegrupo.setLifetimeEach(-1);
  nubegrupo.setVelocityXEach(0);
  nubegrupo.destroyEach();
  mario.visible=false;
  background("black")
  gameOver.visible=true;
  restart.visible=true;

}

  
   if(mousePressedOver(restart)&&restart.visible===true){
     reset()
   }
  

mario.collide(suelo);
mario.setCollider("rectangle",0,0,25,45);
mario.debug=false;

drawSprites()


}
function obstaculos(){
  if(frameCount%60===0)
  {
    obstaculo=createSprite(600,228,10,40);
    obstaculo.velocityX=-6;
    
    var rand=Math.round(random(1,5));
    switch(rand){
      case 1: obstaculo.addImage(goombaImg);
      obstaculo.scale=0.7;
      break;
      case 2: obstaculo.addImage(treeImg);
      break;
      case 3: obstaculo.addImage(tunelgreImg);
      obstaculo.scale=1.3;
      break;
      case 4: obstaculo.addImage(tunelorgImg);
      obstaculo.scale=1.3;
      break;
      case 5: obstaculo.addImage(turtleImg);
      obstaculo.scale=0.7;
      break;
      default:break;

      
    

  }

  obstaculo.lifetime=300;
  obstaculogrupo.add(obstaculo);


}
} 
function nubes() {
  if(frameCount%60===0){
    nube=createSprite(600,100,40,10);

    nube.addImage(cloudImg);
    nube.y=Math.round(random(10,100));
    nube.velocityX=-4;
    nube.lifetime=300;
    nube.depth=mario.depth;
    mario.depth=mario.depth+1;

    nubegrupo.add(nube);

  }
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  obstaculogrupo.destroyEach();
  mario.visible=true;

  gameOverSound.stop();
  supermariobrosSound.play();
  frameCount=fc;
  score=0
  nube2=createSprite(150,50);
nube2.addImage(cloudImg);
nube2.velocityX=-6;
nube2.lifetime=300
nube3=createSprite(300,70);
nube3.addImage(cloudImg);
nube3.velocityX=-6;
nube3.lifetime=300
nube4=createSprite(450,60);
nube4.addImage(cloudImg);
nube4.velocityX=-6;
nube4.lifetime=300
nube5=createSprite(600,50);
nube5.addImage(cloudImg);
nube5.velocityX=-6;
nube5.lifetime=300
  
}
