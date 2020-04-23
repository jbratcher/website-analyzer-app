"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ActionStepsList extends Model {
  static boot() {
    super.boot();
  }
}

module.exports = ActionStepsList;
