import "../../styles/filter.css";

export default function Filter() {
  return (
    <div className="filter-content">
      <button type="button" className="btn-filter">
        Filteri
      </button>
      <div className="div-filter">
        <div className="div-dates">
          <input type="date" name="arrival" placeholder="Dolazak" />
          <input type="date" name="departue" placeholder="Odlazak" />
        </div>
        <div className="div-input">
          <label name="numberOfPeople">Broj osoba:</label>
          <input type="numer" name="numberOfPeople" />
        </div>
        <div className="div-amenities">
          <label name="amenities">Amenities:</label>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}
