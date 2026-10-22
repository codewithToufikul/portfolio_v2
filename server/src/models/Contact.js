import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: 255,
    },
    subject: {
      type: String,
      trim: true,
      default: 'Portfolio Inquiry via POST /contact',
      maxLength: 150,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5000,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
