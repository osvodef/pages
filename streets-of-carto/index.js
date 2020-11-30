const accessToken = 'Fcl36Sb9lU5ynhsN8ofA47SqaVDPAlnG5b669b1f243a48e40fd719fef7b80ecbe75a54da';
const mapboxAccessToken =
    'pk.eyJ1Ijoib3N2b2RlZiIsImEiOiJjazNwbjNlMWUwNGtkM2Vtb253MjM3cXhvIn0.A9Qebgu0gf2BlndYixeeOw';

const layersContainer = document.querySelector('#layers-container');
const stylesContainer = document.querySelector('#mapstyle-list');

const styles = [];
let styleIndex = 0;
let layersDimmed = false;

const stats = new window.Stats();
const vtxPanel = stats.addPanel(new window.Stats.Panel('vtx', '#f8f', '#212'));
const drawPanel = stats.addPanel(new window.Stats.Panel('dc', '#ff8', '#221'));
document.body.appendChild(stats.dom);

window.stats = stats;
window.vtxCounts = {};
window.drawCount = 0;

let symbolSpacing = 250;
let maxAngle = 45;
let textPadding = 2;
let showLabelLines = true;
let showTerrain = false;

const colors = [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928',
];

run();

async function run() {
    await loadInitialStyle();

    mapboxgl.accessToken = mapboxAccessToken;

    const map = new mapboxgl.Map({
        container: 'map',
        zoom: 13,
        center: [5.47806, 51.43878],
        hash: true,
        transformRequest: url => {
            return { url: transformResourceUrl(url) };
        },
    });

    window.map = map;

    switchStyle(0);
    rerenderStyles();

    map.on('render', e => {
        const { vtxCounts, drawCount } = window;

        vtxPanel.update(getTotalVtxCount(vtxCounts), 10000000);
        drawPanel.update(drawCount, 1000);
    });

    map.on('mouseover', 'street-label-axis', e => highlightFeature(e));
    map.on('mouseover', 'street-label-circle', e => highlightFeature(e));

    map.on('mouseout', 'street-label-axis', () => removeHighlight());
    map.on('mouseout', 'street-label-circle', () => removeHighlight());

    map.showTileBoundaries = true;
    map.showCollisionBoxes = true;

    document.querySelector('#add-mapstyle-input').addEventListener('input', async e => {
        const file = e.target.files[0];

        const name = file.name.split('.').slice(0, -1).join('.');
        const style = JSON.parse(await file.text());

        addStyle(name, style);
        switchStyle(styles.length - 1);
        rerenderStyles();
    });

    document.querySelector('#tile-boundaries').addEventListener('input', e => {
        map.showTileBoundaries = e.target.checked;
    });

    document.querySelector('#collision-boxes').addEventListener('input', e => {
        map.showCollisionBoxes = e.target.checked;
    });

    document.querySelector('#label-lines').addEventListener('input', e => {
        showLabelLines = e.target.checked;
        switchStyle(styleIndex);
    });

    document.querySelector('#terrain').addEventListener('input', e => {
        showTerrain = e.target.checked;
        switchStyle(styleIndex);
    });

    document.querySelector('#symbol-spacing').addEventListener('change', async e => {
        const value = Number(e.target.value);

        if (value > 1) {
            symbolSpacing = value;
        } else {
            symbolSpacing = 1;
            e.target.value = 1;
        }

        switchStyle(styleIndex);
    });

    document.querySelector('#text-max-angle').addEventListener('change', async e => {
        maxAngle = Number(e.target.value);
        switchStyle(styleIndex);
    });

    document.querySelector('#text-padding').addEventListener('change', async e => {
        textPadding = Number(e.target.value);
        switchStyle(styleIndex);
    });

    document.querySelector('#scale-input').addEventListener('input', e => {
        const scale = Number(e.target.value);
        map.setScale(scale);
        document.querySelector('#scale-indicator').innerText = scale.toFixed(2);
    });
}

async function loadInitialStyle() {
    const styleUrl = `https://vapi.bleeding.mapcreator.io/styles/Base%20Carto.json?access_token=${accessToken}`;
    const styleName = 'Base Carto';

    addStyle(styleName, await fetch(styleUrl).then(response => response.json()));
}

