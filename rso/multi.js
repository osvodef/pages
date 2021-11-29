run();

async function run() {
    updateSizeIndicator();
    updateLods();

    window.addEventListener('resize', () => {
        updateSizeIndicator();
        updateLods();
    });

    const svg750 = await fetch('./assets/svg-750.svg').then(response => response.text());
    const svg375 = await fetch('./assets/svg-375.svg').then(response => response.text());
    const svg188 = await fetch('./assets/svg-188.svg').then(response => response.text());

    const png750 = await fetch('./assets/png-750.png').then(response => response.blob());
    const png375 = await fetch('./assets/png-375.png').then(response => response.blob());
    const png188 = await fetch('./assets/png-188.png').then(response => response.blob());

    const multiSvgCode = document.querySelector('#multi-svg-code');
    const multiPngCode = document.querySelector('#multi-png-code');

    multiSvgCode.innerText = generateMultiSvgCode([svg750, svg375, svg188]);
    multiPngCode.innerText = await generateMultiPngCode([png750, png375, png188]);

    const copyButtons = document.querySelectorAll('.copy-button');

    for (const button of copyButtons) {
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(
                button.dataset.type === 'svg' ? multiSvgCode.value : multiPngCode.value,
            );

            button.innerText = '(copied to clipboard)';

            setTimeout(() => {
                button.innerText = '(copy to clipboard)';
            }, 1000);
        });
    }
}

function updateSizeIndicator() {
    const width = document.querySelector('.container').clientWidth;
    document.querySelector('.width-indicator').innerHTML = `Container width: ${width}px`;
}

function updateLods() {
    const width = document.querySelector('.container').clientWidth;
    const lodCount = 3;
    const baseWidth = 750;

    const selectedLod = clamp(Math.ceil(Math.log(baseWidth / width) / Math.LN2), 0, lodCount - 1);

    const svgs = document.querySelector('.multi-svg').querySelectorAll('.pic');
    const pngs = document.querySelector('.multi-png').querySelectorAll('.no-scale');

    for (let i = 0; i < lodCount; i++) {
        if (i === selectedLod) {
            svgs[i].style.display = 'block';
            pngs[i].style.display = 'block';
        } else {
            svgs[i].style.display = 'none';
            pngs[i].style.display = 'none';
        }
    }
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function wrapSvg(svg) {
    const base64 = btoa(unescape(encodeURIComponent(svg)));
    return `<img class="lod" style="display: block; width: 100%" src="data:image/svg+xml;base64,${base64}" />`;
}

async function wrapPng(blob) {
    const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });

    return `<img class="lod" style="display: block; margin: 0 auto;" src="${dataUrl}" />`;
}

function generateMultiSvgCode(svgs) {
    const imgs = svgs.map(svg => wrapSvg(svg)).join('');
    return `<div class="multi-container" style="width: 100%">${imgs}</div><script>function b(){var e=document.querySelector(".multi-container").clientWidth,t=Math.ceil(Math.log(750/e)/Math.log(2));t=Math.max(t,0),t=Math.min(t,2);for(var o=document.querySelector(".multi-container").querySelectorAll(".lod"),a=0;a<3;a++)o[a].style.display=a===t?"block":"none"}b(),window.addEventListener("resize",b);</script>`;
}

async function generateMultiPngCode(pngs) {
    const imgs = await Promise.all(pngs.map(png => wrapPng(png)));
    const imgsHtml = imgs.join('');

    return `<div class="multi-container" style="width: 100%">${imgsHtml}</div><script>function b(){var e=document.querySelector(".multi-container").clientWidth,t=Math.ceil(Math.log(750/e)/Math.log(2));t=Math.max(t,0),t=Math.min(t,2);for(var o=document.querySelector(".multi-container").querySelectorAll(".lod"),a=0;a<3;a++)o[a].style.display=a===t?"block":"none"}b(),window.addEventListener("resize",b);</script>`;
}
