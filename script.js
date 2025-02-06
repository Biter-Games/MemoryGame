let StartButton = document.getElementById("StartButton");
let miniBoxes = document.getElementsByClassName("MiniBox");
let gameSequence = [];  // Oyun tarafından oluşturulan sıralama
let playerSequence = [];  // Oyuncunun girdiği sıralama
let currentStep = 0;  // Oyuncunun ilerlediği adım
let gameOver = false;  // Oyun bitme durumu
let score = 0;  // Skor
let maxSkor = 0;

if(localStorage.getItem('score')){

    maxSkor = localStorage.getItem('score');

    document.getElementById("SkorText").innerHTML = "MaxSkor: " + maxSkor;
}

const colors = ['GreenBox', 'YellowBox', 'RedBox', 'BlueBox']; // Renk kutuları

// Rastgele bir renk seç
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Oyun sırasını ekrana göster
function playSequence() {
    disablePlayerInput();  // Oyuncunun tıklama yapmasını engelle

    let i = 0;
    let interval = setInterval(() => {
        let color = gameSequence[i];
        lightUpBox(color);
        i++;

        if (i >= gameSequence.length) {
            clearInterval(interval);
            setTimeout(enablePlayerInput, 400);  // Oyuncunun girmesi için bekle
        }
    }, 700);
}

// Kutuyu kısa süreliğine parlak yap
function lightUpBox(color) {
    let box = document.getElementById(color);
    box.style.filter = 'brightness(1.5)';  // 1'den daha parlak yapar
    setTimeout(() => {
        box.style.filter = 'brightness(1)';  // Parlaklık eski haline döner
    }, 400);
}

// Oyuncunun tıklama yapmasına izin ver
function enablePlayerInput() {
    for (let box of miniBoxes) {
        box.addEventListener("click", handlePlayerClick);
    }
}

// Oyuncunun tıklamasını engelle
function disablePlayerInput() {
    for (let box of miniBoxes) {
        box.removeEventListener("click", handlePlayerClick);
    }
}

// Oyuncunun tıkladığı renkleri kontrol et
function handlePlayerClick(event) {
    if (gameOver) return;

    let clickedColor = event.target.id;  
    playerSequence.push(clickedColor);
    
    lightUpBox(clickedColor);

    // Yanlış tıklama kontrolü
    if (playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
        gameOver = true;
        flashRedScreen();  // Kırmızı ekran efekti eklendi
        setTimeout(() => {
            alert("Oyun Bitti! Tekrar Başlat!");
            resetGame();
        }, 500);
        return;
    }

    // Tüm hamleler doğru yapıldı mı?
    if (playerSequence.length === gameSequence.length) {
        playerSequence = [];
        score += 1;  // Skor artırıldı
        updateScore();
        gameSequence.push(randomColor()); // Yeni renk ekle
        setTimeout(playSequence, 1000);
    }
}

// Oyun başladığında çalıştırılacak fonksiyon
function StartGame() {
    gameSequence = [randomColor()];  // İlk rengi oluştur
    playerSequence = [];
    currentStep = 0;
    gameOver = false;
    score = 0;
    updateScore();
    playSequence();
    GoToFunction("GameMenu");
}

// Skor bilgisini güncelle
function updateScore() {
    document.getElementById("SkorText2").innerHTML = score;
} 

// Oyun bittiğinde ekranı kırmızıya çevirip geri al
function flashRedScreen() {

    document.body.style.backgroundColor = 'red';

    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, 400);

}

// Oyunu sıfırla
function resetGame() {
    gameSequence = [];
    playerSequence = [];
    currentStep = 0;
    gameOver = false;

    if (maxSkor < score) {

        maxSkor = score
        localStorage.setItem("score", maxSkor);

    }

    document.getElementById("SkorText").innerHTML = "MaxSkor: " + maxSkor;

    score = 0;
    updateScore();
    disablePlayerInput();  // Tıklamaları kaldır
    GoToFunction("AnaMenu");  // Ana menüye dön
}

// Menü geçişi
function GoToFunction(Open) {
    let Menus = document.getElementsByClassName("menu");

    for (let i = 0; i < Menus.length; i++) {
        Menus[i].classList.add("close");
    }

    document.getElementById(Open).classList.remove("close");
}
