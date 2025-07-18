const questions = [
    {
        question: "Dans quelle pays ?",
        answers: ["France", "Espagne", "Portugal", "Allemagne"],
        correctIndex: 0,
    },
    {
        question: "Combien de pattes à une araignée ?",
        answers: ["4", "6", "8", "10"],
        correctIndex: 2,
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Déclaration de la fonction 'showQuestion()'
function showQuestion(){

    // Stock la valeur de la question actuelle
    const currentQuestion = questions[currentQuestionIndex];

    //Met à jour le texte de la question actuelle
    document.getElementById("question-text").textContent = currentQuestion.question;

    //Récupère chacun des boutons de réponse
    const buttons = document.querySelectorAll(".answer-button");

    //Parcours chacun des boutons
    buttons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index]; //Met à jour le texte
        button.disabled = false; // Met à jour l'aspect
        button.style.backgroundColor = ""; //Reset de la couleur de fond
    });
}

// Récupère et stock les 3 boutons de reponse
const buttons = document.querySelectorAll(".answer-button");

// Parcours les 3 boutons
buttons.forEach(button => {
    button.addEventListener("click", () => { // Écoute le clic
        // Récupère et stock l'indice du bouton parciuru
        const selectedIndex = parseInt(button.dataset.index);
        // Récupère et stock l'indice de la question actuelle
        const correctIndex = questions[currentQuestionIndex].correctIndex;

        // Si la réponse cliquée est égale à celle de la question actuelle
        if (selectedIndex === correctIndex) {
            //Met à jour le texte avec  "Bonne réponse !" et incrémente le score
            document.getElementById("feedback-text").textContent = "Bonne réponse !";
            score++;
            button.style.backgroundColor = "green";
        } else {
            //Met à jour le texte avec  "Mauvaise réponse !" et met à jour le style
            document.getElementById("feedback-text").textContent = "Mauvaise réponse !";
            button.style.backgroundColor = "red";
        }
        //Désactive tous les boutons (grisé et non cliquable)
        buttons.forEach(b => b.disabled = true);
        //Affiche le boutons "Question suivante"
        document.getElementById("next-button").style.display = "inline-block";
    });
});

document.getElementById("next-button").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById("feedback-text").textContent = "";
        document.getElementById("next-button").style.display = "none";
    } else {
        document.getElementById("question-container").innerHTML = "Quiz terminé ! Score : " + score + "/" + questions.length;
        document.getElementById("feedback-text").textContent = "";
        document.getElementById("next-button").style.display = "none";
        document.getElementById("restart-button").style.display = "inline-block";
    }
});

// Affiche la première question
showQuestion();

document.getElementById("restart-button").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("question-container").innerHTML = `
        <p id="question-text">[La question s'affichera ici]</p>
        <button class="answer-button" data-index="0">Réponse 1</button>
        <button class="answer-button" data-index="1">Réponse 2</button>
        <button class="answer-button" data-index="2">Réponse 3</button>
        <button class="answer-button" data-index="3">Réponse 4</button>
    `;
    document.getElementById("feedback-text").textContent = "";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("restart-button").style.display = "none";
    
    // Re-sélectionner les nouveaux boutons créés et ré-attacher les écouteurs
    const newButtons = document.querySelectorAll(".answer-button");
    newButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedIndex = parseInt(button.dataset.index);
            const correctIndex = questions[currentQuestionIndex].correctIndex;

            if (selectedIndex === correctIndex) {
                document.getElementById("feedback-text").textContent = "Bonne réponse !";
                score++;
                button.style.backgroundColor = "green";
            } else {
                document.getElementById("feedback-text").textContent = "Mauvaise réponse !";
                button.style.backgroundColor = "red";
            }
            newButtons.forEach(b => b.disabled = true);
            document.getElementById("next-button").style.display = "inline-block";
        });
    });

    showQuestion();

})
