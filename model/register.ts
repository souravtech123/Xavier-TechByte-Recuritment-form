import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IRegistration extends Document {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  semester: string;
  interest: string;
  skills: string;
  whyJoin?: string;
  portfolio?: string;
  status: "Pending" | "Selected" | "Rejected";
  qrToken?: string;
  verified: boolean;
  interviewDone: boolean;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    interest: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      required: true,
    },

    whyJoin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Selected", "Rejected"],
      default: "Pending",
    },

    qrToken: {
      type: String,
      unique: true,
      sparse: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    interviewDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Registration ||
  model<IRegistration>("Registration", RegistrationSchema);