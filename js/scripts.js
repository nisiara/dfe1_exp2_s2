document.addEventListener('DOMContentLoaded', function() {

  const API_URL = 'https://fakestoreapi.com/products';

  let products = [];
  let bestSellerProducts = [];
  let featuredProducts = [];

  // Por medio de la función asíncrona para realizar una petición HTTP a la URL 
  // guardada en la constante API_URL para traernos los productos de la API
  // Esta función nos retornará el resultado de la Promesa. Si todo sale bien, la constante response
  //ahora tendra un objeto que contiene la información HTTP como el código de estado, los headers, etc.
  //response.json() extrae el cuerpo de la respuesta y lo convierte en un objeto compatible con Javascript
  //La constante products tendrá el contenido que nos interesa para pintar los productos en nuestro sitio web
  async function fetchData(urlApi) {
    try {
      const response = await fetch(urlApi);
      console.log('response', response)
      products = await response.json();
      
      //Filtramos los productos según su ranking para presentarlos en la sección 'Más Vendidos'
      bestSellerProducts = products.filter(product => product.rating.rate >= 4.5);
      displayBestSellerProducts(bestSellerProducts, $BEST_SELLERS_CONTAINER);

      //Del total de productos, totamos 4 productos (desde el indice 6 al 10) para mostrarlos
      //en sección 'Destacados'
      featuredProducts = products.slice(6, 10);
      displayFeaturedProducts(featuredProducts, $FEATURED_CONTAINER);
      console.log('featuredProducts', featuredProducts)
      
    } catch (error) {
      console.error(error.message);
    }
  }

  fetchData(API_URL);


  //Contenedor donde se pintarán los productos más vendidos.
  const $BEST_SELLERS_CONTAINER = document.getElementById('bestSellerList');

  //Este contenedor y función es para mostrar el detalle de la descripción al momento de hacer mouseover
  //en un producto de la categoría más vendido
  const $BEST_SELLER_DESCRIPTION = document.createElement('div');
  function showData(product, appendoTo){  
    $BEST_SELLER_DESCRIPTION.classList.add('best-seller__description')
    $BEST_SELLER_DESCRIPTION.textContent = product.description;
    $BEST_SELLERS_CONTAINER.appendChild($BEST_SELLER_DESCRIPTION);
    appendoTo.appendChild($BEST_SELLER_DESCRIPTION)
  }

  //Funcion para pintar los productos en la sección de 'Más Vendidos'
  //Se crean todas las etiquetas necesarias para la sección. Desde 'article','div', 'p', 'img' y 'a'
  // También para cada etiqueta se le agregan los atributos correspondiente, como 'class', 'src' 'alt, etc
  // Además agregamos el contenido, tipo texto, según corresponda.
  // Cuando tenemos todos las etiquetas armadas, podemos insertarlos dentro de su elemento 'padre' correspondiente
  // para formar el componente completo.
  // Finalmente por cada iteración del ciclo, se adjuntará el componente correspondiente al ciclo dentro del contenedor
  // que esta presente con el atributo 'id' en el HTML
  function displayBestSellerProducts(products, container) {
    products.forEach(product => {
      const $PRODUCT_ITEM = document.createElement('li');
      $PRODUCT_ITEM.classList.add('best-seller__product', 'col-md-6', 'col-lg-4');
      $PRODUCT_ITEM.addEventListener('mouseenter', () => showData(product, $PRODUCT_LINK_CONTAINER));
      $PRODUCT_ITEM.addEventListener('mouseleave', () => {
        $PRODUCT_LINK_CONTAINER.removeChild($BEST_SELLER_DESCRIPTION);
      });

      const $PRODUCT_LINK_CONTAINER = document.createElement('a');
      // $PRODUCT_LINK_CONTAINER.href = 'product-detail.html';

      const $PRODUCT_DETAILS_CONTAINER = document.createElement('div');
      $PRODUCT_DETAILS_CONTAINER.classList.add('best-seller__details')
      
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

  //Contenedor donde se pintarán los productos Destacados.
  const $FEATURED_CONTAINER = document.getElementById('featuredList');
  
  //Funcion para pintar los productos en la sección de 'Destacados'
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
      // $PRODUCT_LINK.href = 'product-detail.html';
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

});