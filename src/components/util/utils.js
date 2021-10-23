import CheckIcon from '../../assets/default-subject-icon.jpg'

const _loadingGifs = importLoaderGifs(require.context('./../../assets/loading/', false, /\.(gif)$/)); //require.context('./', false, /\.(png|jpe?g|svg)$/));
function importLoaderGifs(r) {
  return r.keys().map(r);
}

const _subjectIcons = importSubjectIcons(require.context('./../../assets/', false, /\.(png|jpe?g|gif|svg)$/));
function importSubjectIcons(r) {
  return r.keys().map(r);
}

const _helpIcons = importHelpIcons(require.context('./../../assets/help', false, /\.(png|jpe?g|jpg|gif|svg)$/));
function importHelpIcons(r) {
  return r.keys().map(r);
}


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
        } else if (attr.name === "data") {
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
  let subjectIcon = CheckIcon;
  _subjectIcons.map(function (icon) {
    // subjectIcon = iconFetch(icon, subjectName.toLowerCase());
    // alert("subjectIcon: " + subjectIcon)
    let lastIndexOfbackSlash = icon.lastIndexOf("/");
    if (
      subjectName
        .toLowerCase()
        .includes(
          icon.substring(
            lastIndexOfbackSlash + 1,
            icon.indexOf(".", lastIndexOfbackSlash)
          )
        )
    ) {
      subjectIcon = icon;
      console.log("in if: " + subjectName + "..." + subjectIcon)
    }
    console.log("else: " + subjectName + "..." + subjectIcon)
    return subjectIcon;
  });
  console.log("end: " + subjectName + "..." + subjectIcon)
  return subjectIcon;
}

export function loaderRandomGifs() {
  let min=0;
  let max = _loadingGifs.length;
  return (_loadingGifs[Math.floor(Math.random() * (max - min + 1)) + min]);
}

export function loadHelpIconByName(name){
  let helpIcon;
  _helpIcons.map(function(icon){
   // alert("icon " + icon + "... name: " + name)
    helpIcon = iconFetch(icon, name);
  });
  return helpIcon; 
}

function iconFetch(iconObj, fetchIconName){
  let icon;
  let lastIndexOfbackSlash = iconObj.lastIndexOf("/");
  if (
    fetchIconName
      .includes(
        iconObj.substring(
          lastIndexOfbackSlash + 1,
          iconObj.indexOf(".", lastIndexOfbackSlash)
        )
      )
  ) {
    icon = iconObj;
  }
  return icon;
}

export function getKeyFromEnumValue(enumObj, value){
  let keyObj=[]; 
  Object.keys(enumObj).map(function (key) { 
    if(enumObj[key] === value) {
      keyObj.push(key)
      return;
    } 
  })
  return keyObj;
}