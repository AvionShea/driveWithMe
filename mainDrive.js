const drivingCanvas = document.querySelector("#drivingCanvas");
drivingCanvas.width = 200; //setting driving canvas width

const networkCanvas = document.querySelector("#networkCanvas");
networkCanvas.width = 300; //setting network canvas width

const drivingCtx = drivingCanvas.getContext("2d"); //canvas context to draw car
const networkCtx = networkCanvas.getContext("2d"); //canvas context to draw network

const road = new Road(drivingCanvas.width/2, drivingCanvas.width*0.9);// drawing of the lane lines
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI"); //placement of the car on the screen and specifying this car to be controlled by "AI"
const traffic=[
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2) //puts traffic in front of car
];

animate();

function animate(time){
    for(let i =0; i<traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    drivingCanvas.height = window.innerHeight //setting driving canvas to full height
    networkCanvas.height = window.innerHeight //setting network canvas to full height

    drivingCtx.save(); //save context
    drivingCtx.translate(0, -car.y+drivingCanvas.height*0.7); //translate nothing on x-axis, but minus the y value of the car

    road.draw(drivingCtx); //drawing road lines onto the canvas
    for(let i =0; i<traffic.length;i++ ){ //drawing traffic on canvas
        traffic[i].draw(drivingCtx, "pink");
    }
    car.draw(drivingCtx, "purple"); //drawing car onto the canvas

    drivingCtx.restore();

    networkCtx.lineDashOffset=time;
    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate); //calls animate method over and over many times per second
}