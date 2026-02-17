import L from "leaflet";

export const simplePin = (color: string) => {
  return L.divIcon({
    className: "custom-pin",
    html: `
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.325C12 21.325 19 15.36 19 9.18C19 5.215 15.866 2 12 2C8.134 2 5 5.215 5 9.18C5 15.36 12 21.325 12 21.325Z" 
              fill="${color}" 
              stroke="white" 
              stroke-width="2"/>
        <circle cx="12" cy="9" r="3" fill="white"/>
      </svg>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};