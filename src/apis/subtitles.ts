import axios from "axios";
import { SubtitlesCollection } from "../SubtitlesCollection";

/**
 * Converts subtitles in VTT to SubtitlesCollection class.
 * Conversion is specific for subtitles, downloaded from YouTube (which do not always follow the VTT standard).
 */
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

  /**
   * Converts a timestamp into milliseconds
   * @param timestamp - a string with a timestamp
   * @returns number - milliseconds (always an integer)
   */
  const timestampToMs = (timestamp: string): number => {
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
        start: timestampToMs(line.slice(0, 12)),
        end: timestampToMs(line.slice(17, 29)),
        text: "",
      });
    } else if (subtitles.items.length > 0) {
      subtitles.items[subtitles.items.length - 1].text +=
        (subtitles.items[subtitles.items.length - 1].text ? " " : "") + line;
    }
  }

  return subtitles;
};

/**
 * Downloads subtitles for a specific language and video and returns them as a SubtitleCollection class.
 * @param lang - ISO 639-1:2002 language code
 * @param videoId - Youtube Video ID (for example "hgg7lwi_xzc")
 */
const fetchSubtitles = async (lang: string, videoId: string): Promise<SubtitlesCollection> => {
  const res = await axios.get(`${process.env.REACT_APP_SUBTITLES_URL}/${lang}/${videoId}`);
  return youtubeVttToObject(res.data);
};

export default fetchSubtitles;
