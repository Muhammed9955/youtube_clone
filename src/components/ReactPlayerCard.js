import React from "react";
import ReactPlayer from "react-player";

const ReactPlayerCard = ({ url }) => {
  return (
    <ReactPlayer
      // url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      url={url}
      width="100%"
      height="100%"
      config={{
        youtube: {
          playerVars: { showinfo: 1 },
        },
      }}
      controls
    />
  );
};

export default ReactPlayerCard;
