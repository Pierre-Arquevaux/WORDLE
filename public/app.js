
const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
let wordle;

let playAgainBtn = document.querySelector('.play')
playAgainBtn.addEventListener('click', () => {
    console.log(playAgainBtn);
    window.location.reload()
})


const getWordle = () =>{
    fetch('http://localhost:3000/word')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            wordle = json.toUpperCase()
        })
        .catch(err => console.log(err));
}

getWordle()

const keys = [
    "A",
    "Z",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "Q",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "W",
    "X",
    "C",
    "V",
    "B",
    "N",
    "<<",
    "ENTER",
];

const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((guess, guessIndex)=> {
       const tilesElement =  document.createElement('div');
       tilesElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
       tilesElement.classList.add('tile')
       rowElement.append(tilesElement)
    })
    tileDisplay.append(rowElement)
})


keys.forEach(key =>{
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', ()=> handleCLick(key))
    keyboard.append(buttonElement)
});

const handleCLick = (letter) =>{
    // console.log('clicked', letter);
    if (letter === '<<'){
        deleteLeter()
        return
    } if (letter === 'ENTER'){
        checkRow()
        return
    }
    
    addLetter(letter)
};

const addLetter = (letter)=>{
    if(currentTile < 5 && currentRow < 6){
          const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter);
    currentTile++
    console.log('guessRows', guessRows );
    }
 
};

const deleteLeter = () =>{
    if (currentTile > 0){
          currentTile--;
    const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
    tile.textContent = '';
    guessRows[currentRow][currentTile] = '',
    tile.setAttribute('data', '');
    }
  

}

const checkRow = ()=>{
    const guess = guessRows[currentRow].join('');
    // console.log('guess', guess);
    if(currentTile >4){
   
        // console.log(`the guess is ${guess}, wordle is ${wordle}`);
        flipTile();
        if (wordle === guess){
            showMessage ('Magnifique mon poulet');
            isGameOver = true
       
            return
        } else {
            if(currentRow >= 5){
                isGameOver = false
                showMessage('Game Over')
                
                return
               
            }
            if(currentRow < 5){
                currentRow++
                currentTile = 0;
            }
            
        }

    }
}

const showMessage = (message)=>{
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement)
    setTimeout(()=> messageDisplay.removeChild(messageElement),2000)
}

const addColorToKey = (keyLetter, color ) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);


}
const flipTile = ()=>{
    const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes
    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach(tile =>{
        guess.push({letter : tile.getAttribute('data'), color : 'grey-overlay'})
    })

    guess.forEach((guess, index)=> {
        if (guess.letter == wordle[index]){
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)){
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })

    rowTiles.forEach((tile, index) =>{
        setTimeout(()=> {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
            
        },500 * index)
        
    })

}

