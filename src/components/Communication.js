import React from "react";
export default function vid() {
  return (
    <div>
      Video Conference
      <iframe
        width="100%"
        height="700"
        frameborder="0"
        scrolling="no"
        src={process.env.REACT_APP_COMMUNICATION_SERVER}
        // src="https://something.sharepoint.com/personal/something/_layouts/15/WopiFrame.aspx?sourcedoc=something&action=embedview&wdbipreview=true"
      ></iframe>
    </div>
  );
}
