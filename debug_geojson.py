#!/usr/bin/env python3
import json

# Check counts file
with open('assets/us-covid-2020-counts.geojson') as f:
    counts = json.load(f)

first_feature = counts['features'][0]
print("=== Counts GeoJSON ===")
print(f"Type: {first_feature['type']}")
print(f"Geometry type: {first_feature['geometry']['type']}")
coords = first_feature['geometry']['coordinates']
print(f"Coordinates depth: {len(coords)} rings")
if coords:
    print(f"  First ring has {len(coords[0])} points")
    print(f"  First point: {coords[0][0]}")

# Check rates file
with open('assets/us-covid-2020-rates.geojson') as f:
    rates = json.load(f)

first_feature = rates['features'][0]
print("\n=== Rates GeoJSON ===")
print(f"Type: {first_feature['type']}")
print(f"Geometry type: {first_feature['geometry']['type']}")
coords = first_feature['geometry']['coordinates']
print(f"Coordinates depth: {len(coords)} rings")
if coords:
    print(f"  First ring has {len(coords[0])} points")
    print(f"  First point: {coords[0][0]}")
