import express from 'express';

const port = 8000;
const app = express();

// app.all('/hello', (req, res, next) => {
//     console.log('All');
//     next();
// });

// const cb = (req, res, next) => {
//     console.log('CB');
//     next();
// }

app.get('/hello', (req, res) => {
    res.status(200).json({ success: true });
    // res.download('/test.pdf');
});


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
