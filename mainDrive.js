const drivingCanvas = document.querySelector("#drivingCanvas");
drivingCanvas.width = 200; //setting driving canvas width

const networkCanvas = document.querySelector("#networkCanvas");
networkCanvas.width = 300; //setting network canvas width

const drivingCtx = drivingCanvas.getContext("2d"); //canvas context to draw car
const networkCtx = networkCanvas.getContext("2d"); //canvas context to draw network

const road = new Road(drivingCanvas.width/2, drivingCanvas.width*0.9);// drawing of the lane lines

const N = 100;
const cars= generateCars(N); //placement of the car on the screen and specifying this car to be controlled by "AI"
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i = 0; i<cars.length; i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
}


const traffic=[
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2), //puts traffic in front of car
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
]

animate();

function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1; i<N; i++){
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }

    return cars;
}

function animate(time){
    for(let i =0; i<traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    for(let i=0; i<cars.length;i++){
        cars[i].update(road.borders, traffic);
    }
    
    bestCar=cars.find(c=>c.y==Math.min(...cars.map(c=>c.y))); //creating a new array with ONLY y values of cars

    drivingCanvas.height = window.innerHeight //setting driving canvas to full height
    networkCanvas.height = window.innerHeight //setting network canvas to full height

    drivingCtx.save(); //save context
    drivingCtx.translate(0, -bestCar.y+drivingCanvas.height*0.7); //translate nothing on x-axis, but minus the y value of the car

    road.draw(drivingCtx); //drawing road lines onto the canvas
    for(let i =0; i<traffic.length;i++ ){ //drawing traffic on canvas
        traffic[i].draw(drivingCtx, "pink");
    }

    drivingCtx.globalAlpha=0.2;

    for(let i=0; i<cars.length;i++){
        cars[i].draw(drivingCtx, "purple"); //drawing car onto the canvas
    }
    drivingCtx.globalAlpha=1;
    bestCar.draw(drivingCtx, "purple", true);

    drivingCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate); //calls animate method over and over many times per second
}