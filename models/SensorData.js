import mongoose from 'mongoose';

const SensorDataSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  motion: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: '7d', // Yeh line 7 din baad data automatically udha degi
  },
});

// Avoid compiling the model multiple times in Next.js development mode
const SensorData = mongoose.models.SensorData || mongoose.model('SensorData', SensorDataSchema);

export default SensorData;
