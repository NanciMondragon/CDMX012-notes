// eslint-disable-next-line
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, addDoc, } from "../../lib/firebase";
import delet from "../../assets/delet.png";
import pencil from "../../assets/pencil.png"

function NewNotes() {

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "notes");


  const createNote = async () => {
    await addDoc(notesCollectionRef, { title: newTitle, description: newDescription });
  };

  useEffect(() => {

    const getNotes = async () => {
      //const q = query(notesCollectionRef, orderBy("title", "desc");

      const data = await getDocs(notesCollectionRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    }

    getNotes()

    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div>
        <form className='general'>
          <input className='titleCss' placeholder='Title' onChange={(event) => {
            setNewTitle(event.target.value);
          }}></input>
          <textarea className='writeNoteCss' placeholder='Write your note' onChange={(event) => {
            setNewDescription(event.target.value);
          }}></textarea>
          <button className='btnCreate' onClick={createNote}> Create note </button>
        </form>
      </div>

      <div className="containerNote">
        {notes.map((note) => {
          return <div className="showNote">
            <section>
              <img className="btnEdit" src={pencil} alt="Edit" />
            </section>

            <p>{note.title}</p>
            <p>{note.description}</p>

            <section>
              <img className="btnDelet" src={delet} alt="Delet" />
            </section>
          </div>
        })}
      </div>
    </>

  );
}
export default NewNotes