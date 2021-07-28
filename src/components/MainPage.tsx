import { Box, Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MainPage.css";

const extractVideoIdFromVideoOrUrl = (videoIdOrUrl: string): string => {
  if (videoIdOrUrl.startsWith("https")) {
    const url = new URL(videoIdOrUrl);
    switch (url.hostname) {
      case "youtube.com":
      case "www.youtube.com":
        return url.searchParams.get("v") ?? "";
      case "youtu.be":
      case "www.youtu.be":
        return url.pathname.slice(1); // first char is "/" which we don't need
      default:
        return "";
    }
  } else {
    return encodeURIComponent(videoIdOrUrl);
  }
};

const MainPage = () => {
  const [videoIdOrUrl, setVideoIdOrUrl] = useState("");
  const [goButtonDisabled, setGoButtonDisabled] = useState(false);

  useEffect(() => {
    setGoButtonDisabled(extractVideoIdFromVideoOrUrl(videoIdOrUrl).trim() == "");
  }, [videoIdOrUrl]);

  return (
    <div className="video-id-and-go-button-container">
      <div className="video-id-container">
        <TextField
          style={{ width: "60%" }}
          label="URL / Video ID"
          variant="outlined"
          value={videoIdOrUrl}
          onChange={(e) => setVideoIdOrUrl(e.target.value)}
        />
      </div>
      <div className="go-button-container">
        <Link to={`/youtube/${extractVideoIdFromVideoOrUrl(videoIdOrUrl)}`}>
          <Button variant="contained" size="large" color="primary" disabled={goButtonDisabled}>
            Go
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
