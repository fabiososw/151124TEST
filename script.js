const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjkxZThhZDEyOTAwMTU4NzZjZjkiLCJpYXQiOjE3MzE2NjgyNTUsImV4cCI6MTczMjg3Nzg1NX0.qbUBwCeFSYqNJdQd48GoQ0lhR6uermbnYSqijNCTYXI";

fetch(URL, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then((response) => response.json())
  .then((products) => {
    const productList = document.getElementById("product-list");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col", "d-flex", "h-100", "card-deck");
      productCard.innerHTML = `
  <div class="card shadow-sm">
    <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text text-muted">${product.brand}</p>
      <p class="card-text">€${product.price}</p>
     <div class="mt-auto">
        <a href="#" class="btn btn-warning w-100">Aggiungi al carrello</a>
    </div>
    </div>
    </div>
      `;
      productList.appendChild(productCard);
    });
  })
  .catch((error) => console.error("Errore nel fetch dei prodotti:", error));

// Back-office: aggiungi un nuovo prodotto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); //per prevenire il refresh automatico

    // qui recupero i valori di input dal form
    const newProduct = {
      name: document.getElementById("product-name").value,
      description: document.getElementById("product-description").value,
      price: parseFloat(document.getElementById("product-price").value),
      imageUrl: document.getElementById("product-image").value,
      brand: document.getElementById("product-brand").value
    };

    // effettuo la chiamata POST per aggiungere un nuovo prodotto
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newProduct) // Trasforma l'oggetto JSON in stringa
    })
      .then((response) => {
        if (!response.ok) {
          alert("Errore nell'aggiunta del prodotto.");
        } else {
          alert("Prodotto aggiunto con successo!");
          form.reset(); // Resetta il form
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  });
});
