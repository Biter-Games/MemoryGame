let StartButton = document.getElementById("StartButton");
let SkorText = document.getElementById("SkorText");

function GoToFunction(Open){
    let Menus = document.getElementsByClassName("menu");

    for (let i = 0; i < Menus.length; i++) {
        Menus[i].classList.add("close");
    }

    document.getElementById(Open).classList.remove("close");
}

function StartGame() {
    GoToFunction("GameMenu");
}

let miniBoxes = document.getElementsByClassName("MiniBox");

for (let i = 0; i < miniBoxes.length; i++) {
    miniBoxes[i].addEventListener("mouseover", function() {
        this.style.backgroundColor = "red";
    });
}