"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ActionStepsListSchema extends Schema {
  up() {
    this.create("action_steps_lists", (table) => {
      table.increments();
      table.jsonb("steps");
      table.timestamps();
    });
  }

  down() {
    this.drop("action_steps_lists");
  }
}

module.exports = ActionStepsListSchema;
