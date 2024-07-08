import React, { useRef, useEffect } from 'react';
import dashjs from 'dashjs';

const DashPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoRef.current, url, true);

    return () => {
      player.reset();
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width:"600px", height:"500px" }}
    />
  );
};

export default DashPlayer;
