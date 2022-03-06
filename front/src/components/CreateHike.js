import { useState, useEffect } from "react";

const CreateHike = ({ handleCreateHike, handleUpdateHike, hike }) => {
  const [newHike, setNewHike] = useState({});
  const hikeTemplate = {
    title: '',
    location: '',
    distance: '',
    date: '',
    notes: ''
  };

  useEffect(() => {
    const resetNewHike = {
      title: hike?.title || '',
      location: hike?.location || '',
      distance: hike?.distance || '',
      date: parseDate(hike?.date) || '',
      notes: hike?.notes || ''
    };
    setNewHike(resetNewHike);

  }, [hike]);

  const parseDate = (d) => {
    const date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return `${year}-${month}-${dt}`;
  };


  const handleUpdate = (e) => {
    const newHike2 = { ...newHike };
    if (e.target.id === 'distance') {
      newHike2['distance'] = parseInt(e.target.value);
    } else {
      newHike2[e.target.id] = e.target.value;
    }
    setNewHike(newHike2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hike._id) {
      handleUpdateHike(newHike);
      setNewHike(hikeTemplate);
    } else {
      handleCreateHike(newHike);
      setNewHike(hikeTemplate);
    }

  };
  useEffect(() => {
    console.log(newHike);

  }, [newHike]);

  return (
    <section>
      <h2>{hike?._id ? 'Edit' : 'Add'} a Hike</h2>
      <form onSubmit={handleSubmit} className="form form--add">

        <div className="form__group">
          <label htmlFor="">Title</label>
          <input type="text" name="title" id="title"
            placeholder="Name your hike" value={newHike.title}
            onChange={handleUpdate} required
          />
        </div>

        <div className="form__group">
          <label htmlFor="">Date</label>
          <input type="date" name="date" id="date"
            placeholder="Hike date" value={newHike.date}
            onChange={handleUpdate} required
          />
        </div>

        <div className="form__group">
          <label htmlFor="">Location</label>
          <input type="text" name="location" id="location"
            placeholder="Hike location" value={newHike.location}
            onChange={handleUpdate} required
          />
        </div>

        <div className="form__group">
          <label htmlFor="distance">Distance</label>
          <input type="number" name="distance" id="distance"
            placeholder="Hike distance" value={newHike.distance}
            onChange={handleUpdate}
          />
        </div>

        <div className="form__group">
          <label htmlFor="notes">Description</label>
          <textarea name="notes" id="notes" placeholder="Description" value={newHike.notes} onChange={handleUpdate}>
          </textarea>
        </div>
        <button>{hike?._id ? 'Update' : 'Add'} Hike</button>
      </form>
    </section>
  );
};
export default CreateHike;