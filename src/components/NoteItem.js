import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
function NoteItem(props) {
   const context = useContext(noteContext);
   const { note, updateNote } = props;
   const { deleteNote } = context;
   return (
      <div className="col-md-3">
         <div className="card my-4">
            <div className="card-body">
               <span className="position-absolute top-0 start-50 p-2 translate-middle badge rounded-pill bg-primary ">{note.tag}</span>
               <h5 className="card-title">{note.title}</h5>
               <p className="card-text">{note.description}</p>
               {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
               <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note);}}></i>
               <i className="fa-solid fa-trash mx-2" onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
               }}></i>
            </div>
         </div>
      </div>
   )
}

export default NoteItem
