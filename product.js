const productDOM = document.querySelector('.product');
//console.log(productDOM);
const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;
    const params = new URLSearchParams(window.location.search);
    // console.log(params);
    const id = params.get('id');
    // console.log(id);
    const resp = await fetch(`${url}?id=${id}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    productDOM.innerHTML = ` <p class="error">${error}-there is an error in loading the product</p>`;
  }
};

const displayProduct = (product) => {
  //company,colors,description,name:title,price,image,url:image
  const {
    company,
    colors,
    price,
    name: title,
    description,
    image,
  } = product.fields;
  const { url: img } = image[0];
  // console.log(img);
  const colorList = colors.map((color) => {
    return ` <span class="product-color" style="background-color: ${color}"></span>`;
  });
  document.title = title.toUpperCase();
  productDOM.innerHTML = ` <div class="product-wrapper">
        <img src="${img}" alt="${title}" class="img" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">
           ${colorList}
           
          </div>
          <p>
           ${description}
          </p>
          <button class="btn">add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};
start();
