const btnEl = document.getElementById('btn')
const appEl = document.getElementById('app')

// saving a note to loccalstorage
const saveNote = (notes) =>{
    localStorage.setItem('notes', JSON.stringify(notes))
}
// creating an element in DOM (textarea)
const createNoteEl = (id, content) =>{
    const element = document.createElement('textarea')
    element.classList.add('note')
    element.placeholder = 'Empty Note'
    element.value = content
    element.addEventListener('dblclick', ()=>{
        const warning = confirm('Do you want to delete the note?')
        if(warning){
            deleteNote(id, element)
        }
    })
    element.addEventListener('input', ()=>{
        updateNote(id, element.value)
    })
    return element;
}

//retrieving notes from localstorage
const getNotes = () =>{
    return JSON.parse(localStorage.getItem('notes') || "[]")
}

//looping through the notes to display created element in DOM
getNotes().forEach((note) =>{
    const noteEl = createNoteEl(note.id, note.content)
    appEl.insertBefore(noteEl, btnEl)
})


// updating the note function
const updateNote = (id, content) =>{
    const notes = getNotes();
    const target = notes.filter((note)=> note.id == id)[0]
    target.content = content;
    saveNote(notes)
}

// delete note function
const deleteNote = (id, element) =>{
    const notes = getNotes().filter((note)=> note.id !== id)
    saveNote(notes)
    appEl.removeChild(element)
    }

//add note function
const addNote = () =>{
    const notes = getNotes()
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    }
    const noteEl = createNoteEl(noteObj.id, noteObj.content)
    appEl.insertBefore(noteEl, btnEl)
    notes.push(noteObj);

    saveNote(notes)
}

btnEl.addEventListener('click', addNote)