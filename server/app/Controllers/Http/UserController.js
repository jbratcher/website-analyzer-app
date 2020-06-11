"use strict";

const Env = use("Env");
const Helpers = use("Helpers");
const Persona = use("Persona");
const User = use("App/Models/User");

class UserController {
  async index() {
    return await User.all();
  }

  // send forgot password email with token link
  async forgotPassword({ request }) {
    return await Persona.forgotPassword(request.input("uid"));
  }

  async getCurrentUser({ auth }) {
    const user = await auth.getUser();
    const token = await auth.getAuthHeader();
    return user;
  }

  async login({ request, auth, response }) {
    const payload = request.only(["uid", "password"]);
    const user = await Persona.verify(payload);
    return await auth.generate(user);
  }

  async logout({ auth }) {
    const user = await auth.getUser();
    const token = await auth.getAuthHeader();
    await user.tokens().where("token", token).update({ is_revoked: true });
    return user;
  }

  async register({ request, auth, response }) {
    const payload = request.only([
      "email",
      "first_name",
      "last_name",
      "password",
      "password_confirmation",
    ]);
    const { first_name, last_name } = payload;
    payload.full_name = `${first_name} ${last_name}`;
    payload.profile_image_source = `https://ui-avatars.com/api/?name=${first_name}+${last_name}`;
    const user = await Persona.register(payload);
    return await auth.generate(user);
  }

  // show a user profile
  async show({ auth, params }) {
    const { id } = params;
    const user = await auth.getUser();
    if (user.id !== Number(id)) {
      return "You cannot see someone else's profile";
    }
    return user;
  }

  // update user profile information
  async update({ request, auth }) {
    const user = await auth.user;
    const payload = request.only(["first_name", "last_name"]);
    payload.full_name = `${payload.first_name} ${payload.last_name}`;
    await Persona.updateProfile(user, payload);
    const updatedUser = await auth.user;
    return updatedUser;
  }

  // change user password from profile edit
  async updateEmail({ request, auth }) {
    const payload = request.only(["email"]);
    const user = await auth.user;
    return await Persona.updateProfile(user, payload);
  }

  // linked with update()
  // must be a post request since a new file is created
  async updateProfilePic({ request, auth }) {
    const user = await auth.user;
    const file = await request.file("profileImage");
    // move the image file to the static/images folder
    if (file) {
      await file.move(Helpers.appRoot("public/images"), {
        name: `${user.first_name}-${user.last_name}-${user.id}.${file.subtype}`,
        overwrite: true,
      });
      // error handling for file move
      if (!file.moved()) {
        return file.error();
      }
      // Update the image link in the user's image source column
      user.profile_image_source = `${Env.get("APP_URL")}/images/${
        user.first_name
      }-${user.last_name}-${user.id}.${file.subtype}`;
      user.save();
      return user;
    }
    return "No file uploaded";
  }

  // change user password from profile edit
  async updatePassword({ request, auth }) {
    const payload = request.only([
      "old_password",
      "password",
      "password_confirmation",
    ]);
    const user = await auth.user;
    return await Persona.updatePassword(user, payload);
  }

  // update user password by token
  async updatePasswordByToken({ request }) {
    const token = decodeURIComponent(request.input("token"));
    const payload = request.only(["password", "password_confirmation"]);
    const user = await Persona.updatePasswordByToken(token, payload);
    return user;
  }

  // verify a new user's account by token
  async verifyEmail({ request }) {
    const token = request.input("token");
    const user = await Persona.verifyEmail(token);
    return user;
  }

  async getReports({ auth }) {
    const user = await auth.getUser();
    const reports = await user.rawReports().fetch();
    return reports;
  }
}

module.exports = UserController;
