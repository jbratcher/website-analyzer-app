"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AnalyzedReportSchema extends Schema {
  up() {
    this.create("analyzed_reports", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.text("name");
      table.jsonb("report");
      table.timestamps();
    });
  }

  down() {
    this.drop("analyzed_reports");
  }
}

module.exports = AnalyzedReportSchema;
