const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const service = require("./SummarizerService");
const db = new sqlite3.Database(path.join(__dirname, "Db", "summarizer.db"));

const seedIntialDataForTesing = () => {
  service.getData().forEach((data) => {
    const {
      recId,
      summaryGeneratedOn,
      user,
      documentId,
      summary,
      notes,
      favourite,
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
        favourite ? 1 : 0,
      ],
      (err) => {
        if (err) {
          console.error("Error inserting user:", err);
        }
      }
    );
  });
};

console.log("Data inserted successfully");
