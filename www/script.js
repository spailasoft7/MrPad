const APP_VERSION = "1.0.0";
// ========================================
// NOTE APP
// PART 1 - FOUNDATION
// ========================================



// ========================================
// HTML ELEMENTS
// ========================================

const notesContainer = document.getElementById("notesContainer");

const searchInput = document.getElementById("searchInput");

const addBtn = document.getElementById("addBtn");

const settingsBtn = document.getElementById("settingsBtn");

const editorModal = document.getElementById("editorModal");

const viewModal = document.getElementById("viewModal");

const settingsPage = document.getElementById("settingsPage");

const titleInput = document.getElementById("titleInput");

const descriptionInput = document.getElementById("descriptionInput");

const saveBtn = document.getElementById("saveBtn");

const cancelBtn = document.getElementById("cancelBtn");

const viewTitle = document.getElementById("viewTitle");

const viewDescription = document.getElementById("viewDescription");

const viewDate = document.getElementById("viewDate");

const editBtn = document.getElementById("editBtn");

const deleteBtn = document.getElementById("deleteBtn");

const doneBtn = document.getElementById("doneBtn");

const closeBtn = document.getElementById("closeBtn");

const clearNotesBtn = document.getElementById("clearNotesBtn");

const backBtn = document.getElementById("backBtn");

const characterCount =
document.getElementById("characterCount");


// ========================================
// VARIABLES
// ========================================

let notes = [];

let selectedNote = null;

let editing = false;

if(notes.length === 0){

    console.log("Welcome to Notes App 🚀");

}


// ========================================
// LOAD NOTES
// ========================================

function loadNotes(){

    const savedNotes = localStorage.getItem("notes");

    if(savedNotes){

        notes = JSON.parse(savedNotes);

    }else{

        notes = [];

    }

}

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const filteredNotes = notes.filter(function (note) {

        return (
            note.title.toLowerCase().includes(searchText) ||
            note.description.toLowerCase().includes(searchText)
        );

    });

    renderNotes(filteredNotes);

});


// ========================================
// SAVE NOTES
// ========================================

function saveNotes(){

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}



// ========================================
// FORMAT DATE
// ========================================

function formatDate(timestamp){

    return new Date(timestamp).toLocaleString();

}



// ========================================
// RENDER NOTES
// ========================================
function renderNotes(noteList = notes){

    notesContainer.innerHTML = "";


noteList.forEach(function(note){

        // Create the note card here...

    });
    // No Notes

    if(notes.length === 0){

        notesContainer.innerHTML = `
        <div class="emptyState">

            <div>

                <h2>No Notes</h2>

                <p>Tap the + button to create one.</p>

            </div>

        </div>
        `;

        return;

    }



    // Show Notes

    notes.forEach(function(note){

        const card = document.createElement("div");

        card.className = "noteCard";



        if(note.done){

            card.classList.add("doneNote");

        }



        card.innerHTML = `

            <h3>${note.title}</h3>

            <div class="noteDate">

                ${formatDate(note.createdAt)}

            </div>

        `;



        notesContainer.appendChild(card);

    });

}



// ========================================
// START APP
// ========================================

loadNotes();

renderNotes();

// ========================================
// OPEN EDITOR
// ========================================

function openEditor() {

    editing = false;

    titleInput.value = "";

    descriptionInput.value = "";

    editorModal.classList.add("show");

    titleInput.focus();

}



// ========================================
// CLOSE EDITOR
// ========================================

function closeEditor() {

    editorModal.classList.remove("show");

    titleInput.value = "";

    descriptionInput.value = "";

}



// ========================================
// CREATE NOTE
// ========================================

function createNote() {

    const title = titleInput.value.trim();
if(title.length > 50){

    alert("Title is too long.");

    return;

}

    const description = descriptionInput.value.trim();
    



    if (title === "") {

        alert("Please enter a title.");

        return;

    }



    const note = {

        id: Date.now(),

        title: title,

        description: description,

        done: false,

        createdAt: Date.now()

    };



    notes.unshift(note);

    saveNotes();

    renderNotes();

    closeEditor();

}



