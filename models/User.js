import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  accountStatus: {
    type: String,
  },
  lastLogin: {
    type: Date,
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Avoid compiling the model multiple times in Next.js development mode
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
