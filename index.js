const accessToken = 'Fcl36Sb9lU5ynhsN8ofA47SqaVDPAlnG5b669b1f243a48e40fd719fef7b80ecbe75a54da';
const styleUrl = `https://vapi.bleeding.mapcreator.io/styles/Base%20Cartotest1.json?access_token=${accessToken}`;

const layersContainer = document.querySelector('#layers-container');
const disabledLayers = new Set();

let style = {};

const stats = new window.Stats();
const vtxPanel = stats.addPanel(new window.Stats.Panel('vtx', '#f8f', '#212'));
const drawPanel = stats.addPanel(new window.Stats.Panel('dc', '#ff8', '#221'));
document.body.appendChild(stats.dom);

window.stats = stats;
window.vtxCounts = {};
window.drawCount = 0;

run();

async function run() {
    style = await fetch(styleUrl).then(response => response.json());

    const map = new mapboxgl.Map({
        container: 'map',
        zoom: 4,
        center: [13.1, 48.23],
        style,
        hash: true,
        transformRequest: url => {
            return {
                url: `${url}?access_token=${accessToken}`,
            };
        },
    });

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

    window.map = map;
}

function rerenderLayers() {
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
            updateLayers();
        });
    });
}

function getLayersHtml() {
    const { vtxCounts } = window;

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
        html += `<div class="layers-header">Disabled Layers</div>`;
    }

    html += disabled.map(layer => getLayerHtml(layer, maxVtxCount)).join('');

    if (enabled.length > 0) {
        html += `<div class="layers-header">Enabled Layers</div>`;
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

function dimLayers() {
    const panel = document.querySelector('#layers');

    if (panel) {
        panel.style.opacity = 0.5;
        panel.style.pointerEvents = 'none';
    }
}

function updateLayers() {
    const newStyle = { ...style };

    newStyle.layers = newStyle.layers.filter(layer => !disabledLayers.has(layer.id));

    map.setStyle(newStyle);
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
