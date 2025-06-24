import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
// import Notes from './Notes';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.desc, note.tag);
    setNote({ title: "", desc: "", tag: "" });
    props.showAlert("Added Successfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-4 add-note-container rounded shadow">
  <h2 className="text-center mb-4">Add a Note</h2>
  <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input type="text" className="form-control custom-input" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
    </div>
    <div className="mb-3">
      <label htmlFor="desc" className="form-label">Description</label>
      <input type="text" className="form-control custom-input" id="desc" name="desc" value={note.desc} onChange={onChange} minLength={5} required />
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" className="form-control custom-input" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
    </div>
    <button disabled={note.title.length < 5 || note.desc.length < 5} type="submit" onClick={handleClick} className="btn btn-theme">Add Note</button>
  </form>
</div>

  )
}

export default AddNote
