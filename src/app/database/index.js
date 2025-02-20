import mongoose from "mongoose";
import { PASSWORD, USERNAME } from "../utils/constants";

const connectToDB = async () => {
  const connectionURL = `mongodb+srv://${USERNAME}:${PASSWORD}@blogapp.4rcml.mongodb.net/`;
  mongoose
    .connect(connectionURL)
    .then(() => {
      console.log("blog database connection successful");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDB;
