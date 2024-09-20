
import mysql from "mysql2/promise";
import { createReadStream } from "fs";
import { resolve, dirname } from "path";
import { parse } from "csv-parse";
import { fileURLToPath } from "url";


// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import db from "./database/db.js";

const filePath = resolve(__dirname, "../CSVHopeFuel/uploads/Beta-Data-HopeFuel.csv");

const readStream = createReadStream(filePath);

readStream
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", (chunk) => {
    console.log(chunk.toString());
  })
  .on("error", (err) => {
    console.error("Error reading the file:", err);
  })
  .on("end", () => {
    console.log("File reading completed");
  });


  async function createTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS hopefuel (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      zip VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;
  `;
    try {
      await db(createTableQuery);
      console.log("[DB] Table created or already exists");
    } catch (error) {
      console.error("[DB] Error creating table:", error);
    }
  }
  createTable();
