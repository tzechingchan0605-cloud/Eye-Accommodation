// Paraxial thin-lens model. Distances use schematic drawing units, not millimetres.
// Light travels from right to left. Positive vergence means converging rays.
export const GEOMETRY = Object.freeze({
  width: 1260, height: 630, axis: 315,
  lensX: 460, frontX: 525, radiusY: 175,
  spectacleX: 545, rayHeight: 70,
  objectNear: 240, objectFar: 760,
});

export const RETINAL_DISTANCE = Object.freeze({ normal: 285, myopia: 325, hyperopia: 245 });
export const MIN_POWER = 1 / RETINAL_DISTANCE.normal + 1 / GEOMETRY.objectFar;
export const MAX_POWER = 0.008;
export const FOCUS_TOLERANCE = 3;

export function objectDistance(value) {
  return GEOMETRY.objectNear + (GEOMETRY.objectFar - GEOMETRY.objectNear) * value / 100;
}

export function eyePower(focus) {
  return MAX_POWER - (MAX_POWER - MIN_POWER) * focus / 100;
}

// Each spectacle prescription corrects its eye at the far-object setting with
// the eye relaxed. Transfer vergence through the actual lens separation, so
// the rays change direction at both the spectacles and the eye lens.
export function spectaclePower(correction) {
  if (!correction) return 0;
  const gap = GEOMETRY.spectacleX - GEOMETRY.lensX;
  const targetAtEye = 1 / RETINAL_DISTANCE[correction] - MIN_POWER;
  const targetAtSpectacle = targetAtEye / (1 + gap * targetAtEye);
  return targetAtSpectacle + 1 / (GEOMETRY.objectFar - gap);
}

export function incomingVergence(distance, correction) {
  if (!correction) return -1 / distance;
  const gap = GEOMETRY.spectacleX - GEOMETRY.lensX;
  const afterSpectacle = -1 / (distance - gap) + spectaclePower(correction);
  return afterSpectacle / (1 - gap * afterSpectacle);
}

export function bestFocus({ vision, object, correction }) {
  const requiredPower = 1 / RETINAL_DISTANCE[vision] - incomingVergence(objectDistance(object), correction);
  const raw = 100 * (MAX_POWER - requiredPower) / (MAX_POWER - MIN_POWER);
  return Math.max(0, Math.min(100, raw));
}

export function traceEye(state) {
  const distance = objectDistance(state.object);
  const incoming = incomingVergence(distance, state.correction);
  const outgoing = eyePower(state.focus) + incoming;
  const imageDistance = 1 / outgoing;
  const retinalDistance = RETINAL_DISTANCE[state.vision];
  const error = imageDistance - retinalDistance;
  const position = Math.abs(error) <= FOCUS_TOLERANCE ? 'on' : error < 0 ? 'before' : 'behind';
  return {
    distance, incoming, outgoing, imageDistance, retinalDistance, error, position,
    objectX: GEOMETRY.lensX + distance,
    retinaX: GEOMETRY.lensX - retinalDistance,
    focusX: GEOMETRY.lensX - imageDistance,
    spectacleHeight: GEOMETRY.rayHeight * (1 + (GEOMETRY.spectacleX - GEOMETRY.lensX) * incoming),
    blur: Math.abs(GEOMETRY.rayHeight * (1 - retinalDistance / imageDistance)),
  };
}

// Intersect a refracted ray with the curved back of the eye, rather than
// terminating the rays at an arbitrary vertical line.
export function retinalIntersection(trace, sign = 1) {
  const { lensX, frontX, axis, radiusY, rayHeight } = GEOMETRY;
  const rx = (frontX - trace.retinaX) / 2;
  const cx = (frontX + trace.retinaX) / 2;
  const dx = lensX - cx;
  const h = sign * rayHeight;
  const slope = -h / trace.imageDistance;
  const a = 1 / rx ** 2 + slope ** 2 / radiusY ** 2;
  const b = -2 * dx / rx ** 2 + 2 * h * slope / radiusY ** 2;
  const c = dx ** 2 / rx ** 2 + h ** 2 / radiusY ** 2 - 1;
  const discriminant = Math.max(0, b ** 2 - 4 * a * c);
  const travel = (-b + Math.sqrt(discriminant)) / (2 * a);
  return { x: lensX - travel, y: axis + h + slope * travel };
}
