import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  libraryHistory: [
    {
      bookTitle: String,
      borrowedDate: Date,
      returnedDate: Date,
    },
  ],
  feesHistory: [
    {
      amount: Number,
      paidDate: Date,
      status: { type: String, enum: ["Paid", "Pending"] },
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;