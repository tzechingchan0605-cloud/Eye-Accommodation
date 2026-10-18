# Optics of the Human Eye · 人眼的光學

An independently written, interactive ray simulation for Hong Kong Form 5 lessons. The white canvas, eye on the left, object on the right, sliders and checkboxes follow the supplied oPhysics screenshots. No GeoGebra, external fonts, images, API keys, build step or runtime dependencies are needed.

## Run

Use Node.js 20 or later:

```sh
npm start
```

The development server listens on port 3000 (override with `PORT`). Open the served page in a browser. `npm test` runs the optical-model tests using Node’s built-in test runner. Because there are no dependencies, `npm install` is unnecessary.

The application also works on a static host such as GitHub Pages: publish the repository root. Use an HTTP server for local development because the application uses JavaScript modules.

## Classroom controls

- **English / 繁體中文** switches all controls, diagram labels and teaching explanations; the choice is remembered in the browser. English uses **Short-sightedness** and **Long-sightedness**.
- **Object Distance / 物距** moves the object; the purple point can also be dragged horizontally.
- **Focus Distance / 調焦距離** changes the eye lens independently. Towards Near makes it thicker with greater refracting power; towards Far makes it thinner.
- Select **Normal Vision**, **Short-sightedness** or **Long-sightedness**. The latter two use a longer or shorter eyeball respectively.
- Add a **concave** or **convex** spectacle lens. Selecting one removes the other. The eye condition and its accommodation remain independently adjustable.
- **Adjust for clearest image / 調節至最清晰** selects the best focus available within the eye’s accommodation range. If a suitable corrective lens is still required, the interface explains why the image stays blurred.
- The four teaching cards load near, distant, Short-sightedness and Long-sightedness examples, then scroll back up to the simulator. Scrolling is smooth unless the browser prefers reduced motion. In the two defect examples, adding the matching corrective lens alone brings the image onto the retina.
- The anatomy slider reveals an original schematic cross-section. Reset restores the initial state while keeping the selected language. The fullscreen button expands the simulation where the browser permits it.

At narrow widths, the drawing stays above the controls so students can operate the sliders on phones; desktop positioning follows the reference screenshots. Bifocal and progressive lenses are excluded.

## Model and teaching references

`optics.js` uses paraxial thin-lens optics. Rays travel from right to left; the spectacle prescription and propagation between the two lenses are computed separately. Solid rays terminate on the curved retina. When the predicted focus is behind the retina, only dashed extensions continue to it. Arrowheads show the direction of light. Focusing tolerance is three schematic drawing units.

This is a **schematic, not a scale model** and is not a spectacle-prescription calculator. The variable eye lens represents the eye’s total effective focusing power; the actual cornea and eye fluids also refract light. Distances and powers are internal drawing units, not metres or dioptres. The far end is a finite distant object with nearly parallel incident rays, retaining the visible draggable point from the reference. The inverted retinal F is an illustrative sharpness indicator, not a ray-traced image of the on-axis point object.

Chinese terminology and the accommodation/correction explanations were checked against the supplied textbook `te_16_c.pdf`, section 16.2, pp. 16–18 to 16–21. In particular, the simulation uses 晶體, 睫狀肌, 懸韌帶, 視覺調節, 凹透鏡（發散透鏡） and 凸透鏡（聚光透鏡）. Textbook illustrations and the PDF itself are not included in this repository.

Layout reference: [oPhysics, Optics of the Human Eye](https://ophysics.com/l16.html), using the user-supplied screenshots. The application is an independent implementation and does not embed or redistribute the original GeoGebra applet.

## Files

- `index.html`, `styles.css`: accessible bilingual interface and responsive layout.
- `app.js`: translations, controls, ray drawing and teaching scenarios.
- `optics.js`: optical calculations independent of the DOM.
- `server.js`: a small development server using Node’s standard library.
- `tests/optics.test.js`: accommodation, correction and ray-geometry regression tests.
