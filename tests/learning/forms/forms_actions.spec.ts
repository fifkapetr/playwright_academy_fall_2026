// tests/learning/forms/forms_actions.spec.ts
import { test } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill and pressSequantially", async ({ page }) => {
    const nameInput = page.locator("#name");

    await nameInput.fill("Start");
    await nameInput.fill("End"); // ? metoda fill přepisuje stávajícího hodnotu, přepíše "Start" na "End"
    await nameInput.pressSequentially("Kde toto bude?"); // ? metoda pressSequentially píše za stávající hodnotu, výsledek bude: "EndKde toto bude?"
    await nameInput.clear(); // ? Smaže value prvku.
    await nameInput.pressSequentially("Píšu pomalu", { delay: 150 }); // ? Vypíše text, za každým znakem dělá 150 ms pauzu.
  });

  test("Select Option", async ({ page }) => {
    const genderSelect = page.locator("#gender");

    await genderSelect.selectOption("female"); // ? Vybere option ze selectu pomocí value v option.
    await genderSelect.selectOption({ label: "Male" }); // ? Vybere option ze selectu pomocí textu option.
  });

  test("Checkbox, radio button check", async ({ page }) => {
    await page.locator("#contact-phone").check(); // ? Kliknutí na <input type="radio">
    await page.locator("#interests-travel").check(); // ? Kliknutí na <input type="checkbox">
    await page.locator("#interests-travel").uncheck(); // ? Odkliknutí <input type="checkbox">, nelze na radio!
  });

  test("Input Date fill with ISO 8601", async ({ page }) => {
    await page.locator("#date-of-birth").fill("2010-01-25"); // ? Input type="date" musí být vždy vyplněný ve formátu ISO 8601 (YYYY-MM-DD)
  });

  test("File Upload", async ({ page }) => {
    const filePath = path.resolve(
      import.meta.dirname,
      "../../../assets/upload_file.txt",
    );
    /* 
    ! Ve starších typescriptu, použijte:     
    const filePath = path.resolve(__dirname, "../../../assets/upload_file.txt");
    */
    // require("../../../assets/upload_file.txt"); // ? require slouží pouze proto, aby nám pomohl připravit cestu (napovídá), path.resolve nenapovídá a je v něm složitější cestu vytvořit.
    const fileChooserPromise = page.waitForEvent("filechooser"); // ? do const uložíme odkaz na listenara, abychom se po kliknutí na input type="file" mohli odkázat na výběr souboru
    // * Klikneme na tlačítko pro nahrání souboru (input type="file")
    await page.locator("#file-upload").click();
    const fileChooser = await fileChooserPromise; // * Počkáme, než listener fileChooserPromise odchytí otevření okna pro výběr okna a uložíme výsledek (odchycené okno) do proměnné (abychom mohli následně vložit soubor)
    await fileChooser.setFiles(filePath); // * Nahrajeme soubor pomocí proměnné filePath, kterou máme nachystanou z předchozích kroků
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(500); // * Počkáme několik sekund, abychom v screenshotu viděli soubor vybraný
  });

  test("Slider - Range", async ({ page }) => {
    const experienceSlider = page.locator("#experience");
    await experienceSlider.fill("3");
    await experienceSlider.fill("8");
    await experienceSlider.fill("1");
  });
});
