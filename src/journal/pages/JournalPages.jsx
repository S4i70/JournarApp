import { useDispatch, useSelector } from "react-redux";
import { AddOutlined } from "@mui/icons-material";
import { Box, Grid, Icon, IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { startNewNote  } from "../../store/journal/thunks";
import { Isloading } from "../components/Isloading";

export const JournalPages = () => {
  
  const { isSaving, active, isUpload } = useSelector(state => state.journal);
  
  const dispatch = useDispatch();


  const onStartNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      
      {
        ( active === null ? <NothingSelectedView /> :  <NoteView />  )
      }
      <Grid item>
        {
          ( isUpload === false ? " " :  <Isloading/>  )
        }
      </Grid>
      <IconButton
        disabled={ isSaving }
        onClick={onStartNewNote}
        size="large"
        sx={{
          color: "black",
          backgroundColor: "error.main",
          hover: { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 40 }} />
      </IconButton>
    </JournalLayout>
  );
};
