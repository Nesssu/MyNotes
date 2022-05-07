import * as SQLite from 'expo-sqlite';
import React, { useEffect } from 'react';

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
        );
        
        CREATE TRIGGER IF NOT EXISTS Amount_trigger_insert
        AFTER INSERT ON Notes
        BEGIN
          UPDATE Categories set Amount = (SELECT COUNT(*) FROM Notes WHERE FK_ID == NEW.FK_ID)
          WHERE ID = NEW.FK_ID;
        END;
        
        CREATE TRIGGER IF NOT EXISTS Amount_trigger_delete
        AFTER DELETE ON Notes
        BEGIN
          UPDATE Categories set Amount = (SELECT COUNT(*) FROM Notes WHERE FK_ID == OLD.FK_ID)
          WHERE ID = OLD.FK_ID;
        END;`
    )
});


  

export const getCategories = async () => {
    const [categoryData, setCategoryData] = React.useState([]);
    useEffect(() => {
      database.transaction(
          tx => {
            tx.executeSql(
              `SELECT * FROM Categories;`,
              [],
              (tx, results) => {
                var temp = [];
                for (var i = 0; i < results.rows.length; i++) {
                  temp.push(results.rows.item(i));
                }
                setCategoryData(temp);
              },
              (tx, error) => {
                console.log("Could not execute query: " + error);
              }
            );
          },
          error => {
            console.log("Transaction error: " + error);
          },
          () => {
        });
    }, []);
    return categoryData;
};

export const insertNewCategory = (categoryName) => {
  database.transaction(function(tx) {
    tx.executeSql(`INSERT INTO Categories ("Name", "Amount") VALUES(?, 0)`, [categoryName], null);
  })
};

export const insertNewNote = (note, id) => {
  database.transaction(function(tx) {
    tx.executeSql(`INSERT INTO Notes ("FK_ID", "Note", "Time") VALUES (?, ?, DATETIME())`, [id, note], null);
  })
};

export const deleteCategory = (id) => {
  database.transaction(function(tx) {
    tx.executeSql(`DELETE FROM Categories WHERE ID = ?`, [id], null);
  })
};

export const deleteNote = (id) => {
  database.transaction(function(tx) {
    tx.executeSql(`DELETE FROM Notes WHERE ID = ?`, [id], null);
  })
};


