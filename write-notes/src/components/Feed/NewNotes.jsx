// eslint-disable-next-line
import { useEffect, useState } from "react";
import { db, auth, } from "../../lib/firebase";
import { collection, addDoc, } from "../../lib/firebase";
import delet from "../../assets/delet.png";
import pencil from "../../assets/pencil.png"
import { query, orderBy, doc, deleteDoc, where, serverTimestamp, getDocs, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


//const username = auth.currentUser.displayName;


function NewNotes() {

  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "notes");

 
  const createNote = async (e) => {
    e.preventDefault()
    const user = auth.currentUser;
    const date = serverTimestamp();
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
    getNotes();
  };
  
  const getNotes = async () => {
    const user = auth.currentUser.email;
    if (user) {
      const querySnapshot = await getDocs(query(notesCollectionRef, orderBy('date', 'desc'), where('email', "==", user)));
      setNotes(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //console.log(notes)
    }
  }

  useEffect(() => {

    getNotes();
    // eslint-disable-next-line
  }, [])

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id)
    await deleteDoc(noteDoc)
    getNotes()
  }

  //Sweet para eliminar nota
  const deleteNoteDoc = (id) => {
    MySwal.fire({
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


  return (
    <>
      <div>

        {/*<section className='welcome'>
          <h2>Hello, {username} </h2>
          <h2>Welcome to your notes!! </h2>
  </section>*/}

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
              <img className="btnEdit" src={pencil} alt="Edit" onClick={() => navigate("/edit/"+ note.id) } />
            </section>
          </div>
        })}
      </div>
    </>

  );
}
export default NewNotes