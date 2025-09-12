document.addEventListener('DOMContentLoaded', function() {

  const API_URL = 'https://fakestoreapi.com/products';

  let products = [];
  let bestSellerProducts = [];

  async function fetchData(urlApi) {
    const response = await fetch(urlApi);
    products = await response.json();
    console.log('products', products);
    bestSellerProducts = products.filter(product => product.rating.rate >= 4.5);
    console.log('bestSellerProducts', bestSellerProducts);
    
    displayBestSellerProducts(bestSellerProducts, $BEST_SELLERS_CONTAINER);
    return products;
  }

  fetchData(API_URL);

  

  

  const $BEST_SELLERS_CONTAINER = document.getElementById('bestSellerList')

  function displayBestSellerProducts(products, container) {
    products.forEach(product => {
      const $PRODUCT_ITEM = document.createElement('li');
      $PRODUCT_ITEM.classList.add('best-seller__product', 'col-md-6', 'col-lg-4');

      const $PRODUCT_LINK_CONTAINER = document.createElement('a');
      $PRODUCT_LINK_CONTAINER.href = 'product-detail.html';

      const $PRODUCT_DETAILS_CONTAINER = document.createElement('div');
      const $PRODUCT_TITLE = document.createElement('span');
      $PRODUCT_TITLE.textContent = product.title;
      $PRODUCT_TITLE.classList.add('best-seller__name');
      
      const $PRODUCT_CATEGORY = document.createElement('span');
      $PRODUCT_CATEGORY.textContent = product.category;
      $PRODUCT_CATEGORY.classList.add('best-seller__category');

      const $PRODUCT_PRICE = document.createElement('span');
      $PRODUCT_PRICE.textContent = '$' + product.price.toFixed(2);
      $PRODUCT_PRICE.classList.add('best-seller__price');
      
      $PRODUCT_DETAILS_CONTAINER.appendChild($PRODUCT_TITLE);
      $PRODUCT_DETAILS_CONTAINER.appendChild($PRODUCT_CATEGORY);
      $PRODUCT_DETAILS_CONTAINER.appendChild($PRODUCT_PRICE);

      const $PRODUCT_IMG = document.createElement('img');
      $PRODUCT_IMG.src = product.image;
      $PRODUCT_IMG.alt = product.title;
      $PRODUCT_IMG.classList.add('best-seller__image');
      $PRODUCT_IMG.width = 100;
      $PRODUCT_IMG.height = 100;

      $PRODUCT_LINK_CONTAINER.appendChild($PRODUCT_IMG);
      $PRODUCT_LINK_CONTAINER.appendChild($PRODUCT_DETAILS_CONTAINER);
      
      $PRODUCT_ITEM.appendChild($PRODUCT_LINK_CONTAINER);
     
      container.appendChild($PRODUCT_ITEM);

    });
    
  }

 

  // const $FORM = document.forms.contactForm;
  // const $ASUNTO = $FORM.elements.asunto
  

  // const $SUBMIT = document.querySelector('.contact__submit');
  // let $ASUNTO_SELECTED;
  
  // $ASUNTO.addEventListener('change', function(event) {
  //   $ASUNTO_SELECTED = event.target.value;
  //   console.log('asunto', $ASUNTO_SELECTED);
  //   return $ASUNTO_SELECTED;
  // });


  // $SUBMIT.addEventListener('click', function(event) {
  //   event.preventDefault();
  //   console.log($ASUNTO_SELECTED);

  // })
});