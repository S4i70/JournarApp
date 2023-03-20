import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, Notes, SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components/ImageGallery";
import { startSaveNote,setActiveNote, startUploadingFiles, startDeleteNote } from "../../store/journal";

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: note, messageSaved, imageSaved, isSaving } = useSelector(state => state.journal);

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo( () => {
    const newDate = new Date( date );
    return newDate.toLocaleString();
  },[date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch( setActiveNote( formState ));
  }, [formState])

  useEffect(() => {
    if( messageSaved.length > 0 ) {
      Swal.fire('Nota Actualizada', messageSaved, 'success')
    }
  }, [messageSaved])
  
  useEffect(() => {
    if( imageSaved.length > 0 ) {
      Swal.fire('Galeria Actualizada', imageSaved, 'success')
    }
  }, [imageSaved])
  
  const onFileInputChange = ({ target }) =>{
  
    if( target.files=== 0 ) return;
    dispatch(startUploadingFiles( target.files ));
  }

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }
  
  const onDelete= () => {
    dispatch(startDeleteNote());
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate_faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={40} fontWeight="light">
          { dateString }
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          style={{ display: 'none'}}
          />
        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click()}
          sx={{ fontSize: 20, mr: 1 }}
        >
          <UploadFileOutlined sx={{mr:1}}/>
          Subir imagen
        </IconButton>
        <Button
          disabled= { isSaving }
          onClick={ onSaveNote }
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese título"
          label="titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={ title }
          onChange={ onInputChange }
          />
        <TextField
          type="text"
          variant="filled"
          multiline
          fullWidth
          placeholder="¿Qué paso hoy?"
          label="titulo"
          minRows={5}
          name="body"
          value={ body }
          onChange={ onInputChange }
          />
      </Grid>

      <Grid container justifyContent="end">
        <Button
          onClick={ onDelete }
          sx={{mt: 2}}
          color="error"
        >
          <DeleteOutline/>
          Borre
        </Button>
      </Grid>

        <ImageGallery
          images= { note.imageUrls }
        />
    </Grid>
  );
};
