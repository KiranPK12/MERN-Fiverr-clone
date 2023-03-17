import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/user.route.js";
import gigRoute from "./Routes/gig.route.js";
import messageRoute from "./Routes/message.route.js";
import orderRoute from "./Routes/order.route.js";
import reviewRoute from "./Routes/review.route.js";
import conversationRoute from "./Routes/conversation.route.js";
import authRoute from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connection is successful");
  } catch (error) {
    console.log(error);
  }
};
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running");
});
