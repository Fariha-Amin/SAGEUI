const express = require("express");
const bodyParser = require("body-parser");
const service = require("./SummarizerService");
const dataSeed = require("./DataSeed");

const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
// Create an Express application
const app = express();

const options = {
  key: fs.readFileSync(path.join(__dirname, "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "server.cert")),
};
app.use(cors());

app.use(bodyParser.json());

app.get("/api/getTableData", (req, res) => {
  const { dataTableRequest } = req.query;
  console.log("Request From Server", dataTableRequest);

  const sageDataTableRequest = JSON.parse(dataTableRequest);

  service.getFilterAndPaginatedDataNew(
    sageDataTableRequest,
    (err, responseData) => {
      //console.log("Data found from db", responseData);

      res.json(responseData);
    }
  );
});

// POST endpoint to update Summarize data
app.post("/api/updateSummarizeData", (req, res) =>
{
  const sageDataTableupdateRequest = req.body;
  try
  {
    const updatedRecord = service.updateSummarizeData(sageDataTableupdateRequest);

    res.json(updatedRecord);
  } catch (error)
  {
    res.status(400).json({ error: error.message });
  }
});
// Start the server
const port = 5004;

https.createServer(options, app).listen(port, () => {
  dataSeed.seedIntialDataForTesing();
  console.log(`Server running at https://localhost:${port}/`);
});
