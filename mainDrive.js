const canvas = document.querySelector("#drivingCanvas");
canvas.width = 200; //setting canvas width

const ctx = canvas.getContext("2d"); //canvas context to draw car
const road = new Road(canvas.width/2, canvas.width*0.9);// drawing of the lane lines
const car = new Car(road.getLaneCenter(1), 100, 30, 50); //placement of the car on the screen
car.draw(ctx); //drawing the car on the canvas

animate();

function animate(){
    car.update();

    canvas.height = window.innerHeight //setting canvas to full height

    ctx.save(); //save context
    ctx.translate(0, -car.y+canvas.height*0.7); //translate nothing on x-axis, but minus the y value of the car

    road.draw(ctx); //drawing road lines onto the canvas
    car.draw(ctx); //drawing car onto the canvas

    ctx.restore();
    requestAnimationFrame(animate); //calls animate method over and over many times per second
}