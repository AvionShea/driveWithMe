class Controls{
    constructor(type){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch(type){
            case "KEYS":
            //keyboard listeners
            this.#addKeyboardListeners(); //private listeners - can't access outside of this
        break;
            case "DUMMY":
                this.forward=true;
                break;
        }
    }

    #addKeyboardListeners(){
        // on key down, run this function
        document.onkeydown = (event) =>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            // console.table(this); - debugger
        }

        //on release of key, run this function
        document.onkeyup = (event) =>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            // console.table(this); - debugger
        }
    }
}