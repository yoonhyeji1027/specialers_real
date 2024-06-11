import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainPage.css";
import Modal from "react-modal";
import LineGraph from './LineGraph.jsx';
import JSMpeg from 'jsmpeg';

export default function MainPage() {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const player = new JSMpeg.Player('ws://localhost:9999', {
      canvas: canvas
    });
  }, []);

  return (
    <canvas id="canvas"></canvas>
  );
}