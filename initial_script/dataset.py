import requests 
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon
import json
import numpy as np

parksurl = 'https://opendata.arcgis.com/datasets/4f1b554e743b423f9574e7a3ca814cce_6.geojson'
amenitiesurl = 'https://opendata.arcgis.com/datasets/332d57db20494adaaa8ab7cad3ea7726_4.geojson'

django_url = 'http://localhost:8000/locations'
parksdata = requests.get(url = parksurl, params= 'GET')
amenitiesdata = requests.get(url=amenitiesurl, params='GET')
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
data = json.loads(parksdata.text)
adata = json.loads(amenitiesdata.text)
temp = []
for i in data['features']:
    # print(' ')
    name = i['properties']['NAME']
    # print(name)
    # print(' ')

    coords = i['geometry']['coordinates']
    # print(len(coords[0]))
    # print(' ')
    try:
        if (len(coords[0])!=1):
            lons_lats_vect = np.column_stack(coords)  # Reshape coordinates
            # print(lons_lats_vect)
            # print(lons_lats_vect)
            polygon = Polygon(lons_lats_vect)  # create polygon
            # print(polygon)
            # point = Point(y,x) # create point
            # print(polygon.contains(point)) # check if polygon contains point
            # print(point.within(polygon)) # check if a point is in the polygon
        else:
            lons_lats_vect = np.column_stack(coords[0])  # Reshape coordinates
            # print(lons_lats_vect)
            # print(lons_lats_vect)
            polygon = Polygon(lons_lats_vect)  # create polygon
            # print(polygon)
            # point = Point(y,x) # create point
            # print(polygon.contains(point)) # check if polygon contains point
            # print(point.within(polygon)) # check if a point is in the polygon
        
        for amenity in adata['features']:
            point = amenity['geometry']['coordinates']
            polypoint = Point(point)
            if polygon.contains(polypoint):
                parkname = name
                type = amenity['properties']['TYPE']
                area = amenity['properties']['REC_AREA']
                dict = {
                    "name": parkname,
                    "type": type,
                    "area": area,
                    "longitude": str(point[0]),
                    "latitude": str(point[1])
                    
                }
                r = requests.post('http://localhost:8000/locations/', data=dict)
                print(r.status_code) 
                
    except:
        print('failed')

    
    with open('data.json','w') as f: 
        json.dump(temp, f, indent=4) 
print(temp)
