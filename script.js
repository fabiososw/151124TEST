const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjkxZThhZDEyOTAwMTU4NzZjZjkiLCJpYXQiOjE3MzE2NjgyNTUsImV4cCI6MTczMjg3Nzg1NX0.qbUBwCeFSYqNJdQd48GoQ0lhR6uermbnYSqijNCTYXI";
//ho definito cos'è l'URL e il token per avere un punto di partenza
//ora farò la mia richiesta get per ottenere i prodotti
fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then((response) => response.json()) //converto la risposta in json per riuscire a leggere meglio i dati
  .then((products) => {
    const productList = document.getElementById("product-list");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-6", "col-md-4", "col-lg-3", "mb-4");
      productCard.innerHTML = `
      <div class="card">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description} <br><span class="text-muted">${product.brand}</p>
              <p class="card-price">€${product.price}</p>
              <a href="#" class="btn btn-primary">Aggiungi al carrello</a>
            </div>
          </div>`;
      productList.appendChild(productCard);
    });
  })
  .catch((error) => console.error("Errore nel fetch dei prodotti:", error));
//backoffice
document.addEventListener("DOMContentLoaded", () => {
  const fomr = document.getElementById("product-form");
});
//funzione per inviare il prodotto
