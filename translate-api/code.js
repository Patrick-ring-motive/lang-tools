function cleanTranslate(textIn, sourceLang, targetLang, responsePayload) {
  const original = textIn;
  const originalCase = getCase(original);

  const attempts = [];
  const seenOutputs = new Set();

  const variants = [
    { text: original, lowered: false },
    { text: removeMarks(original), lowered: false },
    { text: original.toLowerCase(), lowered: true },
    { text: removeMarks(original).toLowerCase(), lowered: true },
  ];

  for (const { text, lowered } of variants) {
    if (!text || attempts.includes(text)) continue;
    attempts.push(text);

    const result = languageTranslate(
      text,
      sourceLang,
      targetLang,
      responsePayload
    ).textOut;

    if (!result) continue;

    // If translation actually changed relative to *any* input attempt
    if (!attempts.includes(result)) {
      let out = result;

      if (lowered) {
        out = restoreCase(out, originalCase);
      }

      return out;
    }

    seenOutputs.add(result);
  }

  // If we only ever got cleaned / equivalent outputs, bail
  return original;
}
