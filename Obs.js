class Obs{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.body = createSprite(x,y,width,height);
        this.body.shapeColor = '#714929'
    }

    display(){
        drawSprites();
    }
}