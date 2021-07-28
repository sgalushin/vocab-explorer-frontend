import { Link } from "@material-ui/core";

const SubtitleLine = ({ subtitleText, onWordClick }: { subtitleText: string; onWordClick: () => void }) => {
  const splitIntoWordsRe: RegExp = new RegExp(`[A-Za-zÄÖÜẞäöüß]+|[A-Za-zÄÖÜẞäöüß]`, "g");

  const wordsPositions = Array.from(subtitleText.matchAll(splitIntoWordsRe))
    .filter((match) => match.index !== undefined)
    .map((match: RegExpMatchArray) => ({ start: match.index, end: match.index! + match[0].length }));

  let itemsToRender = [];
  let previousPosition = 0;
  for (const wordPosition of wordsPositions) {
    if (wordPosition.start !== previousPosition) {
      itemsToRender.push(<NonVocabItem text={subtitleText.slice(previousPosition, wordPosition.start)} />);
      previousPosition = wordPosition.start!;
    }
    itemsToRender.push(
      <VocabItem text={subtitleText.slice(wordPosition.start, wordPosition.end)} onClick={onWordClick} />
    );
    previousPosition = wordPosition.end;
  }
  if (previousPosition !== subtitleText.length) {
    itemsToRender.push(<NonVocabItem text={subtitleText.slice(previousPosition)} />);
  }

  return <div>{itemsToRender}</div>;
};

const NonVocabItem = ({ text }: { text: string }) => {
  return <span>{text}</span>;
};

const VocabItem = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <Link
      onClick={onClick}
      target="linguee-iframe"
      href={`https://www.linguee.com/english-german/search?source=german&query=${text.trim()}`}
    >
      <span style={{ color: "brown" }}>{text}</span>
    </Link>
  );
};

export default SubtitleLine;
