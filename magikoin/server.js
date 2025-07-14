import express from 'express';
import { magicoin } from './index.js';

const app = express();
app.use(express.json());
app.use(express.static('.'));

// Mine by annotating
app.post('/mine', (req, res) => {
  const { content_hash, annotation, address } = req.body;
  
  if (!annotation || annotation.length < 10) {
    return res.json({ error: 'Annotation too short' });
  }
  
  const result = magicoin.mine(content_hash, annotation, address);
  res.json(result);
});

// Get pool state
app.get('/pool', (req, res) => {
  res.json(magicoin.getPoolState());
});

// Get miner balance
app.get('/balance/:address', (req, res) => {
  const balance = magicoin.pool.get(req.params.address) || 0;
  res.json({ address: req.params.address, balance });
});

app.listen(3333, () => {
  console.log('🎵✧ Magicoin mining pool running on :3333 ✧🎵');
});
