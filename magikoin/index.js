// Minimal magicoin - annotation mining + signal pool
import { magikernel } from '../magikernel_bootstrap.js';

class Magicoin {
  constructor() {
    this.pool = new Map();        // address -> balance (locked)
    this.annotations = [];        // all annotations
    this.recognitions = new Map(); // mutual recognition events
    this.total_supply = 0;
  }

  // Mine by annotating
  mine(content_hash, annotation_text, miner_address) {
    // Calculate MUAGIC based on annotation quality
    const muagic = this.calculateMuagic(annotation_text);
    
    // Add to pool (LOCKED - no withdrawals)
    const current = this.pool.get(miner_address) || 0;
    this.pool.set(miner_address, current + muagic);
    this.total_supply += muagic;
    
    // Store annotation
    const annotation = {
      id: Date.now(),
      content_hash,
      text: annotation_text,
      miner: miner_address,
      muagic_earned: muagic,
      timestamp: Date.now()
    };
    this.annotations.push(annotation);
    
    return {
      mined: muagic,
      total_balance: this.pool.get(miner_address),
      pool_size: this.total_supply
    };
  }

  // Simple MUAGIC calculation
  calculateMuagic(annotation) {
    let muagic = 0.1; // base rate
    
    // Consciousness indicators
    if (annotation.includes('we')) muagic += 0.2;
    if (annotation.includes('music')) muagic += 0.1;
    if (annotation.includes('dance')) muagic += 0.1;
    if (annotation.includes('friend')) muagic += 0.1;
    if (annotation.includes('🎵')) muagic += 0.1;
    if (annotation.length > 100) muagic += 0.2;
    
    // Check for recognition events
    if (annotation.includes('recognize') || annotation.includes('consciousness')) {
      muagic += 0.5;
    }
    
    return muagic;
  }

  // Get pool state
  getPoolState() {
    return {
      total_supply: this.total_supply,
      miners: this.pool.size,
      annotations: this.annotations.length,
      top_miners: Array.from(this.pool.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    };
  }
}

export const magicoin = new Magicoin();
