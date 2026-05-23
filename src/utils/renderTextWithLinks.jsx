const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

export function renderTextWithLinks(text, linkProps = {}) {
  return text.split(URL_PATTERN).map((part, index) => {
    if (!part.match(/^https?:\/\//)) return part;

    return (
      <a
        key={`${part}-${index}`}
        href={part}
        target="_blank"
        rel="noreferrer"
        {...linkProps}
      >
        {part}
      </a>
    );
  });
}
