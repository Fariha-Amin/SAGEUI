const express = require("express");
const bodyParser = require("body-parser");
const service = require("./SummarizerService");
const cors = require("cors");

// Create an Express application
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/api/getTableData", (req, res) => {
  const { dataTableRequest } = req.query;
  console.log("Request From Server", dataTableRequest);

  const sageDataTableRequest = JSON.parse(dataTableRequest);

  res.json(service.getFilterAndPaginatedData(sageDataTableRequest));
});
// Start the server
const port = 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
