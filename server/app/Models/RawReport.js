"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class RawReport extends Model {
  static boot() {
    super.boot();
    this.addTrait("@provider:Lucid/UpdateOrCreate");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = RawReport;
