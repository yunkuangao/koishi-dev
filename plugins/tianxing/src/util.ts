export function removeMultipleStrLeadingSpace(strTemplate) {
  if (!strTemplate) {
    return "";
  }
  return strTemplate.replace(/^\s+/gm, "");
}


