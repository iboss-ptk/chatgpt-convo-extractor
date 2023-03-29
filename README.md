# ChatGPT Conversation Extractor

This is a simple tool to extract conversations from the ChatGPT chat log as markdown.

## Installation

```sh
git clone https://github.com/iboss-ptk/chatgpt-convo-extractor.git
cd chatgpt-convo-extractor
npm install && npm run dev
```
### Chrome

1. open `chrome://extensions` and click `Load unpacked` on the top left
2. select the `build/chrome-mv3-dev` folder in this repo (unless you specified a different `--target` in step 2)

### Other Browsers

In `npm run dev`, specify a different `--target` (e.g. `--target=firefox-mv2`). See list of available targets [here](https://docs.plasmo.com/framework/workflows/faq#what-are-the-officially-supported-browser-targets).

## Usage

On ChatGPT, open the conversation you want to extract. Then you have 2 options:

- copy to clipboard: `ctrl + '` 
- save to file: `ctrl + shift + '`

You can change the hotkeys in [`content.ts`](./content.ts) if you want.

```ts
// content.ts

// **************************************************
// Key combination configuration, feel free to change
// **************************************************
const KEY_COMBINATION = (event: KeyboardEvent) => ({
  // Copy: ctrl + '
  copy: event.ctrlKey && event.key === "'",

  // Download: ctrl + shift + '
  download: event.ctrlKey && event.shiftKey && event.key === "'"
})

```

## Thanks

Markdown extraction logic is copied from this [reddit post](https://www.reddit.com/r/ChatGPT/comments/zm237o/save_your_chatgpt_conversation_as_a_markdown_file/) by @Creative_Original918
