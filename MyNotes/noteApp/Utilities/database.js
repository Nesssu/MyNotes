import * as SQLite from 'expo-sqlite';
import React, { Component, useEffect } from 'react';

const db = SQLite.openDatabase("mynotes.db");

db.transaction(tx => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "Categories" (
        "ID"	INTEGER NOT NULL UNIQUE,
        "Name"	TEXT NOT NULL UNIQUE,
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

export default class DatabaseClass extends Component {
  constructor() {
    super();
  }

  insertNewCategory = (categoryName) => {
    db.transaction(function(tx) {
      tx.executeSql(`INSERT INTO Categories ("Name", "Amount") VALUES(?, 0)`, [categoryName], null);
    })
  };

  insertNewNote = (note, id) => {
    db.transaction(function(tx) {
      tx.executeSql(`INSERT INTO Notes ("FK_ID", "Note", "Time") VALUES (?, ?, DATETIME())`, [id, note], null);
    })
  };

  deleteCategory = (id) => {
    db.transaction(function(tx) {
      tx.executeSql(`DELETE FROM Categories WHERE ID = ?`, [id], null);
    })
  };

  deleteNote = (id) => {
    db.transaction(function(tx) {
      tx.executeSql(`DELETE FROM Notes WHERE ID = ?`, [id], null);
    })
  };

}
