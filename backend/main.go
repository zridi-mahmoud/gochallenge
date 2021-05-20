package main

import (
	"context"
	"encoding/json"
	// "fmt"
	// "bytes"
    // "io/ioutil"
    // "log"
    // "os"
    // "path"
    // "time"

	"github.com/gofiber/fiber"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/gofiber/cors"
    // "go.mongodb.org/mongo-driver/mongo"
    // "go.mongodb.org/mongo-driver/mongo/gridfs"
    // "go.mongodb.org/mongo-driver/mongo/options"
)

const dbName = "usersdb"
const collectionName = "user"
const port = 8000


func createUser(c *fiber.Ctx) {
	collection, err := getMongoDbCollection(dbName, collectionName)
	if err != nil {
		c.Status(500).Send(err)
		return
	}

	var user User
	json.Unmarshal([]byte(c.Body()), &user)

	res, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		c.Status(500).Send(err)
		return
	}

	response, _ := json.Marshal(res)
	c.Send(response)
	// c.Send(responseUser)
	// var r map[string]interface{}
	// responseUser, _ := json.Marshal(user)
	// q  := json.Unmarshal(responseUser, &r)
	// if q != nil {
	// 	c.Status(500).Send(err)
	// 	return
	// }
	// response, _ := json.Marshal(res)
	// r["_id"] = string(response)
	// newData, err := json.Marshal(r)
	// fmt.Printf(string(response))
	// c.Send(newData)
}

func getUser(c *fiber.Ctx) {
	collection, err := getMongoDbCollection(dbName, collectionName)
	if err != nil {
		c.Status(500).Send(err)
		return
	}

	var filter bson.M = bson.M{}

	if c.Params("id") != "" {
		id := c.Params("id")
		objID, _ := primitive.ObjectIDFromHex(id)
		filter = bson.M{"_id": objID}
	}

	var results []bson.M
	cur, err := collection.Find(context.Background(), filter)
	defer cur.Close(context.Background())

	if err != nil {
		c.Status(500).Send(err)
		return
	}

	cur.All(context.Background(), &results)

	if results == nil {
		c.SendStatus(404)
		return
	}

	json, _ := json.Marshal(results)
	c.Send(json)
}

func updateUser(c *fiber.Ctx) {
	collection, err := getMongoDbCollection(dbName, collectionName)
	if err != nil {
		c.Status(500).Send(err)
		return
	}
	var user User
	json.Unmarshal([]byte(c.Body()), &user)

	update := bson.M{
		"$set": user,
	}

	objID, _ := primitive.ObjectIDFromHex(c.Params("id"))
	res, err := collection.UpdateOne(context.Background(), bson.M{"_id": objID}, update)

	if err != nil {
		c.Status(500).Send(err)
		return
	}

	response, _ := json.Marshal(res)
	c.Send(response)
}

func deleteUser(c *fiber.Ctx) {
	collection, err := getMongoDbCollection(dbName, collectionName)

	if err != nil {
		c.Status(500).Send(err)
		return
	}

	objID, _ := primitive.ObjectIDFromHex(c.Params("id"))
	res, err := collection.DeleteOne(context.Background(), bson.M{"_id": objID})

	if err != nil {
		c.Status(500).Send(err)
		return
	}

	jsonResponse, _ := json.Marshal(res)
	c.Send(jsonResponse)
}

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Get("/user/:id?", getUser)
	app.Post("/user", createUser)
	app.Put("/user/:id", updateUser)
	app.Delete("/user/:id", deleteUser)
	app.Listen(port)
  }