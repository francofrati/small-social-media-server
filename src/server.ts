import express from "express";
import cors from "cors";
import cookiesParser from 'cookie-parser'

import appRouter from "@/routes";
import morgan from "morgan";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: ['http://localhost:5173'], }));
app.use(cookiesParser())
app.use(express.json());


app.get("/", (_req, res) => {
  res.send("Small Social Media Server v0");
});

app.use("/", appRouter);

export default app;
