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
  const { dataTableRequest, userId } = req.query;
  console.log("Request From Server", dataTableRequest, userId);

  const sageDataTableRequest = JSON.parse(dataTableRequest);

  service.getFilterAndPaginatedDataNew(
    sageDataTableRequest,
    userId,
    (err, responseData) => {
      res.json(responseData);
    }
  );
});

// POST endpoint to update Summarize data
app.put("/api/markAsFavorite", (req, res) => {
  const { recId, isFavorite, userId } = req.body;

  console.log(req.body);

  service.markSummaryAsFavorite(recId, isFavorite, userId, (err) => {
    res.json({
      isError: err ? false : true,
    });
  });
});

app.put("/api/saveOrEditNotes", (req, res) => {
  const { recId, userId, notes } = req.body;
  console.log(req.body);
  if (!recId) {
    return res.status(400).json({ error: "Parameters recId is required." });
  }
  service.saveAndUpdateNotesbyRecId(recId, notes, userId, (err) => {
    res.json({
      isError: err ? true : false,
    });
  });
});
// Start the server
const port = 5000;

https.createServer(options, app).listen(port, () => {
  dataSeed.seedIntialDataForTesing();
  console.log(`Server running at https://localhost:${port}/`);
});
