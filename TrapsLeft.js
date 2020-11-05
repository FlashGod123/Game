class TrapsLeft{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.body = createSprite(x,y,width,height);
        this.image = loadImage("trap2.png");
        this.body.setCollider('rectangle',0,0,125,110);
    }

    display(){
        this.body.addImage('trapLeft',this.image);
        this.body.scale = 0.75;
        drawSprites();
    }
}