function addStyle(name, style) {
    styles.push({ name, style }) - 1;
}

async function switchStyle(index) {
    const { map } = window;

    styleIndex = index;

    const style = styles[styleIndex].style;
    const newStyle = JSON.parse(JSON.stringify(style));

    const roadLayers = newStyle.layers.filter(layer => isRoadLayer(layer));

    for (layer of roadLayers) {
        layer.layout['symbol-spacing'] = symbolSpacing;
        layer.layout['text-max-angle'] = maxAngle;
        layer.layout['text-padding'] = textPadding;
    }

    if (!showTerrain) {
        newStyle.layers = newStyle.layers.filter(
            layer => isRoadLayer(layer) || layer.id === 'mc-before-names'
        );
    }

    if (showLabelLines) {
        const insertIndex = newStyle.layers.findIndex(layer => layer.id === 'mc-before-names');
        const filters = roadLayers.map(layer => layer.filter);

        newStyle.layers.splice(
            insertIndex,
            0,
            {
                'id': 'street-label-axis',
                'type': 'line',
                'source': 'mc-base',
                'source-layer': 'lines',
                'filter': ['all', ['has', 'name'], ['any', ...filters]],
                'layout': {},
                'paint': {
                    'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 4, 2],
                    'line-color': ['to-color', ['at', ['%', ['id'], 12], ['literal', colors]]],
                },
            },
            {
                'id': 'street-label-circle',
                'type': 'circle',
                'source': 'mc-base',
                'source-layer': 'lines',
                'filter': ['all', ['has', 'name'], ['any', ...filters]],
                'layout': {},
                'paint': {
                    'circle-color': ['to-color', ['at', ['%', ['id'], 12], ['literal', colors]]],
                    'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 4, 2],
                },
            }
        );
    }

    map.setStyle(newStyle);
}

function rerenderStyles() {
    stylesContainer.innerHTML = styles.map((style, index) => getStyleHtml(index)).join('');

    document.querySelectorAll('.mapstyle-button.select').forEach(element => {
        element.addEventListener('click', () => {
            const index = Number(element.dataset.index);
            switchStyle(index);
            rerenderStyles();
        });
    });
}

function getStyleHtml(index) {
    const style = styles[index];
    const active = index === styleIndex ? 'active' : '';

    return `
        <div class="mapstyle-button select ${active}" data-index="${index}">${style.name}</div>
    `;
}

function getTotalVtxCount(vtxCounts) {
    let total = 0;

    for (const key in vtxCounts) {
        total += vtxCounts[key];
    }

    return total;
}

function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function transformResourceUrl(url) {
    url = url.replace('maps4news.com', 'mapcreator.io');
    url = url.replace(/vapi\.(mc-cdn|mapcreator)/, 'vapi.bleeding.$1');

    if (isVapiUrl(url)) {
        url = `${url}?access_token=${accessToken}`;
    }

    return url;
}

function isVapiUrl(url) {
    return /vapi\..*(mc-cdn|mapcreator)\.io/.test(url);
}

function isRoadLayer(layer) {
    return (
        layer.type === 'symbol' &&
        layer.layout['symbol-placement'] === 'line' &&
        layer.layout['icon-image'] === undefined
    );
}

function highlightFeature(e) {
    const feature = e.features[0];

    if (feature === undefined) {
        return;
    }

    document.querySelector('.mapboxgl-canvas').style.cursor = 'pointer';
    document.querySelector('#feature-info').innerHTML = `
        <p><b>ID:</b> ${feature.id}</p>
        <p><b>Name:</b> ${feature.properties.name}</p>
    `;

    map.setFeatureState(
        {
            source: 'mc-base',
            sourceLayer: 'lines',
            id: feature.id,
        },
        {
            hover: true,
        }
    );
}

function removeHighlight() {
    document.querySelector('.mapboxgl-canvas').style.cursor = 'default';
    document.querySelector('#feature-info').innerHTML = '';

    map.removeFeatureState({
        source: 'mc-base',
        sourceLayer: 'lines',
    });
}
