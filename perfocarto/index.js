const accessToken = 'Fcl36Sb9lU5ynhsN8ofA47SqaVDPAlnG5b669b1f243a48e40fd719fef7b80ecbe75a54da';
const mapboxAccessToken =
    'pk.eyJ1Ijoib3N2b2RlZiIsImEiOiJjazNwbjNlMWUwNGtkM2Vtb253MjM3cXhvIn0.A9Qebgu0gf2BlndYixeeOw';

const layersContainer = document.querySelector('#layers-container');
const stylesContainer = document.querySelector('#mapstyle-list');
const disabledLayers = new Set();

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

run();

async function run() {
    await loadInitialStyle();

    mapboxgl.accessToken = mapboxAccessToken;

    const map = new mapboxgl.Map({
        container: 'map',
        zoom: 4,
        center: [13.1, 48.23],
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

    map.on('move', () => dimLayers());
    map.on('idle', () => rerenderLayers());

    map.showTileBoundaries = true;
    map.showCollisionBoxes = false;
    map.showOverdrawInspector = false;

    document.querySelector('#tile-boundaries').addEventListener('input', e => {
        map.showTileBoundaries = e.target.checked;
    });

    document.querySelector('#collision-boxes').addEventListener('input', e => {
        map.showCollisionBoxes = e.target.checked;
    });

    document.querySelector('#overdraw-inspector').addEventListener('input', e => {
        map.showOverdrawInspector = e.target.checked;
    });

    document.querySelector('#add-mapstyle-input').addEventListener('input', async e => {
        const file = e.target.files[0];

        const name = file.name.split('.').slice(0, -1).join('.');
        const style = JSON.parse(await file.text());

        addStyle(name, style);
        switchStyle(styles.length - 1);
        rerenderStyles();
    });

    document.querySelector('#scale-input').addEventListener('input', e => {
        const scale = Number(e.target.value);
        map.setScale(scale);
        document.querySelector('#scale-indicator').innerText = scale.toFixed(2);
    });
}

async function loadInitialStyle() {
    const styleUrl = `https://vapi.bleeding.mapcreator.io/styles/Base%20Cartotest1.json?access_token=${accessToken}`;
    const styleName = 'Base Cartotest1';

    addStyle(styleName, await fetch(styleUrl).then(response => response.json()));
}

function addStyle(name, style) {
    styles.push({ name, style }) - 1;
}

function switchStyle(index) {
    styleIndex = index;

    const style = styles[styleIndex].style;
    const newStyle = { ...style };

    newStyle.layers = newStyle.layers.filter(layer => !disabledLayers.has(layer.id));

    window.map.setStyle(newStyle);
}

function rerenderLayers() {
    layersDimmed = false;

    layersContainer.innerHTML = getLayersHtml();

    document.querySelectorAll('.layer').forEach(element => {
        element.addEventListener('click', () => {
            const layerId = element.dataset.id;

            if (!disabledLayers.has(layerId)) {
                disabledLayers.add(layerId);
            } else {
                disabledLayers.delete(layerId);
            }

            dimLayers();
            switchStyle(styleIndex);
        });
    });
}

function getLayersHtml() {
    const { vtxCounts } = window;
    const style = styles[styleIndex].style;

    const layers = style.layers.map(layer => {
        return {
            id: layer.id,
            vtcs: vtxCounts[layer.id] ?? 0,
        };
    });

    layers.sort((a, b) => b.vtcs - a.vtcs);

    const disabled = layers.filter(layer => disabledLayers.has(layer.id));
    const enabled = layers.filter(layer => !disabledLayers.has(layer.id));

    const maxVtxCount = layers[0].vtcs;

    let html = '';

    if (disabled.length > 0) {
        html += `<div class="layers-header">Disabled Nodes</div>`;
    }

    html += disabled.map(layer => getLayerHtml(layer, maxVtxCount)).join('');

    if (enabled.length > 0) {
        html += `<div class="layers-header">Enabled Nodes</div>`;
    }

    html += enabled.map(layer => getLayerHtml(layer, maxVtxCount)).join('');

    return `<div id="layers">${html}</div>`;
}

function getLayerHtml(layer, maxVtxCount) {
    const ratio = layer.vtcs / maxVtxCount;

    const opacity = disabledLayers.has(layer.id) ? 0.5 : 1;

    return `
        <div class="layer" data-id="${layer.id}" >
            <div class="layer-bar" style="width: ${ratio * 100}%; opacity: ${opacity}"></div>
            <div class="layer-text" style="opacity: ${opacity}">
                <div class="layer-id">${layer.id}</div>
                <div class="layer-vtcs">${formatNumber(layer.vtcs)}</div>
            </div>
        </div>
    `;
}

function rerenderStyles() {
    stylesContainer.innerHTML = styles.map((style, index) => getStyleHtml(index)).join('');

    document.querySelectorAll('.mapstyle-button.select').forEach(element => {
        element.addEventListener('click', () => {
            const index = Number(element.dataset.index);
            dimLayers();
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

function dimLayers() {
    if (layersDimmed) {
        return;
    }

    const panel = document.querySelector('#layers');

    if (panel) {
        panel.style.opacity = 0.5;
        panel.style.pointerEvents = 'none';
        layersDimmed = true;
    }
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
