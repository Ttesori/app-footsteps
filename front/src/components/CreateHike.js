import { useState, useEffect } from "react";

const CreateHike = ({ handleCreateHike, handleUpdateHike, handleDeleteHike, hike, handleClose }) => {
  const [newHike, setNewHike] = useState({});

  const parseDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    console.log(`${year}-${month}-${dt}`);
    return `${year}-${month}-${dt}`;
  };

  const resetHike = () => {
    const hikeTemplate = {
      title: '',
      location: '',
      distance: '',
      date: parseDate(new Date()),
      notes: ''
    };
    setNewHike(hikeTemplate);
  };


  useEffect(() => {
    const resetNewHike = {
      title: hike?.title,
      location: hike?.location,
      distance: hike?.distance || '',
      date: hike?.date ? parseDate(new Date(hike.date)) : parseDate(new Date()),
      notes: hike?.notes || ''
    };
    setNewHike(resetNewHike);

  }, [hike]);

  const handleUpdate = (e) => {
    const newHike2 = { ...newHike };
    if (e.target.id === 'distance') {
      newHike2['distance'] = Number(e.target.value);
    } else {
      newHike2[e.target.id] = e.target.value;
    }
    setNewHike(newHike2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hike._id) {
      handleUpdateHike(newHike);
      resetHike();
    } else {
      handleCreateHike(newHike);
      resetHike();
    }
  };

  const handleCloseAction = () => {
    resetHike();
    handleClose();
  };

  return (
    <section>
      <button onClick={handleCloseAction}>Close</button>
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
        {hike?._id && <button onClick={() => handleDeleteHike(hike._id)}>Remove Hike</button>}
      </form>
    </section>
  );
};
export default CreateHike;