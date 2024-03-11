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
app.put("/api/markAsFavorite", (req, res) => {
  const sageDataTableupdateRequest = req.body;

  service.markSummaryAsFavorite(sageDataTableupdateRequest, (err) => {
    res.json({
      isError: err ? false : true,
    });
  });
  // try {
  //   const updatedRecord = service.updateSummarizeData(
  //     sageDataTableupdateRequest
  //   );

  //   res.json(updatedRecord);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
});

// app.put('/api/saveOrEditNotes', (req, res) => {
//   const { recId, notes } = req.query;

//   if (!recId) {
//     return res.status(400).json({ error: 'Parameters id is required.' });
//   }

//   // Do something with the parameters, for example, just log them
//   console.log('id:', id);
//   console.log('name:', name);

//   // Send a response
//   res.status(200).json({ message: 'Parameters received successfully.' });
// });

app.put("/api/saveOrEditNotes", (req, res) => {
  const { recId, notes } = req.body;
  console.log(req.body)
  if (!recId) {
    return res.status(400).json({ error: 'Parameters recId is required.' });
  }
  service.saveAndUpdateNotesbyRecId(recId,notes, (err) => {
    res.json({
      isError: err ?true: false,
    });
  });});
// Start the server
const port = 5000;

https.createServer(options, app).listen(port, () => {
  dataSeed.seedIntialDataForTesing();
  console.log(`Server running at https://localhost:${port}/`);
});
