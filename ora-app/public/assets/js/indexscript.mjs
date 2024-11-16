import fetchPosts from "../data/makeupApi.mjs";
let parentElems = document.getElementsByTagName("article");

const existingList = document.getElementsByClassName("listBooks")[0]

async function getRandomMakeupItem() {
    const response = await fetchPosts()
    const products = await response.json();
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    let newElement = document.createElement('div')
    let newText = `${item['title']} written by ${item['author']}`

    let newImg = document.createElement('img')
    newImg.src = item['image']
    newImg.style.width = '200px'

    newElement.append(newText)
    newElement.append(newImg)

    if (item['alreadyRead'] === true){
        newElement.style.color = 'red'

    }
    else {
        newElement.style.color = 'black'
    }



    existingList.append(newElement)
}



    // Set product details
    document.getElementById('product-link').href = randomProduct.product_link || '#';
    document.getElementById('product-image').src = randomProduct.image_link || 'assets/images/placeholder.jpg';
    document.getElementById('product-name').textContent = randomProduct.name || 'Product Name';
    document.getElementById('product-price').textContent = `$${randomProduct.price || '0.00'}`;

    // Random star rating between 3 and 5
    const starRating = Math.floor(Math.random() * 3) + 3;
    const starContainer = document.getElementById('star-rating');
    starContainer.innerHTML = ''; // Clear existing stars

    for (let i = 0; i < starRating; i++) {
        const star = document.createElement('li');
        star.innerHTML = '<i class="fa fa-star"></i>';
        starContainer.appendChild(star);
    }


// Call the function to load a random makeup product
getRandomMakeupItem();
