import mongoose from "mongoose";
import { PASSWORD, USERNAME } from "../utils/constants";

const connectToDB = async () => {
  const connectionURL = `mongodb+srv://${USERNAME}:${PASSWORD}@projects.8tiyi.mongodb.net/`;

  mongoose
    .connect(connectionURL)
    .then(() => {
      console.log("blog database conneciton successful");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDB;
