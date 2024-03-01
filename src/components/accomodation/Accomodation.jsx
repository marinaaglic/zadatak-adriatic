import "../../styles/accomodation.css";

export default function Accomodation({ accomodation }) {
  const { title, image, capacity, beachDistanceInMeters } = accomodation;
  return (
    <div className="div-accomodation">
      <div className="accomodation-info">
        <h4>{title}</h4>
        <img src={image} />
      </div>
      <div className="accomodation-details">
        <p>Capacity: {capacity}</p>
        {beachDistanceInMeters && (
          <p>Beach distance in meters: {beachDistanceInMeters}m</p>
        )}
      </div>
      <button className="btn-show-more">Prikaži više</button>
    </div>
  );
}
