/* eslint-disable linebreak-style */

import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('views'));

app.listen(port);

export default app;
