"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => "Root Route");

// Users
Route.post("auth/register", "UserController.register");
Route.post("auth/login", "UserController.login");
Route.post("auth/logout", "UserController.logout");
Route.get("current-user", "UserController.getCurrentUser");
Route.get("users/:id", "UserController.show");
Route.get("users/:id/reports", "UserController.getReports");

// Reports
Route.group(() => {
  Route.get("/", "ReportController.index");
  Route.get("/:filename", "ReportController.getReports");
  Route.get("/raw/:filename", "ReportController.getRawReport");
  Route.get("/analyzed/:filename", "ReportController.getAnalyzedReport");
  Route.get("/action-steps/:filename", "ReportController.getActionStepsReport");
  Route.get("/generate/:name/:url", "ReportController.generateReport");
  Route.get("/save/:name", "ReportController.saveReports");
}).prefix("/reports");
