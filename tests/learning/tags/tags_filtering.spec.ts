// tests/learning/tags/tags_filtering.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Tag Test", { tag: "@mujTag" }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test("Without Tag Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test.describe("Suite with Tag", { tag: "@mujTag" }, () => {
  test("Tagged test inside describe 1", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Tagged test inside describe 2", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });
});

test.describe("Suite without Tag", () => {
  test(
    "Describe without Tag, test with Tag",
    { tag: "@mujTag" },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
    },
  );
});

/*
Cvičení - práce s tagy (⌛5:00)
Vytvořte nový test:
Složka: tests/exercises
Soubor: exercise_tags.spec.ts
Test: Tag Exercise
V testu vytvořte tag: @exercise  a přidejte kroky pro přihlášení do Pmtool pomocí Page Objektů a test pomocí --grep spusťte


* Výzva
Vytvořte test na přihlášení do Pmtool:
Složka: tests/challenges
Soubor: challenge_tags.spec.ts
Test: Tag Challenge
Test bude mít 2 tagy:
Chal1
Chal2


*/
