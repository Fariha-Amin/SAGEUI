const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const service = require("./SummarizerService");
const db = new sqlite3.Database(path.join(__dirname, "Db", "summarizer.db"));

const DataSeed = {
  seedIntialDataForTesing() {

    db.run(`CREATE TABLE IF NOT EXISTS "nextgensummary" (
      "recId"	INTEGER,
      "user"	TEXT,
      "summaryGeneratedOn"	TEXT,
      "documentId"	TEXT,
      "summary"	TEXT,
      "notes"	TEXT,
      "favourite"	INTEGER,
      PRIMARY KEY("recId")
    )`);

    db.get("SELECT COUNT(*) AS count FROM nextgensummary", (err, row) => {
      if (err) {
        console.error("Error checking data:", err);
        return;
      }

      if (row.count === 0) {
        service.getData().forEach((data) => {
          const {
            recId,
            summaryGeneratedOn,
            user,
            documentId,
            summary,
            notes,
            favorite,
          } = data;
          db.run(
            "INSERT INTO nextgensummary (recId, user,summaryGeneratedOn,documentId,summary,notes,favourite) VALUES (?,?,?,?, ?,?,?)",
            [
              recId,
              user,
              summaryGeneratedOn,
              documentId,
              summary,
              notes,
              favorite ? 1 : 0,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting user:", err);
              }
            }
          );
        });
      }
    });

    console.log("Data inserted successfully");
  },
};

module.exports = DataSeed;
