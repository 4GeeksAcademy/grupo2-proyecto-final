import React, { useEffect } from 'react';
import '../../styles/NotFound.css';

function NotFound() {
  useEffect(() => {
    // Animation logic
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let imgData;
    let pix;
    const WIDTH = 700;
    const HEIGHT = 500;
    let flickerInterval;

    const init = () => {
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fill();
      imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
      pix = imgData.data;
      flickerInterval = setInterval(flickering, 30);
    };

    const flickering = () => {
      for (let i = 0; i < pix.length; i += 4) {
        const color = Math.random() * 255 + 50;
        pix[i] = color;
        pix[i + 1] = color;
        pix[i + 2] = color;
      }
      ctx.putImageData(imgData, 0, 0);
    };

    init();

    // Cleanup when the component unmounts
    return () => {
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2>Oh oh... Signal is missing!</h2>
      <div className="frame">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default NotFound;