// ========================================
// SAVE BUTTON
// ========================================

saveBtn.addEventListener("click", function () {

    createNote();

});



// ========================================
// ADD BUTTON
// ========================================

addBtn.addEventListener("click", function () {

    openEditor();

});



// ========================================
// CANCEL BUTTON
// ========================================

cancelBtn.addEventListener("click", function () {

    closeEditor();

});



// ========================================
// CLOSE MODAL WHEN CLICKING BACKGROUND
// ========================================

editorModal.addEventListener("click", function (event) {

    if (event.target === editorModal) {

        closeEditor();

    }

});

// ========================================
// OPEN VIEW MODAL
// ========================================

function openView(note){

    selectedNote = note;

    viewTitle.textContent = note.title;

    viewDescription.textContent = note.description;

    viewDate.textContent = formatDate(note.createdAt);

    doneBtn.textContent = note.done ? "Undo" : "Done";

    viewModal.classList.add("show");

}



// ========================================
// CLOSE VIEW MODAL
// ========================================

function closeView(){

    viewModal.classList.remove("show");

}



// ========================================
// EDIT NOTE
// ========================================

editBtn.addEventListener("click", function(){

    if(selectedNote == null) return;

    editing = true;

    titleInput.value = selectedNote.title;

    descriptionInput.value = selectedNote.description;

    closeView();

    editorModal.classList.add("show");

});



// ========================================
// UPDATE NOTE
// ========================================

function updateNote(){

    selectedNote.title = titleInput.value.trim();

    selectedNote.description = descriptionInput.value.trim();

    saveNotes();

    renderNotes();

    closeEditor();

}



// ========================================
// REPLACE SAVE BUTTON
// ========================================

saveBtn.onclick = function(){

    if(editing){

        updateNote();

        editing = false;

    }else{

        createNote();

    }

};



// ========================================
// DELETE NOTE
// ========================================

deleteBtn.addEventListener("click", function(){

    if(selectedNote == null) return;

    if(confirm("Delete this note?")){

        notes = notes.filter(function(note){

            return note.id !== selectedNote.id;

        });

        saveNotes();

        renderNotes();

        closeView();

    }

});



// ========================================
// DONE BUTTON
// ========================================

doneBtn.addEventListener("click", function(){

    if(selectedNote == null) return;

    selectedNote.done = !selectedNote.done;

    saveNotes();

    renderNotes();

    openView(selectedNote);

});



// ========================================
// CLOSE BUTTON
// ========================================

closeBtn.addEventListener("click", function(){

    closeView();

});

// ========================================
// RENDER NOTES
// ========================================

function renderNotes(noteList = notes){

    notesContainer.innerHTML = "";

    if(noteList.length === 0){

        notesContainer.innerHTML = `
            <div class="emptyState">

                <div>

                    <h2>No Notes</h2>

                    <p>Create your first note.</p>

                </div>

            </div>
        `;

        return;

    }

    noteList.forEach(function(note){

        const card = document.createElement("div");

        card.className = "noteCard";

        if(note.done){

            card.classList.add("doneNote");

        }


        card.innerHTML = `
            <h3>${note.title}</h3>
            <div class="noteDate">
                ${formatDate(note.createdAt)}
            </div>
        `;

        card.addEventListener("click", function(){

            openView(note);

        });

        notesContainer.appendChild(card);

    });

}

// ========================================
// CTRL + ENTER TO SAVE
// ========================================

descriptionInput.addEventListener("keydown", function(event){

    if(event.ctrlKey && event.key === "Enter"){

        saveBtn.click();

    }

});

// ========================================
// ESC TO CLOSE MODALS
// ========================================

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        closeEditor();

        closeView();

    }

});

notes.sort(function(a,b){

    return b.createdAt - a.createdAt;

});

window.addEventListener("load", function(){

    searchInput.focus();

});

descriptionInput.addEventListener("input", function(){

    characterCount.textContent =
        descriptionInput.value.length + " characters";

});

;
