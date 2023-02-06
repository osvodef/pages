const cellSize = 55;

const formations = [
    [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
    ],
    [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [2, 0],
        [2, 1],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [6, 0],
        [7, 0],
        [6, 4],
        [7, 4],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [0, 2],
        [1, 2],
        [3, 2],
        [4, 2],
        [0, 6],
        [1, 6],
        [2, 6],
        [3, 6],
        [4, 6],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [0, 1],
        [4, 1],
    ],
    [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [1, 6],
        [1, 7],
    ],
];

const container = document.querySelector('.container');
const cells = document.querySelectorAll('.cell');
const screenWidth = container.clientWidth;
const screenHeight = container.clientHeight;

let currentFormationIndex = 0;

function apply(formationIndex) {
    const formation = shuffle(formations[formationIndex]);

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const point of formation) {
        const x = point[0];
        const y = point[1];

        if (x < minX) {
            minX = x;
        }

        if (x > maxX) {
            maxX = x;
        }

        if (y < minY) {
            minY = y;
        }

        if (y > maxY) {
            maxY = y;
        }
    }

    const formationWidth = (maxX - minX + 1) * cellSize;
    const formationHeight = (maxY - minY + 1) * cellSize;

    const offsetX = Math.round((screenWidth - formationWidth) / 2);
    const offsetY = Math.round((screenHeight - formationHeight) / 2);

    for (let i = 0; i < 16; i++) {
        const cell = cells[i];
        const point = formation[i % formation.length];

        const x = offsetX + point[0] * cellSize;
        const y = offsetY + point[1] * cellSize;

        cell.style.transform = `translate(${x}px, ${y}px)`;
    }

    currentFormationIndex = formationIndex;
}

function shuffle(array) {
    array = array.slice();

    var n = array.length,
        t,
        i;

    while (n) {
        i = (Math.random() * n--) | 0; // 0 ≤ i < n
        t = array[n];
        array[n] = array[i];
        array[i] = t;
    }

    return array;
}

apply(1);

setTimeout(() => {
    for (const cell of cells) {
        cell.style.transition = 'transform .8s';
        cell.style.opacity = '1';
    }
}, 0);

container.addEventListener('click', () => {
    apply(Math.floor(Math.random() * formations.length));
});
