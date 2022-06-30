import express from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

//глобальный middleware
// app.use((req, res, next) => {
//     console.log('Время ', Date.now());
//     next();
// });

//похожий с all обработчик
app.use('/hello', (req, res, next) => {
    console.log('Время ', Date.now());
    next();
});

app.get('/hello', (req, res) => {
    // res.type('html');
    // res.cookie('token', 'sdadada', {
    //     domain: '',
    //     path: '/',
    //     secure: true,
    //     expires: 6000,
    // });
    // res.clearCookie('token');
    // res.status(200).json({ success: true });
    throw new Error('Error!!!');
    // res.status(404).end();
    // res.end();
    // res.download('/test.pdf');
});

app.use('/users', userRouter);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
