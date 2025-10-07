import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://candepereyraa15_db_user:H17SvpzD7EvOf5IT@cluster0.oitzu2a.mongodb.net/entrega1?retryWrites=true&w=majority");
    console.log("✅ Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
  }
};

export default connectDB;


