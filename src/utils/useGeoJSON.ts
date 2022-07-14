export const mockData: Points = [
    [112.861266, 28.193487],
    [112.904296, 28.195766],
    [112.871883, 28.106139],
    [112.916837, 28.081762],
    [112.902082, 28.175732],
    [112.92628, 28.059169],
    [112.757624, 28.151724],
    [112.892179, 28.116783],
    [112.901525, 28.049798],
];

export type Points = [number, number][];

const startLngLat = [112.904282, 28.209609];

export function transToGeoPointData(points: Points) {
    const GeoPointData = {
        type: "FeatureCollection",
        features: points.map((point) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: point,
                },
            };
        }),
    };

    return GeoPointData;
}

export function transToGeoLineData(points: Points) {
    const GeoLineData = {
        type: "FeatureCollection",
        features: points.map((point) => {
            return {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        startLngLat,
                        point
                    ],
                },
            };
        }),
    };

    console.log(GeoLineData);

    return GeoLineData;
}

// transToGeoPointData(mockData);

// transToGeoLineData(mockData);
