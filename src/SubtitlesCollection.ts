export class SubtitlesCollection {
  items: {
    start: number
    end: number
    text: string
  }[] = []
  getText(msec: number): string | undefined {
    return this.items.find(item => (item.start <= msec && item.end >= msec))?.text

  }
}