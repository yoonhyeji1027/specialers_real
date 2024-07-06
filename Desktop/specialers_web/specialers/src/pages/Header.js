import './Header.css';
import React from 'react';

export default function Header() {
    return (
        <div>
            <div className='navbar'>

                <ul className='navMenu'>
                    <a className="logoImg" href="MainPage.js">
                        <img src="/images/logo.png" alt="Logo" width="250" height="60" style={{ marginLeft: '-70px' }} />
                    </a>
                    <div className='textMenu'>
                        <li class="nav-item">
                            <a class="nav-link" href="S_info.js" style={{ fontSize: '25px' }}>회사소개</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="P_info.js" style={{ fontSize: '25px' }}>제품서비스소개</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="Salmon.js" style={{ fontSize: '25px' }}>스마트양식</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="Maps.js" style={{ fontSize: '25px' }}>오시는길</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="Inquiry.js" style={{ fontSize: '25px' }}>문의하기</a>
                        </li>
                    </div>

                </ul>
            </div>
        </div>
    )
}

