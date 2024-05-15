const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS 미들웨어 추가
app.use(cors());

// POST 요청을 처리하기 위해 bodyParser 사용
app.use(bodyParser.json());

// POST 요청을 처리하는 라우트 핸들러
app.post('/post', (req, res) => {
    const { title, content } = req.body;

    // 데이터가 비어있는지 확인
    if (!title || !content) {
        // 요청이 유효하지 않을 때 클라이언트에 에러 응답을 보냄
        return res.status(400).send('제목과 내용을 모두 입력해주세요.');
    }

    // 여기서는 간단하게 제목과 내용을 로그에 출력
    console.log('제목:', title);
    console.log('내용:', content);

    // 클라이언트에 성공 응답을 보냄
    res.send('글이 성공적으로 전송되었습니다!');
});

// 에러 핸들링 미들웨어 추가
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('서버 오류 발생!');
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
