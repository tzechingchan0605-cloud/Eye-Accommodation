import { GEOMETRY as G, bestFocus, traceEye, retinalIntersection } from './optics.js';

const translations = {
  'zh-Hant': {
    title: '人眼的光學', simulationTitle: '人眼光線模擬', anatomy: '疊加眼球構造圖',
    correctionLegend: '矯正透鏡', concaveChoice: '顯示凹透鏡', convexChoice: '顯示凸透鏡',
    near: '近', far: '遠', focusDistance: '調焦距離', objectDistance: '物距',
    focusHelp: '向近端移動，晶體變厚，折射能力增強；向遠端移動則相反。',
    visionLegend: '眼睛狀態', normal: '正常視力', myopia: '近視', hyperopia: '遠視',
    fullscreen: '全螢幕', exitFullscreen: '離開全螢幕', bestFocus: '調節至最清晰', reset: '重設',
    observe: '第一步：觀察', conclusionHeading: '第二步：結論與解釋',
    showConclusion: '顯示結論與解釋', hideConclusion: '收起結論與解釋',
    retinalImage: '視網膜上的像（示意）', clear: '清晰', blurred: '模糊',
    learningTitle: '試一試：眼睛如何對焦？', learningHint: '選擇情境，再移動滑桿或加入矯正透鏡。',
    nearTitle: '聚焦近物', farTitle: '聚焦遠物',
    myopiaTitle: '近視的成像與矯正', hyperopiaTitle: '遠視的成像與矯正',
    nearQuestion: '物體由遠移近時，光線的發散程度有甚麼改變？要把光線重新聚焦在視網膜上，晶體的厚度和曲率須怎樣改變？',
    farQuestion: '物體由近移遠時，射入眼睛的光線有甚麼改變？要保持影像清晰，晶體的厚度和曲率須怎樣改變？',
    myopiaQuestion: '觀察近視眼看遠物時的聚焦位置。分別加入兩種矯正透鏡，哪一種能使光線聚焦在視網膜上？',
    hyperopiaQuestion: '觀察遠視眼看近物時的聚焦位置。分別加入兩種矯正透鏡，哪一種能使光線聚焦在視網膜上？',
    nearPrompt: '把物距由遠移向近，暫時保持調焦距離不變。光線的發散程度和聚焦位置有甚麼改變？再調節調焦距離，使光線重新聚焦在視網膜上，觀察晶體的厚度和曲率有甚麼改變。',
    farPrompt: '把物距由近移向遠，暫時保持調焦距離不變。射入眼睛的光線和聚焦位置有甚麼改變？再調節調焦距離，使光線重新聚焦在視網膜上，觀察晶體的厚度和曲率有甚麼改變。',
    myopiaPrompt: '先不加矯正透鏡，選擇遠物，把晶體調至最薄。光線在視網膜前方、上，還是後方聚焦？影像清晰嗎？再分別加入兩種矯正透鏡，比較光路和聚焦位置有甚麼改變。',
    hyperopiaPrompt: '先不加矯正透鏡，選擇近物，把晶體調至最厚。光線在視網膜前方、上，還是後方聚焦？影像清晰嗎？再分別加入兩種矯正透鏡，比較光路和聚焦位置有甚麼改變。',
    correctionPrompt: '觀察光線通過眼鏡透鏡前後的行進方向：光線的發散或會聚程度有甚麼改變？取消勾選，再重新加入透鏡，比較聚焦位置及視網膜上的影像。哪一種透鏡能使影像清晰？',
    nearLesson: '來自近物的光線發散程度較高，需要較大幅度的折射。聚焦近物時，睫狀肌收縮，使懸韌帶的張力減少並變得鬆弛；晶體藉本身的彈性變厚、曲率增加，光線折射的幅度較大，因而能聚焦在視網膜上。',
    farLesson: '來自遠物的光線幾乎平行，所需的折射幅度較小。聚焦遠物時，睫狀肌鬆弛，使懸韌帶的張力增加並變得繃緊；晶體被拉成較薄的形狀、曲率減少，光線折射的幅度較小，因而能聚焦在視網膜上。',
    myopiaCause: '近視患者看近物時比看遠物清楚。成因可能是眼球過長或晶體過厚，也可同時出現；來自遠物的光線在視網膜前方聚焦，使視網膜上的影像模糊不清。',
    hyperopiaCause: '遠視患者看遠物時比看近物清楚。成因可能是眼球過短或晶體過薄，也可同時出現；來自近物的光線在視網膜後方聚焦，使視網膜上的影像模糊不清。',
    modelNote: '本圖為簡化薄透鏡模型，並非按比例繪製；以晶體代表眼睛的整體聚光作用，實際上角膜、水狀液及玻璃狀液也有折射作用。紅線表示光路，箭嘴表示光的行進方向，虛線表示延伸線。視網膜上的 F 只示意清晰程度，並非上方軸上點物體的像。',
    retinaLabel: '視網膜', lensLabel: '晶體', objectLabel: '物體', concaveLabel: '凹透鏡', convexLabel: '凸透鏡',
    diagramTitle: '人眼光線圖：光線從右向左行進',
    diagramDescription: '光線從右方物體穿過眼睛的晶體，到達左方視網膜。拖動紫色物體或使用物距滑桿，可改變物距。',
    onStatus: '光線聚焦在視網膜上 · 影像清晰', beforeStatus: '光線聚焦在視網膜前 · 影像模糊', behindStatus: '光線聚焦在視網膜後 · 影像模糊',
    onConclusion: '在這個設定下，來自物體的光線聚焦在視網膜上，因此形成清晰的影像。晶體能藉改變形狀（曲率）來調節光線的折射幅度，把來自不同距離物體的光線聚焦，這種能力稱為視覺調節。',
    beforeConclusion: '在這個設定下，光線在視網膜前方聚焦，到達視網膜時已再次發散，因此影像模糊不清。把晶體調薄可減少光線折射的幅度；若已達視覺調節的限度，便需要合適的矯正透鏡。',
    behindConclusion: '在這個設定下，光線到達視網膜時尚未聚焦，因此影像模糊不清。虛線顯示光線會在視網膜後方聚焦。把晶體調厚可增加光線折射的幅度；若已達視覺調節的限度，便需要合適的矯正透鏡。',
    concaveExplanation: '凹透鏡是發散透鏡，中央部分較薄、邊緣部分較厚。用於矯正近視時，來自遠物的光線在進入眼球前先被凹透鏡發散，再經眼睛折射後，影像便能聚焦在視網膜上。',
    convexExplanation: '凸透鏡是聚光透鏡，中央部分較厚、邊緣部分較薄。用於矯正遠視時，來自近物的光線在進入眼球前先被凸透鏡會聚，再經角膜和晶體進一步折射後，光線便能聚焦在視網膜上。',
    wrongCorrection: '目前的透鏡並非此眼睛狀態的對應矯正透鏡；觀察它如何改變光路。',
    limited: '晶體已達這個眼睛可用的視覺調節限度，仍不能使光線聚焦在視網膜上，因此需要合適的矯正透鏡。',
    dragObject: '物體：可沿主軸左右拖動', lensThick: '較厚', lensThin: '較薄',
  },
  en: {
    title: 'Optics of the Human Eye', simulationTitle: 'Human-eye ray simulation', anatomy: 'Overlay Eye Anatomy Image',
    correctionLegend: 'Corrective lenses', concaveChoice: 'Show concave lens', convexChoice: 'Show convex lens',
    near: 'Near', far: 'Far', focusDistance: 'Focus Distance', objectDistance: 'Object Distance',
    focusHelp: 'Move towards Near to make the eye lens thicker and increase its refracting power; move towards Far for the opposite effect.',
    visionLegend: 'Eye condition', normal: 'Normal Vision', myopia: 'Short-sightedness', hyperopia: 'Long-sightedness',
    fullscreen: 'Full screen', exitFullscreen: 'Exit full screen', bestFocus: 'Adjust for clearest image', reset: 'Reset',
    observe: 'Step 1: Observe', conclusionHeading: 'Step 2: Conclude and explain',
    showConclusion: 'Show conclusion and explanation', hideConclusion: 'Hide conclusion and explanation',
    retinalImage: 'Retinal image (illustration)', clear: 'Clear', blurred: 'Blurred',
    learningTitle: 'Try it: how does the eye focus?', learningHint: 'Choose a scenario, then move the sliders or add a corrective lens.',
    nearTitle: 'Focusing on a near object', farTitle: 'Focusing on a distant object',
    myopiaTitle: 'Short-sightedness and its correction', hyperopiaTitle: 'Long-sightedness and its correction',
    nearQuestion: 'As an object moves closer, how does the divergence of its light change? How must the thickness and curvature of the eye lens change to focus the light on the retina again?',
    farQuestion: 'As an object moves further away, how does the light entering the eye change? How must the thickness and curvature of the eye lens change to keep the image clear?',
    myopiaQuestion: 'Observe where a short-sighted eye focuses light from a distant object. Try each corrective lens. Which one brings the focus onto the retina?',
    hyperopiaQuestion: 'Observe where a long-sighted eye focuses light from a near object. Try each corrective lens. Which one brings the focus onto the retina?',
    nearPrompt: 'Move Object Distance from Far towards Near while keeping Focus Distance unchanged. How do the divergence of the light and the focus position change? Then adjust Focus Distance to focus the light on the retina again. Observe how the thickness and curvature of the eye lens change.',
    farPrompt: 'Move Object Distance from Near towards Far while keeping Focus Distance unchanged. How do the incident light and the focus position change? Then adjust Focus Distance to focus the light on the retina again. Observe how the thickness and curvature of the eye lens change.',
    myopiaPrompt: 'First remove any corrective lens, choose a distant object and make the eye lens as thin as possible. Does the light focus in front of, on or behind the retina? Is the image clear? Try each corrective lens and compare the light paths and focus positions.',
    hyperopiaPrompt: 'First remove any corrective lens, choose a near object and make the eye lens as thick as possible. Does the light focus in front of, on or behind the retina? Is the image clear? Try each corrective lens and compare the light paths and focus positions.',
    correctionPrompt: 'Observe the direction of light before and after it passes through the spectacle lens. How does its divergence or convergence change? Remove and reapply the lens to compare the focus position and retinal image. Which lens makes the image clear?',
    nearLesson: 'Light from a near object is more divergent. The ciliary muscles contract and the suspensory ligaments slacken. The elastic eye lens becomes thicker and more curved, increasing refraction so that light focuses on the retina.',
    farLesson: 'Light from a distant object is more nearly parallel. The ciliary muscles relax and the suspensory ligaments become taut. The eye lens becomes thinner and less curved, reducing refraction so that the image remains on the retina.',
    myopiaCause: 'With Short-sightedness, near objects are seen more clearly than distant objects. An eyeball that is too long, an eye lens that is too thick, or both cause light from a distant object to focus in front of the retina, producing a blurred retinal image.',
    hyperopiaCause: 'With Long-sightedness, distant objects are seen more clearly than near objects. An eyeball that is too short, an eye lens that is too thin, or both cause light from a near object to focus behind the retina, producing a blurred retinal image.',
    modelNote: 'A simplified thin-lens model; not to scale. The eye lens represents the eye’s combined focusing action: the cornea, aqueous humour and vitreous humour also refract light. Red lines show light paths; arrows show the direction of travel; dashed lines are extensions. The retinal F illustrates sharpness only; it is not the image of the on-axis point object above.',
    retinaLabel: 'Retina', lensLabel: 'Lens', objectLabel: 'Object', concaveLabel: 'Concave lens', convexLabel: 'Convex lens',
    diagramTitle: 'Eye ray diagram: light travels from right to left',
    diagramDescription: 'Light travels from the object on the right through the eye lens to the retina on the left. Drag the purple object or use the Object Distance slider to change its distance.',
    onStatus: 'Light focuses on the retina · Clear image', beforeStatus: 'Light focuses in front of the retina · Blurred image', behindStatus: 'Light focuses behind the retina · Blurred image',
    onConclusion: 'In this setting, light from the object focuses on the retina, forming a clear image. The eye lens can change its shape (curvature) to adjust refraction and focus light from objects at different distances. This ability is called eye accommodation.',
    beforeConclusion: 'In this setting, light focuses in front of the retina and then diverges again before reaching it, producing a blurred image. A thinner eye lens reduces refraction. If the eye has reached its accommodation limit, a suitable corrective lens is needed.',
    behindConclusion: 'In this setting, light has not yet focused when it reaches the retina, producing a blurred image. The dashed extensions show that it would focus behind the retina. A thicker eye lens increases refraction. If the eye has reached its accommodation limit, a suitable corrective lens is needed.',
    concaveExplanation: 'A concave (diverging) lens is thinner at the centre and thicker at the edges. To correct Short-sightedness, it first diverges light from a distant object before the light enters the eye. The eye then refracts it to focus on the retina.',
    convexExplanation: 'A convex (converging) lens is thicker at the centre and thinner at the edges. To correct Long-sightedness, it first converges light from a near object before the light enters the eye. Further refraction by the cornea and eye lens brings the focus onto the retina.',
    wrongCorrection: 'This is not the matching corrective lens for the selected eye condition. Observe how it changes the light path.',
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
let conclusionRevealed = false;
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

function render({ resetConclusion = false } = {}) {
  if (resetConclusion) conclusionRevealed = false;
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
  const normalPrompt = state.object < 50 ? 'nearPrompt' : 'farPrompt';
  const prompt = state.correction ? 'correctionPrompt'
    : state.vision === 'normal' ? normalPrompt : `${state.vision}Prompt`;
  $('#observation-text').textContent = t(prompt);
  $('#conclusion-panel').hidden = !conclusionRevealed;
  $('#show-conclusion').setAttribute('aria-expanded', String(conclusionRevealed));
  $('#show-conclusion').textContent = t(conclusionRevealed ? 'hideConclusion' : 'showConclusion');
  $('#conclusion-text').textContent = t(`${trace.position}Conclusion`)
    + (showingLimit && trace.position !== 'on' ? ` ${t('limited')}` : '');
  $('#vision-text').textContent = state.vision === 'normal' ? '' : t(`${state.vision}Cause`);
  const correctionToExplain = state.correction || (state.vision === 'normal' ? null : state.vision);
  let correctionText = correctionToExplain ? t(correctionToExplain === 'myopia' ? 'concaveExplanation' : 'convexExplanation') : '';
  if (state.correction && state.correction !== state.vision) correctionText += ` ${t('wrongCorrection')}`;
  $('#correction-text').textContent = correctionText;
  $('#accommodation-text').textContent = state.vision === 'normal' ? t(state.object < 50 ? 'nearLesson' : 'farLesson') : '';
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
    if (key !== 'anatomy') showingLimit = false;
    render({ resetConclusion: key !== 'anatomy' });
  });
}
for (const input of document.querySelectorAll('[name="vision"]')) input.addEventListener('change', () => {
  state.vision = input.value;
  showingLimit = false;
  render({ resetConclusion: true });
});
for (const [id, correction] of [['concave', 'myopia'], ['convex', 'hyperopia']]) $(`#${id}`).addEventListener('change', event => {
  state.correction = event.target.checked ? correction : null;
  showingLimit = false;
  render({ resetConclusion: true });
});
$('#show-conclusion').addEventListener('click', () => {
  conclusionRevealed = !conclusionRevealed;
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
  render({ resetConclusion: true });
});
$('#reset').addEventListener('click', () => {
  Object.assign(state, { vision: 'normal', object: 0, correction: null, anatomy: 0 });
  state.focus = bestFocus(state);
  showingLimit = false;
  render({ resetConclusion: true });
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
  render({ resetConclusion: true });
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
  render({ resetConclusion: true });
});
for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) objectHandle.addEventListener(eventName, () => { dragPointer = null; });

applyLanguage();
