/**
 * Splits paragraph text into visual lines based on container width.
 * Uses getBoundingClientRect for reliable line grouping in React/Next.js.
 */
export function splitParagraphIntoLines(
  container: HTMLElement,
  text: string,
  lineClassName = "about-story-line",
  wordClassName = "about-word",
  containerWidth?: number,
): HTMLElement[] {
  const width = containerWidth ?? container.clientWidth;
  if (!width) return [];

  const measure = document.createElement("p");
  measure.className = lineClassName;
  measure.setAttribute("aria-hidden", "true");
  measure.style.cssText = [
    "position:absolute",
    "top:0",
    "left:0",
    "visibility:hidden",
    "pointer-events:none",
    `width:${width}px`,
    "max-width:100%",
    "margin:0",
  ].join(";");

  container.appendChild(measure);

  const words = text.trim().split(/\s+/);

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = wordClassName;
    span.textContent = word;
    if (index < words.length - 1) {
      span.append(document.createTextNode("\u00A0"));
    }
    measure.appendChild(span);
  });

  // Force layout before measuring line positions
  measure.getBoundingClientRect();

  const wordSpans = Array.from(
    measure.querySelectorAll<HTMLElement>(`.${wordClassName}`),
  );

  const lineTexts: string[] = [];
  let currentWords: string[] = [];
  let lastTop = -1;

  wordSpans.forEach((span) => {
    const top = Math.round(span.getBoundingClientRect().top);
    if (lastTop !== -1 && Math.abs(top - lastTop) > 2) {
      lineTexts.push(currentWords.join(" "));
      currentWords = [];
    }
    currentWords.push(span.textContent?.replace(/\u00A0/g, "").trim() ?? "");
    lastTop = top;
  });

  if (currentWords.length) {
    lineTexts.push(currentWords.join(" "));
  }

  measure.remove();

  return lineTexts.map((lineText) => {
    const line = document.createElement("p");
    line.className = lineClassName;
    line.textContent = lineText;
    return line;
  });
}

export function splitParagraphsIntoLines(
  container: HTMLElement,
  paragraphs: string[],
  blockClassName = "about-story-block",
  lineClassName = "about-story-line",
): HTMLElement[] {
  container.replaceChildren();

  const containerWidth = container.clientWidth;
  if (!containerWidth) return [];

  const allLines: HTMLElement[] = [];

  paragraphs.forEach((paragraph, index) => {
    const block = document.createElement("div");
    block.className = blockClassName;
    container.appendChild(block);

    const lines = splitParagraphIntoLines(
      block,
      paragraph,
      lineClassName,
      "about-word",
      containerWidth,
    );
    lines.forEach((line) => block.appendChild(line));
    allLines.push(...lines);

    if (index < paragraphs.length - 1) {
      block.dataset.paragraphEnd = "true";
    }
  });

  return allLines;
}
