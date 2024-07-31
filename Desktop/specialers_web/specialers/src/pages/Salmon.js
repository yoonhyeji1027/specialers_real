import React from 'react';
import "./Salmon.css";
import DashPlayer from './DashPlayer.js';
import Header from './Header.js';

export default function Salmon() {

  return (
    <div>
      <Header />

      <div className='sujo'> {/*수조 데이터 묶음 따로 그래프 묶음 따로 */}
        <div className='sujo_data'> {/*각 데이터별 묶음 */}
          <DashPlayer url="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd" />
          <div id='sujo_text'>
            <h3 style={{ color: '#4D606B' }}>01_실시간 CCTV</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
        <div className='sujo_data'>
          <DashPlayer url="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd" />
          <div id='sujo_text'>
            <h3 style={{ color: '#4D606B' }}>02_실시간 수조영상</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
        <div className='sujo_data' style={{ marginBottom: '120px' }}>
          <DashPlayer url="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd" />
          <div id='sujo_text'>
            <h3 style={{ color: '#4D606B' }}>03_실시간 수조이미지</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
      </div>


      <footer>
        <div id='footer_img'>
          <img src='images/footer1.png' style={{ width: '80px', height: '40px' }} />
          <img src='images/footer2.png' style={{ width: '50px', height: '40px' }} />
          <img src='images/footer3.png' style={{ width: '130px', height: '40px' }} />
        </div>
        <address>
          <p>스페셜러스</p>
          <p>주소: 강원특별자치도 양양군 손양면 학포길 226-61</p>
          <p>©2023 specialers Corporation ALL RIGHTS RESERVED</p>
        </address>
      </footer>
    </div>
  );
}

