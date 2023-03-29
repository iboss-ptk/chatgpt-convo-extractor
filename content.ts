import type { PlasmoCSConfig } from "plasmo"

import { copy, download, extractMarkdown } from "./lib"

export const config: PlasmoCSConfig = {
  matches: ["https://chat.openai.com/chat/*"]
}

// **************************************************
// Key combination configuration, feel free to change
// **************************************************
const KEY_COMBINATION = (event: KeyboardEvent) => ({
  // Copy: ctrl + '
  copy: event.ctrlKey && event.key === "'",

  // Download: ctrl + shift + '
  download: event.ctrlKey && event.shiftKey && event.key === "'"
})

document.addEventListener("keydown", (event) => {
  const detectedCommand = KEY_COMBINATION(event)

  if (detectedCommand.download) {
    download(extractMarkdown())
  } else if (detectedCommand.copy) {
    copy(extractMarkdown().markdownContent)
  }
})
