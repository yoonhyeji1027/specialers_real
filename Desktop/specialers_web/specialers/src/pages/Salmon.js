import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Salmon.css";
import PieGraph from './PieGraph.jsx'
import LineGraph from './LineGraph.jsx'
import BarGraph from './BarGraph.jsx'

export default function Salmon() {

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
      const response = await axios.get('http://121.155.34.16:8080/tanks'); 
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

      <div className='sujo'> {/*수조 데이터 묶음 따로 그래프 묶음 따로 */}
        <div className='sujo_data'> {/*각 데이터별 묶음 */}
          <video width="823px" height="768px" controls="controls">
            <source src="images/kkung1.mp4" type='video/mp4'></source>
          </video>
          <div id='sujo_text'>
            <h3 style={{ color: '#4D606B' }}>01_실시간 CCTV</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
        <div className='sujo_data'>
          <video width="823px" height="768px" controls="controls">
            <source src="images/kkung2.mp4" type='video/mp4'></source>
          </video>
          <div id='sujo_text'>
            <h3 style={{ color: '#4D606B' }}>02_실시간 수조영상</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
        <div className='sujo_data'>
          <video width="823px" height="768px" controls="controls">
            <source src="images/kkung3.mp4" type='video/mp4'></source>
          </video>
          <div id='sujo_text'>
            <h3 style={{ color: '#4D606B' }}>03_실시간 수조이미지</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
      </div>

      <hr style={{ borderStyle: 'dotted' }} />

      <div className='graph'> {/*그래프 전체 묶음 */}
        <div className='graph_data'> {/*각 그래프별 묶음*/}
          <div className='graph_view' style={{ width: "823px", height: "768px" }}>
            <BarGraph data={barDataList} />
          </div>
          <div id='graph_text'>
            <h3 style={{ color: '#4D606B' }}>01_실시간 CCTV</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
        <div className='graph_data'>
          <div className='graph_view' style={{ height: '823px', width: '768px' }}>
            <LineGraph data={lineDataList} />
          </div>

          <div id='graph_text'>
            <h3 style={{ color: '#4D606B' }}>02_실시간 수조영상</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
        <div className='graph_data'>
          <div className='graph_view' style={{ height: '823px', width: '768px' }}>
            <PieGraph data={pieDataList} />
          </div>
          <div id='graph_text'>
            <h3 style={{ color: '#4D606B' }}>03_실시간 수조이미지</h3>
            <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
          </div>
        </div>
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

