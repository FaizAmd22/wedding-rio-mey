import L from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import markerPin from '../assets/images/marker.png'
import { VENUE } from '../constant'

const VENUE_POSITION = VENUE.coordinates

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
      <Marker
        position={VENUE_POSITION}
        icon={venueIcon}
        eventHandlers={{
          click: () => {
            window.open(VENUE.googleMapsUrl, '_blank', 'noopener,noreferrer')
          },
        }}
      />
    </MapContainer>
  )
}

export default LocationMap
