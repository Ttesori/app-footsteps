import dayjs from "dayjs";
import { useState, useEffect, useContext } from "react";
import DataContext from "../context/DataContext";
import Modal from 'react-modal';
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import "../css/Modal.css";
Modal.setAppElement('#root');


const CreateHike = () => {
  const { createIsOpen, setCreateIsOpen, setHikeToEdit, hikeToEdit, handleFetch, hikes, setAlert, initialHikes, setInitialHikes, parseDate } = useContext(DataContext);
  const hikeTemplate = {
    title: '',
    location: '',
    distance: '',
    date: parseDate(new Date()),
    notes: ''
  };

  const [newHike, setNewHike] = useState(hikeTemplate);

  const handleUpdate = (e) => {
    const newHike2 = { ...newHike };
    const { id, value } = e.target;
    if (id === 'distance') {
      newHike2['distance'] = Number(value);
    } else {
      newHike2[id] = value;
    }
    setNewHike(newHike2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hikeToEdit._id) {
      handleUpdateHike(newHike);
    } else {
      handleCreateHike(newHike);
    }
  };

  const handleCreateHike = async (newHike) => {
    let body = await handleFetch('POST', '', newHike);
    if (body._id && !body.error) {
      setInitialHikes([body, ...initialHikes]);
      setCreateIsOpen(false);
      setAlert({ type: 'success', message: 'Hike added!' });
      setNewHike(hikeTemplate);
    } else {
      setCreateIsOpen(false);
      setAlert({ type: 'error', message: 'Error creating hike. Please try again later.' });
    }
  };

  const handleUpdateHike = async (updateHike) => {
    let body = await handleFetch('PUT', `/${hikeToEdit._id}`, updateHike);
    if (body._id && !body.error) {
      const newHikes = initialHikes.filter(hike => hike._id !== hikeToEdit._id);
      setInitialHikes([...newHikes, body]);
      setCreateIsOpen(false);
      setAlert({ type: 'success', message: 'Hike updated!' });
      setHikeToEdit(null);
    } else {
      setCreateIsOpen(false);
      setAlert({ type: 'error', message: 'Error updating hike. Please try again later.' });
    }
  };

  const handleDeleteHike = async (hikeId) => {
    let body = await handleFetch('DELETE', `/${hikeToEdit._id}`);
    if (body.id) {
      const newHikes = hikes.filter(hike => hike._id !== hikeId);
      setInitialHikes([...newHikes]);
      setCreateIsOpen(false);
      setAlert({ type: 'success', message: 'Hike deleted!' });
      setNewHike(hikeTemplate);
    } else {
      setCreateIsOpen(false);
      setAlert({ type: 'error', message: 'Error deleting hike. Please try again later.' });
      console.log('ERROR', body);
    }
  };

  const handleCloseAction = () => {
    setNewHike(hikeTemplate);
    setCreateIsOpen(false);
    setHikeToEdit({});
  };

  useEffect(() => {
    if (hikeToEdit?.title) {
      setNewHike({
        title: hikeToEdit?.title,
        location: hikeToEdit?.location,
        distance: hikeToEdit?.distance || '',
        date: hikeToEdit?.date ? dayjs(parseDate(hikeToEdit.date)).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        notes: hikeToEdit?.notes || ''
      });
    }
  }, [hikeToEdit]);

  return (
    <Modal
      className='modal--create-hike'
      isOpen={createIsOpen}
      onRequestClose={handleCloseAction}
      contentLabel={hikeToEdit?._id ? 'Edit a Hike' : 'Add a Hike'}
    >
      <button className="btn-close-modal" onClick={handleCloseAction}><span className="sr-only">Close</span><FaTimes /></button>
      <h2 className="modal__title">{hikeToEdit?._id ? 'Edit' : 'Add'} a Hike</h2>
      <form onSubmit={handleSubmit} className="form form--add">

        <div className="form__group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title"
            placeholder="Name your hike" value={newHike.title}
            onChange={handleUpdate} required
          />
        </div>

        <div className="form__group">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date"
            placeholder="Hike date" value={newHike.date}
            onChange={handleUpdate} required
          />
        </div>

        <div className="form__group">
          <label htmlFor="location">Location</label>
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
        <button className="btn--add-hike">{hikeToEdit?._id ? 'Update' : 'Add'} Hike</button>
        {hikeToEdit?._id && <button onClick={() => handleDeleteHike(hikeToEdit._id)} className="btn--remove-hike"><FaTrashAlt /> Remove Hike</button>}
      </form>
    </Modal>
  );
};
export default CreateHike;