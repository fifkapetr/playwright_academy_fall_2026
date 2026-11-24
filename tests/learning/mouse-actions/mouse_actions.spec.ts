// tests/learning/mouse-actions/mouse_actions.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Mouse Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
  });

  test("Mouse Hover", async ({ page }) => {
    await page.locator('[data-testid="hover-box"]').hover();
    await expect(
      page.locator('[data-testid="hover-message"]'),
      "Hover Message is Displayed",
    ).toBeVisible();
    // ? BONUS: najetí myši do pozice x: 0px, y: 0px
    await page.mouse.move(0, 0);
  });

  test("Drag and Drop", async ({ page }) => {
    const draggable = page.locator("#drag1");
    const dropZone = page.locator("#drop1");

    // ? Potřebujeme mít okno zascrollované na oba prvky, aby přetáhnutí proběhlo
    await dropZone.scrollIntoViewIfNeeded();
    await draggable.dragTo(dropZone);
    await expect(
      page.locator('[data-testid="dropped-message"]'),
      "Drop Message is Displayed",
    ).toBeVisible();
  });

  test("BONUS: alternative way to drag and drop", async ({ page }) => {
    const draggable = page.locator("#drag1");
    const dropzone = page.locator("#drop1");

    await dropzone.scrollIntoViewIfNeeded();

    // ? Vytažení souřadnic prvků draggable a dropzone
    const draggableBox = await draggable.boundingBox();
    const dropzoneBox = await dropzone.boundingBox();

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (!draggableBox || !dropzoneBox) {
      throw new Error(
        "Unable to determine bounding boxes for drag and drop elements",
      );
    }

    // ? přetáhnutí prvku draggable do dropzone pomocí souřadnic. Vypočítává se střed prvků
    await page.mouse.move(
      draggableBox.x + draggableBox.width / 2, // ? draggableBox.x je x souřadnice draggableBox vlevo nahoře. Přičítáme šířku a dělíme dvěma, abychom dostali střed
      draggableBox.y + draggableBox.height / 2, // ? draggableBox.y je y souřadnice draggableBox vlevo nahoře. Přičítáme výšku a dělíme dvěma, abychom dostali střed
    );
    await page.mouse.down();
    await page.mouse.move(
      dropzoneBox.x + dropzoneBox.width / 2,
      dropzoneBox.y + dropzoneBox.height / 2,
    );
    await page.mouse.up();
    await expect(page.locator("#dropped-message")).toBeVisible();
  });

  test("Double Click", async ({ page }) => {
    await page.locator('[data-testid="double-click-box"]').dblclick();
    await expect(
      page.locator('[data-testid="double-click-box"]'),
      "Double Box contains class action-active",
    ).toContainClass("action-active");
  });

  test("Click and Hold", async ({ page }) => {
    const holdingButton = page.locator(".hold-button");
    const holdPromise = holdingButton.click({ delay: 2000 }); // ? Klikne a drží 2 sekundy, test pokračuje protože nepoužíváme await (abychom mohli zkontrolovat stav tlačítka, když se drží klik)
    // Kontrolujeme stav tlačítka, když probíhá click
    await expect(holdingButton, "Holding button has text").toHaveText(
      "Holding...",
    );
    await holdPromise;
    // Další kroky testu po dokončení kliknutí
  });
});
