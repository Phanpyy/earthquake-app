# Simple Map React Application
This application shows earthquakes on a map.
The earthquake data are provided by USGS and are refreshed regularly.
The longitude and latitude data are used to locate each earthquake's position on the map.
Also, the magnitude values decide which color to depict each respective earthquake.
The user can chose, if he wants to refresh the data automatically.
Moreover filter options to filter after most recent earthquakes or the strongest earthquake regarding magnitude value can
be applied.

## Prerequisites

### Node.js

- download and install (recommended) LTS Version at [https://nodejs.org/en/](https://nodejs.org/en/)
- Node.js is shipped with *npm* (package manager - manages open source packages)
- add *npm* to system path (npm includes *npx* - tool for executing Node packages)

## Available Scripts

### `npm start`

Starting the development server.
Web application is usually reachable via `http://localhost:3000/`.

### `npm run eslint` - Linting

Run `npm run eslint` to apply and/or show errors/warnings regarding coding style.
