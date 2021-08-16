/**
 * Class representing a collection of subtitles (ie. all subtitles for a specific video in a specific language).
 * Language and source video are not stored within the class.
 * After class creation and initialisation it is expected that it will be used only via getText() function.
 */
export class SubtitlesCollection {
  items: {
    start: number;
    end: number;
    text: string;
  }[] = [];

  /**
   * Returns a string that should be displayed on screen for a specific millisecond of a video.
   * If there are multiple subtitles for this time (ie. some timestamps are overlapping), the function returns the
   * first subtitle string.
   * @param ms - A positive integer representing elapsed milliseconds.
   */
  getText(ms: number): string | undefined {
    return this.items.find((item) => item.start <= ms && item.end >= ms)?.text;
  }
}
