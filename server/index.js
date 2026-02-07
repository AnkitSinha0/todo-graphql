import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import gql from "graphql-tag";
import resolvers from "./resolvers/resolver.js";
const typeDefs = gql(
  fs.readFileSync("./schema/schema.gql", "utf8")
);

 
// console.log(typeDefs);

const app = express();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const port = process.env.PORT || 3000;


mongoose.connect(DB,{
}).then(con =>{
    // console.log(con.connections); 
    console.log('DB connection successful!');
}).catch(err => {
  console.error('DB connection error:', err);
});

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

async function startServer() {
    await server.start();
    app.use('/graphql', cors(), express.json(), expressMiddleware(server));

    // app.get('/', (req, res) => {
    //     res.send('Hello World!');
    // });
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

}

startServer();

