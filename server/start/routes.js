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

// API
Route.group(() => {
  // Auth
  Route.get("auth/user", "UserController.getCurrentUser");
  Route.post("auth/register", "UserController.register");
  Route.post("auth/login", "UserController.login");
  Route.post("auth/logout", "UserController.logout");
  Route.get("auth/verify-email", "UserController.verifyEmail");
  Route.post("auth/update/profile-pic", "UserController.updateProfilePic");
  Route.patch("auth/update", "UserController.update");
  Route.patch("auth/update/email", "UserController.updateEmail");
  Route.patch("auth/update/password", "UserController.updatePassword");
  Route.get("auth/forgot/password", "UserController.forgotPassword");
  Route.post(
    "auth/update/password-by-token",
    "UserController.updatePasswordByToken"
  );

  // Profile
  Route.get("users/:id", "UserController.show");

  // Reports
  Route.get("reports/", "ReportController.getReports");
  Route.delete("reports/:filename", "ReportController.deleteReportsByUser");
  Route.get(
    "reports/:filename/action-steps",
    "ReportController.getActionStepsReport"
  );
  Route.get("reports/:filename/analyzed", "ReportController.getAnalyzedReport");
  Route.get("reports/:filename/raw", "ReportController.getRawReport");
  // generate new lighthouse report
  Route.post("reports/generate/:name/:url", "ReportController.generateReport");
}).prefix("api");
