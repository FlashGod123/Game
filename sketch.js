var player, player2, orb, finish;
var trap1, trap2, trap3, trap4, trap5;
var portal1, portal2;
var portSound, trapSound;
var obs1, obs2, obs3, obs4, obs5, obs6, obs7, obs8, obs9, obs10, obs11, obs12, obs13, obs14, obs15;
var orbImg, player1Img, portalImg, endImg;
var state, reset, trapGroup, obsGroup;
var score = 0;

function preload(){
    playerImg = loadImage("play.png");
    orbImg = loadImage("orb.png");
    portalImg = loadImage("portal.png");
    winImg = loadImage("over2.png");
    endImg = loadImage("over.png");
    portSound = loadSound("portal.mp3");
    trapSound = loadSound("trap.mp3");
}

function setup(){
   var canvas = createCanvas(displayWidth,600);

    database = firebase.database();

    trapGroup = new Group();    
    obsGroup = new Group();
    portGroup = new Group();

    player = createSprite(50,300,20,20);
    player.addImage('p',playerImg);
    player.scale = 0.23;
    player.setCollider("rectangle",-20,20,150,200);

    obs1 = new Obs(120,300,40,350);
    obs2 = new Obs(415,145,550,40);
    obs3 = new Obs(225,455,170,40);
    obs4 = new Obs(335,520,50,170);
    obs5 = new Obs(370,250,40,170);
    obs6 = new Obs(295,315,110,40);
    obs7 = new Obs(680,250,400,40);
    obs8 = new Obs(680,430,40,380);
    obs9 = new Obs(930,145,170,40);
    obs10 = new Obs(995,200,40,400);
    obs11 = new Obs(995,550,40,100);
    obs12 = new Obs(1120,350,40,320);
    obs13 = new Obs(1200,390,200,40);
    obs14 = new Obs(1250,210,70,40);
    obsGroup.add(obs1.body);
    obsGroup.add(obs2.body);
    obsGroup.add(obs3.body);
    obsGroup.add(obs4.body);
    obsGroup.add(obs5.body);
    obsGroup.add(obs6.body);
    obsGroup.add(obs7.body);
    obsGroup.add(obs8.body);
    obsGroup.add(obs9.body);
    obsGroup.add(obs10.body);
    obsGroup.add(obs11.body);
    obsGroup.add(obs12.body);
    obsGroup.add(obs13.body);
    obsGroup.add(obs14.body);


    trap1 = new TrapsLeft(265,540,20,20);
    trap2 = new TrapsUp(465,550,20,20);
    trap3 = new TrapsLeft(615,440,20,20);
    trap4 = new TrapsLeft(930,65,20,20);
    trap5 = new TrapsUp(1210,345,20,20);
    trapGroup.add(trap1.body);
    trapGroup.add(trap2.body);
    trapGroup.add(trap3.body);
    trapGroup.add(trap4.body);
    trapGroup.add(trap5.body);

    portal1 = new Portal(600,540,20,20);
    portal2 = new Portal(300,240,20,20);
    portGroup.add(portal1.body);
    portGroup.add(portal2.body);
    portal3 = new Portal(1210,455,20,20);

    reset = createButton("reset");
    reset.position(displayWidth/2,displayHeight-200);
}

function draw(){
    getState();

    if(state===1){
    background(0);

    obs1.display();
    obs2.display();
    obs3.display();
    obs4.display();
    obs5.display();
    obs6.display();
    obs7.display();
    obs8.display();
    obs9.display();
    obs10.display();
    obs11.display();
    obs12.display();
    obs13.display();
    obs14.display();
    drawSprites();

    trap1.display();
    trap2.display();
    trap3.display();
    trap4.display();
    trap5.display();

    portal1.display();
    portal2.display();
    portal3.display();
    keyPressed();

    reset.hide();
    player.bounceOff(obsGroup);

    score = score+Math.round(getFrameRate()/50);

    if(portGroup.isTouching(player)){
        portSound.play();
        player.x = portal3.x;
        player.y = portal3.y;
    }

    if(player.x>displayWidth+20 && player.y>210 && player.y<390){
        updateState(0);
    }

    if(trapGroup.isTouching(player)){
        trapSound.play();
        updateState(2);
    }

    if(score === 625){
        textSize(28);
        fill(255);
        text("Time ran out",displayWidth/2-30,100);
        updateState(2);
    }

    fill(255);
    textSize(30);
    text("Time: "+score,displayWidth/2,70);

    }else if(state===0){
        background(winImg);
        reset.show();
    }else if(state===2){
        background(endImg);
        reset.show();
    }

    reset.mousePressed(()=>{
        updateState(1);
      });
    }

function keyPressed(){
    if(keyCode === 119){
        player.y -=5;
    }

    if(keyCode === 115){
        player.y +=5;
    }

    if(keyCode === 100){
        player.x +=5;
    }

	if(keyCode === 97){
        player.x -=5;
	}
}

  function getState(){
    var stateRef = database.ref('gameState');
    stateRef.on("value",(data)=>{
      state = data.val();
    })
  }

  function updateState(state){
      database.ref('/').update({
          gameState: state
      })
      }
  