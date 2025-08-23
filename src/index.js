import "dotenv/config"
import path from "node:path"
import express from "express"
import cors from "cors"
import morgan from "morgan"

import v1 from "./routes/v1.js"
import v2 from "./routes/v2.js" // will be used later
import v3 from "./routes/v3.js" // will be used later
//import v4 from './routes/v4.js';     // will be used later

const app = express()
app.use(cors())
app.use(express.json({ limit: "1mb" }))
app.use(morgan("dev"))

// static files for v4 (safe even if unused yet)
app.use(
  "/assets/documents",
  express.static(path.resolve("src/assets/document"))
)
app.use("/assets/images", express.static(path.resolve("src/assets/images")))

// versioned routers
app.use("/v1", v1)
app.use("/v2", v2)
app.use("/v3", v3)
// app.use('/v4', v4);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`[ai-wrapper] listening on ${PORT}`)
})
