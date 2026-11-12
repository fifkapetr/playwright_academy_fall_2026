import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: Create Project in PMTool", async ({ page }) => {
  const projectName =
    "petrfifk_project_" + faker.number.int({ min: 10, max: 10_000_000 });
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject())
    .then((createProjectModal) => createProjectModal.fillName(projectName))
    .then((createProjectModal) => createProjectModal.clickSave())
    .then((tasks) => tasks.clickProfile())
    .then((tasks) => tasks.clickLogout());
});
