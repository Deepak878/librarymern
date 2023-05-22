const { connect } = require("mongoose")

const mongoose = require("mongoose");

const connectDb = async ()=>{
  try {
await mongoose.connect('mongodb+srv://dbUsername:dbPassword@cluster0.hvzq96b.mongodb.net/library?')
.then(() => {
  console.log('Connected to MongoDB');
  // Start using the database
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});
  } catch (error) {
    console.log(error);
  }
}


// export default async function connect()
// {
//   await mongoose.connect(process.env.ATLAS_URI)
//   console.log('Database connected');
// }


module.exports = { connectDb }
