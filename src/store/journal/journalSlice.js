import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        isUpload: false,
        messageSaved: '',
        imageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id:'ABC',
        //     title: '',
        //     body: '',
        //     date: 1234,
        //     imgUrl: [],
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
            state.isUpload = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
            state.imageSaved= '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setUpload: ( state ) => {
            state.isUpload = true;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
            state.imageSaved= '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.isUpload = false;
            state.notes = state.notes.map( note => {

                if(note.id === action.payload.id)
                    return action.payload;
            return note;        
            });
            state.messageSaved = `${ action.payload.title }, Actualización correcta`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]; 
            state.isSaving = false;
            state.isUpload = false;
            state.imageSaved = "Imagen subida correctamente, no olvides dar en el botón GUARDAR";
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.isUpload = false;
            state.messageSaved = '';
            state.imageSaved= '';
            state.notes = [];
            state.active = null
        }, 
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote, 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout,
    setUpload
} = journalSlice.actions;