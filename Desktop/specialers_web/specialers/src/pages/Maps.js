import React from 'react';
import "./Maps.css";
import Header from './Header.js';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function Maps() {

    return (
        <div>

            <Header /> {/*메인 페이지랑 텍스트 색이 달라서 각 페이지에 따로 추가*/}
            <div className='mapPage'>
                <div className="map"> {/*지도 관련 코드 */}
                    <h1 style={{ color: '#4D606B' }}>오시는 길</h1>
                    <hr id='map_line' style={{ marginLeft: '225px', marginBottom: '50px' }} />
                    <div className='kakao_map'>
                        <Map // 지도를 표시할 Container
                            center={{
                                // 지도의 중심좌표
                                lat: 38.0748656,
                                lng: 128.6489298,
                            }}
                            style={{
                                // 지도의 크기
                                width: "969px",
                                height: "467px",
                            }}
                            level={2} // 지도의 확대 레벨 
                        />
                    </div>

                </div>

                <div className="map_info"> {/*주소 및 회사 연락처 */}
                    <hr id='map_line' style={{ borderStyle: 'dotted', marginLeft: '275px', marginBottom: '50px' }} />
                    <ul id="map_info_text">
                        <li style={{ fontSize: '20px', paddingRight: '140px' }}><h3>주소</h3><br />강원특별자치도 강릉시 범일로 579번길 24</li>
                        <li style={{ fontSize: '20px', paddingRight: '140px' }}><h3>TEL</h3><br />033-649-7114</li>
                        <li style={{ fontSize: '20px' }}><h3>FAX</h3><br />0000-000-1234</li>
                    </ul>
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
