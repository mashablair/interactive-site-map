# Interactive Site Map

A front-end prototype for apartment discovery. Instead of opening a separate listing for each unit, prospective renters can start with the building, choose a group of floors, and see which units are available directly on an interactive floor plan.

![Building overview and SVG floor plan with sample availability](Screen%20Shot%202018-09-05%20at%201.57.50%20PM.png)

*Original 2018 prototype screenshot. Availability and prices are illustrative, not current listings.*

## What to look at

- **Building-to-unit navigation.** The building overview summarizes availability by section. Selecting a section opens its floor plans, where available units are highlighted and labeled.
- **Filters that carry through the views.** Bedroom count and maximum rent narrow the matching units and update availability counts in the building overview and floor view.
- **Custom SVG interactions.** The floor plan is composed of SVG shapes associated with unit metadata. CSS handles the perspective and transitions; JavaScript connects the shapes, filters, and summary counts.

## Run locally

This is a static HTML, CSS, SVG, and JavaScript/jQuery prototype. It does not need a backend, credentials, or a build step.

```sh
git clone https://github.com/mashablair/interactive-site-map.git
cd interactive-site-map
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000/). Choose a building section, move between floors, then try a bedroom or rent filter. Some styles and scripts reference legacy external CDNs and may not load in every environment.

## Code map

| File | What it contains |
| --- | --- |
| [`index.html`](index.html) | Property overview, filter controls, SVG floor plans, and illustrative unit metadata |
| [`main.js`](main.js) | View changes, floor navigation, filtering, and availability counts |
| [`interractive-site-map.css`](interractive-site-map.css) | Layout, map styling, and transitions |

This is an archived front-end prototype, not a live leasing or inventory system.
