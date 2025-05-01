import env from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./database/dbConnection.mjs";
import userRouter from "./router/userRouter.mjs";
import EventRouter from "./router/eventRouter.mjs";
import messageRouter from "./router/messageRouter.mjs";
import path from "path";

 
env.config();
await dbConnect();

const app = express();
app.use(express.json());
app.use(cors());



app.use("/users", userRouter); 
app.use("/events",EventRouter);
app.use("/messages",messageRouter);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.listen(process.env.PORT || 2030, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});
