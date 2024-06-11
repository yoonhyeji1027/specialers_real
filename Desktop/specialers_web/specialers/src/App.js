// src/App.js

import React from 'react';
import DashPlayer from './DashPlayer.js'; // 확장자를 명시합니다.

const App = () => {
  const streamUrl = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'; // 여기에 실제 스트림 URL을 입력하세요

  return (
    <div>
      <h1>Live MPEG-DASH Stream</h1>
      <DashPlayer url={streamUrl} />
    </div>
  );
};

export default App;
