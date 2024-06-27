import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Inquiry.css';

export default function Inquiry(){
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_flipj5l', 'template_xq1qbwf', form.current, 'Ve6bFjXhWRZ7xAshS')
    .then(
      (result) => {
        alert("전송되었습니다.");
      },
      (error) => {
        alert("전송을 실패했습니다.");
      }
    );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div>
      <div className='header'>
        <a className='logo' href='MainPage.js'>
          <img id='logo_img' src='/images/logo.png' width='263px' height='66.27px' />
        </a>
        <a className='inquiry' href='Inquiry.js'>
          <img id='inquiry_img' src='/images/inquiry.png' width='55px' height='55px' />
        </a>
      </div>

      <div className='Inquiry'>
        <div className='inquiry_h'>
          <h3 style={{ color: '#4D606B', fontSize: '30px' }}>고객문의</h3>
          <p style={{ color: '#515151' }}>고객님이 보내주신 문의에 대한 답변은 기재하신 이메일 혹은 연락처로 발송됩니다.</p>
        </div>
        <hr style={{ border: 'none', borderTop: '2px solid #000' }} />

        <div className='text_box'>
          <ul className='inquiry_list'>
            <li><img src="images/inquiry_1.png" width="25px" height="35px" alt="inquiry1" /></li>
            <li><p id='title' style={{ color: '#515151' }}>분류</p></li>
            <select name='title' style={{ width: '350px', height: '43.5px' }}>
              <option value="">분류</option>
              <option value="제품 관련 문의">제품 관련 문의</option>
              <option value="회사 관련 문의">회사 관련 문의</option>
            </select>
          </ul>
          <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
          <ul className='inquiry_list'>
            <li><img src="images/inquiry_2.png" width="25px" height="35px" alt="inquiry2" /></li>
            <li><p id='title' style={{ color: '#515151' }}>성명</p></li>
            <li><input type="text" name="name" style={{ width: '250px', height: '40px', marginLeft: '-5px' }}></input></li>
          </ul>
          <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
          <ul className='inquiry_list'>
            <li><img src="images/inquiry_3.png" width="25px" height="35px" alt="inquiry3" /></li>
            <li><p id='title' style={{ color: '#515151' }}>휴대번호</p></li>
            <li><input type="text" name="phonenumber" style={{ width: '300px', height: '40px', marginLeft: '-45px' }}></input></li>
          </ul>
          <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
          <ul className='inquiry_list'>
            <li><img src="images/inquiry_4.png" width="25px" height="25px" alt="inquiry4" style={{ marginTop: '10px' }} /></li>
            <li><p id='title' style={{ color: '#515151' }}>이메일</p></li>
            <li><input type="text" name="email" style={{ width: '200px', height: '40px', marginLeft: '-25px' }}></input></li>
            <li><p style={{ color: '#515151' }}>@</p></li>
            <li><input type="text" name="emaildomain" style={{ width: '150px', height: '40px' }}></input>
              <select name='emaildomain' style={{ width: '150px', height: '43.5px', marginLeft: '3px' }}>
                <option value="">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
              </select>
            </li>
          </ul>
          <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
          <ul className='inquiry_list'>
            <li><img src="images/inquiry_5.png" width="25px" height="35px" alt="inquiry5" /></li>
            <li><p id='title' style={{ color: '#515151' }}>제목</p></li>
            <li><input type="text" name="subject" style={{ width: '900px', height: '40px', marginLeft: '-5px' }}></input></li>
          </ul>
          <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
          <ul className='inquiry_list'>
            <li><img src="images/inquiry_6.png" width="25px" height="25px" alt="inquiry6" /></li>
            <li><p id='title' style={{ color: '#515151' }}>내용</p></li>
            <li><textarea type="text" name="content" style={{ width: '900px', height: '200px', marginLeft: '-5px' }}></textarea></li>
          </ul>
          <button id='inquiry_bt' onClick={sendEmail}>제출하기</button>
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
    </form>
  );
};
