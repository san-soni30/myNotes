import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;

  return (
    <div className="col-md-6">
      <div className="note-card my-4">
        <div className="card-body text-dark">
          <span className="note-tag badge rounded-pill">{note.tag}</span>
          <h5 className="card-title mt-2">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="icon-group">
            <i className="fa-solid fa-pen-to-square mx-2 icon-edit" onClick={() => updateNote(note)}></i>
            <i className="fa-solid fa-trash mx-2 icon-delete" onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
