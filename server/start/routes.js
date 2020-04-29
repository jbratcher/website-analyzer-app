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

// Auth
Route.group(() => {
  Route.post("register", "UserController.register");
  Route.post("login", "UserController.login");
  Route.post("logout", "UserController.logout");
  Route.get("user", "UserController.getCurrentUser");
}).prefix("/auth");

// Users
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
  Route.post(
    "/generate/user/:name/:url",
    "ReportController.generateReportByUser"
  );
  Route.get("/save/user/:name", "ReportController.saveReportsByUser");
}).prefix("/reports");
