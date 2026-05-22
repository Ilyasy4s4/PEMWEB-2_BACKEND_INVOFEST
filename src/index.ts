import express from 'express';
import cors from 'cors';

import eventRoute from './routes/eventRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import speakerRoute from './routes/speakerRoute.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, ini adalah api Invofest!');
});

app.use('/events', eventRoute);
app.use('/categories', categoryRoute);
app.use('/speakers', speakerRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

