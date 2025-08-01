import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, editNote} = context;
  const [note, setNote] = useState({id: "",etitle: "", edesc: "", etag: "default"})
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
if (token && token !== "undefined") {
  getNote();
} else {
  navigate("/");
}
// eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edesc: currentNote.description, etag: currentNote.tag});
  }
   const handleClick = (e) => {
    // console.log("Updating note", note);
    editNote(note.id, note.etitle, note.edesc, note.etag);
     refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <AddNote  showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content custom-modal">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title,</label>
                  <input type="text" className="form-control custom-input" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <input type="text" name="edesc" className="form-control custom-input" id="edesc" value={note.edesc}onChange={onChange} minLength={5} required  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" name="etag" className="form-control custom-input" id="etag" value={note.etag}onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edesc.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your note</h2>
        <div className="container">
  {Array.isArray(notes) && notes.length === 0 && 'You have no notes'}
</div>
{Array.isArray(notes) && notes.map((note) => (
  <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
))}
      </div>
    </>
  )
}

export default Notes
