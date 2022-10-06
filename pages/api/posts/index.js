import { connectToDatabase } from "../../../util/mongodb";
import { Timestamp } from "mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find() //will find all the posts, the whole collection bc no parameters sent
        .sort({ timestamp: -1 }) //sort in a descending order
        .toArray(); //convert to array
      res.status(200).json(posts); //will respond with status 200: OK, and the posts converted to json
    } catch (error) {
      res.status(500).json(error); //will respond with status 500: server error, and the error converted to json
    }
  }

  if (method === "POST") {
    try {
      const post = await db
        .collection("posts") //this will access the collection posts
        .insertOne({ ...body, timestamp: new Timestamp() }); //will insertOne to the collection
      res.status(201).json(post); //will respond with status 201: success, and the posts converted to json
    } catch (error) {
      res.status(500).json(error); //will respond with status 500: server error, and the error converted to json
    }
  }
}
