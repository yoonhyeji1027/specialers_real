const nodeMailer = require('nodemailer');

const mailPoster = nodeMailer.createTransport({
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: 'hyeji8067@naver.com',
    pass: 'ab8411cd'
  }
});

const mailOpt = (user_data, title, contents) => {
    const mailOptions = {
      from: 'hyeji8067@naver.com',
      to: user_data.email ,
      subject: title,
      text: contents
    };
  
    return mailOptions;
  }  

  const sendMail = (mailOption) => {
    mailPoster.sendMail(mailOption, function(error, info){
      if (error) {
        console.log('에러 ' + error);
      }
      else {
        console.log('전송 완료 ' + info.response);
      }
    });
  }
  