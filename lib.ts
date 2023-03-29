export function extractMarkdown() {
  // Export Chatlog To Markdown
  // Select all chat messages
  const chatMessages = document.querySelectorAll(".text-base")
  const pageTitle = document.title
  const now = new Date()
  const dateString = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}-${now
    .getHours()
    .toString()
    .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`
  // Loop through each chat message and extract the content
  let markdownContent = ""
  for (const message of chatMessages) {
    if (message.querySelector(".whitespace-pre-wrap")) {
      // Extract the message text and format it
      let messageText = message.querySelector(".whitespace-pre-wrap").innerHTML
      // ID Who
      const sender = message.querySelector("img") ? "You" : "ChatGPT"
      if (sender === "ChatGPT") {
      } else {
      }
      // Pre Escapes
      messageText = messageText
        .replace(/_/gs, "_")
        .replace(/\*/gs, "*")
        .replace(/\^/gs, "^")
        .replace(/~/gs, "~") // I debated adding #, > (blockquotes), and | (table)
      // <p> element and everything in-line or inside
      messageText = messageText.replace(/<p>(.*?)<\/p>/g, function (match, p1) {
        return (
          "\n" +
          p1
            .replace(/<b>(.*?)<\/b>/g, "**$1**")
            .replace(/<\/?b>/g, "**")
            .replace(/<\/?i>/g, "_")
            .replace(/<code>/g, " `")
            .replace(/<\/code>/g, "` ") +
          "\n"
        )
      })
      // Add message to markdown content
      markdownContent += `**${sender}:** ${messageText.trim()}\n\n`
    }
  }
  // Remove Span with only class declaration, there is nesting? If there is more than 5 layers, just do it manually
  const repeatSpan = /<span class="[^"]*">([^<]*?)<\/span>/gs
  markdownContent = markdownContent
    .replace(repeatSpan, "$1")
    .replace(repeatSpan, "$1")
    .replace(repeatSpan, "$1")
    .replace(repeatSpan, "$1")
    .replace(repeatSpan, "$1")
  // Code Blocks, `text` is the default catch-all (because some commands/code-blocks aren't styled/identified by ChatGPT yet)
  markdownContent = markdownContent.replace(
    /<pre>.*?<code[^>]*>(.*?)<\/code>.*?<\/pre>/gs,
    function (match, p1) {
      const language = match.match(/class="[^"]*language-([^"\s]*)[^"]*"/)
      const languageIs = language ? language[1] : "text"
      return (
        "\n``` " +
        languageIs +
        "\n" +
        p1 +
        //              .replace(/&gt;/gs, ">")
        //              .replace(/&lt;/gs, "<")
        //              .replace(/&gt;/gs, "&")
        "```\n"
      )
    }
  )
  markdownContent = markdownContent.replace(
    /<p>(.*?)<\/p>/g,
    function (match, p1) {
      return (
        "\n" +
        p1
          .replace(/<b>(.*?)<\/b>/g, "**$1**")
          .replace(/<\/?b>/g, "**")
          .replace(/<\/?i>/g, "_")
          .replace(/<code>/g, " `")
          .replace(/<\/code>/g, "` ") +
        "\n"
      )
    }
  )
  // Finalize and tweaks and remove extra stuff
  // Convert text stuff
  markdownContent = markdownContent
    .replace(
      /<div class="markdown prose w-full break-words dark:prose-invert dark">/gs,
      ""
    )
    .replace(/\r?\n?<\/div>\r?\n?/gs, "\n")
    .replace(/\*\*ChatGPT:\*\* <(ol|ul)/gs, "**ChatGPT:**\n<$1")
    .replace(/&gt;/gs, ">")
    .replace(/&lt;/gs, "<")
    .replace(/&amp;/gs, "&")

  return { pageTitle, dateString, markdownContent }
}

export function copy(content: string) {
  navigator.clipboard.writeText(content)
}

export function download(mdWithMeta: {
  pageTitle: string
  dateString: string
  markdownContent: string
}) {
  const { pageTitle, dateString, markdownContent } = mdWithMeta
  // Create and download the markdown file
  const downloadLink = document.createElement("a")
  downloadLink.download = "ChatLog - " + pageTitle + " - " + dateString + ".md"
  downloadLink.href = URL.createObjectURL(
    new Blob([markdownContent], { type: "text/markdown" })
  )
  downloadLink.style.display = "none"
  document.body.appendChild(downloadLink)
  downloadLink.click()
}
