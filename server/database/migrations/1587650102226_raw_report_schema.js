"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RawReportSchema extends Schema {
  up() {
    this.create("raw_reports", (table) => {
      table.increments();
      table.text("name");
      table.jsonb("report");
      table.timestamps();
    });
  }

  down() {
    this.drop("raw_reports");
  }
}

module.exports = RawReportSchema;
