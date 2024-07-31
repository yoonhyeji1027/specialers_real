import React from 'react';
import "./P_info.css";
import Header from './Header.js';

export default function P_info() {
  return (
    <div>
      <Header />

      <div className="p_info"> {/* 푸터 제외 페이지 전체 묶음 */}
        <h1 style={{ color: '#4D606B', fontSize: '50px', paddingLeft: '50px' }}>스마트양식 인텔리젼스 솔루션</h1>
        <p style={{ color: '#515151', paddingLeft: '160px', fontSize: '25px', marginTop: '-5px', letterSpacing: '1.2px' }}>Smart FishFarm Intelligence Solution</p>
        <div id="p_info_text1"> {/* 상단 문구 묶음 */}
          <h3 style={{ color: '#579DA8', paddingLeft: '100px', paddingBottom: '80px', fontSize: '30px', fontWeight: 'bolder' }}>인공지능 기반 실시간 데이터분석과 양식장 모니터링 연어 치어 생산 시스템</h3>
          <ul id="num"> {/* 각 문구들 따로 묶은 거 */}
            <li><h1 style={{ color: '#579DA8' }}>01</h1></li>
            <li><h3 style={{ color: '#515151' }}> 방사능 오염 우려에서 벗어나 비교적 안전한 육지에서 양식</h3></li>
          </ul>
          <p style={{ color: '#515151', marginLeft: '-5px' }}>지속적으로 오염되고 있는 바다에서 벗어나 비교적 안전한 육지에서 양식, 전염병 및 오염수 중독 예방</p>
          <hr id='P_line' style={{ borderStyle: 'dotted' }} />
          <ul id='num'>
            <li><h1 style={{ color: '#579DA8' }}>02</h1></li>
            <li><h3 style={{ color: '#515151' }}>양식장 CCTV 데이터를 활용한 어류 생장 예측 및 실시간 모니터링 관리</h3></li>
          </ul>
          <p style={{ color: '#515151' }}>    실시간 모니터링 서비스로 인공지능 모델을 활용하여 생장예측, 센서 데이터 수집, 어류 생장 정도에<br />따른 사료 공급량 및 환경 데이터 관리로 양식장 유지 비용 절감 및 출하시기 예측</p>
          <hr id='P_line' style={{ borderStyle: 'dotted' }} />
          <ul id='num'>
            <li><h1 style={{ color: '#579DA8' }}>03</h1></li>
            <li><h3 style={{ color: '#515151' }}>데이터 분석 기반 전문 컨설팅</h3></li>
          </ul>
          <p style={{ color: '#515151' }}>    K 연어 생장 데이터를 기반으로 생장예측 및 관리 모델을 개발하고 K 연어 양식장 맞춤형 솔루션 제공</p>
          <hr id='P_line' style={{ borderStyle: 'dotted' }} />
        </div>

        <ul id="p_info_img1"> {/* 스마트양식 어쩌고 문구 밑 사진 리스트 */}
          <li>
            <img src="images/p_info_1.png" width="178px" height="135px" alt="image1" /><span>실시간 양식장<br />CCTV 모니터링</span>
          </li>
          <li>
            <img src="images/p_info_2.png" width="178px" height="135px" alt="image2" /><span>어류 생장 예측</span>
          </li>
          <li>
            <img src="images/p_info_3.png" width="178px" height="135px" alt="image3" /><span>어류 질병<br />판단 모델</span>
          </li>
          <li>
            <img src="images/p_info_4.png" width="178px" height="135px" alt="image4" /><span>사료 공급량 관리</span>
          </li>
          <li>
            <img src="images/p_info_5.png" width="178px" height="135px" alt="image5" /><span>센서이터 관리<br />(DO, PH, 수온 등)</span>
          </li>
        </ul>
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

