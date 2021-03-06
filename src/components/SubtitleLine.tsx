import { Link } from "@material-ui/core";
import supportedLanguages from "../supportedLanguages";

/**
 * Presents text as a line of clickable words.
 * Other symbols (eg. punctuation) are preserved and are non-clickable.
 */
const SubtitleLine = ({ subtitleText, onWordClick }: { subtitleText: string; onWordClick: () => void }) => {
  // support for german words
  const splitIntoWordsRe: RegExp = new RegExp(`[A-Za-zÄÖÜẞäöüß]+|[A-Za-zÄÖÜẞäöüß]`, "g");

  const wordsPositions = Array.from(subtitleText.matchAll(splitIntoWordsRe))
    .filter((match) => match.index !== undefined)
    .map((match: RegExpMatchArray) => ({ start: match.index, end: match.index! + match[0].length }));

  let itemsToRender = [];
  let previousPosition = 0;
  for (const wordPosition of wordsPositions) {
    if (wordPosition.start !== previousPosition) {
      itemsToRender.push(<NonClickableItem text={subtitleText.slice(previousPosition, wordPosition.start)} />);
      previousPosition = wordPosition.start!;
    }
    itemsToRender.push(
      <ClickableWord text={subtitleText.slice(wordPosition.start, wordPosition.end)} onClick={onWordClick} />
    );
    previousPosition = wordPosition.end;
  }
  if (previousPosition !== subtitleText.length) {
    itemsToRender.push(<NonClickableItem text={subtitleText.slice(previousPosition)} />);
  }

  return <div>{itemsToRender}</div>;
};

const NonClickableItem = ({ text }: { text: string }) => {
  return <span>{text}</span>;
};

const ClickableWord = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <Link
      onClick={onClick}
      target="linguee-iframe"
      href={`https://www.linguee.com/english-${supportedLanguages[process.env.REACT_APP_LANGUAGE!]}/search?query=${text.trim()}`}
    >
      <span style={{ color: "brown" }}>{text}</span>
    </Link>
  );
};

export default SubtitleLine;
