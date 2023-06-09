//defining car class
class Car{
    //storing inside of object as attributes - car knows where and how big it is
    constructor(x,y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //gives car speed
        this.speed = 0;

        //give car acceleration
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.sensor=new Sensor(this);
        
        //controls
        this.controls = new Controls();
    }
    //method to move the car on canvas
    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
    }

    //private method
    #move(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        }

        if(this.controls.reverse){
            this.speed -= this.acceleration;
        }

        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }

        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        if(this.speed != 0){
            const flip = this.speed > 0? 1: -1
            if(this.controls.right){
                this.angle -= 0.03 * flip;
            }

            if(this.controls.left){
                this.angle += 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        
        ctx.beginPath();
        ctx.rect( //starts at x and y location
            - this.width/2, //the x is going to be the center of the car
            - this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);
    }
}