import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase("mynotes.db");

database.transaction(tx => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "Categories" (
        "ID"	INTEGER NOT NULL UNIQUE,
        "Name"	TEXT NOT NULL,
        "Amount"	INTEGER,
        PRIMARY KEY("ID" AUTOINCREMENT)
        );

        CREATE TABLE IF NOT EXISTS "Notes" (
            "ID"	INTEGER NOT NULL UNIQUE,
            "FK_ID"	INTEGER NOT NULL,
            "Note"	TEXT,
            "Time"	TEXT NOT NULL,
            FOREIGN KEY("FK_ID") REFERENCES "Categories"("ID") ON DELETE CASCADE,
            PRIMARY KEY("ID" AUTOINCREMENT)
        );`
    )
});


  

export const getCategories = () => {
    var temp = [];
    database.transaction(
        tx => {
          tx.executeSql(
            `SELECT * FROM Categories;`,
            [],
            (tx, results) => {
              console.log("Executed query");
            },
            (tx, error) => {
              console.log("Could not execute query");
            }
          );
        },
        error => {
          console.log("Transaction error");
        },
        () => {
          console.log("Transaction done");
        }
    );
    return temp;
};


