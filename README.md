# US COVID-19 Cases and Rates Mapping

## Project Name
**COVID-19 Geospatial Analysis: Interactive Choropleth and Proportional Symbols Maps**

## Overview
This project provides interactive web-based thematic maps visualizing the geographic distribution of COVID-19 cases and rates across the United States in 2020. It showcases two complementary visualization techniques to understand the spatial patterns of the pandemic:

1. **Choropleth Map**: Displays absolute case counts by county using color intensity
2. **Proportional Symbols Map**: Shows infection rates (cases per 100,000 population) using circle size

## Map Links
- **Choropleth Map (Cases)**: [View Map 1](https://coysmac.github.io/covid-19-mapping/map1.html)
- **Proportional Symbols Map (Rates)**: [View Map 2](https://coysmac.github.io/covid-19-mapping/map2.html)

## Key Features

### Map 1 - Choropleth Map (Cases)
- **Visualization Type**: Choropleth (color-coded regions)
- **Data Represented**: Total COVID-19 cases by county
- **Color Scheme**: Sequential from light yellow (#FFFFCC) to dark red (#800026)
- **Interactive Features**:
  - Click on any county to view detailed information
  - Hover effect to highlight counties
  - Navigation controls (zoom, pan)
  - Dynamic legend showing case ranges

### Map 2 - Proportional Symbols Map (Rates)
- **Visualization Type**: Proportional symbols (circle size)
- **Data Represented**: COVID-19 infection rates (cases per 100,000 population)
- **Symbol Style**: Red circles with varying radii
- **Interactive Features**:
  - Click on any county circle to view detailed statistics
  - Background county boundaries for context
  - Proportional sizing based on infection rate
  - Interactive legend with symbol sizes

## Project Structure
```
covid-19-mapping/
│
├── map1.html                          # Choropleth map
├── map2.html                          # Proportional symbols map
├── README.md                          # This file
│
├── assets/
│   ├── us-covid-2020-counts.geojson  # County data with case counts
│   └── us-covid-2020-rates.geojson   # County data with infection rates
│
├── css/
│   └── style.css                      # Shared styling
│
├── js/
│   └── main.js                        # Shared JavaScript utilities
│
└── img/
    └── (screenshots and images)
```

## Technologies & Libraries Used

### Mapping Library
- **Mapbox GL JS v2.8.1**: Interactive web maps with WebGL rendering
  - Provides modern mapping capabilities
  - Supports custom projections (Albers Conformal)
  - Excellent performance for large datasets

### Data Processing
- **Python**: Shapefile conversion
  - `shapefile` library for reading GIS data
  - `json` library for GeoJSON export

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Styling and layout
- **JavaScript (ES6+)**: Interactivity and map logic
- **D3.js v7.6.1**: Data visualization utilities (available for enhanced functionality)

### Other Tools
- **Mapshaper**: GeoJSON geometry simplification
- **GitHub Pages**: Static site hosting

## Data Sources

### Primary Data
- **US COVID-19 Dataset**: County-level COVID-19 case counts and death counts
- **Source Format**: Shapefiles (ESRI standard GIS format)
- **Temporal Coverage**: 2020
- **Geographic Coverage**: All US counties (3,103 features)

### Data Attributes
**Counts Dataset**:
- `county`: County name
- `state`: State abbreviation
- `fips`: Federal Information Processing Standards code
- `cases`: Total COVID-19 cases
- `deaths`: Total COVID-19 deaths

**Rates Dataset**:
- `county`: County name
- `state`: State abbreviation
- `fips`: Federal Information Processing Standards code
- `cases`: Total COVID-19 cases
- `deaths`: Total COVID-19 deaths
- `pop18`: 2018 population estimate
- `rates`: Cases per 100,000 population

## Technical Implementation Details

### Projection
- **Albers Conformal Conic Projection**: Appropriate for displaying continental US data
  - Minimizes distortion for the US mainland
  - Provides better visual representation than Web Mercator for thematic mapping
  - Implementation: `projection: 'albers'` in Mapbox configuration

### Data Processing Workflow
1. **Conversion**: Shapefiles → GeoJSON format using Python
2. **Simplification**: Geometry simplification using Mapshaper to reduce file size
3. **Optimization**: Removed unnecessary attributes to streamline data
4. **Organization**: Centralized GeoJSON files in `/assets` directory

### Interactive Elements

#### Choropleth Map Interactivity
- **Click Events**: Displays popup with:
  - County and state name
  - Total cases and deaths
  - FIPS code
  - Visual confirmation of selection
  
#### Proportional Symbols Map Interactivity
- **Click Events**: Shows detailed statistics including:
  - County and state
  - Infection rate (cases per 100k)
  - Total cases and deaths
  - Population data
  - FIPS code

### Styling & Basemap
- **Basemap Style**: Mapbox Light v10
  - Clean, minimal design
  - Clear county boundaries
  - Good contrast for thematic overlays
  - Professional appearance

## Primary Function Highlighting
### Albers Projection Implementation
This project utilizes **Mapbox GL's native Albers Conformal Conic projection** support, which was not covered in standard lectures. This projection is particularly valuable for US thematic mapping because:
- Reduces distortion compared to Web Mercator
- Provides more accurate area representation
- Creates a more appropriate visual hierarchy for regional data
- Improves the visual interpretation of geographic patterns

Implementation in Mapbox GL is straightforward:
```javascript
let map = new mapboxgl.Map({
    container: 'map',
    projection: 'albers'  // Set Albers projection
});
```

## Supplementary Information

### Map Metadata
- **Created**: January 2026
- **Creator**: Data Visualization Project
- **Course**: Geographic Information Systems & Cartography
- **Institution**: University Course on Web Mapping

### Data Accuracy Notes
- Data represents 2020 COVID-19 statistics
- Population estimates based on 2018 census data
- County boundaries may have changed since data collection
- Some counties may have incomplete data reporting

## Credits & Acknowledgments
- **Mapbox**: For providing the mapping platform and basemap tiles
- **COVID-19 Data Source**: CDC and public health agencies
- **Mapshaper**: For geometry simplification tools
- **D3.js**: For data visualization capabilities
- **GitHub**: For hosting and GitHub Pages support

## How to Use

### Local Development
1. Clone the repository to your local machine
2. Install a local web server (Python SimpleHTTPServer, Node Live Server, etc.)
3. Navigate to the repository directory
4. Start the server and access `http://localhost:PORT/map1.html` or `map2.html`

### Viewing Online
Access the maps directly via GitHub Pages:
- Map 1: `https://[your_github_username].github.io/[your_repository_name]/map1.html`
- Map 2: `https://[your_github_username].github.io/[your_repository_name]/map2.html`

## Browser Compatibility
- Chrome/Chromium: Full support
- Firefox: Full support
- Safari: Full support
- Edge: Full support
- Internet Explorer: Not supported (uses WebGL)

## Performance Considerations
- **GeoJSON File Size**: ~2-3 MB per file (after simplification)
- **Loading Time**: Typically 2-5 seconds on standard connections
- **Interactivity**: Real-time response to user interactions
- **Zoom Levels**: Optimized for zoom levels 2-14

## License
This project is provided for educational purposes.

## Feedback & Support
For issues, questions, or suggestions regarding this project, please contact the course instructor or teaching assistant.

---

**Last Updated**: January 28, 2026