import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [videoIdOrURL, setVideoIdOrUrl] = useState("");
  return (
    <Box>
      <TextField
        style={{ width: "60%" }}
        id="outlined-basic"
        label="URL / Video ID"
        variant="outlined"
        value={videoIdOrURL}
        onChange={(e) => setVideoIdOrUrl(e.target.value)}
      />
      <Link to={`/youtube/${videoIdOrURL}`}>
        <Button variant="contained" color="primary">
          Go
        </Button>
      </Link>
    </Box>
  );
};

export default MainPage;
