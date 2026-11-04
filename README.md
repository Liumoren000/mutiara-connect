# Mutiara Connect — CMT322 Part A

A complete front-end working simulation for the Penang LRT Mutiara Line community information and feedback platform. The interface and source code use English.

## Open the website

Open `dist/index.html` with Chrome, Edge, Firefox or Safari. Keep all five files in `dist` together. No installation or build is required.

For a stable HTTP origin when developing, run:

```sh
python3 -m http.server 4173 --directory dist
```

Then open http://localhost:4173. Browser-local records belong to their origin: a file preview, local server and hosted site do not share records.

## Five completed modules

1. **Home & Project Information:** project purpose, application category, stakeholders, five module shortcuts, FAQ and official source link.
2. **Construction Updates:** keyword, area, type and date-status filters; sorting; preserved filter state; reset action; empty states; dedicated notice pages with road, pedestrian and business-access information.
3. **Construction Map:** four selectable demonstration zones, impact filtering and legend, impact details, notice links, area-prefilled feedback and a primary real OpenStreetMap street map with Leaflet markers, zoom/pan and embedded-map fallback.
4. **Feedback Submission:** accessible field errors, in-tab draft restoration, editable review before confirmation, required-field checks, secure random reference generation, browser persistence, save-failure handling, success confirmation and copy-reference action.
5. **Complaint Status Tracking:** reference search, searchable/status-filtered saved-complaint list, progress indicator, dated timeline, saved follow-up clarifications, plain-text receipt and a clearly labelled demonstration status workflow.

The About page includes content provenance, browser-storage privacy information and AI assistance disclosure.

## Demonstration flow

1. Start on Home and explain the project and stakeholders.
2. Search Construction Updates for Bayan Lepas, then filter by Road closure.
3. Open a notice, read access arrangements and choose View work zone.
4. Select a different zone, then choose Report a concern.
5. Enter fictional feedback. Try an empty form to check validation. Review the details, test Edit, then confirm the save.
6. Keep the generated reference and open its tracking page. Add a short follow-up to show clarification persistence.
7. Expand Demonstration controls. Add a fictional response and advance through Under review, In progress and Resolved.
8. Reload the page to confirm the saved record remains. Download the receipt.
9. Open the sample case `MC-2026-DEMO01` to demonstrate a pre-populated history.

## Architecture and files

- `dist/index.html`: semantic document shell and navigation.
- `dist/style.css`: responsive layout and visual/accessibility states.
- `dist/data.js`: fictional notices, approximate area centres and sample case.
- `dist/core.js`: validation, record integrity, persistence, filters and workflow rules.
- `dist/map.js`: real map loading, georeferenced markers, filtering, fallback and cleanup.
- `dist/app.js`: page rendering, routing and user interactions.
- `tests/core.cjs`: Node built-in tests for the shared rules.
- `tests/views.cjs` and `tests/view-harness.cjs`: minimal-DOM view/event wiring checks.
- `RUBRIC_CHECKLIST.md`: rubric mapping and manual acceptance criteria.
- `AI_DISCLOSURE.md`: report acknowledgement text and usage scope.

No frameworks or content management system are used. External fonts have system fallbacks. The main map loads real OpenStreetMap tiles and Leaflet 1.9.4 from its pinned CDN. Both require internet. If Leaflet cannot load, a real OpenStreetMap embed is shown instead. The rest of the application works without internet.

## Data and limitations

This is the **Part A front-end simulation**, as specified by the provided rubric, which does not require a remote server or database. It is not a production service. No complaint or email is sent to an authority. Records and simulated team responses remain in this browser. Use fictional contact details.

The main map uses real OpenStreetMap geography. Area markers identify approximate neighbourhood centres, not official work sites. No invented corridor line or work boundary is drawn. Notices, work dates, diversions, response notes and timelines are fictional examples. The overview links to the official MRT Corp project microsite (checked 2 November 2026).

Part B would require a server/API, database, authenticated staff roles, server-side validation, secure complaint access and genuine notifications. The demonstration controls are not a secure administration system.

## Validation

```sh
node --check dist/app.js
node --check dist/core.js
node --check dist/data.js
node --test tests/core.cjs tests/views.cjs
```

19 tests cover validation, storage failures, data integrity, filtering and sorting, secure references, page rendering, internal link destinations, review/confirmation, in-tab draft restoration and the complaint follow-up/status lifecycle. These checks passed. The view tests use a minimal DOM adapter and do not replace real-browser testing. Native browser rendering, clipboard permissions, download behaviour and mobile layout have not been visually verified because the current environment blocked local HTTP preview and file-URL browser access. Deployment was blocked by an unavailable local network proxy. No live URL is claimed.

## Academic acknowledgement

The student reports that the lecturer permits AI assistance when it is disclosed in the report. Include an accurate acknowledgement and review the implementation before submission. Use students' own voices and faces in the recorded demonstration, as required by the rubric.
