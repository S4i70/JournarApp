import { Box, Toolbar } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

const drawerWidth = 240;
const drawerWidthXs= 73;

export const JournalLayout = ({ children }) => {
  return (
    <Box 
      className="animate__animated animate__fadeIn animate_faster"
      sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 2, ml: { xs:9, sm:1 }  }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
