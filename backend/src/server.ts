import "dotenv/config";
import app from "./app.js";
import connectToMongoDB from "./connect.js";

const PORT = Number(process.env.PORT) || 3001;
const MONGO_URI = process.env.MONGO_URI!;

async function startServer() {
  await connectToMongoDB(MONGO_URI);

  app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
  });
}

startServer();