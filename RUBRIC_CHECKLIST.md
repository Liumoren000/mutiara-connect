# Part A — Excellent-band implementation checklist

This checklist maps the website to the supplied Part A rubric's 8–10 mark descriptors. It is not a guarantee of a mark; final assessment belongs to the lecturer. The student has stated that AI assistance is permitted when acknowledged in the report.

## Five complete modules

| Module | Implemented evidence | Acceptance check |
| --- | --- | --- |
| Home & Project Information | Project purpose, application category, stakeholder needs, five module shortcuts, FAQ and official source | Open every module from the home page; explain who uses the portal and why |
| Construction Updates | Five sample notices; keyword, area, type, schedule-date and status filters; three sort orders; retained filters; detail pages; pedestrian and business access | Filter Bayan Lepas + Road closure, open the notice and return; the filter must remain |
| Construction Map | Four selectable zones, impact filter, legend, linked notices, feedback prefill and a real OpenStreetMap basemap, interactive georeferenced markers, zoom/pan and real-map embed fallback | Filter High; select Bayan Lepas and open its feedback form; affected area must be prefilled |
| Feedback Submission | Required-field errors, character limits, tab-memory draft, editable review step, explicit confirmation, secure reference, receipt and storage-failure handling | Invalid form shows errors; review saves nothing; confirmation saves one record and produces a reference |
| Complaint Status Tracking | Reference lookup, saved-record search/status filters, progress indicator, dated timeline, follow-up notes, receipt and simulated staff responses | Search the new reference, add information and advance through all four stages; reload and confirm persistence |

## Application Functional Features

- All five main functionalities are implemented.
- Internal module and notice destinations are checked by automated view-wiring tests.
- The primary journey links notices → work zones → prefilled feedback → review → saved complaint → response timeline.
- Empty, no-match, missing-record, invalid-field and storage-failure states are implemented.
- Optional external maps and links need an internet connection and separate manual checking.

## Design Features

- Shared sidebar navigation, header breadcrumb, page headings, cards, input styles and footer.
- Consistent green / cream palette suited to a transport-community portal.
- Current-page navigation indication, readable impact labels, keyboard focus states, error summaries and a skip link.
- Responsive breakpoints for desktop, tablet and phone; printable case detail layout.
- One main heading per module and dedicated detail-page headings.

## Validation performed

Run `node --test tests/core.cjs tests/views.cjs` from the project directory.

19 automated checks cover the core rules and the rendered page/event wiring using a minimal DOM adapter. They include every module and notice detail, internal destination resolution, filter reset/retention, map prefill, feedback review and confirmation, in-tab draft restoration, complaint follow-up and final status persistence.

These tests are not a browser. Real rendering, keyboard focus order, mobile layouts, native clipboard permissions, actual downloads and the real map still need manual browser verification. The execution environment prevents starting a local HTTP preview, and the embedded browser disallows file URLs. No screenshots or browser-QA results are fabricated.

## Manual acceptance checks before recording

- Desktop: 1440 × 900; tablet: 768 × 1024; phone: 390 × 844. Check wrapping, scrolling, form controls and map buttons.
- Use Tab and Shift+Tab through the main navigation and feedback flow. Check visible focus and readable field errors.
- Open every navigation link and module shortcut. Use Back and Forward and refresh a detail route.
- Submit one fictional concern; confirm no record is saved before the review confirmation.
- Check reference copy and receipt download in the actual browser used for the demonstration.
- Advance the saved concern to Resolved and reload. Verify its full timeline and follow-up remain.
- Turn off the internet and confirm the main app still works; the street map and external project source may be unavailable.

## Separate report and recording requirements

The website is the simulation component. It does not replace the maximum 10-page report, its user/use-case/class diagrams, at least one sequence diagram, architecture diagram, diagram explanations or sample screenshots. The report should match the implemented five modules and explicitly distinguish the Part A browser-storage implementation from the proposed Part B server/database architecture.

Include the AI acknowledgement from `AI_DISCLOSURE.md`, adapted truthfully to the work performed by your team. The recorded demonstration must follow the course's maximum 15-minute limit and original student face/voice requirements. This source package does not contain a report, screenshots or a recorded video.
