import { GEOMETRY as G, bestFocus, traceEye, retinalIntersection } from './optics.js';

const translations = {
  'zh-Hant': {
    title: '人眼的光學', simulationTitle: '人眼光線模擬', anatomy: '疊加眼球構造圖',
    correctionLegend: '矯正透鏡', concaveChoice: '顯示近視矯正透鏡（凹透鏡）', convexChoice: '顯示遠視矯正透鏡（凸透鏡）',
    near: '近', far: '遠', focusDistance: '調焦距離', objectDistance: '物距',
    focusHelp: '向近端移動，晶體變厚，折射能力增強；向遠端移動則相反。',
    visionLegend: '眼睛狀態', normal: '正常視力', myopia: '近視', hyperopia: '遠視',
    fullscreen: '全螢幕', exitFullscreen: '離開全螢幕', bestFocus: '調節至最清晰', reset: '重設',
    observe: '觀察與解釋', retinalImage: '視網膜上的像（示意）', clear: '清晰', blurred: '模糊',
    learningTitle: '試一試：眼睛如何對焦？', learningHint: '選擇情境，再移動滑桿或加入矯正透鏡。',
    nearTitle: '看近物：晶體變厚', farTitle: '看遠物：晶體變薄',
    myopiaTitle: '近視：用凹透鏡矯正', hyperopiaTitle: '遠視：用凸透鏡矯正',
    nearLesson: '近物發出的光線較發散。睫狀肌收縮，懸韌帶鬆弛，晶體因本身的彈性而變厚、曲率增加，光線的折射幅度增大，使光線聚焦在視網膜上。',
    farLesson: '遠物射入眼睛的光線較接近平行。睫狀肌鬆弛，懸韌帶繃緊，晶體變薄、曲率減少，光線的折射幅度減小，使像仍成在視網膜上。',
    myopiaLesson: '眼球過長或晶體過厚（也可同時出現），使遠物的像成在視網膜前。凹透鏡是發散透鏡，中央較薄、邊緣較厚，先使光線發散，讓眼睛把光線聚焦在視網膜上。',
    hyperopiaLesson: '眼球過短或晶體過薄（也可同時出現），使近物的像成在視網膜後。凸透鏡是聚光透鏡，中央較厚、邊緣較薄，先使光線會聚，再經眼睛折射，讓光線聚焦在視網膜上。',
    modelNote: '本圖為簡化薄透鏡模型，並非按比例繪製；以晶體代表眼睛的整體聚光作用，實際上角膜、水狀液及玻璃狀液也有折射作用。紅線表示光路，箭嘴表示光的行進方向，虛線表示延伸線。視網膜上的 F 只示意清晰程度，並非上方軸上點物體的像。',
    credit: '依據 oPhysics「Optics of the Human Eye」畫面布局獨立重製，無需 GeoGebra。中文用語參照所提供課本第 16.2 節（16–18 至 16–21 頁）。',
    retinaLabel: '視網膜', lensLabel: '晶體', objectLabel: '物體', concaveLabel: '凹透鏡', convexLabel: '凸透鏡',
    diagramTitle: '人眼光線圖：光線從右向左行進',
    diagramDescription: '光線從右方物體穿過眼睛的晶體，到達左方視網膜。拖動紫色物體或使用物距滑桿，可改變物距。',
    onStatus: '光線聚焦在視網膜上 · 影像清晰', beforeStatus: '光線聚焦在視網膜前 · 影像模糊', behindStatus: '光線聚焦在視網膜後 · 影像模糊',
    onObservation: '光線到達視網膜時會聚成一點，形成清晰的像。物距改變時，需要調節晶體的形狀，才可繼續把光線聚焦在視網膜上。',
    beforeObservation: '光線在到達視網膜前已經會聚，然後再發散；到達視網膜時不再是同一點，因此影像模糊。可把晶體調薄，減弱折射能力；若已達調節極限，便需要合適的矯正透鏡。',
    behindObservation: '光線到達視網膜時仍未會聚成一點，因此影像模糊。圖中的虛線顯示：若光線繼續行進，會在視網膜後會聚。可把晶體調厚，增強折射能力；若已達調節極限，便需要合適的矯正透鏡。',
    concaveExplanation: '凹透鏡先使光線發散，降低光線進入眼睛時的會聚程度。對近視眼而言，這可使原本在視網膜前的聚焦位置後移至視網膜。',
    convexExplanation: '凸透鏡先使光線會聚，增加光線進入眼睛時的會聚程度。對遠視眼而言，這可使原本在視網膜後的聚焦位置前移至視網膜。',
    wrongCorrection: '目前的透鏡並非此眼睛狀態的對應矯正透鏡；觀察它如何改變光路。',
    thick: '晶體較厚、曲率較大，折射能力較強：偏向看近物的設定。',
    thin: '晶體較薄、曲率較小，折射能力較弱：偏向看遠物的設定。',
    middle: '晶體處於中間厚度。調焦距離滑桿控制晶體形狀；物距滑桿只移動物體，兩者可獨立操作。',
    limited: '已調至此眼睛可達的最清晰設定，仍不能在視網膜上聚焦。請嘗試合適的矯正透鏡。',
    dragObject: '物體：可沿主軸左右拖動', lensThick: '較厚', lensThin: '較薄',
  },
  en: {
    title: 'Optics of the Human Eye', simulationTitle: 'Human-eye ray simulation', anatomy: 'Overlay Eye Anatomy Image',
    correctionLegend: 'Corrective lenses', concaveChoice: 'Correct Short-sightedness (concave lens)', convexChoice: 'Correct Long-sightedness (convex lens)',
    near: 'Near', far: 'Far', focusDistance: 'Focus Distance', objectDistance: 'Object Distance',
    focusHelp: 'Move towards Near to make the eye lens thicker and increase its refracting power; move towards Far for the opposite effect.',
    visionLegend: 'Eye condition', normal: 'Normal Vision', myopia: 'Short-sightedness', hyperopia: 'Long-sightedness',
    fullscreen: 'Full screen', exitFullscreen: 'Exit full screen', bestFocus: 'Adjust for clearest image', reset: 'Reset',
    observe: 'Observe and explain', retinalImage: 'Retinal image (illustration)', clear: 'Clear', blurred: 'Blurred',
    learningTitle: 'Try it: how does the eye focus?', learningHint: 'Choose a scenario, then move the sliders or add a corrective lens.',
    nearTitle: 'Near objects: a thicker eye lens', farTitle: 'Distant objects: a thinner eye lens',
    myopiaTitle: 'Short-sightedness: a concave lens', hyperopiaTitle: 'Long-sightedness: a convex lens',
    nearLesson: 'Light from a near object is more divergent. The ciliary muscles contract and the suspensory ligaments slacken. The elastic eye lens becomes thicker and more curved, increasing refraction so that light focuses on the retina.',
    farLesson: 'Light from a distant object is more nearly parallel. The ciliary muscles relax and the suspensory ligaments become taut. The eye lens becomes thinner and less curved, reducing refraction so that the image remains on the retina.',
    myopiaLesson: 'An eyeball that is too long, an eye lens that is too thick, or both cause distant objects to focus in front of the retina. A concave (diverging) lens is thinner at the centre and thicker at the edges. It first diverges the light so that the eye can focus it on the retina.',
    hyperopiaLesson: 'An eyeball that is too short, an eye lens that is too thin, or both cause near objects to focus behind the retina. A convex (converging) lens is thicker at the centre and thinner at the edges. It first converges the light, helping the eye focus it on the retina.',
    modelNote: 'A simplified thin-lens model; not to scale. The eye lens represents the eye’s combined focusing action: the cornea, aqueous humour and vitreous humour also refract light. Red lines show light paths; arrows show the direction of travel; dashed lines are extensions. The retinal F illustrates sharpness only; it is not the image of the on-axis point object above.',
    credit: 'Independently recreated from the layout of oPhysics “Optics of the Human Eye”; no GeoGebra required. Chinese terminology follows the supplied textbook, section 16.2 (pp. 16–18 to 16–21).',
    retinaLabel: 'Retina', lensLabel: 'Lens', objectLabel: 'Object', concaveLabel: 'Concave lens', convexLabel: 'Convex lens',
    diagramTitle: 'Eye ray diagram: light travels from right to left',
    diagramDescription: 'Light travels from the object on the right through the eye lens to the retina on the left. Drag the purple object or use the Object Distance slider to change its distance.',
    onStatus: 'Light focuses on the retina · Clear image', beforeStatus: 'Light focuses in front of the retina · Blurred image', behindStatus: 'Light focuses behind the retina · Blurred image',
    onObservation: 'The rays meet at a point on the retina, forming a clear image. When the object distance changes, the eye lens must change shape to keep the light focused on the retina.',
    beforeObservation: 'The rays meet before reaching the retina and then diverge again. They reach different points on the retina, so the image is blurred. Try a thinner eye lens to reduce refraction. If the eye has reached its accommodation limit, a suitable corrective lens is needed.',
    behindObservation: 'The rays have not yet met when they reach the retina, so the image is blurred. The dashed extensions show where they would meet behind the retina. Try a thicker eye lens to increase refraction. If the eye has reached its accommodation limit, a suitable corrective lens is needed.',
    concaveExplanation: 'The concave lens first diverges the light, reducing its convergence on entering the eye. For Short-sightedness, this moves the focus from in front of the retina back onto it.',
    convexExplanation: 'The convex lens first converges the light, increasing its convergence on entering the eye. For Long-sightedness, this moves the focus from behind the retina forwards onto it.',
    wrongCorrection: 'This is not the matching corrective lens for the selected eye condition. Observe how it changes the light path.',
    thick: 'A thicker, more curved eye lens refracts light more strongly: this setting is towards near vision.',
    thin: 'A thinner, less curved eye lens refracts light less strongly: this setting is towards distant vision.',
    middle: 'The eye lens is at an intermediate thickness. Focus Distance changes its shape; Object Distance only moves the object. The two sliders work independently.',
    limited: 'This is the clearest setting within this eye’s accommodation range, but the rays still do not focus on the retina. Try the appropriate corrective lens.',
    dragObject: 'Object: drag horizontally along the principal axis', lensThick: 'thicker', lensThin: 'thinner',
  },
};

