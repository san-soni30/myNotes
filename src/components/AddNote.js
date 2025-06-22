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
    <div className="contsainer my-3">
      <div className="container">
        <h2>Add a note</h2>
      </div>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title,</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" name="desc" value={note.desc} className="form-control" id="desc" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" name="tag" value={note.tag} className="form-control" id="tag" onChange={onChange} minLength={5} required />
        </div>
        <button disabled={note.title.length < 5 || note.desc.length < 5} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
