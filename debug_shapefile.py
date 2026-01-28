#!/usr/bin/env python3
import shapefile

# Check counts shapefile
print("=== Checking us-covid-2020-counts.shp ===")
sf_counts = shapefile.Reader("us-covid-2020-counts/us-covid-2020-counts.shp")
print(f"Shape type: {sf_counts.shapeType}")
print(f"Record count: {len(sf_counts.records())}")

# Check first shape
shape_rec = sf_counts.shapeRecord(0)
shape = shape_rec.shape
print(f"First shape type: {shape.shapeType}")
print(f"First shape points: {len(shape.points)} points")
print(f"First 3 points: {shape.points[:3]}")
print(f"Parts: {shape.parts}")

print("\n=== Checking us-covid-2020-rates.shp ===")
sf_rates = shapefile.Reader("us-covid-2020-rates/us-covid-2020-rates.shp")
print(f"Shape type: {sf_rates.shapeType}")
print(f"Record count: {len(sf_rates.records())}")

# Check first shape
shape_rec = sf_rates.shapeRecord(0)
shape = shape_rec.shape
print(f"First shape type: {shape.shapeType}")
print(f"First shape points: {len(shape.points)} points")
print(f"First 3 points: {shape.points[:3]}")
print(f"Parts: {shape.parts}")
