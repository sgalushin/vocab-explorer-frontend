import axios from "axios";
import { SubtitlesCollection } from "../SubtitlesCollection";

const youtubeVttToObject = (vttString: string): SubtitlesCollection => {
  const timestampToMsec = (timestamp: string): number => {
    const hours = parseInt(timestamp.slice(0, 2));
    const minutes = parseInt(timestamp.slice(3, 5));
    const seconds = parseInt(timestamp.slice(6, 8));
    const milliseconds = parseInt(timestamp.slice(9, 12));
    return milliseconds + seconds * 1000 + minutes * 60 * 1000 + hours * 60 * 60 * 1000;
  };

  const timestampRe = new RegExp(`\\d\\d:\\d\\d:\\d\\d.\\d\\d\\d --> \\d\\d:\\d\\d:\\d\\d.\\d\\d\\d`);
  const subtitles = new SubtitlesCollection();
  for (const line of vttString.split(`\n`)) {
    if (line.trim().length == 0) {
      continue;
    }
    if (timestampRe.test(line)) {
      subtitles.items.push({
        start: timestampToMsec(line.slice(0, 12)),
        end: timestampToMsec(line.slice(17, 29)),
        text: "",
      });
    } else if (subtitles.items.length > 0) {
      subtitles.items[subtitles.items.length - 1].text +=
        (subtitles.items[subtitles.items.length - 1].text ? " " : "") + line;
    }
  }

  return subtitles;
};

const removeInternalTags = (vttString: string): string => {
  const tag1Re = new RegExp(`(<\\d\\d:\\d\\d:\\d\\d.\\d\\d\\d>)|<\\/c>|<c>`, "g");
  return vttString.replaceAll(tag1Re, "");
};

const getSubtitle = async (lang: string, videoId: string) => {
  const res = await axios.get(process.env.REACT_APP_SUBTITLES_URL + "/" + videoId);
  return youtubeVttToObject(removeInternalTags(res.data));
};

export default getSubtitle;
