import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainPage.css";
import Modal from "react-modal";
import LineGraph from './LineGraph.jsx'

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      vackgroundColor: "rgba(0, 0, 0, 0.5)",
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
    //mea_dt: '',
    farm_id: 0,
    tank_id: 0,
    do: 0,
    temperature: 0,
    ph: 0,
    //salinity: '',
    formatted_mea_dt: 0
  }])

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
  ])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tanks');
      const _barDataList = await response.data.tanks.map((tank, index) => ({
        idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        farm_id: tank.farm_id ?? 0,
        tank_id: tank.tank_id ?? 0,
        do: tank.do ?? 0,
        temperature: tank.temperature ?? 0,
        ph: tank.ph ?? 5,
        //salinity: response.data[key].salinity,
        formatted_mea_dt: tank.formatted_mea_dt ?? 0
      }))
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
      })
      const _pieDataList = await response.data.tanks.filter((tank, index) => index === 9).map((tank, index) => ([
        //idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        //farm_id: tank.farm_id ?? 0,
        //tank_id: tank.tank_id ?? 0,
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
        //formatted_mea_dt: tank.formatted_mea_dt ?? 0
      ]))

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
    fetchData(); // 컴포넌트가 마운트되었을 때 한 번 데이터를 불러옴
    const intervalId = setInterval(fetchData, 15000);
    // 15초마다 fetchData 함수 실행

    return () => {
      console.log('새로고침');
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 해제
    };
  }, []);



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
        <img id='imsi_img' src='/images/image.png' width='1300px' height='600px' />
        <button onClick={openModal}>팝업</button>

        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <button id='x' onClick={closeModal}>X</button>
          <hr style={{ marginTop: '10px', width: '100%', marginLeft: '0px', marginRight: '0px' }} />
          <video width="750px" height="550px" controls="controls">
            <source src="images/kkung1.mp4" type='video/mp4'></source>
          </video>
          <p id='ov_text'>※ 현재 실시간 데이터 및 영상을 30초 동안 조회할 수 있습니다. 더 자세한 데이터를 원하신다면 고객문의에서 문의해주시길 바랍니다.</p>
          <div className='graph_view' style={{ height: '500px', width: '500px', marginTop:'-20px', marginLeft: '800px', marginRight: '0px' }}>
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

