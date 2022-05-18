import React from 'react'

function NewNotes() {
  return (
<div>
<form className='inputs'>
    <input className='tittle' placeholder='Tittle' ></input>
    <textarea className='writeNote' placeholder='Write your note ...' ></textarea>
    </form>
    <button className='btnCreate'> CREATE</button>

</div>    

)

};

export default NewNotes