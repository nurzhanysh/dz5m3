function validateGmail(email) {
    const gmailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;
    return gmailRegex.test(email);
}

document.getElementById("gmail_button").addEventListener("click", function () {
    const emailInput = document.getElementById("gmail_input").value;
    const resultDisplay = document.getElementById("gmail_result");

    if (validateGmail(emailInput)) {
        resultDisplay.textContent = "Корректный Gmail адрес";
        resultDisplay.style.color = "green";
    } else {
        resultDisplay.textContent = "Некорректный Gmail адрес";
        resultDisplay.style.color = "red";
    }
});
function moveBlockAround(block, parent) {
    const maxRight = parent.offsetWidth - block.offsetWidth;
    const maxBottom = parent.offsetHeight - block.offsetHeight;
    let x = 0;
    let y = 0;
    let direction = "right";

    function animate() {
        switch (direction) {
            case "right":
                x += 5;
                block.style.left = `${x}px`;
                if (x >= maxRight) direction = "down"; 
                break;
            case "down":
                y += 5;
                block.style.top = `${y}px`;
                if (y >= maxBottom) direction = "left";
                break;
            case "left":
                x -= 5;
                block.style.left = `${x}px`;
                if (x <= 0) direction = "up";
                break;
            case "up":
                y -= 5;
                block.style.top = `${y}px`;
                if (y <= 0) direction = "right";
                break;
        }
        requestAnimationFrame(animate);
    }

    animate();
}

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");
moveBlockAround(childBlock, parentBlock);


let seconds = 0;
let intervalId = null;


function updateDisplay() {
    document.getElementById("seconds").textContent = seconds;
}


function startTimer() {
    if (intervalId === null) {
        intervalId = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000); 
    }
}


function stopTimer() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null; 
    }
}


function resetTimer() {
    stopTimer(); 
    seconds = 0; 
    updateDisplay(); 
}


document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);


updateDisplay();



const charactersList = document.querySelector('#charactersList')

const fetcher = (url) => {
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.setRequestHeader('Content-type', 'application/json')
    request.responseType = 'json'
    request.send()
    return request
}

const renderCharactersList = (data) => {
    data.forEach((character) => {


        const characterCard = document.createElement('div')
        characterCard.classList.add('character-card')

        const characterImage = document.createElement('img')
        characterImage.setAttribute('src', character.image)

        const characterName = document.createElement('p')
        characterName.innerText = character.name

        const characterAge = document.createElement('span')
        characterAge.innerText = `Age: ${character.age}`

        characterCard.append(characterImage)
        characterCard.append(characterName)
        characterCard.append(characterAge)

        charactersList.append(characterCard)
    })
}

const request = fetcher('../data/persons.json')
const request2 = fetcher('../data/todos.json')

request.onload = () => renderCharactersList(request.response)
request2.onload = () => console.log(request2.response)