const $ = (selector) => document.querySelector(selector);
const svgNamespace = 'http://www.w3.org/2000/svg';
let language = 'zh-Hant';
try { if (localStorage.getItem('eye-language') === 'en') language = 'en'; } catch { /* Storage is optional. */ }
const state = { vision: 'normal', object: 0, correction: null, focus: 0, anatomy: 0 };
state.focus = bestFocus(state);
let showingLimit = false;
const t = (key) => translations[language][key];

function svgElement(name, attributes) {
  const element = document.createElementNS(svgNamespace, name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}

function updateAnatomy(cx, rx) {
  const group = $('#anatomy');
  group.replaceChildren();
  group.append(
    svgElement('ellipse', { cx, cy: G.axis, rx: rx - 6, ry: 169, fill: '#fff7f4', stroke: '#d9a5a0', 'stroke-width': 12 }),
    svgElement('ellipse', { cx, cy: G.axis, rx: rx - 14, ry: 161, fill: '#fffaf4', stroke: '#9b6a56', 'stroke-width': 5 }),
    svgElement('path', { d: `M${cx - rx + 6} 292 L${cx - rx - 62} 278 L${cx - rx - 64} 301 L${cx - rx + 3} 319 Z`, fill: '#efd2b3', stroke: '#b9956f', 'stroke-width': 2 }),
    svgElement('path', { d: 'M484 196 Q475 205 472 224 M484 434 Q475 425 472 406', fill: 'none', stroke: '#af7772', 'stroke-width': 16, 'stroke-linecap': 'round' }),
    svgElement('path', { d: 'M476 213 L455 228 M482 217 L472 237 M476 417 L455 402 M482 413 L472 393', stroke: '#997c58', 'stroke-width': 2 }),
    svgElement('path', { d: 'M500 232 Q489 251 492 272 M500 398 Q489 379 492 358', fill: 'none', stroke: '#83734b', 'stroke-width': 9 }),
    svgElement('path', { d: 'M508 250 Q548 315 508 380', fill: '#e9f6ff', 'fill-opacity': .4, stroke: '#acd0dd', 'stroke-width': 3 }),
  );
  group.setAttribute('opacity', state.anatomy / 100);
}

function raySegment(start, end, withArrow = true) {
  const points = [start];
  if (withArrow) points.push({ x: start.x + (end.x - start.x) * .48, y: start.y + (end.y - start.y) * .48 });
  points.push(end);
  return svgElement('polyline', { points: points.map(p => `${p.x},${p.y}`).join(' '), ...(withArrow ? { 'marker-mid': 'url(#ray-arrow)' } : {}) });
}

function renderDiagram(trace) {
  const cx = (G.frontX + trace.retinaX) / 2;
  const rx = (G.frontX - trace.retinaX) / 2;
  $('#eye-outline').setAttribute('d', `M${G.frontX} ${G.axis} A${rx} 175 0 1 0 ${trace.retinaX} ${G.axis} A${rx} 175 0 1 0 ${G.frontX} ${G.axis}`);
  $('#retina').setAttribute('d', `M${cx - rx / 2} ${G.axis - 151.55} A${rx} 175 0 0 0 ${cx - rx / 2} ${G.axis + 151.55}`);
  $('#eye-lens').setAttribute('rx', 12 + 23 * (1 - state.focus / 100));
  updateAnatomy(cx, rx);

  const retinaLabelX = trace.retinaX - 4;
  $('#retina-label').setAttribute('x', retinaLabelX);
  $('#retina-label-line').setAttribute('d', `M${retinaLabelX - 5} 229 L${cx - .928 * rx} 250`);
  const spectacle = $('#spectacle');
  spectacle.style.display = state.correction ? '' : 'none';
  $('#spectacle-label').textContent = state.correction ? t(state.correction === 'myopia' ? 'concaveLabel' : 'convexLabel') : '';
  if (state.correction === 'myopia') {
    spectacle.setAttribute('d', 'M526 215 Q552 315 526 415 L564 415 Q538 315 564 215 Z');
  } else if (state.correction === 'hyperopia') {
    spectacle.setAttribute('d', 'M545 215 C505 240 505 390 545 415 C585 390 585 240 545 215 Z');
  }

  const rays = $('#rays');
  const extensions = $('#extensions');
  rays.replaceChildren();
  extensions.replaceChildren();
  for (const sign of [-1, 1]) {
    const object = { x: trace.objectX, y: G.axis };
    const lens = { x: G.lensX, y: G.axis + sign * G.rayHeight };
    if (state.correction) {
      const glass = { x: G.spectacleX, y: G.axis + sign * trace.spectacleHeight };
      rays.append(raySegment(object, glass), raySegment(glass, lens, false));
    } else rays.append(raySegment(object, lens));
    const retina = retinalIntersection(trace, sign);
    rays.append(raySegment(lens, retina));
    if (trace.position === 'behind') extensions.append(raySegment(retina, { x: trace.focusX, y: G.axis }, false));
  }
  $('#focus-point').setAttribute('cx', trace.focusX);
  $('#focus-point').setAttribute('cy', G.axis);
  $('#focus-point').setAttribute('opacity', trace.position === 'on' ? '0' : '.8');
  $('#object-handle').setAttribute('transform', `translate(${trace.objectX} ${G.axis})`);
  $('#object-handle').setAttribute('aria-label', t('dragObject'));
  $('#object-label').setAttribute('x', trace.objectX > 1180 ? trace.objectX - 5 : trace.objectX + 5);
  $('#object-label').setAttribute('text-anchor', trace.objectX > 1180 ? 'end' : 'start');
  $('#object-label').setAttribute('y', G.axis - 11);
  $('#diagram-description').textContent = `${t('diagramDescription')} ${t(`${trace.position}Status`)}`;
  $('#diagram').dataset.focusPosition = trace.position;
  $('#diagram').dataset.focusX = trace.focusX.toFixed(3);
  $('#diagram').dataset.retinaX = trace.retinaX.toFixed(3);
}

function render() {
  const trace = traceEye(state);
  $('#focus-slider').value = state.focus;
  $('#object-slider').value = state.object;
  $('#anatomy-slider').value = state.anatomy;
  $('#focus-slider').setAttribute('aria-valuetext', `${Math.round(state.focus)}% · ${t(state.focus < 50 ? 'lensThick' : 'lensThin')}`);
  $('#object-slider').setAttribute('aria-valuetext', `${Math.round(state.object)}% · ${t(state.object < 50 ? 'near' : 'far')}`);
  for (const radio of document.querySelectorAll('[name="vision"]')) radio.checked = radio.value === state.vision;
  $('#concave').checked = state.correction === 'myopia';
  $('#convex').checked = state.correction === 'hyperopia';
  renderDiagram(trace);
  $('#focus-status').textContent = t(`${trace.position}Status`);
  $('#status-dot').classList.toggle('clear', trace.position === 'on');
  $('#observation-text').textContent = showingLimit && trace.position !== 'on' ? t('limited') : t(`${trace.position}Observation`);
  let correctionText = state.correction ? t(state.correction === 'myopia' ? 'concaveExplanation' : 'convexExplanation') : '';
  if (state.correction && state.correction !== state.vision) correctionText += ` ${t('wrongCorrection')}`;
  $('#correction-text').textContent = correctionText;
  $('#accommodation-text').textContent = t(state.focus < 34 ? 'thick' : state.focus > 66 ? 'thin' : 'middle');
  $('#clarity-label').textContent = t(trace.position === 'on' ? 'clear' : 'blurred');
  $('#retinal-letter').style.filter = `blur(${trace.position === 'on' ? 0 : Math.min(6, Math.max(.8, trace.blur / 3))}px)`;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = t('title');
  for (const element of document.querySelectorAll('[data-i18n]')) element.textContent = t(element.dataset.i18n);
  const button = $('#language');
  button.replaceChildren(document.createTextNode(language === 'zh-Hant' ? 'English ' : '繁體中文 '));
  button.lang = language === 'zh-Hant' ? 'en' : 'zh-Hant';
  button.setAttribute('aria-label', language === 'zh-Hant' ? 'Switch to English' : '切換至繁體中文');
  const icon = document.createElement('span');
  icon.textContent = '⇄';
  icon.setAttribute('aria-hidden', 'true');
  button.append(icon);
  for (const [id, key] of [['retina-label', 'retinaLabel'], ['lens-label', 'lensLabel'], ['object-label', 'objectLabel'], ['diagram-title', 'diagramTitle']]) $( `#${id}`).textContent = t(key);
  updateFullscreenLabel();
  render();
}

function updateFullscreenLabel() {
  const text = t(document.fullscreenElement ? 'exitFullscreen' : 'fullscreen');
  $('#fullscreen').setAttribute('aria-label', text);
  $('#fullscreen').title = text;
}

for (const [id, key] of [['focus-slider', 'focus'], ['object-slider', 'object'], ['anatomy-slider', 'anatomy']]) {
  $(`#${id}`).addEventListener('input', event => {
    state[key] = Number(event.target.value);
    showingLimit = false;
    render();
  });
}
for (const input of document.querySelectorAll('[name="vision"]')) input.addEventListener('change', () => {
  state.vision = input.value;
  showingLimit = false;
  render();
});
for (const [id, correction] of [['concave', 'myopia'], ['convex', 'hyperopia']]) $(`#${id}`).addEventListener('change', event => {
  state.correction = event.target.checked ? correction : null;
  showingLimit = false;
  render();
});
$('#language').addEventListener('click', () => {
  language = language === 'zh-Hant' ? 'en' : 'zh-Hant';
  try { localStorage.setItem('eye-language', language); } catch { /* Storage is optional. */ }
  applyLanguage();
});
$('#best-focus').addEventListener('click', () => {
  state.focus = bestFocus(state);
  showingLimit = true;
  render();
});
$('#reset').addEventListener('click', () => {
  Object.assign(state, { vision: 'normal', object: 0, correction: null, anatomy: 0 });
  state.focus = bestFocus(state);
  showingLimit = false;
  render();
});
for (const button of document.querySelectorAll('[data-scenario]')) button.addEventListener('click', () => {
  const scenario = button.dataset.scenario;
  state.vision = ['myopia', 'hyperopia'].includes(scenario) ? scenario : 'normal';
  state.object = ['far', 'myopia'].includes(scenario) ? 100 : 0;
  state.correction = null;
  // Long-sightedness is shown with the accommodation setting that will be
  // correct once the convex lens is added: the checkbox alone fixes this example.
  state.focus = bestFocus({ ...state, correction: scenario === 'hyperopia' ? 'hyperopia' : null });
  showingLimit = false;
  render();
  const simulator = $('#simulation');
  simulator.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    // Keep the lower sliders and eye-condition controls visible on short screens.
    block: simulator.getBoundingClientRect().height > window.innerHeight ? 'end' : 'start',
  });
});

$('#fullscreen').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if ($('#simulation').requestFullscreen) await $('#simulation').requestFullscreen();
    else $('#simulation').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch { $('#simulation').scrollIntoView({ block: 'start' }); }
});
document.addEventListener('fullscreenchange', updateFullscreenLabel);

let dragPointer = null;
const objectHandle = $('#object-handle');
objectHandle.addEventListener('pointerdown', event => {
  event.preventDefault();
  dragPointer = event.pointerId;
  objectHandle.setPointerCapture(dragPointer);
});
objectHandle.addEventListener('pointermove', event => {
  if (event.pointerId !== dragPointer) return;
  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform($('#diagram').getScreenCTM().inverse());
  state.object = Math.max(0, Math.min(100, 100 * (point.x - G.lensX - G.objectNear) / (G.objectFar - G.objectNear)));
  showingLimit = false;
  render();
});
for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) objectHandle.addEventListener(eventName, () => { dragPointer = null; });

applyLanguage();
