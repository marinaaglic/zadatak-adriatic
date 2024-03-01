import "../../styles/filter.css";

export default function Filter() {
  return (
    <div className="filter-content">
      <h2>Filtriraj prema:</h2>
      <div className="div-filter">
        <div className="div-dates">
          <input type="date" name="arrival" placeholder="Dolazak" />
          <input type="date" name="departue" placeholder="Odlazak" />
        </div>
        <div className="div-input">
          <label name="numberOfPeople">Broj osoba:</label>
          <input type="numer" name="numberOfPeople" />
        </div>
        <div className="div-amenities-filter">
          <label>Dodatne usluge:</label>
          <label>
            <input type="checkbox" name="airConditioning" />
            Klima uređaj
          </label>
          <label>
            <input type="checkbox" name="parkingSpace" />
            Parking mjesto
          </label>
          <label>
            <input type="checkbox" name="pets" />
            Kućni Ljubimci
          </label>
          <label>
            <input type="checkbox" name="pool" />
            Bazen
          </label>
          <label>
            <input type="checkbox" name="wifi" />
            Wi-Fi
          </label>
          <label>
            <input type="checkbox" name="tv" />
            TV
          </label>
        </div>
      </div>
      <button type="button" className="btn-search">
        Pretraži
      </button>
    </div>
  );
}
