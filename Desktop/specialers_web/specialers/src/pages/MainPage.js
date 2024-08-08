import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./MainPage.css";
import Modal from "react-modal";
import LineGraph from './LineGraph.jsx';
import DashPlayer from './DashPlayer.js';
import Header from './Header.js';

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGraphData, setSelectedGraphData] = useState('do');

  const modalTimeoutId = useRef(null);
  const alertTimeoutId = useRef(null);

  const openModal = () => {
    setIsOpen(true);

    modalTimeoutId.current = setTimeout(() => {
      setIsOpen(false);
    }, 30000);

    alertTimeoutId.current = setTimeout(() => {
      alert("현재 실시간 데이터 및 영상을 30초 동안 조회할 수 있습니다. 더 자세한 데이터를 원하신다면 고객문의에서 문의해주시길 바랍니다.");
    }, 30300);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (modalTimeoutId.current) {
      clearTimeout(modalTimeoutId.current);
      modalTimeoutId.current = null;
    }
    if (alertTimeoutId.current) {
      clearTimeout(alertTimeoutId.current);
      alertTimeoutId.current = null;
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "1400px",
      height: "750px",
      margin: "auto",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    },
  };

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
      const response = await axios.get('http://121.155.34.16:8080/tanks');
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
        const data = { x: tank.formatted_mea_dt ?? 0, y: tank[selectedGraphData] ?? 0 }; // Use selectedGraphData here
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
  }, [selectedGraphData]);

  const handleGraphDataChange = (dataType) => {
    setSelectedGraphData(dataType);
  };

 //여기부터 메인 이미지 함수
  const fishIconImg = '/images/fish_icon.png';
  const fishIconHoverImg = '/images/fish_icon_hover.png';

  const [fishIconSrc, setFishIconSrc] = useState(fishIconImg);

  const fishIconHoverSrc = '/images/fish_icon_hover.png';
  const [hoveredImages, setHoveredImages] = useState({
    set1: [false, false, false, false, false, false, false, false],
    set2: [false, false, false, false, false],
    set3: [false, false, false, false, false],
  });

  const handleFishIconMouseOver = (setImageSet, index) => {
    const newHoveredImages = { ...hoveredImages };
    newHoveredImages[setImageSet][index] = true;
    setHoveredImages(newHoveredImages);
  };

  const handleFishIconMouseOut = (setImageSet, index) => {
    const newHoveredImages = { ...hoveredImages };
    newHoveredImages[setImageSet][index] = false;
    setHoveredImages(newHoveredImages);
  };

  const handleImageSetChange = (set) => {
    setCurrentImageSet(set);
    setCurrentRealImageIndex(0);
    setHoveredImages({
      set1: [false, false, false, false, false, false, false, false],
      set2: [false, false, false, false, false],
      set3: [false, false, false, false, false],
    });
  };

  const handleResetImage = () => {
    setCurrentImageSet(null);
    setCurrentRealImageIndex(0);
    setHoveredImages({
      set1: [false, false, false, false, false, false, false, false],
      set2: [false, false, false, false, false],
      set3: [false, false, false, false, false],
    });
  };

  const handleNextImage = () => {
    let realImages = [];
    if (currentImageSet === 'set1') realImages = realImages1;
    else if (currentImageSet === 'set2') realImages = realImages2;
    else if (currentImageSet === 'set3') realImages = realImages3;

    setCurrentRealImageIndex((prevIndex) => (prevIndex + 1) % realImages.length);
    setHoveredImages({
      set1: [false, false, false, false, false, false, false, false],
      set2: [false, false, false, false, false],
      set3: [false, false, false, false, false],
    });
  };

  const handlePrevImage = () => {
    let realImages = [];
    if (currentImageSet === 'set1') realImages = realImages1;
    else if (currentImageSet === 'set2') realImages = realImages2;
    else if (currentImageSet === 'set3') realImages = realImages3;

    setCurrentRealImageIndex((prevIndex) => (prevIndex - 1 + realImages.length) % realImages.length);
    setHoveredImages({
      set1: [false, false, false, false, false, false, false, false],
      set2: [false, false, false, false, false],
      set3: [false, false, false, false, false],
    });
  };

  const handleSpecificImageClick = (setImageSet, index) => {
    setCurrentImageSet(setImageSet);
    setCurrentRealImageIndex(index);
    setHoveredImages({
      set1: [false, false, false, false, false, false, false, false],
      set2: [false, false, false, false, false],
      set3: [false, false, false, false, false],
    });
  };

  const realImages1 = [
    '/images/nan.mp4',
    '/images/real_image1_2.png',
    '/images/real_image1_3.png',
    '/images/real_image1_4.png',
    '/images/real_image1_1.png',
    '/images/ja.mp4',
    '/images/bal.png',
    '/images/real_image1_5.png'
  ];
  const realImages2 = [
    '/images/real_image2_1.png',
    '/images/real_image2_2.png',
    '/images/real_image2_3.png',
    '/images/sang.mp4',
    '/images/real_image2_5.png'
  ];
  const realImages3 = [
    '/images/real_image3_1.png',
    '/images/real_image3_2.png',
    '/images/real_image3_3.png',
    '/images/sang.mp4',
    '/images/real_image3_5.png'
  ];

  const [currentImageSet, setCurrentImageSet] = useState(null);
  const [currentRealImageIndex, setCurrentRealImageIndex] = useState(0);


  const renderButtons = () => {
    let realImages = [];
    if (currentImageSet === 'set1') realImages = realImages1;
    else if (currentImageSet === 'set2') realImages = realImages2;
    else if (currentImageSet === 'set3') realImages = realImages3;

    const currentImage = realImages[currentRealImageIndex];
    if (currentImage === '/images/real_image1_2.png' ||
      currentImage === '/images/real_image1_3.png' ||
      currentImage === '/images/real_image1_4.png' ||
      currentImage === '/images/real_image2_1.png' ||
      currentImage === '/images/real_image2_2.png' ||
      currentImage === '/images/real_image2_3.png' ||
      currentImage === '/images/real_image3_1.png' ||
      currentImage === '/images/real_image3_2.png' ||
      currentImage === '/images/real_image3_3.png') {
      return (
        <button className='modal_bt' onClick={openModal} style={{ color: '#515151' }} >데이터 조회하기</button>
      );
    }
    return <button className='modal_bt_back'></button>;
  };

  return (
    <div>
      <Header />

      <div className='over_view'>
        {currentImageSet === 'set1' ? (
          <div className='image_set'>
            <img className='img_display' src='/images/image1.png' width='600px' height='600px' style={{ marginRight: '120px', marginLeft: '180px' }} />
            <img className='img_prev' src='/images/prev.png' width='40px' height='60px' onClick={handlePrevImage} />
            <img className='img_display' src={realImages1[currentRealImageIndex]} width='600px' height='600px' />
            <img className='img_next' src='/images/next.png' width='40px' height='60px' onClick={handleNextImage} />
            {renderButtons()}
          </div>
        ) : currentImageSet === 'set2' ? (
          <div className='image_set'>
            <img className='img_display' src='/images/image2.png' width='600px' height='600px' style={{ marginRight: '120px', marginLeft: '180px' }} />
            <img className='img_prev' src='/images/prev.png' width='40px' height='60px' onClick={handlePrevImage} />
            <img className='img_display' src={realImages2[currentRealImageIndex]} width='600px' height='600px' />
            <img className='img_next' src='/images/next.png' width='40px' height='60px' onClick={handleNextImage} />
            {renderButtons()}
          </div>
        ) : currentImageSet === 'set3' ? (
          <div className='image_set'>
            <img className='img_display' src='/images/image3.png' width='600px' height='600px' style={{ marginRight: '120px', marginLeft: '180px' }} />
            <img className='img_prev' src='/images/prev.png' width='40px' height='60px' onClick={handlePrevImage} />
            <img className='img_display' src={realImages3[currentRealImageIndex]} width='600px' height='600px' />
            <img className='img_next' src='/images/next.png' width='40px' height='60px' onClick={handleNextImage} />
            {renderButtons()}
          </div>
        ) : (
          <img id='Main_image' src='/images/image.png' width='1500px' height='750px' />
        )}
        <div className='x_bt'>
          <img className='image_x' src='/images/back.png' onClick={handleResetImage} alt='reset' />
        </div>
        <p id='main_text' style={{ color: '#515151' }} >※ 수조 데이터를 실시간으로 조회하고 싶다면 고객문의로 문의 바랍니다.</p>

        <div className='circle_buttons'>
          {currentImageSet === null && (
            <>
              <img
                className='image_m_1'
                src={hoveredImages['set1'][0] ? '/images/hat.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 0)}
                onMouseOut={() => handleFishIconMouseOut('set1', 0)}
                onClick={() => handleImageSetChange('set1')}
                alt='set1'
              />
              <img
                className='image_m_2'
                src={hoveredImages['set2'][0] ? '/images/A.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set2', 0)}
                onMouseOut={() => handleFishIconMouseOut('set2', 0)}
                onClick={() => handleImageSetChange('set2')}
                alt='set2'
              />
              <img
                className='image_m_3'
                src={hoveredImages['set3'][0] ? '/images/B.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set3', 0)}
                onMouseOut={() => handleFishIconMouseOut('set3', 0)}
                onClick={() => handleImageSetChange('set3')}
                alt='set3'
              />
            </>

          )}

          {currentImageSet === 'set1' && (
            <>
              <img
                className='image_m1_1'
                src={hoveredImages['set1'][0] ? '/images/hat_1.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 0)}
                onMouseOut={() => handleFishIconMouseOut('set1', 0)}
                onClick={() => handleSpecificImageClick('set1', 0)}
                alt='set1_0'
              />
              <img
                className='image_m1_2'
                src={hoveredImages['set1'][1] ? '/images/hat_6.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 1)}
                onMouseOut={() => handleFishIconMouseOut('set1', 1)}
                onClick={() => handleSpecificImageClick('set1', 1)}
                alt='set1_1'
              />
              <img
                className='image_m1_3'
                src={hoveredImages['set1'][2] ? '/images/hat_5.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 2)}
                onMouseOut={() => handleFishIconMouseOut('set1', 2)}
                onClick={() => handleSpecificImageClick('set1', 2)}
                alt='set1_2'
              />
              <img
                className='image_m1_4'
                src={hoveredImages['set1'][3] ? '/images/hat_4.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 3)}
                onMouseOut={() => handleFishIconMouseOut('set1', 3)}
                onClick={() => handleSpecificImageClick('set1', 3)}
                alt='set1_3'
              />
              <img
                className='image_m1_5'
                src={hoveredImages['set1'][4] ? '/images/hat_8.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 4)}
                onMouseOut={() => handleFishIconMouseOut('set1', 4)}
                onClick={() => handleSpecificImageClick('set1', 4)}
                alt='set1_4'
              />
              <img
                className='image_m1_6'
                src={hoveredImages['set1'][5] ? '/images/hat_2.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 5)}
                onMouseOut={() => handleFishIconMouseOut('set1', 5)}
                onClick={() => handleSpecificImageClick('set1', 5)}
                alt='set1_5'
              />
              <img
                className='image_m1_7'
                src={hoveredImages['set1'][6] ? '/images/hat_3.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 6)}
                onMouseOut={() => handleFishIconMouseOut('set1', 6)}
                onClick={() => handleSpecificImageClick('set1', 6)}
                alt='set1_6'
              />
              <img
                className='image_m1_8'
                src={hoveredImages['set1'][7] ? '/images/hat_7.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set1', 7)}
                onMouseOut={() => handleFishIconMouseOut('set1', 7)}
                onClick={() => handleSpecificImageClick('set1', 7)}
                alt='set1_7'
              />
            </>
          )}

          {currentImageSet === 'set2' && (
            <>
              <img
                className='image_m2_1'
                src={hoveredImages['set2'][0] ? '/images/A_1.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set2', 0)}
                onMouseOut={() => handleFishIconMouseOut('set2', 0)}
                onClick={() => handleSpecificImageClick('set2', 0)}
                alt='set2_0'
              />
              <img
                className='image_m2_2'
                src={hoveredImages['set2'][1] ? '/images/A_2.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set2', 1)}
                onMouseOut={() => handleFishIconMouseOut('set2', 1)}
                onClick={() => handleSpecificImageClick('set2', 1)}
                alt='set2_1'
              />
              <img
                className='image_m2_3'
                src={hoveredImages['set2'][2] ? '/images/A_3.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set2', 2)}
                onMouseOut={() => handleFishIconMouseOut('set2', 2)}
                onClick={() => handleSpecificImageClick('set2', 2)}
                alt='set2_2'
              />
              <img
                className='image_m2_4'
                src={hoveredImages['set2'][3] ? '/images/A_4.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set2', 3)}
                onMouseOut={() => handleFishIconMouseOut('set2', 3)}
                onClick={() => handleSpecificImageClick('set2', 3)}
                alt='set2_3'
              />
              <img
                className='image_m2_5'
                src={hoveredImages['set2'][4] ? '/images/A_5.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set2', 4)}
                onMouseOut={() => handleFishIconMouseOut('set2', 4)}
                onClick={() => handleSpecificImageClick('set2', 4)}
                alt='set2_4'
              />
            </>
          )}

          {currentImageSet === 'set3' && (
            <>
              <img
                className='image_m3_1'
                src={hoveredImages['set3'][0] ? '/images/B_1.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set3', 0)}
                onMouseOut={() => handleFishIconMouseOut('set3', 0)}
                onClick={() => handleSpecificImageClick('set3', 0)}
                alt='set3_0'
              />
              <img
                className='image_m3_2'
                src={hoveredImages['set3'][1] ? '/images/B_2.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set3', 1)}
                onMouseOut={() => handleFishIconMouseOut('set3', 1)}
                onClick={() => handleSpecificImageClick('set3', 1)}
                alt='set3_1'
              />
              <img
                className='image_m3_3'
                src={hoveredImages['set3'][2] ? '/images/B_3.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set3', 2)}
                onMouseOut={() => handleFishIconMouseOut('set3', 2)}
                onClick={() => handleSpecificImageClick('set3', 2)}
                alt='set3_2'
              />
              <img
                className='image_m3_4'
                src={hoveredImages['set3'][3] ? '/images/B_4.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set3', 3)}
                onMouseOut={() => handleFishIconMouseOut('set3', 3)}
                onClick={() => handleSpecificImageClick('set3', 3)}
                alt='set3_3'
              />
              <img
                className='image_m3_5'
                src={hoveredImages['set3'][4] ? '/images/B_5.png' : fishIconSrc}
                onMouseOver={() => handleFishIconMouseOver('set3', 4)}
                onMouseOut={() => handleFishIconMouseOut('set3', 4)}
                onClick={() => handleSpecificImageClick('set3', 4)}
                alt='set3_4'
              />
            </>
          )}
        </div>




        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <button className='modal_x' onClick={closeModal}>X</button>
          <hr style={{ marginTop: '10px', width: '99%', marginLeft: '0px', marginRight: '0px' }} />
          <DashPlayer url="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd" />
          <p id='ov_text' style={{ color: '#515151' }} >※ 현재 실시간 데이터 및 영상을 30초 동안 조회할 수 있습니다. 더 자세한 데이터를 원하신다면 고객문의에서 문의해주시길 바랍니다.</p>

          <div className='graph_view' style={{ height: '600px', width: '700px', marginTop: '-600px', marginLeft: '700px', marginRight: '0px' }}>
            <ul className='modal_menu' >
              <li>
                <button className={`modal_menu_bt ${selectedGraphData === 'do' ? 'active' : ''}`} onClick={() => handleGraphDataChange('do')}>DO</button>
              </li>
              <li>
                <button className={`modal_menu_bt ${selectedGraphData === 'temperature' ? 'active' : ''}`} onClick={() => handleGraphDataChange('temperature')}>Temperature</button>
              </li>
              <li>
                <button className={`modal_menu_bt ${selectedGraphData === 'ph' ? 'active' : ''}`} onClick={() => handleGraphDataChange('ph')}>pH</button>
              </li>
              <li>
                <button className={`modal_menu_bt ${selectedGraphData === 'salinity' ? 'active' : ''}`} onClick={() => handleGraphDataChange('salinity')}>Salinity</button>
              </li>
            </ul>
            <LineGraph data={lineDataList} />
          </div>
        </Modal>
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
