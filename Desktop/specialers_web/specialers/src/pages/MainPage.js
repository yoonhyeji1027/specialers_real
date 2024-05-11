import React from 'react';
import "./MainPage.css";

export default function MainPage() {
  return (
    <div>
      <div className='main'>
        <a className='logo' href='MainPage.js'>
          <img id='logo_img' src='/images/logo.png' width='263px' height='66.27px' />
        </a>
        <a className='inquity' href='Inquiry.js'>
          <img id='inquiry_img' src='/images/inquiry.png' width='55px' height='55px' />
        </a>

        <div>
          <img id='imsi_img' src='/images/image.png' width='1300px' height='600px' />
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

