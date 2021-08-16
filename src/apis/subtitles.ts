import axios from "axios";
import { SubtitlesCollection } from "../SubtitlesCollection";

const youtubeVttToObject = (vttString: string): SubtitlesCollection => {
  /**
   * Removes internal tags for highlighting a specific word in a subtitle (retaining text inside tags).
   * Example:
   *   Input: "<c>das<00:00:00.240><c> hier</c><00:00:00.390><c> ist</c>"
   *   Output: "das hier ist"
   */
  const removeInternalTags = (vttString: string): string => {
    const tag1Re = new RegExp(`(<\\d\\d:\\d\\d:\\d\\d.\\d\\d\\d>)|<\\/c>|<c>`, "g");
    return vttString.replaceAll(tag1Re, "");
  };

  const timestampToMsec = (timestamp: string): number => {
    const hours = parseInt(timestamp.slice(0, 2));
    const minutes = parseInt(timestamp.slice(3, 5));
    const seconds = parseInt(timestamp.slice(6, 8));
    const milliseconds = parseInt(timestamp.slice(9, 12));
    return milliseconds + seconds * 1000 + minutes * 60 * 1000 + hours * 60 * 60 * 1000;
  };

  const timestampRe = new RegExp(`\\d\\d:\\d\\d:\\d\\d.\\d\\d\\d --> \\d\\d:\\d\\d:\\d\\d.\\d\\d\\d`);
  const subtitles = new SubtitlesCollection();
  const vttStringWithoutInternalTags = removeInternalTags(vttString);
  for (const line of vttStringWithoutInternalTags.split(`\n`)) {
    if (line.trim().length === 0) {
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

const getSubtitle = async (lang: string, videoId: string) => {
  const res = await axios.get(process.env.REACT_APP_SUBTITLES_URL + "/" + videoId);
  return youtubeVttToObject(res.data);
};

export default getSubtitle;
