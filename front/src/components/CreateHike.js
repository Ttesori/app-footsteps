import { useState, useEffect } from "react";

const CreateHike = ({ handleCreateHike }) => {
  const [newHike, setNewHike] = useState({
    title: '',
    location: '',
    length: '',
    desc: ''
  });
  const handleUpdate = (e) => {
    const newHike2 = { ...newHike };
    newHike2[e.target.id] = e.target.value;
    setNewHike(newHike2);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateHike(newHike);
  };
  useEffect(() => {
    console.log(newHike);

  }, [newHike]);

  return (
    <section>
      <h2>Add a Hike</h2>
      <form onSubmit={handleSubmit} className="form form--add">

        <div className="form__group">
          <label htmlFor="">Title</label>
          <input type="text" name="title" id="title"
            placeholder="Name your hike" value={newHike.title}
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
          <label htmlFor="length">Length</label>
          <input type="text" name="length" id="length"
            placeholder="Hike length" value={newHike.length}
            onChange={handleUpdate}
          />
        </div>

        <div className="form__group">
          <label htmlFor="desc">Description</label>
          <textarea name="desc" id="desc" placeholder="Description">
            {newHike.description}
          </textarea>
        </div>
        <button>Add Hike</button>
      </form>
    </section>
  );
};
export default CreateHike;