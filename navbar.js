
const nav = document.getElementsByTagName("nav")[0];
const navHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><span style="color:#549dac; ">Navbar</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" id="initLink"><span style="color:#689098;">Dashboard</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="productLink"><span style="color:#689098;">Products</span></a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" id="cartLink"><i class="fa-solid fa-cart-shopping"></i><span id="number"></span></a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;


    const tempElement = document.createElement('div');
    tempElement.innerHTML = navHTML;
    const newNav = tempElement.firstChild;
    nav.appendChild(newNav);

const  initLink = document.getElementById("initLink")
initLink.addEventListener("click",redirect)

function redirect(){
    window.location.href = "index.html"
}


const link = document.getElementById("productLink")
link.addEventListener("click",linkProduct)

function linkProduct() {
    window.location.href = "eccomerce.html" ;
 }

    
    
