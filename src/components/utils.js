export default function parseOneNotePage(page) {
  let parser = new DOMParser();
  let dom = parser.parseFromString(page.data, "text/html");

  let content = {};
  let instructions = "";
  let submissionDate = "";

  for (let item of dom.getElementsByTagName("p")) {
    if (item.firstChild.tagName != null && item.firstChild.tagName !== "A") {
      if (item.textContent.match(/date/i)) {
        submissionDate = item.textContent;
      } else {
        instructions += "<li>" + item.textContent + "</li>";
      }
    }

    if (item.firstChild.wholeText != null) {
      if (item.firstChild.wholeText.match(/date/i)) {
        submissionDate = item.firstChild.wholeText;
      } else {
        instructions += "<li>" + item.firstChild.wholeText + "</li>";
      }
    }

    if (item.firstChild.tagName === "A") {
      let child = item.firstChild;

      for (let attribute of child.attributes) {
        if (attribute.value.includes("youtu")) {
          content["youtubelink"] = attribute.value;
          content["youtubename"] = child.text;
        } else if (attribute.name === "href") {
          content["filelink"] = attribute.value;
          content["filename"] = child.text;
        }
      }
    }
  }

  if (dom.getElementsByTagName("object") != null) {
    console.log(
      "dom.getElementsByTagName():  " + dom.getElementsByTagName("object")
    );
    for (let item of dom.getElementsByTagName("object")) {
      for (let attr of item.attributes) {
        console.log(
          "attr.name:   " + attr.name + "  attr.value:  " + attr.value
        );
        if (attr.name === "data-attachment") {
          content["objectFilename"] = attr.value;
        } else if (attr.name === "type") {
          content["filetype"] = attr.value;
        } else if (attr.name == "data") {
          content["fileObject"] = attr.value.replace(
            "siteCollections",
            "sites"
          );
        }
      }
    }
  }

  content["instructions"] = instructions;
  content["submissionDate"] = submissionDate;

  return content;
}
