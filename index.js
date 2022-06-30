import express from 'express';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
    // res.type('html');
    // res.cookie('token', 'sdadada', {
    //     domain: '',
    //     path: '/',
    //     secure: true,
    //     expires: 6000,
    // });
    // res.clearCookie('token');
    res.status(200).json({ success: true });
    // res.status(404).end();
    // res.end();
    // res.download('/test.pdf');
});


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
