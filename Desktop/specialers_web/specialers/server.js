import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import nodemailer from 'nodemailer'; // Nodemailer 추가

const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: '121.155.34.16',
  port: 33063,
  user: 'sysop',
  password: 'data001!',
  database: 'fms',
  // 유휴 연결 해제를 방지하기 위한 옵션
  keepAliveInitialDelay: 10000, // 10초마다 Keep-Alive 패킷을 보냄
  enableKeepAlive: true
});

connection.connect(err => {
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('생선 데이터 MySQL 연결 성공');
});

// 수조 정보 조회 API
app.get('/tanks', (req, res) => {
  connection.query(
    `SELECT *, row_number() over(order by mea_dt asc, tank_id asc) as idx
     FROM (
       SELECT DATE_FORMAT(mea_dt, "%Y-%m-%d %H:%i:%s") AS formatted_mea_dt,
              mea_dt, farm_id, tank_id,
              MAX(IF((eq_id = 131), value, NULL)) as do,
              MAX(IF((eq_id = 130), value, NULL)) as ph,
              MAX(IF((eq_id = 133), value, NULL)) as temperature,
              MAX(IF((eq_id = 132), value, NULL)) as salinity
       FROM (
         SELECT vv.mea_dt, e.farm_id, e.tank_id, vv.eq_id, vv.value
         FROM (SELECT eq_id, farm_id, tank_id, sys_type FROM fms.eq_tb) as e
         LEFT JOIN (SELECT mea_dt, eq_id, value, value_mod FROM fms.sensor_value_tb
                    WHERE mea_dt >= (NOW() + INTERVAL -(1) DAY)) as vv
         ON e.eq_id = vv.eq_id
       ) v
       GROUP BY mea_dt, farm_id, tank_id
       ORDER BY v.mea_dt DESC
       LIMIT 10
     ) as A`,
    (error, results, fields) => {
      if (error) {
        console.error('수조 정보 조회 중 에러 발생: ' + error);
        res.status(500).send({ success: false, message: '데이터베이스 에러' });
        connection.connect();
        return;
      }
      res.send({ success: true, tanks: results });
    }
  );
});

app.listen(port, host, () => {
  console.log(`서버 시작: http://localhost:${port}/tanks`);
});


//실시간 영상
Stream = require('node-rtsp-stream')
stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
  wsPort: 9999,
  ffmpegOptions: { // options ffmpeg flags
    '-stats': '', // an option with no neccessary value uses a blank string
    '-r': 30 // options with required values specify the value after the key
  }
})



