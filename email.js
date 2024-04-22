// Library functions and constants
// ===============================
const DRAGGABLE_CLASS = "draggable";
const DRAGGABLE_SELECTOR = `li, p, .${DRAGGABLE_CLASS}`;

const shuffled = (arr) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const puzzleElement = document.querySelector("#puzzle");

// Generating puzzle
// =================
const arrangement = shuffled(
  Array(12)
    .fill(null)
    .map((_, i) => i + 1)
);

const getPieceFilename = (i) => `img/${i}-puzzle-piece.png`;

const renderPuzzle = (puzzleElement) => {
  puzzleElement.innerHTML = "";
  arrangement.forEach((i) => {
    const pieceElement = document.createElement("img");
    pieceElement.src = getPieceFilename(i);
    pieceElement.id = `piece-${i}`;
    pieceElement.className = `puzzle-piece ${DRAGGABLE_CLASS}`;
    pieceElement.draggable = false;

    puzzleElement.appendChild(pieceElement);
  });
};

if (puzzleElement) renderPuzzle(puzzleElement);

// Making draggable draggable
// ==========================
interact(DRAGGABLE_SELECTOR).draggable({
  listeners: {
    move(event) {
      const previousLeft = parseFloat(event.target.style.left || 0);
      const previousTop = parseFloat(event.target.style.top || 0);

      event.target.style.left = `${event.dx + previousLeft}px`;
      event.target.style.top = `${event.dy + previousTop}px`;
    },
  },
});