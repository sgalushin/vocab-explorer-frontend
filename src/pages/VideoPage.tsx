import ReactPlayer from "react-player";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, Fab } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SubtitleLine from "../components/SubtitleLine";
import fetchSubtitles from "../apis/subtitles";
import { SubtitlesCollection } from "../SubtitlesCollection";
import "./VideoPage.css";

const VideoPage = () => {
  let { videoId } = useParams<{ videoId: string }>();
  const playerRef = useRef<ReactPlayer>(null);
  const [subtitles, setSubtitles] = useState<SubtitlesCollection>();
  const [subtitlesEn, setSubtitlesEn] = useState<SubtitlesCollection>();
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [currentSubtitleEn, setCurrentSubtitleEn] = useState("");
  const [dictionaryIsOpen, setDictionaryIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setSubtitles(await fetchSubtitles(process.env.REACT_APP_LANGUAGE!, videoId));
      setSubtitlesEn(await fetchSubtitles("en", videoId));
    })();
  }, [videoId]);

  const onPlayerProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setCurrentSubtitle(subtitles?.getText(playedSeconds * 1000) ?? "");
    setCurrentSubtitleEn(subtitlesEn?.getText(playedSeconds * 1000) ?? "");
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
      <div className="subtitle-container-en">
        {currentSubtitleEn}
      </div>
      <div className="menu-button-container">
        <Link className="menu-button" to="/">
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
            title="Linguee dictionary"
            src="https://www.linguee.com/english-german/search?query=test"
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
