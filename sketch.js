var background_01,background_02,BG;
var bomb_a,bomb_b,bomb_c,BombGroup;
var Bomb;
var player,P
var enemy,E;
var gameState="PLAY";
var score=0;
var C,c2,c3,c4,c5,c6
var cGroup,c2Group,c3Group,c4Group,c5Group;
var bgSong;
var Pdie;
var Ekill;
var Life=3;
var B1,B2,B3;
function preload(){
background_01 = loadImage("BG.png");
player = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png")
//player.frameDelay=2;
enemy5=loadAnimation("5_enemies_1_run_000.png","5_enemies_1_run_001.png","5_enemies_1_run_002.png","5_enemies_1_run_003.png","5_enemies_1_run_004.png","5_enemies_1_run_005.png","5_enemies_1_run_006.png","5_enemies_1_run_007.png","5_enemies_1_run_008.png","5_enemies_1_run_009.png","5_enemies_1_run_010.png","5_enemies_1_run_011.png","5_enemies_1_run_012.png","5_enemies_1_run_013.png","5_enemies_1_run_014.png","5_enemies_1_run_015.png","5_enemies_1_run_016.png","5_enemies_1_run_017.png","5_enemies_1_run_018.png","5_enemies_1_run_019.png")
enemy5.frameDelay=2;
bomb_a=loadImage("Bomb_A.png");
bomb_b=loadImage("Bomb_B.png");
bomb_c=loadImage("Bomb_C.png");
C = loadImage("Chest_01_UnLocked.png");
c2=loadAnimation("Coin_01.png","Coin_02.png","Coin_03.png","Coin_04.png","Coin_05.png","Coin_06.png");
c3=loadImage("Diamond.png");
c4=loadImage("life.png");
c5=loadImage("Star.png");
bgSong=loadSound("bgsong.mp3");
Pdie=loadImage("Dead__009.png");
Ekill=loadAnimation("5_enemies_1_attack_000.png","5_enemies_1_attack_001.png","5_enemies_1_attack_002.png","5_enemies_1_attack_003.png","5_enemies_1_attack_004.png","5_enemies_1_attack_005.png","5_enemies_1_attack_006.png","5_enemies_1_attack_007.png","5_enemies_1_attack_008.png","5_enemies_1_attack_009.png","5_enemies_1_attack_010.png","5_enemies_1_attack_011.png","5_enemies_1_attack_012.png","5_enemies_1_attack_013.png","5_enemies_1_attack_014.png","5_enemies_1_attack_015.png","5_enemies_1_attack_016.png","5_enemies_1_attack_017.png","5_enemies_1_attack_018.png","5_enemies_1_attack_019.png")


}
function setup() {
  createCanvas(windowWidth,windowHeight);
  Background=createSprite(650,100);
  Background.addImage("background_01",background_01);
  Background.velocityX=-5;
  
 
  bgSong.play(); 
  bgSong.setVolume(0.3)
  
  P = createSprite(250,475);
  
  P.addAnimation("player",player);
  P.addImage("Pdie",Pdie);
 
  P.scale=0.3;
  //P.debug=true
  P.setCollider("circle",0,0,200);
  
  ground=createSprite(windowWidth/2,windowHeight-100,windowWidth,20);
  ground.visible=false;
  E=createSprite(100,490);
  
  E.addAnimation("enemy5",enemy5);
  E.scale=0.5;
  E.debug=true
  E.setCollider("circle",0,0,100);
  bombGroup = new Group();
  cGroup= new Group();
  c2Group= new Group();
  c3Group= new Group();
  c4Group= new Group();
  c5Group= new Group();
  
}

function draw() {
  
  background(255);
  drawSprites();
  
  fill("white")
  textSize(30);
  text("Life "+Life,windowWidth-150,50)
  text("score "+score,windowWidth-150,100)
  if (Background.x < windowWidth-700&&Background.x>0){
    Background.x = Background.width/2 ;
  }
  if(gameState==="PLAY"){
    if(P.isTouching(cGroup)){
      score=score+10
      cGroup.destroyEach();
    }
    if(P.isTouching(c2Group)){
      score=score+2
      c2Group.destroyEach();
    }
    if(P.isTouching(c3Group)){
      score=score+12
      c3Group.destroyEach();
    }
    if(P.isTouching(c5Group)){
      score=score+4;
      c5Group.destroyEach();
    }
    if(P.isTouching(c4Group)){
Life++;
c4Group.destroyEach();

    }
    
    

  
  
 
    if(keyDown("space")&&P.y>=100){

      P.y=P.y-60;

  }
  P.y=P.y+20
  spawnBomb();
  SpawnCollectable();
  
  
  if(P.isTouching(bombGroup)){
    Life--;
    bombGroup.destroyEach();
    if(Life<=0){
      gameState="END"
    }



  
  }
  
}
else{
  text("Press CTRL + R to restart",windowWidth/2,windowHeight/2);
cGroup.destroyEach();
  c2Group.destroyEach();
  c3Group.destroyEach();
  c4Group.destroyEach();
  c5Group.destroyEach();
  
bombGroup.setVelocityYEach(0)
P.changeImage("Pdie",Pdie);
E.x=P.x;
E.changeAnimation("Ekill",Ekill);

  Background.velocityX=0;
  P.velocityY=0;
  





}
  P.collide(ground);
  
  
  
  
}
function spawnBomb(){
  if(frameCount%120===0){
    bomb=createSprite(windowWidth,50);
   var x=Math.round(random(1,3));
   if(x==1){
    bomb.addImage("bomb_a",bomb_a);

   }
   else if(x==2){
    bomb.addImage("bomb_b",bomb_b);
   }
   else if(x==3){
    bomb.addImage("bomb",bomb_c);
   }
   
    bomb.y=Math.round(random(400,600));
    bomb.velocityX=-8;
    bomb.lifetime=800; 
    bomb.scale=0.5;
    bombGroup.add(bomb);
  }
  

}
function RESET(){

text("press CTRL + R to restart")
  



}
function SpawnCollectable(){
  if(frameCount%90===0){
    var collectable=createSprite(windowWidth,50);

   var x=Math.round(random(1,5));
   if(x==1){
    collectable.addImage("C",C);
    collectable.y=Math.round(random(300,500));
    collectable.velocityX=-9;
    collectable.lifetime=800; 
    collectable.scale=0.5;
    cGroup.add(collectable);
   }
   else if(x==2){
    collectable.addAnimation("c2",c2);
    collectable.y=Math.round(random(300,500));
    collectable.velocityX=-9;
    collectable.lifetime=800; 
    collectable.scale=0.5;
    c2Group.add(collectable);
   }
   else if(x==3){
    collectable.addImage("c3",c3);
    collectable.y=Math.round(random(300,500));
    collectable.velocityX=-9;
    collectable.lifetime=800; 
    collectable.scale=0.5;
    c3Group.add(collectable);
   }
   else if(x==4){
    collectable.addImage("c4",c4);
    collectable.y=Math.round(random(300,500));
    collectable.velocityX=-9;
    collectable.lifetime=800; 
    collectable.scale=0.5;
    c4Group.add(collectable);
   }
   else if(x==5){
    collectable.addImage("c5",c5);
    collectable.y=Math.round(random(300,500));
    collectable.velocityX=-9;
    collectable.lifetime=800; 
    collectable.scale=0.5;
    c5Group.add(collectable);
   }
   
    
    
  }




}