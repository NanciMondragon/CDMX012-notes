// eslint-disable-next-line
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, addDoc } from "../../lib/firebase";


function NewNotes() {

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "notes")

  const createNote = async () => {
    await addDoc(notesCollectionRef, { title: newTitle, description: newDescription });
  };

  useEffect(() => {

    const getNotes = async () => {
         const data= await getDocs(notesCollectionRef);
         setNotes(data.docs.map((doc) =>({...doc.data(), id: doc.id} )));

    }

    getNotes()

// eslint-disable-next-line
}, [])

  return (
    <>
    <div>
    <form className='general'>
        <input className='titleCss' placeholder='Title' onChange={(event)=>{setNewTitle(event.target.value);
        }}></input>
        <textarea className='writeNoteCss' placeholder='Write your note'onChange={(event)=>{setNewDescription(event.target.value);
        }}></textarea>
        </form>
        <button className='btnCreate'  onClick={createNote}> Create note </button>
    </div>
        
    <div>
    {notes.map((note)=>{
        return <div>
            <p>{note.title}</p>
            <p>{note.description}</p>
            </div>})}
    </div>
    </>  
    
    );       
  }
export default NewNotes