let flashcards = 
    Array.from(document.querySelectorAll(".flashcard"))
    .reduce((arr, flashcardElmt) => [...arr, 
        [flashcardElmt.querySelector("#term"), flashcardElmt.querySelector("#definition")]
    ], []);

let currentFlashcard = 0;
let currentFlashcardState = 0; // 0 = term, 1  = definition

flashcards[currentFlashcard][currentFlashcardState].style.display = 'flex';

document.querySelector("#flashcards").onclick = function() {
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'none';
    currentFlashcardState = Number(!currentFlashcardState);
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'flex'
}

document.querySelector("#back-option").onclick = function() {
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'none';
    currentFlashcard--;
    currentFlashcardState = 0;
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'flex';
    document.querySelector("#forward-option").disabled = false;
    if (currentFlashcard == 0) {
        document.querySelector("#back-option").disabled = true;
    }
}

document.querySelector("#forward-option").onclick = function() {
    if (currentFlashcard == flashcards.length - 1) return;
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'none';
    currentFlashcard++;
    currentFlashcardState = 0;
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'flex';

    document.querySelector("#back-option").disabled = false;
    if (currentFlashcard == flashcards.length - 2) {
        document.querySelector("#forward-option").disabled = true;
    } else {
        document.querySelector("#forward-option").disabled = false;
    }
}

document.querySelector("#flip-option").onclick = function() {
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'none';
    for (let i in flashcards) {
        flashcards[i] = [flashcards[i][1], flashcards[i][0]];
    }
    flashcards[currentFlashcard][currentFlashcardState].style.display = 'flex';
}