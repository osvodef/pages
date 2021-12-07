const trips = [
    {
        location: 'Новосибирск',
        start: '2021.01.01',
    },
    {
        location: 'Иркутск',
        start: '2021.01.07',
    },
    {
        location: 'Слюдянка',
        start: '2021.01.10',
    },
    {
        location: 'Иркутск',
        start: '2021.01.11',
    },
    {
        location: 'Владивосток',
        start: '2021.01.12',
    },
    {
        location: 'Новосибирск',
        start: '2021.01.23',
    },
    {
        location: 'Адлер',
        start: '2021.03.14',
    },
    {
        location: 'Сочи',
        start: '2021.03.22',
    },
    {
        location: 'Красная Поляна',
        start: '2021.03.28',
    },
    {
        location: 'Адлер',
        start: '2021.04.02',
    },
    {
        location: 'Краснодар',
        start: '2021.04.06',
    },
    {
        location: 'Ростов-на-Дону',
        start: '2021.04.11',
    },
    {
        location: 'Новосибирск',
        start: '2021.04.17',
    },
    {
        location: 'Санкт-Петербург',
        start: '2021.06.13',
    },
    {
        location: 'Москва',
        start: '2021.06.16',
    },
    {
        location: 'Новосибирск',
        start: '2021.06.19',
    },
    {
        location: 'Омск',
        start: '2021.06.28',
    },
    {
        location: 'Новосибирск',
        start: '2021.07.01',
    },
    {
        location: 'Москва',
        start: '2021.07.03',
    },
    {
        location: 'Белград',
        start: '2021.07.06',
    },
    {
        location: 'Валево',
        start: '2021.07.08',
    },
    {
        location: 'Белград',
        start: '2021.07.10',
    },
    {
        location: 'Заовине',
        start: '2021.07.11',
    },
    {
        location: 'Мала Река',
        start: '2021.07.12',
    },
    {
        location: 'Белград',
        start: '2021.07.13',
    },
    {
        location: 'Чрни Врх',
        start: '2021.07.15',
    },
    {
        location: 'Нови Сад',
        start: '2021.07.17',
    },
    {
        location: 'Москва',
        start: '2021.07.19',
    },
    {
        location: 'Новосибирск',
        start: '2021.07.27',
    },
    {
        location: 'Красноярск',
        start: '2021.08.02',
    },
    {
        location: 'Саянск',
        start: '2021.08.03',
    },
    {
        location: 'Слюдянка',
        start: '2021.08.04',
    },
    {
        location: 'Аршан',
        start: '2021.08.05',
    },
    {
        location: 'Иркутск',
        start: '2021.08.07',
    },
    {
        location: 'Ольхон',
        start: '2021.08.10',
    },
    {
        location: 'Иркутск',
        start: '2021.08.13',
    },
    {
        location: 'Канск',
        start: '2021.08.15',
    },
    {
        location: 'Новосибирск',
        start: '2021.08.16',
    },
    {
        location: 'Казань',
        start: '2021.08.30',
    },
    {
        location: 'Москва',
        start: '2021.09.01',
    },
    {
        location: 'Нижний Новгород',
        start: '2021.09.03',
    },
    {
        location: 'Москва',
        start: '2021.09.04',
    },
    {
        location: 'Новосибирск',
        start: '2021.09.11',
    },
    {
        location: 'Москва',
        start: '2021.09.24',
    },
    {
        location: 'Сочи',
        start: '2021.09.29',
    },
    {
        location: 'Новосибирск',
        start: '2021.10.04',
    },
    {
        location: 'Москва',
        start: '2021.10.23',
    },
    {
        location: 'Стамбул',
        start: '2021.10.25',
    },
    {
        location: 'Аланья',
        start: '2021.10.31',
    },
    {
        location: 'Анталья',
        start: '2021.11.21',
    },
    {
        location: 'Москва',
        start: '2021.11.27',
    },
    {
        location: 'Новосибирск',
        start: '2021.12.06',
    },
];

const journeys = [
    {
        name: 'Иркутск и Владивосток',
        start: '2021.01.07',
        finish: '2021.01.23',
    },
    {
        name: 'Юг России',
        start: '2021.03.14',
        finish: '2021.04.17',
    },
    {
        name: 'Питер и Москва',
        start: '2021.06.13',
        finish: '2021.06.19',
    },
    {
        name: 'Мототрип в Омск',
        start: '2021.06.28',
        finish: '2021.07.01',
    },
    {
        name: 'Сербия',
        start: '2021.07.03',
        finish: '2021.07.27',
    },
    {
        name: 'Мототрип на Байкал',
        start: '2021.08.02',
        finish: '2021.08.16',
    },
    {
        name: 'Казань и Нижний Новогород',
        start: '2021.08.30',
        finish: '2021.09.11',
    },
    {
        name: 'Москва и Сочи',
        start: '2021.09.24',
        finish: '2021.10.04',
    },
    {
        name: 'Зимовка в Турции',
        start: '2021.10.23',
        finish: '2021.12.06',
    },
];

const colors = [
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
];

const months = [
    'ЯНВ',
    'ФЕВ',
    'МАР',
    'АПР',
    'МАЙ',
    'ИЮНЬ',
    'ИЮЛЬ',
    'АВГ',
    'СЕН',
    'ОКТ',
    'НОЯ',
    'ДЕК',
];

