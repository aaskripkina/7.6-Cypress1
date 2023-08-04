const book1 = {
  title: "Гарри Поттер",
  description: "Подростковая литература",
  author: "Джоан Роулинг",
};
const book2 = {
  title: "Убить пересмешника",
  description: "Всемирная литература",
  author: "Харпер Ли",
};
const book3 = {
  title: "Властелин колец",
  description: "Всемирная литература",
  author: "Джон Рональд Руэл Толкин",
};
const book4 = {
  title: "Гордость и предубеждение",
  description: "Всемирная литература",
  author: "Джейн Остен",
};

beforeEach(() => {
  
  cy.visit("/");
  cy.log("bropet@mail.ru", "123");
});

describe("Favorite books testing", () => {
  it("Should add book to favorite through function 'add new'", () => {
    cy.addBook(book1);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", book1.title);
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(book1.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(book1.title).should("not.exist");
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(book2);
    cy.contains(book2.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(book2.title).should("be.visible");
  });

  it("Should remove all favorite books", () => {
    cy.addBook(book3);
    cy.addBook(book4);
    cy.removeAllFavorite();
    cy.contains("Please add some book to favorit on home page!").should(
      "exist"
    );
  });
});