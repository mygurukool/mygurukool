import maths from "./../../assets/maths.gif";
import maths2 from "./../../assets/maths2.png";
import React from "react";
// parse OneNote Page
export function parseOneNotePage(page) {
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
    for (let item of dom.getElementsByTagName("object")) {
      for (let attr of item.attributes) {
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

export function loadIconBySubject(subjectName) {
  let subjectIcon = "";
  if (subjectName.includes("Math")) {
    subjectIcon = maths;
  } else if (subjectName === "German") {
    subjectIcon = maths2;
  }
  return subjectIcon;
}

export function vid() {
  alert("vid");
  return (
    <div>
      Video Conference
      {/* <iframe
        width="500"
        height="200"
        frameborder="0"
        scrolling="no"
        src="https://meet.jit.si/testtttttttttts"
        // src="https://something.sharepoint.com/personal/something/_layouts/15/WopiFrame.aspx?sourcedoc=something&action=embedview&wdbipreview=true"
      ></iframe> */}
    </div>
  );
}
