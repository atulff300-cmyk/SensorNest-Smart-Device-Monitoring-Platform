import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deviceId: {
    type: String,
    required: true,  
    unique: true,
  },
  location: {
    type: String,
  },
  motion: {
    type: Boolean,
  },
  temperature: {
    type: Number,
  },
  deviceStatus: {
    type: String,
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Avoid compiling the model multiple times in Next.js development mode
const Device = mongoose.models.Device || mongoose.model('Device', DeviceSchema);

export default Device;
