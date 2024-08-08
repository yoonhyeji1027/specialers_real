import React, { useState } from 'react';
import "./S_info.css";
import Header from './Header.js';

export default function S_info() {

  const gallery = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg'
  ];

  const [currentImageSet, setCurrentImageSet] = useState(null);
  const [currentRealImageIndex, setCurrentRealImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentRealImageIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length);
  };

  const handleNextImage = () => {
    setCurrentRealImageIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  return (
    <div>
      <Header />

      <div className='gallery'>
        <video className='gallery_video' width='600px' height='600px' controls='controls' autoPlay muted playsInline style={{ marginRight: '120px', marginLeft: '200px' }} >
          <source src='images/gallery_video.mp4' type='video/mp4'></source>
        </video>
        <img className='gallery_prev' src='/images/prev.png' width='40px' height='60px' onClick={handlePrevImage} />
        <img className='gallery_img' src={gallery[currentRealImageIndex]} width='600px' height='600px' />
        <img className='gallery_next' src='/images/next.png' width='40px' height='60px' onClick={handleNextImage} />
      </div>

      <div className="hello" > {/*인사말*/}
        <div id="hello_text">
          <h4 style={{ color: '#515151', fontSize: '28px', fontWeight: 400 }}>| 인사말</h4>
          <h3 style={{ color: '#4D606B', paddingBottom: '50px', fontSize: '35px' }}>SPECIALERS에 오신 것을 환영합니다.</h3>
          <p style={{ color: '#515151', fontSize: '25px' }}>
            스마트양식업은 과거의 관행, 직감, 최선의 추측이 아닌
            경험적 데이터와 분석기반의 운영으로 변화하고 있습니다.<br />
            당사는 실시간 데이터 분석과 양식장 모니터링이 가능한
            스마트양식 인텔리전스 솔루션을 통해 양식장을 관리하여<br />
            폐사율을 줄이고 비용을 절약하여 효율적인 기술을 제공하고자 합니다.<br />
            SPECIALERS는 앞으로 변화에 역동적으로 대처하고,
            고객과 함께 성장해 나가는 최고의 파트너가 되겠습니다.
          </p>
          <p style={{ color: '#515151', fontSize: '25px' }}>감사합니다.</p>
        </div>
        <div id="hello_name"><p style={{ color: '#515151', fontSize: '28px', fontWeight: 'bold' }}>대표  서 은 미</p></div>
        <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '50px 100px' }} />
      </div>


      <div className="mingan"> {/*민간연구 관련 묶음*/}
        <div id="mingan_text"> {/*민간연구 텍스트 묶음*/}
          <h4 style={{ color: '#515151', paddingBottom: '12px', fontSize: '28px', fontWeight: 400 }}>| 민간연구</h4>
          <h3 style={{ color: '#4D606B', paddingBottom: '40px', fontSize: '35px' }}>대서양 연어 스마트 양식의 민간연구개발을 선도적으로 수행하고 있습니다.</h3>
          <p style={{ color: '#515151', fontSize: '25px' }}>
            국내 상황에 맞는 데이터를 분석 및 학습하여 만들어진<br />인공지능 모델을 기반으로 생산 및 운영에 효율적인<br />인공지능 기반 스마트 양식장 관리 시스템을 개발, 보급합니다.
          </p>
        </div>
        <ul id="mingan_image"> {/*민간연구 이미지 묶음*/}
          <li>
            <img src="images/s_info_1.png" width="253px" height="214px" alt="s_info_1" /><span>AI 학습모델 개발</span>
          </li>
          <li>
            <img src="images/s_info_2.png" width="253px" height="214px" alt="s_info_2" /><span>생장 데이터를 이용한<br />폐사예방 모델 개발</span>
          </li>
          <li>
            <img src="images/s_info_3.png" width="253px" height="214px" alt="s_info_3" /><span>이상 징후 발생 시<br />어류 식별 데이터 분석</span>
          </li>
          <li>
            <img src="images/s_info_4.png" width="253px" height="214px" alt="s_info_4" /><span>자치어 사육을 통한<br />아쿠아포닉스 시스템 개발</span>
          </li>
        </ul>
      </div>

      <footer>
        <div id='footer_img'>
          <img src='images/footer1.png' style={{ width: '50px', height: '40px' }} />
          <img src='images/footer2.png' style={{ width: '130px', height: '40px' }} />
          <img src='images/footer3.png' style={{ width: '80px', height: '40px' }} />
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
