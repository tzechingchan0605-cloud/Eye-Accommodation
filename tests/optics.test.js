import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GEOMETRY, MAX_POWER, MIN_POWER, RETINAL_DISTANCE, bestFocus, traceEye, eyePower, spectaclePower, incomingVergence, retinalIntersection } from '../optics.js';

const initial = { vision: 'normal', object: 0, correction: null, focus: 0 };
const focused = (state) => traceEye({ ...state, focus: bestFocus(state) });

test('a normal eye can accommodate at every object distance, using a thicker lens for near objects', () => {
  let previous = -Infinity;
  for (let object = 0; object <= 100; object += 5) {
    const state = { ...initial, object };
    const focus = bestFocus(state);
    assert.ok(focus >= previous);
    assert.equal(focused(state).position, 'on');
    assert.ok(Math.abs(focused(state).error) < 1e-9);
    previous = focus;
  }
  assert.ok(eyePower(bestFocus(initial)) > eyePower(bestFocus({ ...initial, object: 100 })));
});

test('moving the object without accommodating changes focus in the expected direction', () => {
  const nearFocus = bestFocus(initial);
  assert.equal(traceEye({ ...initial, object: 100, focus: nearFocus }).position, 'before');
  const farFocus = bestFocus({ ...initial, object: 100 });
  assert.equal(traceEye({ ...initial, focus: farFocus }).position, 'behind');
});

test('Short-sightedness blurs distant objects in front of the retina even at the accommodation limit', () => {
  const state = { ...initial, vision: 'myopia', object: 100 };
  assert.equal(focused(state).position, 'before');
  assert.equal(bestFocus(state), 100);
  assert.equal(focused({ ...state, object: 0 }).position, 'on');
});

test('Long-sightedness blurs near objects behind the retina even at the accommodation limit', () => {
  const state = { ...initial, vision: 'hyperopia', object: 0 };
  assert.equal(focused(state).position, 'behind');
  assert.equal(bestFocus(state), 0);
  assert.equal(focused({ ...state, object: 100 }).position, 'on');
});

test('a concave lens has negative power and a convex lens has positive power', () => {
  assert.ok(spectaclePower('myopia') < 0);
  assert.ok(spectaclePower('hyperopia') > 0);
  assert.equal(spectaclePower(null), 0);
  for (const distance of [240, 500, 760]) {
    assert.ok(incomingVergence(distance, 'myopia') < incomingVergence(distance, null));
    assert.ok(incomingVergence(distance, 'hyperopia') > incomingVergence(distance, null));
  }
});

test('the matching prescription permits focusing at all object distances for both conditions', () => {
  for (const vision of ['myopia', 'hyperopia']) {
    for (let object = 0; object <= 100; object += 5) {
      const result = focused({ ...initial, vision, correction: vision, object });
      assert.equal(result.position, 'on', `${vision}, object distance ${object}`);
      assert.ok(Math.abs(result.error) < 1e-9);
    }
  }
});

test('a distant Short-sightedness example is corrected by adding only the concave lens', () => {
  const state = { ...initial, vision: 'myopia', object: 100, focus: 100 };
  assert.equal(traceEye(state).position, 'before');
  assert.equal(traceEye({ ...state, correction: 'myopia' }).position, 'on');
  assert.equal(traceEye({ ...state, correction: 'hyperopia' }).position, 'before');
});

test('a near Long-sightedness example is corrected by adding only the convex lens', () => {
  const state = { ...initial, vision: 'hyperopia', focus: bestFocus({ ...initial, vision: 'hyperopia', correction: 'hyperopia' }) };
  assert.equal(traceEye(state).position, 'behind');
  assert.equal(traceEye({ ...state, correction: 'hyperopia' }).position, 'on');
  assert.equal(traceEye({ ...state, correction: 'myopia' }).position, 'behind');
});

test('ray endpoints lie on the curved retina, and all supported controls produce finite geometry', () => {
  for (const vision of Object.keys(RETINAL_DISTANCE)) {
    for (const correction of [null, 'myopia', 'hyperopia']) {
      for (const focus of [0, 25, 50, 75, 100]) {
        for (const object of [0, 25, 50, 75, 100]) {
          const trace = traceEye({ vision, correction, focus, object });
          for (const value of Object.values(trace).filter(v => typeof v === 'number')) assert.ok(Number.isFinite(value));
          const cx = (GEOMETRY.frontX + trace.retinaX) / 2;
          const rx = (GEOMETRY.frontX - trace.retinaX) / 2;
          for (const sign of [-1, 1]) {
            const point = retinalIntersection(trace, sign);
            const ellipse = ((point.x - cx) / rx) ** 2 + ((point.y - GEOMETRY.axis) / GEOMETRY.radiusY) ** 2;
            assert.ok(Math.abs(ellipse - 1) < 1e-9);
            assert.ok(point.x < cx);
          }
        }
      }
    }
  }
  assert.ok(MAX_POWER > MIN_POWER);
});

test('both spectacle surfaces are optically consistent with the incident rays', () => {
  const gap = GEOMETRY.spectacleX - GEOMETRY.lensX;
  for (const correction of ['myopia', 'hyperopia']) {
    const trace = traceEye({ ...initial, correction });
    const objectToGlassSlope = trace.spectacleHeight / (trace.distance - gap);
    const glassToEyeSlope = (GEOMETRY.rayHeight - trace.spectacleHeight) / gap;
    assert.ok(Math.abs((objectToGlassSlope - glassToEyeSlope) / trace.spectacleHeight - spectaclePower(correction)) < 1e-12);
  }
});
