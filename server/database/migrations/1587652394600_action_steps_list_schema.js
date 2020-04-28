"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ActionStepsListSchema extends Schema {
  up() {
    this.create("action_steps_lists", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.text("name");
      table.jsonb("report");
      table.timestamps();
    });
  }

  down() {
    this.drop("action_steps_lists");
  }
}

module.exports = ActionStepsListSchema;
