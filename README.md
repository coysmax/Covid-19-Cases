# COVID-19 Cases Mapping Project

## Project Description

This project visualizes COVID-19 case data across US counties using interactive web-based choropleth and proportional symbols maps. The maps display both absolute case counts and infection rates per 100,000 population, allowing users to explore regional COVID-19 impact patterns during 2020.

## Live Maps

- **Choropleth Map (Cases by County)**: [View Map 1](https://coysmax.github.io/Covid-19-Cases/map1.html)
- **Proportional Symbols Map (Infection Rates)**: [View Map 2](https://coysmax.github.io/Covid-19-Cases/map2.html)

## Project Overview

### Map 1: Choropleth Visualization
- Displays total COVID-19 cases per county using color interpolation
- 8-class color scheme from light yellow (#FFFFCC) to dark red (#800026)
- Interactive popups showing county name, cases, deaths, and FIPS code
- Hover effects for improved user experience

### Map 2: Proportional Symbols Visualization
- Uses circle sizes to represent case counts at county centroids
- Includes background county polygon layer for geographic context
- Interactive popups with total cases, deaths, and population data
- Circle radius interpolation based on case counts (2-28 pixels)

## Primary Functions

### Custom Utility Functions (Not Covered in Lectures)

1. **getChoroplethColor(value)** - Generates color codes based on case thresholds using ternary operators for efficient color mapping
2. **getProportionalRadius(rate)** - Calculates proportional circle radius using conditional logic for visual encoding
3. **formatNumber(num)** - Formats large numbers with thousand separators for readability
4. **formatDecimal(num)** - Rounds decimal values to 1 decimal place
5. **createChoroplehtPopup(properties)** - Generates dynamic HTML popups from GeoJSON feature properties
6. **createProportionalPopup(properties)** - Creates formatted popup content with multiple data fields
7. **createChoroplehtLegend(container)** - Dynamically generates legend items with color swatches
8. **createProportionalLegend(container)** - Creates legend with proportional circle symbols
9. **addLayerPopup(map, layerId, popupGenerator)** - Reusable function to attach popups to any map layer
10. **addLayerHoverEffect(map, layerId)** - Adds cursor change on hover for layer interactivity
11. **initializeMap(config)** - Factory function to initialize maps with standard configuration

### Advanced Features

- **Dynamic Legend Generation** - Legends are created programmatically from data arrays rather than hardcoded
- **Layer Stacking** - Background polygon layers provide geographic context for point data
- **Albers Projection** - US-appropriate conformal conic projection for accurate area representation
- **GeoJSON Data Conversion** - Python script to convert ESRI shapefiles to GeoJSON with proper geometry type handling

## Technologies & Libraries

- **Mapbox GL JS v2.8.1** - WebGL-based mapping library with vector tile support
- **HTML5 / CSS3 / ES6+ JavaScript** - Frontend technologies for interactive web application
- **D3.js v7.6.1** - Data visualization library for utility functions and calculations
- **GeoJSON Format** - Standard format for geographic feature data
- **Python 3** - Backend conversion tool using shapefile library

## Data Sources

- **US COVID-19 Dataset** - County-level COVID-19 case counts and death data (2020)
- **ESRI Shapefiles** - US county boundary geometries and centroids
- **Census Data** - 2018 population estimates for rate calculations

## Data Processing

- **Two GeoJSON Files**:
  - `us-covid-2020-counts.geojson` - Point geometries (county centroids) with case counts
  - `us-covid-2020-rates.geojson` - Polygon geometries (county boundaries) with all statistics

- **Properties Included**: County name, state, FIPS code, cases, deaths, population (2018), infection rates

## Credits & Acknowledgments

- **Mapbox** - For the GL JS library and map styling
- **US COVID-19 Dataset** - For comprehensive case and death data
- **ESRI** - For county boundary shapefiles
- **D3.js Community** - For data visualization utilities

## Project Structure

```
Covid-19-Cases/
├── map1.html                           # Choropleth map
├── map2.html                           # Proportional symbols map
├── README.md                           # Project documentation
├── css/
│   └── style.css                       # Shared styling
├── js/
│   └── main.js                         # Utility functions
├── assets/
│   ├── us-covid-2020-counts.geojson   # Point data
│   └── us-covid-2020-rates.geojson    # Polygon data
└── img/                                # Project images
```

## Key Implementation Details

1. **Geometry Type Handling** - Proper detection and conversion of Point (type 1) vs Polygon (types 5/15/25) geometries
2. **Interpolate Expression** - Mapbox Paint property using linear interpolation for smooth color/size transitions
3. **Click & Hover Events** - Event listeners for interactive popups and cursor feedback
4. **Dynamic DOM Creation** - JavaScript to programmatically build legend items and popup content
5. **GitHub Pages Hosting** - Static site deployment for free public access

## Usage

1. Open either map link in a web browser
2. Click on counties to view detailed information
3. Hover over features to see cursor feedback
4. Zoom and pan to explore different regions
5. Refer to legend for value interpretation

## Notes

- Maps display 2020 COVID-19 data only
- Population figures based on 2018 Census estimates
- Infection rates calculated as cases per 100,000 population
- All data is for educational and informational purposes