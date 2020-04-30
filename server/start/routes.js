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
  Route.post("/register", "UserController.register");
  Route.post("/login", "UserController.login");
  Route.post("/logout", "UserController.logout");
  Route.get("/user", "UserController.getCurrentUser");
}).prefix("/auth");

// Profile
Route.get("users/:id", "UserController.show");

// Reports
Route.group(() => {
  Route.get("/", "ReportController.getReports");
  Route.delete("/:filename", "ReportController.deleteReportsByUser");
  Route.get("/:filename/action-steps", "ReportController.getActionStepsReport");
  Route.get("/:filename/analyzed", "ReportController.getAnalyzedReport");
  Route.get("/:filename/raw", "ReportController.getRawReport");
  // generate new lighthouse report
  Route.post("/generate/:name/:url", "ReportController.generateReport");
}).prefix("/reports");
