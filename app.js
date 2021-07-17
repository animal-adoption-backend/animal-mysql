const express = require('express');
const dotenv = require('dotenv');
const app = express();
const { sequelize } = require('./models');


// ejs 사용한다?
app.set('views', __dirname + '/views') // 경로 명시?
app.set('view engine', 'ejs')



dotenv.config();


app.set('port', process.env.PORT || 3000);


//MIDDLEWARES
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

sequelize.sync({ force: false }) //
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((error) => {
        console.error(error);
    });


//router
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 대기중....');
});


