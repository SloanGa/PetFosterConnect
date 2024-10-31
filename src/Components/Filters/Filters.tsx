import './Filtres.scss';

const Filters = () => {
    return (
        <div className="filters">
        <form className="filters__form" method="post" action="">
          <label className="filters__form__description" htmlFor="species">Type</label>
          <select className="form-select" id="species" name="species">
            <option value="">Tous les types</option>
            <option value="dog">Chien</option>
            <option value="chat">Chat</option>
          </select>

          <label className="filters__form__description" htmlFor="department">Localisation</label>
          <select className="form-select" id="department" name="department">
            <option value="">Tous les départements</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <label className="filters__form__description" htmlFor="association">Association</label>
          <select className="form-select" id="association" name="association">
            <option value="">Toutes les associations</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <label className="filters__form__description" htmlFor="gender">Genre</label>
          <select className="form-select" id="gender" name="gender">
            <option value="">Tous les genres</option>
            <option value="male">Mâle</option>
            <option value="female">Femelle</option>
          </select>

          <fieldset className="filters__form__fieldset">
            <legend className="filters__form__description">Âge</legend>
            <label>
              <input className="form-check-input" type="checkbox" name="age" value="0-2" aria-label="0 à 2 ans" />
              0 à 2 ans
            </label>
            <label>
              <input className="form-check-input" type="checkbox" name="age" value="2-5" aria-label="2 à 5 ans" />
              2 à 5 ans
            </label>
            <label>
              <input className="form-check-input" type="checkbox" name="age" value="5-10" aria-label="5 à 10 ans" />
              5 à 10 ans
            </label>
            <label>
              <input className="form-check-input" type="checkbox" name="age" value="11" aria-label="Plus de 10 ans" />
             10 ans
            </label>
          </fieldset>

          <fieldset className="filters__form__fieldset">
            <legend className="filters__form__description">Taille</legend>
            <label>
              <input className="form-check-input" type="checkbox" name="size" value="small" aria-label="Petit" />
              Petit
            </label>
            <label>
              <input className="form-check-input" type="checkbox" name="size" value="medium" aria-label="Moyen" />
              Moyen
            </label>
            <label>
              <input className="form-check-input" type="checkbox" name="size" value="large" aria-label="Grand" />
              Grand
            </label>
          </fieldset>

          <button className="btn" type="submit" aria-label="Bouton de recherche">
            Rechercher
          </button>
        </form>
      </div>

)};

export default Filters;
