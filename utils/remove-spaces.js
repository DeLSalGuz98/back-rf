export function removeBlankSpaces(text){
  text = text.toString()
  const newText = text.replace(/ /g, "")
  return newText.toString()
}