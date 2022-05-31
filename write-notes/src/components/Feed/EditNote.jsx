import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../lib/firebase';
//import NewNotes from 'first'



function EditNote() {

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { id } = useParams();
  console.log({id})

  const navigate = useNavigate();

  const update = async (e) => {
    e.preventDefault()
   const note =doc (db, "notes", id);
   const data = { title: newTitle, description: newDescription}
   console.log(data)
   await updateDoc (note, data);
   navigate("/Timeline");
  }

  const getNoteById = async (id) => {
   const note = await getDoc( doc(db, "notes", id) )
   if (note.exists()){
    //console.log(note.data())
    setNewDescription(note. data().description)    
    setNewTitle(note. data().title)
   }else{
     console.log('El producto no existe');
   }



  }

  useEffect (() => {
    getNoteById(id);

    // eslint-disable-next-line
  },[])



  return (
    <div>EditNote</div>
  )
}

export default EditNote