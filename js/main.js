/**
 * COVID-19 Mapping Project - Shared Utilities
 * Main JavaScript file for map functionality
 */

// Mapbox Configuration
mapboxgl.accessToken = 'pk.eyJ1IjoiY295c21heCIsImEiOiJjbWhjeGVxbWQxZjV3MmpwcjlsNGNoc2pkIn0.lN8fMUCO0-cVKDiQW_G7tg';

/**
 * Utility Functions for COVID-19 Maps
 */

/**
 * Get color for choropleth map based on case count
 * @param {number} value - Case count
 * @returns {string} Hex color code
 */
function getChoroplethColor(value) {
    return value > 50000 ? '#800026' :
           value > 20000 ? '#BD0026' :
           value > 10000 ? '#E31A1C' :
           value > 5000  ? '#FC4E2A' :
           value > 2000  ? '#FD8D3C' :
           value > 1000  ? '#FEB24C' :
           value > 500   ? '#FED976' :
                          '#FFFFCC';
}

/**
 * Get circle radius for proportional symbols based on rate
 * @param {number} rate - Cases per 100,000 population
 * @returns {number} Circle radius in pixels
 */
function getProportionalRadius(rate) {
    if (rate === 0) return 3;
    if (rate <= 500) return 5;
    if (rate <= 1000) return 7;
    if (rate <= 2000) return 10;
    if (rate <= 3000) return 12;
    if (rate <= 5000) return 15;
    if (rate <= 10000) return 18;
    return 20;
}

/**
 * Format large numbers with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    if (num === null || num === undefined) return 'N/A';
    return num.toLocaleString('en-US');
}

/**
 * Format decimal numbers to 1 decimal place
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatDecimal(num) {
    if (num === null || num === undefined) return 'N/A';
    return num.toFixed(1);
}

/**
 * Create popup HTML for choropleth map
 * @param {object} properties - Feature properties
 * @returns {string} HTML string for popup
 */
function createChoroplehtPopup(properties) {
    return `
        <div class="popup-content">
            <p><strong>${properties.county}, ${properties.state}</strong></p>
            <p><strong>Cases:</strong> ${formatNumber(properties.cases)}</p>
            <p><strong>Deaths:</strong> ${formatNumber(properties.deaths)}</p>
            <p><strong>FIPS Code:</strong> ${properties.fips}</p>
        </div>
    `;
}

/**
 * Create popup HTML for proportional symbols map
 * @param {object} properties - Feature properties
 * @returns {string} HTML string for popup
 */
function createProportionalPopup(properties) {
    return `
        <div class="popup-content">
            <p><strong>${properties.county}, ${properties.state}</strong></p>
            <p><strong>Cases per 100k:</strong> ${formatDecimal(properties.rates)}</p>
            <p><strong>Total Cases:</strong> ${formatNumber(properties.cases)}</p>
            <p><strong>Deaths:</strong> ${formatNumber(properties.deaths)}</p>
            <p><strong>Population (2018):</strong> ${formatNumber(properties.pop18)}</p>
            <p><strong>FIPS Code:</strong> ${properties.fips}</p>
        </div>
    `;
}

/**
 * Create legend items for choropleth
 * @param {HTMLElement} container - Container for legend items
 */
function createChoroplehtLegend(container) {
    const breaks = [0, 500, 1000, 2000, 5000, 10000, 20000, 50000];
    const colors = ['#FFFFCC', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];
    
    for (let i = 0; i < breaks.length; i++) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        
        const color = document.createElement('div');
        color.className = 'legend-color';
        color.style.backgroundColor = colors[i];
        
        const label = document.createElement('span');
        if (i < breaks.length - 1) {
            label.textContent = `${formatNumber(breaks[i])} - ${formatNumber(breaks[i + 1])}`;
        } else {
            label.textContent = `${formatNumber(breaks[i])}+`;
        }
        
        item.appendChild(color);
        item.appendChild(label);
        container.appendChild(item);
    }
}

/**
 * Create legend items for proportional symbols
 * @param {HTMLElement} container - Container for legend items
 */
function createProportionalLegend(container) {
    const rates = [0, 500, 1000, 2000, 3000, 5000, 10000, 15000];
    
    for (let i = 0; i < rates.length; i++) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        
        const circle = document.createElement('div');
        circle.className = 'legend-circle';
        
        const radius = getProportionalRadius(rates[i]);
        circle.style.width = (radius * 2) + 'px';
        circle.style.height = (radius * 2) + 'px';
        
        const label = document.createElement('span');
        if (i < rates.length - 1) {
            label.textContent = `${rates[i]} - ${rates[i + 1]}`;
        } else {
            label.textContent = `${rates[i]}+`;
        }
        
        item.appendChild(circle);
        item.appendChild(label);
        container.appendChild(item);
    }
}

/**
 * Add interactive popup to map layer
 * @param {mapboxgl.Map} map - Mapbox map instance
 * @param {string} layerId - Layer ID to attach popup to
 * @param {function} popupGenerator - Function to generate popup HTML
 */
function addLayerPopup(map, layerId, popupGenerator) {
    map.on('click', layerId, function(e) {
        const properties = e.features[0].properties;
        const popupHTML = popupGenerator(properties);
        
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupHTML)
            .addTo(map);
    });
}

/**
 * Add hover effects to map layer
 * @param {mapboxgl.Map} map - Mapbox map instance
 * @param {string} layerId - Layer ID to add hover effects
 */
function addLayerHoverEffect(map, layerId) {
    map.on('mouseenter', layerId, () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', layerId, () => {
        map.getCanvas().style.cursor = '';
    });
}

/**
 * Initialize map with standard settings
 * @param {object} config - Configuration object
 * @returns {mapboxgl.Map} Mapbox map instance
 */
function initializeMap(config = {}) {
    const defaultConfig = {
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 3.5,
        minZoom: 2,
        maxZoom: 14,
        center: [-95, 38],
        pitch: 0,
        bearing: 0,
        projection: 'albers'
    };
    
    const finalConfig = { ...defaultConfig, ...config };
    
    const map = new mapboxgl.Map(finalConfig);
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    return map;
}

/**
 * Export functions for use in HTML
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getChoroplethColor,
        getProportionalRadius,
        formatNumber,
        formatDecimal,
        createChoroplehtPopup,
        createProportionalPopup,
        createChoroplehtLegend,
        createProportionalLegend,
        addLayerPopup,
        addLayerHoverEffect,
        initializeMap
    };
}
    map.on('click', 'earthquakes-point', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>Magnitude:</strong> ${event.features[0].properties.mag}`)
            .addTo(map);
    });
});
// create legend
const legend = document.getElementById('legend');
//set up legend grades and labels
var labels = ['<strong>Magnitude</strong>'],
    vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radii = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
        'px; height: ' +
        dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
        '</span></p>');
}
const source =
    '<p style="text-align: right; font-size:10pt">Source: <a href="https://earthquake.usgs.gov/earthquakes/">USGS</a></p>';
legend.innerHTML = labels.join('') + source;