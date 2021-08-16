import { Button, TextField } from "@material-ui/core";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  useEffect(() => {
    setGoButtonDisabled(extractVideoIdFromVideoOrUrl(videoIdOrUrl).trim() === "");
  }, [videoIdOrUrl]);

  const textFieldOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      goToVideo();
    }
  };

  const goToVideo = () => {
    if (!goButtonDisabled) {
      history.push(`/youtube/${extractVideoIdFromVideoOrUrl(videoIdOrUrl)}`);
    }
  };

  return (
    <>
      <div className="video-id-and-go-button-container">
        <div className="video-id-container">
          <TextField
            onKeyPress={textFieldOnKeyPress}
            style={{ width: "60%" }}
            label="URL / Video ID"
            variant="outlined"
            value={videoIdOrUrl}
            onChange={(e) => setVideoIdOrUrl(e.target.value)}
          />
        </div>
        <div className="go-button-container">
          <Button variant="contained" size="large" color="primary" disabled={goButtonDisabled} onClick={goToVideo}>
            Go
          </Button>
        </div>
      </div>
      <div className="footer">
        <Link to="/about">About</Link>
      </div>
    </>
  );
};

export default MainPage;
