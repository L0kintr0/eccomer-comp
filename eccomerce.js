
class DataManager {
    constructor() {
      this.originalData = [];

    }
    
    static getInstance() {
      if (!this.instance) {
        this.instance = new DataManager();
      }
      return this.instance;
    }
  

      static redirect(){
        window.location.href = "index.html"
      }
    async fetchData(url) {
      try {
        const response = await fetch(url);
        this.originalData = await response.json();
        this.renderData();
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }

  
    renderData() {
      const dataToRender = this.originalData;
      const bodyContainer = document.getElementById('body');
      bodyContainer.innerHTML = '';
  
      for (let i = 0; i < dataToRender.length; i++) {
        if (i % 3 === 0) {
          const row = document.createElement('div');
          row.classList.add('row');
          bodyContainer.appendChild(row);
        }
  
        const col = document.createElement('div');
        col.classList.add('col-md-4');
        col.innerHTML = `
          <div class="card" style="width: 18rem;">
            <h5 class="card-title">${dataToRender[i].title}</h5>
            <img loading="lazy" src="${dataToRender[i].image}" class="card-img-top" style="max-height: 200px;"> 
            Price: ${dataToRender[i].price}
            <div class="card-body">
              <p class="card-text">${dataToRender[i].description}</p>
              <button class="btn btn-primary comprar" data-id="${dataToRender[i].id}">comprar</button>
            </div>
          </div>
        `;
  
        const row = bodyContainer.lastChild;
        row.appendChild(col);
      }
  
      bodyContainer.querySelectorAll('.comprar').forEach((button) => {
        button.addEventListener('click', async (event) => {
          event.preventDefault();
          const productId = button.getAttribute('data-id');
          await this.getProductById(productId);
        });
      });
    }
  
    async getProductById(productId) {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const product = await response.json();
        this.renderSelectedProduct(product);
      } catch (error) {
        console.error('Error al obtener producto por ID:', error);
      }
    }
  
    renderSelectedProduct(product) {
      const bodyContainer = document.getElementById('body');
      bodyContainer.innerHTML = `
        <div class="container-item text-center" style="margin-top:10em;">
          <div class="card" style="width: 100%;height:100%;">
            <h5 class="card-title">${product.title}</h5>
            <img src="${product.image}" class="card-img-top" style="max-height: 300px;width:500px;margin:auto;"> 
            Price: ${product.price}
            <div class="card-body">
              <p class="card-text">${product.description}</p>
              <button class="btn btn-primary" onclick="comprar()">comprar</button>
              <button id="atras" class="btn btn-danger">atras</button>
            </div>
          </div>
        </div> 
        
        
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">Price: ${product.price}</p>
      </div>
    </div>
  </div>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

` 
        
        
        ;
  
      bodyContainer.querySelector('#atras').addEventListener('click', () => {
        this.renderData();
      });
    }
  }

  let num = 0
  function sumar(){
      num ++
      return num
    
  }
  function comprar() {
    const cart = document.getElementById("number");
    cart.textContent = ""; 
    const number = document.createElement("p");
    number.textContent = sumar();
    number.classList.add("btn", "cart-primary");
    number.setAttribute("data-bs-toggle", "modal");
    number.setAttribute("data-bs-target", "#exampleModal");
    cart.appendChild(number);
    const localStorage = localStorage.set
  }
  const dataManager = DataManager.getInstance();
  dataManager.fetchData('https://fakestoreapi.com/products');
  