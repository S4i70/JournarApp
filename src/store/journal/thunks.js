import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";


export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        
        dispatch( savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            imageUrls:[],
            date: new Date().getTime(),
        };
        
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`));
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        //! dispaht
        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState) => {
        
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El usuario no existe')
        
        const newNotes = await loadNotes( uid );
        
        dispatch( setNotes( newNotes ));
    }
}

export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteTofireStore = { ...note };
        delete noteTofireStore.id;
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await setDoc( docRef, noteTofireStore, { merge: true })

        dispatch( updateNote( note ) )
        
    }
}

export const startUploadingFiles = ( files=[] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() )
        // await fileUpload( files[0])

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }
        const photosUrls = await Promise.all( fileUploadPromises);

        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeleteNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;   

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef )

        dispatch( deleteNoteById( note.id ));
    }
}
