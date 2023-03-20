import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../store/journal/journalSlice"




export const SideBarItem = ({title='', body, id, date, imageUrls=[]}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17
        ? title.substring(0,17) + '...'
        : title;
    }, [title]);

    const handleOnBotton = () => {
        
        dispatch( setActiveNote({ title, body, id, date, imageUrls }));
    }

  return (
    <ListItem disablePadding>
        <ListItemButton
            onClick={ handleOnBotton }
        >
            <ListItemIcon >
                <TurnedInNot sx={{ color: 'red'}} />
            </ListItemIcon>
            <Grid container >
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body }/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
