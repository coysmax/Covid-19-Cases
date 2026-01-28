#!/usr/bin/env python3
import json

# Check counts file
print("=== Checking us-covid-2020-counts.geojson ===")
data_counts = json.load(open('assets/us-covid-2020-counts.geojson'))
print(f'Features: {len(data_counts["features"])}')
print(f'First feature type: {data_counts["features"][0]["geometry"]["type"]}')
print(f'Properties: {list(data_counts["features"][0]["properties"].keys())}')
print(f'Sample cases value: {data_counts["features"][0]["properties"]["cases"]}')

# Check rates file
print("\n=== Checking us-covid-2020-rates.geojson ===")
data_rates = json.load(open('assets/us-covid-2020-rates.geojson'))
print(f'Features: {len(data_rates["features"])}')
print(f'First feature type: {data_rates["features"][0]["geometry"]["type"]}')
print(f'Properties: {list(data_rates["features"][0]["properties"].keys())}')
print(f'Sample rates value: {data_rates["features"][0]["properties"]["rates"]}')
print(f'Sample cases value: {data_rates["features"][0]["properties"]["cases"]}')

# Check for null/missing values
missing_cases = sum(1 for f in data_counts["features"] if f["properties"].get("cases") is None)
missing_rates = sum(1 for f in data_rates["features"] if f["properties"].get("rates") is None)
print(f'\nMissing cases in counts: {missing_cases}')
print(f'Missing rates in rates: {missing_rates}')
