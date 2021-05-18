const dinosJSON = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
}
    const dinoArray = dinosJSON.Dinos
    const form = document.getElementById( "dino-compare" );
    const grid = document.getElementById("grid")

    // function to shuffle an array
    function shuffleArray(array) {
        let j
        for (let i = array.length - 1; i > 0; i--) {
             j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            
        }
        return array
      }
      

    // function to pull an item at random from an array
    function randomIdx(array){
        return array[Math.floor(Math.random() * array.length)]
    }

    // shuffle up the outer grid numbers each time a user submits data
    function randomizedGrid(){
        const numArray = [];
        for(let g = 0; g < 9; g++){ // start at 0
            if(g != 4){
                numArray.push(g) // [0,1,2,3,5,6,7,8]
            }
        }
        return shuffleArray(numArray)
    }

    // Create Dino Constructor

    function Dino (species, fact) {
        this.species = species
        this.image = 'images/' + species.toLowerCase() + '.png'
        this.fact = fact
        }

    // Create Dino Objects
        
    function generateDinos(dino, human) {
        let fact
        const name = dino.species
        const factWhere = 'The ' + dino.species + ' lived in ' + dino.where + '.'
        const factWhen = 'The ' + dino.species + ' existed in the ' + dino.when + ' era.'
        const factArray = [factHeight(human,dino),factWeight(human,dino),factDiet(human,dino), factWhere, factWhen, dino.fact]
        // depending on species, get pigeon fact OR randomized dino fact
        if(dino.species != 'Pigeon'){
             fact = randomIdx(factArray)
        } else {  fact = 'All birds are considered dinosaurs.'}
        let newDino = new Dino(name,fact)
        return newDino
    }

    // Create Human Object

    function Human (name,height,weight,diet,image) { 
        this.name = name
        this.weight = weight
        this.height = height
        this.diet = diet
        this.image = image
    }

    // Use IIFE to get human data from form

    const human = () => {
      (function() {
        const name = document.getElementById('name').value
        const feet = parseFloat(document.getElementById('feet').value)
        const inches = parseFloat(document.getElementById('inches').value)
        const height = (feet * 12) + inches
        const weight = parseFloat(document.getElementById('weight').value)
        const diet = document.getElementById('diet').value
        const image = 'images/human.png'
        const human = new Human(name,height,weight,diet.toLowerCase(),image)
        formHide()
        gridShow(human)
      })()
    }

    // add event listener for button click which triggers it all!
    const btn = document.getElementById('btn')
    btn.addEventListener('click', human)

    // Dino Compare Method 1 - human vs dino height
    function factHeight (human, dino){
        let dinoFact
        if(human && human.height < (dino.height)){
            dinoFact = 'At ' + dino.height +  ' inches tall, an average ' + dino.species + ' was taller than you!'
            return dinoFact
        } else {
            dinoFact = 'At ' + dino.height +  ' inches tall, an average ' + dino.species + ' was shorter than you!'
            return dinoFact
        }
    }
    
    // Dino Compare Method 2 - human vs dino weight
    function factWeight (human, dino){
        let dinoFact
        if(human && human.weight < dino.weight){
            dinoFact = 'An average ' + dino.species + ' weighed more than you!'
            return dinoFact
        } else {
            dinoFact = 'An average ' + dino.species + ' weighed less than you!'
            return dinoFact
        } 
    }
    
    // Dino Compare Method 3 - human vs dino diet
    function factDiet (human, dino){
        let dinoFact
        const ddiet = dino.diet+'e'
        if(human && human.diet === ddiet){
            dinoFact = 'The ' + dino.species + ' was also a ' + human.diet + '.'
            return dinoFact
        } else {
            dinoFact = 'Unlike you, the ' + dino.species + ' was a ' + ddiet + '.'
            return dinoFact
        }
    }

    // Generate Tiles for each Dino in Array

    function dinoTile(human,arr){
        dinoArray.forEach((dino,i) => {
            const genDino =  generateDinos(dino, human)
            const title = genDino.species
            const image = genDino.image
            const fact = genDino.fact
            const titleD = document.createElement("h3")
            titleD.innerHTML = title
            const imageD = document.createElement("img")
            imageD.setAttribute("src", image)
            const factD = document.createElement("p")
            factD.innerHTML = fact
            grid.getElementsByClassName("grid-item")[arr[i]].appendChild(titleD)
            grid.getElementsByClassName("grid-item")[arr[i]].appendChild(imageD)
            grid.getElementsByClassName("grid-item")[arr[i]].appendChild(factD) 
        })
    }
  
    // Add tiles to DOM

    function gridFill(human) {

        // create grid blocks
        const gridItem = document.createElement("div")
        gridItem.className = "grid-item"
        const gridBlock = grid.appendChild(gridItem)
        for(let i = 1; i < 9; i++){ // start at 1 since 0 already has the first gridBlock
            const clone = gridBlock.cloneNode()
            gridItem.parentNode.appendChild(clone)
        }

            // populate dino blocks
            dinoTile(human,randomizedGrid())

        // populate human block
        const center = grid.getElementsByClassName("grid-item")[4]
        const huTitle = document.createElement("h3")
        huTitle.innerHTML = human.name
        const huImg = document.createElement("img")
        huImg.setAttribute("src", human.image)
        center.appendChild(huTitle);
        center.appendChild(huImg);
    }

    // Remove form from screen
    function formHide (){
        form.classList.add("hidden")
    }

    // On button click, prepare and display infographic
    function gridShow(human) {
        grid.classList.add("shown")
        gridFill(human)
    }