import mongoose from "mongoose";
import { PASSWORD, USERNAME } from "../utils/constants";

const connectToDB = async () => {
  console.log(USERNAME);
  console.log(PASSWORD);
  const connectionURL = `mongodb+srv://${USERNAME}:${PASSWORD}@projects.8tiyi.mongodb.net/`;

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
