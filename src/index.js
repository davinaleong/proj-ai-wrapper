import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import v1 from './routes/v1.js';
import v2 from './routes/v2.js';
import v3 from './routes/v3.js';
import v4 from './routes/v4.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// --- NEW: serve static files from /public --- //
const PUBLIC_DIR = path.resolve('public');

// Serve documents at /documents/...
app.use(
  '/documents',
  express.static(path.join(PUBLIC_DIR, 'documents'), {
    index: false,
    maxAge: '1h', // tweak as you like
  })
);

// Serve images at /images/...
app.use(
  '/images',
  express.static(path.join(PUBLIC_DIR, 'images'), {
    index: false,
    maxAge: '1h',
  })
);

// (optional) Serve everything in public at the root if you plan to host a tiny UI there
// app.use(express.static(PUBLIC_DIR, { index: false, maxAge: '1h' }));

// versioned routers
app.use('/v1', v1);
app.use('/v2', v2);
app.use('/v3', v3);
app.use('/v4', v4);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[ai-wrapper] listening on ${PORT}`);
});
