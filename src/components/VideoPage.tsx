import ReactPlayer from "react-player";
import React, { useEffect, useRef, useState } from "react";
import getSubtitle from "../apis/subtitles";
import { useParams } from "react-router-dom";
import { SubtitlesCollection } from "../SubtitlesCollection";
import { Button, Dialog, DialogContent, DialogTitle, Fab, Grid } from "@material-ui/core";
import SubtitleLine from "./SubtitleLine";
import "./VideoPage.css";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const VideoPage = () => {
  let { videoId } = useParams<{ videoId: string }>();
  const playerRef = useRef<ReactPlayer>(null);
  const [subtitles, setSubtitles] = useState<SubtitlesCollection>();
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [dictionaryIsOpen, setDictionaryIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setSubtitles(await getSubtitle("de", videoId));
    })();
  }, [videoId]);

  const onPlayerProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setCurrentSubtitle(subtitles?.getText(playedSeconds * 1000) ?? "");
  };

  const pauseVideo = () => {
    playerRef.current?.getInternalPlayer().pauseVideo();
  };

  const resumeVideo = (moveBackwards = false) => {
    const internalPlayer = playerRef.current?.getInternalPlayer();
    if (!internalPlayer) {
      return;
    }
    internalPlayer.playVideo();
    if (moveBackwards) {
      internalPlayer.seekTo(internalPlayer.getCurrentTime() - 1);
    }
  };

  const onWordClick = (): void => {
    pauseVideo();
    setDictionaryIsOpen(true);
  };

  return (
    <div className="video-subtitle-container">
      <div className="video-container">
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls={true}
          onProgress={onPlayerProgress}
          progressInterval={100}
          height={"100%"}
          width={"100%"}
        />
      </div>
      <div className="subtitle-container" style={{ visibility: currentSubtitle.trim() ? "visible" : "hidden" }}>
        <SubtitleLine subtitleText={currentSubtitle} onWordClick={onWordClick} />
      </div>
      <div className="menu-button-container">
        <Link to="/">
          <Fab color="primary" aria-label="add">
            <HomeIcon />
          </Fab>
        </Link>
      </div>
      <Dialog
        open={dictionaryIsOpen}
        onClose={() => {
          setDictionaryIsOpen(false);
          resumeVideo(true);
        }}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle>Dictionary</DialogTitle>
        <DialogContent>
          <iframe
            src="https://www.linguee.com/english-german/search?source=auto&query=hallo"
            name="linguee-iframe"
            width={"100%"}
            height={"800px"}
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoPage;
