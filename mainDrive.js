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
    road.draw(ctx); //drawing road lines onto the canvas
    car.draw(ctx); //drawing car onto the canvas
    requestAnimationFrame(animate); //calls animate method over and over many times per second
}