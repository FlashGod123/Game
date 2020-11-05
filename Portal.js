class Portal{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.body = createSprite(x,y,width,height);
        this.image = loadImage("portal.png");
    }

    display(){
        this.body.addImage('port',this.image);  
        this.body.scale = 0.3;
        drawSprites();
    }
}