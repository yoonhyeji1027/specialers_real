import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainPage.css";
import Modal from "react-modal";
import LineGraph from './LineGraph.jsx';
import DashPlayer from './DashPlayer.js'; // 추가

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setShowMessage(false);
  
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        alert("현재 실시간 데이터 및 영상을 30초 동안 조회할 수 있습니다. 더 자세한 데이터를 원하신다면 고객문의에서 문의해주시길 바랍니다.");
      }, 300); //0.3초
    }, 30000);
  };
  

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "1300px",
      height: "700px",
      margin: "auto",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    },
  };

  // 여기서부터 그래프 데이터
  const [tanks, setTanks] = useState([]);
  const [barDataList, setBarDataList] = useState([{
    idx: 0,
    farm_id: 0,
    tank_id: 0,
    do: 0,
    temperature: 0,
    ph: 0,
    formatted_mea_dt: 0
  }]);

  const [lineDataList, setLineDataList] = useState([]);
  let _lineDataList = [];

  const [pieDataList, setPieDataList] = useState([
    {
      "id": "do",
      "label": "do",
      value: 0,
      "color": "hsl(302, 70%, 50%)"
    },
    {
      "id": "temperature",
      "label": "temperature",
      value: 0,
      "color": "hsl(181, 70%, 50%)"
    },
    {
      "id": "ph",
      "label": "ph",
      value: 0,
      "color": "hsl(344, 70%, 50%)"
    },
    {
      "id": "salinity",
      "label": "salinity",
      value: 0,
      "color": "hsl(257, 70%, 50%)"
    }
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tanks');
      const _barDataList = response.data.tanks.map((tank, index) => ({
        idx: tank.idx ?? 0,
        farm_id: tank.farm_id ?? 0,
        tank_id: tank.tank_id ?? 0,
        do: tank.do ?? 0,
        temperature: tank.temperature ?? 0,
        ph: tank.ph ?? 5,
        formatted_mea_dt: tank.formatted_mea_dt ?? 0
      }));
      _lineDataList = [];
      response.data.tanks.forEach((tank, index) => {
        const id = tank.tank_id ?? 0;
        const data = { x: tank.formatted_mea_dt ?? 0, y: tank.temperature ?? 0 };
        const existingItemIndex = _lineDataList.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
          _lineDataList[existingItemIndex].data.push(data);
        } else {
          _lineDataList.push({ id, data: [data] });
        }
      });
      const _pieDataList = response.data.tanks.filter((tank, index) => index === 9).map((tank, index) => ([
        {
          id: 'do',
          label: 'do',
          value: tank.do ?? 0,
          color: 'hsl(302, 70%, 50%)'
        }, {
          id: 'temperature',
          label: 'temperature',
          value: tank.temperature ?? 0,
          color: 'hsl(181, 70%, 50%)'
        }, {
          id: 'ph',
          label: 'ph',
          value: tank.ph ?? 5,
          color: 'hsl(344, 70%, 50%)'
        }, {
          id: 'salinity',
          label: 'salinity',
          value: tank.salinity ?? 0,
          color: 'hsl(257, 70%, 50%)'
        }
      ]));

      setTanks(response.data.tanks);
      setBarDataList(_barDataList);
      setLineDataList(_lineDataList);
      setPieDataList(_pieDataList.flat());

      console.log(_pieDataList);
      console.log(pieDataList);
      console.error('새로고침');
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [currentImage, setCurrentImage] = useState('/images/image.png');
  const [buttonState, setButtonState] = useState({
    img_bt11: 'image_m_1',
    img_bt22: 'image_m_2',
    img_bt33: 'image_m_3',
    img_bt44: 'hidden',
    img_bt55: 'hidden',
    img_bt66: 'hidden',
  });

  const handleImageChange = (imageName, buttonIndex) => {
    setCurrentImage(`/images/${imageName}.png`);
    if (imageName === 'image.png') {
      setButtonState({
        img_bt1: 'image_m_1',
        img_bt2: 'image_m_2',
        img_bt3: 'image_m_3',
        img_bt4: 'hidden',
        img_bt5: 'hidden',
        img_bt6: 'hidden',
      });
    } else if (imageName === 'image1') {
      setButtonState({
        img_bt1: 'image_m1_4',
        img_bt2: 'image_m1_5',
        img_bt3: 'image_m1_6',
        img_bt4: 'image_m1_2',
        img_bt5: 'image_m1_3',
        img_bt6: 'image_m1_1',
      });
    } else if (imageName === 'image2') {
      setButtonState({
        img_bt1: 'image_m2_1',
        img_bt2: 'image_m2_2',
        img_bt3: 'image_m2_3',
        img_bt4: 'hidden',
        img_bt5: 'hidden',
        img_bt6: 'hidden',
      });
    } else if (imageName === 'image3') {
      setButtonState({
        img_bt1: 'image_m2_1',
        img_bt2: 'image_m2_2',
        img_bt3: 'image_m2_3',
        img_bt4: 'hidden',
        img_bt5: 'hidden',
        img_bt6: 'hidden',
      });
    } else if (imageName === 'image4') {
      setButtonState({
        img_bt1: 'image_m4_1',
        img_bt2: 'image_m4_2',
        img_bt3: 'image_m4_3',
        img_bt4: 'image_m1_2',
        img_bt5: 'image_m1_3',
        img_bt6: 'image_m1_1',
      });
    } else if (imageName === 'image5') {
      setButtonState({
        img_bt1: 'image_m5_1',
        img_bt2: 'image_m5_2',
        img_bt3: 'image_m5_3',
        img_bt4: 'image_m1_2',
        img_bt5: 'image_m1_3',
        img_bt6: 'image_m1_1',
      });
    } else {
      setButtonState({
        img_bt1: 'hidden',
        img_bt2: 'hidden',
        img_bt3: 'hidden',
        img_bt4: 'hidden',
        img_bt5: 'hidden',
        img_bt6: 'hidden',
      });
    }
  };


  const openModalByButton = (buttonIndex) => {
    if (buttonIndex === 1 || buttonIndex === 2 || buttonIndex === 3) {
      openModal();
    }
  };

  // 이미지 초기화 함수
  const handleResetImage = () => {
    setCurrentImage('/images/image.png');
    setButtonState({
      img_bt11: 'image_m_1',
      img_bt22: 'image_m_2',
      img_bt33: 'image_m_3',
      img_bt44: 'hidden',
      img_bt55: 'hidden',
      img_bt66: 'hidden',
    });
  };

  return (
    <div>
      <div className='header'>
        <a className='logo' href='MainPage.js'>
          <img id='logo_img' src='/images/logo.png' width='263px' height='66.27px' />
        </a>
        <a className='inquity' href='Inquiry.js'>
          <img id='inquiry_img' src='/images/inquiry.png' width='55px' height='55px' />
        </a>
      </div>

      <div className='over_view'>
        <img id='Main_image' src={currentImage} width='1300px' height='600px' />
        <button className='image_x' onClick={handleResetImage}>x</button>
        <p>※ 수조 데이터를 실시간으로 조회하고 싶다면 고객문의로 문의 바랍니다.</p>
        <div className='circle_buttons'>
          {buttonState.img_bt11 !== 'hidden' && (
            <div className={buttonState.img_bt11} onClick={() => handleImageChange('image1', 'image_m1_1')}></div>
          )}
          {buttonState.img_bt22 !== 'hidden' && (
            <div className={buttonState.img_bt22} onClick={() => handleImageChange('image2', 'image_m1_2')}></div>
          )}
          {buttonState.img_bt33 !== 'hidden' && (
            <div className={buttonState.img_bt33} onClick={() => handleImageChange('image3', 'image_m1_3')}></div>
          )}
          {buttonState.img_bt1 !== 'hidden' && (
            <div className={buttonState.img_bt1} onClick={() => openModalByButton(1)}></div>
          )}
          {buttonState.img_bt2 !== 'hidden' && (
            <div className={buttonState.img_bt2} onClick={() => openModalByButton(2)}></div>
          )}
          {buttonState.img_bt3 !== 'hidden' && (
            <div className={buttonState.img_bt3} onClick={() => openModalByButton(3)}></div>
          )}
          {buttonState.img_bt1 !== 'hidden' && (
            <div className={buttonState.img_bt4} onClick={() => handleImageChange('image4', 'image_m1_2')}></div>
          )}
          {buttonState.img_bt2 !== 'hidden' && (
            <div className={buttonState.img_bt5} onClick={() => handleImageChange('image5', 'image_m1_3')}></div>
          )}
          {buttonState.img_bt3 !== 'hidden' && (
            <div className={buttonState.img_bt6} onClick={() => handleImageChange('image1', 'image_m1_1')}></div>
          )}
        </div>

        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <button id='x' onClick={closeModal}>X</button>
          <hr style={{ marginTop: '10px', width: '100%', marginLeft: '0px', marginRight: '0px' }} />
          <DashPlayer url="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd" />
          <p id='ov_text'>※ 현재 실시간 데이터 및 영상을 30초 동안 조회할 수 있습니다. 더 자세한 데이터를 원하신다면 고객문의에서 문의해주시길 바랍니다.</p>
          <div className='graph_view' style={{ height: '500px', width: '500px', marginTop: '-20px', marginLeft: '800px', marginRight: '0px' }}>
            <LineGraph data={lineDataList} />
          </div>
        </Modal>
      </div>

      <div className='menu'>
        <ul id='menu_list'>
          <li id='menu_bt'>
            <a href='S_info.js'>
              <button>회사소개</button>
            </a>
          </li>
          <li id='menu_bt'>
            <a href='P_info.js'>
              <button>제품소개</button>
            </a>
          </li>
          <li id='menu_bt'>
            <a href='Salmon.js'>
              <button>연어양식</button>
            </a>
          </li>
        </ul>
      </div>

      <footer>
        <address>
          <p>(주) 스페셜러스</p>
          <p>주소: 강원특별자치도 양양군 손양면 학포길 226-61</p>
          <p>©2023 specialers Corporation ALL RIGHTS RESERVED</p>
        </address>
      </footer>
    </div>
  );
}
