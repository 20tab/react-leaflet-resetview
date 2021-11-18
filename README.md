# react-leaflet-resetview
> react-leaflet control for resetting the map view

## Installation

You can install `react-leaflet-resetview` with NPM:

```bash
npm i @20tab/react-leaflet-resetview
```

Or with YARN:

```bash
yarn add @20tab/react-leaflet-resetview
```

## Usage

```typescript jsx
import MapContainer from "react-leaflet";
import ResetViewControl from '@20tab/react-leaflet-resetview';

const Map = () => {
    return (
        <MapContainer zoom={5} center={[-96.8716348, 32.8205866]}>
            <ResetViewControl title="Reset view" />
        </MapContainer>
    );
};
```


