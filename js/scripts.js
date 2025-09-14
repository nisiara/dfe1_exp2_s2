document.addEventListener('DOMContentLoaded', function() {

  const API_URL = 'https://fakestoreapi.com/products';

  let products = [];
  let bestSellerProducts = [];
  let featuredProducts = [];

  async function fetchData(urlApi) {
    try {
      const response = await fetch(urlApi);
      products = await response.json();
      
      bestSellerProducts = products.filter(product => product.rating.rate >= 4.5);
      displayBestSellerProducts(bestSellerProducts, $BEST_SELLERS_CONTAINER);

      featuredProducts = products.slice(6, 10);
      displayFeaturedProducts(featuredProducts, $FEATURED_CONTAINER);
      console.log('featuredProducts', featuredProducts)
      // return products;
    } catch (error) {

      console.log(error.message);
      
    }
    
    
    
  }

  fetchData(API_URL);

  const $BEST_SELLERS_CONTAINER = document.getElementById('bestSellerList');

  function showData(product){
    const $PRODUCT_DESCRIPTION = document.createElement('div');
    $PRODUCT_DESCRIPTION.textContent = product.description;
    $BEST_SELLERS_CONTAINER.appendChild($PRODUCT_DESCRIPTION);
  }

  function displayBestSellerProducts(products, container) {
    products.forEach(product => {
      const $PRODUCT_ITEM = document.createElement('li');
      $PRODUCT_ITEM.classList.add('best-seller__product', 'col-md-6', 'col-lg-4');
      $PRODUCT_ITEM.addEventListener('mouseenter', () => showData(product));

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

  const $FEATURED_CONTAINER = document.getElementById('featuredList');

  function displayFeaturedProducts(products, container){
    products.forEach( product => {
      const $PRODUCT_ITEM__COLUMN = document.createElement('article');
      $PRODUCT_ITEM__COLUMN.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');

      const $PRODUCT_CARD = document.createElement('div');
      $PRODUCT_CARD.classList.add('card');

      const $PRODUCT_IMG = document.createElement('img');
      $PRODUCT_IMG.src = product.image;
      $PRODUCT_IMG.alt = product.title;
      $PRODUCT_IMG.classList.add('card-img-top');
      $PRODUCT_IMG.width = '100%';
      $PRODUCT_IMG.height = 280;

      $PRODUCT_CARD.appendChild($PRODUCT_IMG);

      const $PRODUCT_DETAILS_CONTAINER = document.createElement('div');
      $PRODUCT_DETAILS_CONTAINER.classList.add('card-body')

      const $PRODUCT_TITLE = document.createElement('h5');
      $PRODUCT_TITLE.classList.add('card-title');
      $PRODUCT_TITLE.textContent = product.title;

      const $PRODUCT_DESCRIPTION = document.createElement('p');
      $PRODUCT_DESCRIPTION.classList.add('card-text');
      $PRODUCT_DESCRIPTION.textContent = product.description;

      const $PRODUCT_LINK = document.createElement('a');
      $PRODUCT_LINK.href = 'product-detail.html';
      $PRODUCT_LINK.classList.add('btn', 'btn-outline-secondary', 'd-block')
      $PRODUCT_LINK.textContent = 'Ver detalle';

      $PRODUCT_DETAILS_CONTAINER.appendChild($PRODUCT_TITLE);
      $PRODUCT_DETAILS_CONTAINER.appendChild($PRODUCT_DESCRIPTION);
      $PRODUCT_DETAILS_CONTAINER.appendChild($PRODUCT_LINK);

      $PRODUCT_CARD.appendChild($PRODUCT_DETAILS_CONTAINER);
      $PRODUCT_ITEM__COLUMN.appendChild($PRODUCT_CARD);
      container.appendChild($PRODUCT_ITEM__COLUMN);
    })
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