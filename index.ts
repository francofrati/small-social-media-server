import "dotenv/config";
import server from "@/server";

const port = process.env.PORT || 5173;

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