const locations = new Set(trips.map(trip => trip.location));

let colorIndex = 0;

const yearStart = '2021.01.01';
const yearEnd = '2022.01.01';
const dayMs = 24 * 60 * 60 * 1000;

for (let i = 0; i < trips.length; i++) {
    const start = trips[i].start;
    const location = trips[i].location;
    const finish = i !== trips.length - 1 ? trips[i + 1].start : yearEnd;

    const duration = calcDays(start, finish);

    trips[i].finish = finish;
    trips[i].duration = duration;

    if (location === 'Новосибирск') {
        trips[i].color = '#fafafa';
    } else if (location === 'Москва') {
        trips[i].color = '#fb8072';
    } else {
        trips[i].color = colors[colorIndex % colors.length];
        colorIndex++;
    }
}

colorIndex = 0;

for (const journey of journeys) {
    journey.duration = calcDays(journey.start, journey.finish);
    journey.color = colors[colorIndex % colors.length];
    colorIndex++;
}

const totalAtHome = getTotalForLocation(trips, 'Новосибирск');
const totalTravelling = 365 - totalAtHome;
const travelPercent = formatPercent(totalTravelling / 365);
const homePercent = formatPercent(totalAtHome / 365);

document.querySelector('.chart').innerHTML = makeChart(trips, journeys);
document.querySelector(
    '.total-travel',
).innerText = `${totalTravelling} дня (${travelPercent}) ездил`;
document.querySelector('.total-home').innerText = `${totalAtHome} дня (${homePercent}) сидел дома`;
document.querySelector('.total-locations').innerText = `Посетил ${locations.size} локаций:`;

const locArray = [];
locations.forEach(location => {
    locArray.push({ name: location, duration: getTotalForLocation(trips, location) });
});
locArray.sort((a, b) => b.duration - a.duration);

const locList = locArray
    .map(location => {
        return `
            <li class="location">
                <span class="location-name" data-name="${location.name}">
                    ${location.name} (${location.duration} ${plural(location.duration)})
                </span>
            </li>
        `;
    })
    .join('');

document.querySelector('.locations').innerHTML = locList;

const locElements = document.querySelectorAll('.location-name');
for (const element of locElements) {
    element.addEventListener('mouseover', () => {
        document.querySelector('.chart').innerHTML = makeChart(
            trips,
            journeys,
            element.dataset.name,
        );
    });

    element.addEventListener('mouseout', () => {
        document.querySelector('.chart').innerHTML = makeChart(trips, journeys);
    });
}

function calcDays(start, finish) {
    return (new Date(finish) - new Date(start)) / dayMs;
}

function makeChart(trips, journeys, selectedLocation) {
    const width = 365;

    const rectHeight = 30;
    const rectOffset = 10;
    const height = rectOffset + rectHeight + journeys.length * 6 + 3;

    let svg = rect(0, rectOffset, width, rectHeight, '#fafafa');

    svg += journeys
        .filter(trip => trip.location !== 'Новосибирск')
        .map(trip => {
            const x = calcDays(yearStart, trip.start);
            const width = trip.duration;

            return rect(
                calcDays(yearStart, trip.start),
                rectOffset,
                trip.duration,
                rectHeight,
                trip.color,
            );
        })
        .join('');

    for (let month = 1; month <= 12; month++) {
        const firstDay = `2021.${month}.01`;
        const dayNumber = calcDays(yearStart, firstDay);

        svg += line(dayNumber + 0.5, rectOffset - 7, dayNumber + 0.5, rectOffset, '#dddddd');
        svg += text(months[month - 1], dayNumber + 3, rectOffset - 3);
    }

    for (let i = 0; i < journeys.length; i++) {
        const journey = journeys[i];
        const dropdown = rectOffset + rectHeight + (journeys.length - i) * 6;
        const dayNumber = calcDays(yearStart, journey.start);
        svg += line(dayNumber + 0.5, rectOffset + rectHeight, dayNumber + 0.5, dropdown, '#dddddd');
        svg += text(journey.name, dayNumber + 3, dropdown);
    }

    svg += trips
        .filter(trip => trip.location === selectedLocation)
        .map(trip => {
            const x = calcDays(yearStart, trip.start);
            return `<rect style="stroke: #ff0000; fill: transparent;" x="${x}" y="${rectOffset}" width="${trip.duration}" height="${rectHeight}" />`;
        })
        .join('');

    return `
        <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            ${svg}
        </svg>
    `;
}

function rect(x, y, width, height, fill) {
    return `<rect fill="${fill}" x="${x}" y="${y}" width="${width}" height="${height}" />`;
}

function line(x1, y1, x2, y2, stroke) {
    return `<line stroke="${stroke}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
}

function text(text, x, y) {
    return `<text x="${x}" y="${y}" style="text-anchor: start;" class="caption">${text}</text>`;
}

function getTotalForLocation(trips, location) {
    let sum = 0;

    for (const trip of trips) {
        if (trip.location === location) {
            sum += trip.duration;
        }
    }

    return sum;
}

function formatPercent(fraction) {
    return `${Math.round(fraction * 100)}%`;
}

function plural(days) {
    if (days >= 10 && days <= 20) {
        return 'дней';
    }

    const lastDigit = days % 10;

    switch (lastDigit) {
        case 1:
            return 'день';
        case 2:
        case 3:
        case 4:
            return 'дня';
    }

    return 'дней';
}
