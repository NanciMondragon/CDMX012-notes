// eslint-disable-next-line
import { useEffect, useState } from "react";
import { db, auth, } from "../../lib/firebase";
import { collection, getDocs, addDoc, } from "../../lib/firebase";
import delet from "../../assets/delet.png";
import pencil from "../../assets/pencil.png"
import { query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


function NewNotes() {

  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "notes");

  const getNotes = async () => {
    const q = query(notesCollectionRef, orderBy("date", "desc"));
    const data = await getDocs(q, { includeMetadataChanges: true });
    const notesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //console.log (notesArray)
    return notesArray
  }

  const createNote = async (e) => {
    e.preventDefault()
    const user = auth.currentUser;
    const date = new Date();
    await addDoc(notesCollectionRef, {
      uid: user.uid,
      ID: notesCollectionRef.id,
      email: user.email,
      username: user.displayName,
      id: user.photoURL,
      date,
      title: newTitle,
      description: newDescription
    });

    getNotes().then((notesArray) => {
      setNotes(notesArray)
    })

  };
  //const deleteNote = async (id) => await deleteDoc(doc(db, 'posts', id));

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id)
    await deleteDoc(noteDoc)
    getNotes()
  }

  //Sweet para eliminar nota
  const deleteNoteDoc = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E75956',
      cancelButtonColor: '#E75956',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        //llamada de función eliminar
        deleteNote(id)
        Swal.fire(
          'Your note has been deleted.',
        )
        navigate("/Timeline");

      }
    })

  }

  useEffect(() => {

    getNotes().then((notesArray) => {
      setNotes(notesArray)
    })

    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div>
        <form className='general' onSubmit={createNote}>
          <input className='titleCss' placeholder='Title' onChange={(event) => {
            setNewTitle(event.target.value);
          }}></input>
          <textarea className='writeNoteCss' placeholder='Write your note' onChange={(event) => {
            setNewDescription(event.target.value);
          }}></textarea>
          <button className='btnCreate' type="submit" > Create note </button>
        </form>
      </div>

      <div className="containerNote">
        {notes.map((note) => {
          return <div className="showNote" key={note.id} >
            <section>
              <img className="btnDelet" src={delet} alt="Delet" onClick={() => { deleteNoteDoc(note.id) }} />
            </section>

            <section>
              <p>{note.title}</p>
              <p>{note.description}</p>
            </section>

            <section>
              <img className="btnEdit" src={pencil} alt="Edit" />
            </section>
          </div>
        })}
      </div>
    </>

  );
}
export default NewNotes