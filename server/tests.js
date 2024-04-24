import monngoose from "mongoose"

monngoose.connect("mongodb+srv://admin:panov123@cluster0.jhgyz.mongodb.net/db?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });
