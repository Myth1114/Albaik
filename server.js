const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");

process.on("uncaughtException", err => {
  console.log(err.name, err.message);
  process.exit(1);
});
// setting up the env and DB
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// connecting DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }) // will return connection obj as promise that contains all the details about the database connection
  .then(con => {
    // console.log(con.connections);
    console.log("connection successful");
  }).catch((error)=>{
      console.log(error);
  }); 
  console.log(process.env.NODE_ENV)

// create the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
