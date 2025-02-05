/*
? What is a Stream?
* A stream is a sequence of data that can be read or written in a continuous manner.
* Streams are used to read or write data in chunks, rather than all at once.
TODO - Run `npm i` and then run `npm run dev` to start the server.
*/

import express from 'express';
import status from 'express-status-monitor';
import { createReadStream, createWriteStream, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//? Convert import.meta.url to __dirname for path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(status());

//* 📌 Stream file to client
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'input.txt');

  //* 🔎 Check if file exists before attempting to stream
  if (!existsSync(filePath)) {
    return res.status(404).send("❌ File not found");
  }

  //* 📥 Create Read Stream with 2MB chunks
  const readStream = createReadStream(filePath, {
    encoding: 'utf-8',
    highWaterMark: 2 * 1024 * 1024, // 2 MB chunks
  });

  console.log("📤 Starting file streaming...");

  //* 🚨 Handle errors during streaming
  readStream.on('error', (err) => {
    console.error('❌ Error reading file:', err);
    res.status(500).send('❌ Server Error');
  });

  //* 🔄 Pipe Read Stream directly to Response stream (client)
  readStream.pipe(res);

  //* ✅ Log when streaming completes successfully
  readStream.on('end', () => {
    console.log('✅ File streaming completed');
  });

  //* ➡️ Log each chunk as it is sent to the client
  readStream.on('data', (chunk) => {
    console.log('➡️ Sending Data...');
    console.log("Buffer:", Buffer.from(chunk).toString("utf-8"));
  });

  //* 📝 Start parallel file writing process
  streamToFile();
});

//* 📌 Stream the content of a file to another file
const streamToFile = () => {
  const inputPath = path.join(__dirname, "input.txt");
  const outputPath = path.join(__dirname, "output.txt");

  //* 🔎 Ensure input file exists before proceeding with the stream
  if (!existsSync(inputPath)) {
    console.error("❌ Input file not found. Skipping write operation.");
    return;
  }

  //* 📥 Create Read Stream & Write Stream
  const readStream = createReadStream(inputPath, {
    encoding: "utf-8",
    highWaterMark: 1024 * 1024 // 1 MB chunks
  });

  const writeStream = createWriteStream(outputPath);

  console.log("✍️ Writing file to output.txt...");

  //* 🔄 Pipe Read Stream to Write Stream (writing the content to another file)
  readStream.pipe(writeStream);

  //* ✅ Log when writing completes
  readStream.on("end", () => {
    console.log("✅ File successfully written to output.txt");
  });

  //* 🚨 Handle Read Stream Errors
  readStream.on("error", (err) => {
    console.error("❌ Error during file read:", err);
  });

  //* 🚨 Handle Write Stream Errors
  writeStream.on("error", (err) => {
    console.error("❌ Error during file write:", err);
  });
};

//* 🚀 Start the Express server and listen on port 3000
app.listen(3000, () => {
  console.log('🚀 Server listening on port 3000');
});
