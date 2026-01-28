# COVID-19 Cases Mapping Project

## Project Description

This project visualizes COVID-19 case data across US counties using interactive choropleth and proportional symbols maps. The maps display both absolute case counts and infection rates  to explore regional COVID-19 impact patterns.

## Live Maps

- **Choropleth Map (Cases by County)**: [View Map 1](https://coysmax.github.io/Covid-19-Cases/map1.html)
- **Proportional Symbols Map (Infection Rates)**: [View Map 2](https://coysmax.github.io/Covid-19-Cases/map2.html)

## Project Overview

### Map 1: Choropleth Visualization
- Displays total COVID-19 cases per county using color interpolation
- Graduated Color Scheme
- Interactive popups showing county name, cases, deaths, and FIPS code

### Map 2: Proportional Symbols Visualization
- Uses circle sizes to represent case counts at county centroids
- Includes background county polygon layer for geographic context
- Interactive popups with total cases, deaths, and population data
- Circle radius interpolation based on case counts (2-28 pixels)

## Primary Functions

### Custom Utility Functions

1. **getChoroplethColor(value)** - Generates color codes based on case thresholds using ternary operators for efficient color mapping
2. **getProportionalRadius(rate)** - Calculates proportional circle radius using conditional logic for visual encoding
3. **formatNumber(num)** - Formats large numbers with thousand separators for readability
4. **formatDecimal(num)** - Rounds decimal values to 1 decimal place
5. **createChoroplehtPopup(properties)** - Generates dynamic HTML popups from GeoJSON feature properties



## Technologies & Libraries

- **Mapbox GL JS v2.8.1** 
- **HTML5 / CSS3 / ES6+ JavaScript** 
- **D3.js v7.6.1** 
- **GeoJSON Format** 
- **Python 3**

## Data Sources

- **US COVID-19 Dataset** - County-level COVID-19 case counts and death data (2020)
- **ESRI Shapefiles** - US county boundary geometries and centroids
- **Census Data** - 2018 population estimates for rate calculations

## Data Processing

- **Two GeoJSON Files**:
  - `us-covid-2020-counts.geojson` - Point geometries with case counts
  - `us-covid-2020-rates.geojson` - Polygon geometries with all statistics

- **Properties Included**: County name, state, FIPS code, cases, deaths, population (2018), infection rates


