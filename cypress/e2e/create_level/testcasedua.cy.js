// Nama file: level.cy.js

describe("CRUD Level di halaman /level", () => {
  const LEVEL_KODE = "DS";
  const LEVEL_NAMA_LAMA = "Dosen";
  //const LEVEL_NAMA_BARU = "Dosen Tetap";
  const BASE_URL = "http://127.0.0.1:8000"; // ✅ ganti dari "  " jadi URL asli

  beforeEach(() => {
    // --- Langkah 1: LOGIN ---
    cy.visit(`${BASE_URL}/login`);
    cy.get('input[name="username"]').clear().type("satrio");
    cy.get('input[name="password"]').clear().type("123456");
    cy.get('button[type="submit"]').click();

    // Pastikan berhasil login dan redirect ke halaman utama
    cy.url({ timeout: 10000 }).should("not.include", "/login");

    // --- Langkah 2: Buka halaman level dan pastikan tabel terlihat ---
    cy.visit(`${BASE_URL}/level`);
    cy.url({ timeout: 10000 }).should("include", "/level");
    cy.get("table", { timeout: 10000 }).should("be.visible");
  });

  // --- C R E A T E ---
  it("CREATE: Gagal menambahkan level baru jika kode kurang dari 3 huruf", () => {
        cy.contains(/tambah level/i, { timeout: 10000 }).click();

        cy.get('input[name="level_kode"]').clear().type("DS");
        cy.get('input[name="level_nama"]').clear().type("Dosen");

        cy.intercept("POST", "**/level").as("createLevel");
        cy.get('button[type="submit"]').click();
        cy.wait("@createLevel").then((intercept) => {
            expect(intercept.response.statusCode).to.be.oneOf([400, 422]); // validasi gagal
        });

        // Pastikan pesan error muncul dan data tidak tersimpan
        cy.contains(/minimal|gagal|tidak valid/i, { timeout: 5000 }).should(
            "be.visible"
        );
        cy.contains("td", "DS").should("not.exist");
    });

  // --- R E A D ---
  /*it("2. READ: Data level DS muncul di tabel", () => {
    cy.contains("td", LEVEL_KODE, { timeout: 10000 }).should("exist");
  });

  // --- U P D A T E ---
  it("3. UPDATE: Berhasil mengubah level yang baru dibuat", () => {
    cy.contains("td", LEVEL_KODE).should("exist");

    cy.contains("td", LEVEL_KODE)
      .parent("tr")
      .find('a:contains("Edit"), button:contains("Edit")')
      .should("be.visible")
      .click();

    cy.get("form", { timeout: 10000 }).should("be.visible");

    cy.get('input[name="level_nama"]')
      .focus()
      .clear({ force: true })
      .invoke("val", LEVEL_NAMA_BARU)
      .trigger("input")
      .trigger("change")
      .should("have.value", LEVEL_NAMA_BARU);

    cy.wait(400);
    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.url({ timeout: 10000 }).should("include", "/level");
    cy.reload();
    cy.get("table", { timeout: 10000 }).should("be.visible");

    cy.contains("td", LEVEL_KODE, { timeout: 10000 }).should("exist");
    cy.contains("td", LEVEL_NAMA_BARU, { timeout: 10000 }).should("exist");
    cy.get("table").contains("td", new RegExp(`^${LEVEL_NAMA_LAMA}$`, "i")).should("not.exist");
  });

  // --- D E L E T E ---
  it("4. DELETE: Berhasil menghapus level DS", () => {
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
        cy.contains("button", /Ya, Hapus/i).click({ force: true });
      }
    });

    cy.wait(1500);
    cy.reload();
    cy.get("table", { timeout: 10000 }).should("be.visible");
    cy.contains("td", LEVEL_KODE, { timeout: 10000 }).should("not.exist");
    cy.log(`✅ Data level dengan kode ${LEVEL_KODE} berhasil dihapus.`);
  });*/
});
