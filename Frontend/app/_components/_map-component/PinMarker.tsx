import { Marker, useMap } from "react-leaflet";
import { PinMarkerProps } from "@/app/types";
import { simplePin } from "@/app/_components/_map-component/map-icons";
import { useCategoryStore } from "@/stores/categoryStore";

export default function PinMarker({ pin, onSelectPin }: PinMarkerProps) {
  const map = useMap();
  const categories = useCategoryStore((s) => s.categories);
  const categoryData = pin.categories?.[0] || categories.find(c => (c.id === pin.category ));
  const color = categoryData?.color || "#22c55e";

  return (
    <Marker
      position={[pin.lat, pin.lng]}
      icon={simplePin(color)}
      eventHandlers={{
        click: () => {
          onSelectPin(pin);
          map.flyTo([pin.lat, pin.lng], map.getZoom() + 1);
        },
      }}
    />
  );
}