export function convertTextToHTML(text: string) {
  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  const textWithLineBreaks = escapedText.replace(/\n/g, "<br>");
  return textWithLineBreaks;
}
