import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import markerPin from '../../assets/images/marker.png'

const VENUE_POSITION = [-6.8140374, 108.1947649]

const venueIcon = L.icon({
  iconUrl: markerPin,
  iconSize: [44, 44],
  iconAnchor: [22, 41],
  popupAnchor: [0, -38],
})

function LocationMap() {
  return (
    <MapContainer
      center={VENUE_POSITION}
      zoom={16}
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
      // subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <Marker position={VENUE_POSITION} icon={venueIcon}>
        <Popup>Cafe Samoja</Popup>
      </Marker>
    </MapContainer>
  )
}

export default LocationMap
