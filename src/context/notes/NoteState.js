// import NoteContext from "./noteContext";
// import { useState } from "react";
// const NoteState = (props) => {
//    const s = {
//       "name": "ABC",
//       "class": "MCA-II"
//    }
//    const [state,setState] = useState(s);
//    const update = () => {
//       setTimeout(() => {
//          setState({
//             "name": "XYZ",
//             "class": "MCA-III"
//          })
//       }, 1000)
//    }
//    return (
//       <NoteContext.Provider value={{state, update}}>
//          {props.children}
//       </NoteContext.Provider>
//    )
// }

// export default NoteState;

import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
 const notesInitial = []

const [notes, setNotes] = useState(notesInitial);

// Get all notes
//Add note
const getNote = async () =>{
  // API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
     'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1Mjg2NDNkYWJlODBkM2I2OTUxNzU1In0sImlhdCI6MTc1MDI0NTg5OX0.G3W0wXAeJAyrvtZmEZFAmvTtmTzyb0BDjeLn-97y92k'

    },
  });
  const json  = await response.json()
  // console.log(json)
  setNotes(json)

}

//Add note
const addNote = async (title,description,tag) =>{
  // API call
  const response = await fetch(`${host}/api/notes/addnote`,{
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
     'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1Mjg2NDNkYWJlODBkM2I2OTUxNzU1In0sImlhdCI6MTc1MDI0NTg5OX0.G3W0wXAeJAyrvtZmEZFAmvTtmTzyb0BDjeLn-97y92k'

    },
    body: JSON.stringify({title, description, tag})
  });
  const note  = await response.json();
  setNotes(notes.concat(note))
// console.log("Note is added")
 
}


//Delete note
const deleteNote = async (id) =>{
  //API call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
     'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1Mjg2NDNkYWJlODBkM2I2OTUxNzU1In0sImlhdCI6MTc1MDI0NTg5OX0.G3W0wXAeJAyrvtZmEZFAmvTtmTzyb0BDjeLn-97y92k'

    },
  });
  const json = response.json
  //   console.log(json)
  // console.log("Deleting note : "+id)
  const newNotes = notes.filter((note) => {return note._id !== id})
  setNotes(newNotes);
}
//Edit note
const editNote = async (id, title, description, tag) =>{
  // API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
     'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1Mjg2NDNkYWJlODBkM2I2OTUxNzU1In0sImlhdCI6MTc1MDI0NTg5OX0.G3W0wXAeJAyrvtZmEZFAmvTtmTzyb0BDjeLn-97y92k'

    },
    body: JSON.stringify({title, description, tag})
  });
  // const json  = await response.json();
  // console.log(json)
  let newNotes = JSON.parse(JSON.stringify(notes))
// Logic to edit in client side
  for(let index = 0; index < notes.length; index++){
    const ele = newNotes[index];
    if(ele._id === id){   
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }

  }
  setNotes(newNotes);
}
   return (
      <NoteContext.Provider value={{notes, setNotes,addNote,deleteNote,editNote, getNote}}>
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;

