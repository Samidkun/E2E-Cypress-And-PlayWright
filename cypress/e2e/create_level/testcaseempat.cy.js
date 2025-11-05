// Nama file: level.cy.js

describe("CRUD Level di halaman /level", () => {
    // Gunakan kode dinamis agar tidak bentrok antar test run
    const RANDOM_ID = Date.now();
    const LEVEL_KODE = "ADM";
    const LEVEL_NAMA_LAMA = "Administrator";
    //const LEVEL_NAMA_BARU = "Administrator Tetap";
    const BASE_URL = "http://127.0.0.1:8000";

    beforeEach(() => {
        // --- LOGIN ---
        cy.visit(`${BASE_URL}/login`);
        cy.get('input[name="username"]').clear().type("satrio");
        cy.get('input[name="password"]').clear().type("123456");
        cy.get('button[type="submit"]').click();

        cy.url({ timeout: 10000 }).should("not.include", "/login");

        // --- MASUK KE HALAMAN LEVEL ---
        cy.visit(`${BASE_URL}/level`);
        cy.url({ timeout: 10000 }).should("include", "/level");
        cy.get("table", { timeout: 10000 }).should("be.visible");
    });

    // --- CREATE ---
    it("CREATE: Gagal menambahkan level jika kode sudah ada (duplikasi)", () => {
        cy.intercept("POST", "**/level").as("createLevel");

        cy.contains(/tambah level/i).click();
        cy.get('input[name="level_kode"]').clear().type("ADM");
        cy.get('input[name="level_nama"]').clear().type("Administrator");

        cy.get('button[type="submit"]').click();

        // Tunggu respons server
        cy.wait("@createLevel").then((intercept) => {
            expect(intercept.response.statusCode).to.be.oneOf([400, 422]);
        });

        // Pastikan muncul pesan error dan tidak pindah halaman
        cy.contains(/sudah ada|duplikat|gagal/i).should("be.visible");
        cy.url().should("include", "/level/create");
    });

    // --- READ ---
    /*it("2. READ: Data level muncul di tabel", () => {
    cy.contains("td", LEVEL_KODE, { timeout: 10000 }).should("exist");
  });

  // --- UPDATE ---
  it("3. UPDATE: Mengubah nama level", () => {
    cy.contains("td", LEVEL_KODE)
      .parent("tr")
      .find('a:contains("Edit"), button:contains("Edit")')
      .should("be.visible")
      .click();

    cy.get("form", { timeout: 10000 }).should("be.visible");
    cy.get('input[name="level_nama"]')
      .clear()
      .type(LEVEL_NAMA_BARU)
      .should("have.value", LEVEL_NAMA_BARU);

    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/level");

    cy.reload();
    cy.get("table").should("be.visible");
    cy.contains("td", LEVEL_KODE).should("exist");
    cy.contains("td", LEVEL_NAMA_BARU).should("exist");
  });

  // --- DELETE ---
  it("4. DELETE: Menghapus level yang sudah dibuat", () => {
    cy.get("table", { timeout: 10000 }).should("be.visible");
    cy.on("window:confirm", () => true);

    cy.contains("td", LEVEL_KODE)
      .should("exist")
      .parent("tr")
      .within(() => {
        cy.contains(/hapus/i).should("be.visible").click({ force: true });
      });

    cy.get("body").then(($body) => {
      if (
        $body.find('button:contains("Ya"), button:contains("OK"), button:contains("Hapus")').length > 0
      ) {
        cy.contains("button", /Ya|OK|Hapus/i).click({ force: true });
      }
    });

    cy.wait(1500);
    cy.reload();
    cy.get("table", { timeout: 10000 }).should("be.visible");
    cy.contains("td", LEVEL_KODE).should("not.exist");
  });*/
});
