"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/User", async (faker) => {
  return {
    username: faker.email(),
    full_name: faker.name(),
    email: faker.email(),
    password: faker.password(),
    profile_image_source: `https://i.pravatar.cc/150?u=${faker.email()}`,
  };
});
