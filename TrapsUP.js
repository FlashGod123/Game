class TrapsUp{
    constructor(x,y,width,height){
        this.x =x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.body = createSprite(x,y,width,height);
        this.image = loadImage("trap.png");
        this.body.setCollider("rectangle",0,0,110,125);
    }

    display(){
        this.body.addImage('trapUp',this.image);
        this.body.scale = 0.8;
        drawSprites();
    }
}