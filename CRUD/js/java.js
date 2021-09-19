var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var tbody = document.getElementById('tbody');
var myBtn = document.getElementById('myBtn');
var currentX = [0];
// console.log(productName, productPrice, productCategory, productDescription);

var productsContainer = [];
if (localStorage.getItem('our product') != null) {

    productsContainer = JSON.parse(localStorage.getItem('our product'));
    displayProducts();

}

function add() {
    if (document.getElementById('myBtn').innerHTML == "Add Product") {

        addProduct();
    } else {
        addUpdate();
    }
}


function addProduct() {

    if (validateProductName() == true) {
        var product = {

            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value,

        }

        productsContainer.push(product);
        localStorage.setItem("our product", JSON.stringify(productsContainer));

        displayProducts();
        console.log(productsContainer);
        clearForm();

    } else {
        alert("productName must start with uppercase");
    }
}



function clearForm() {

    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";


}

function displayProducts() {
    var str = '';
    for (var i = 0; i < productsContainer.length; i++) {
        str += ` <tr>
        <td> ${[i+1]}</td>
        <td> ${productsContainer[i].name}</td>
        <td> ${productsContainer[i].price}</td>
        <td> ${productsContainer[i].category}</td>
        <td> ${productsContainer[i].description}</td>
        <td> <button  onclick='updateProduct (${i})' class="btn btn-warning"> 
        
        Update
        </button>
        </td>
        <td> <button onclick='deleteProduct(${i})' class="btn btn-danger"> 
        
        Delete
        </button>
        </td>
        
                </tr> `

    }

    tbody.innerHTML = str;
}


function deleteProduct(index) {

    productsContainer.splice(index, 1);
    localStorage.setItem("our product", JSON.stringify(productsContainer));
    displayProducts();

}


function updateProduct(x) {
    currentX = x;

    productNameInput.value = productsContainer[x].name;
    productPriceInput.value = productsContainer[x].price;
    productCategoryInput.value = productsContainer[x].category;
    productDescriptionInput.value = productsContainer[x].description;
    myBtn.innerHTML = "Update product";

}

function addUpdate() {
    productsContainer[currentX].name = productNameInput.value;

    productsContainer[currentX].price = productPriceInput.value;

    productsContainer[currentX].category = productCategoryInput.value;
    productsContainer[currentX].description = productDescriptionInput.value;

    displayProducts();
    localStorage.setItem("our product", JSON.stringify(productsContainer));
    myBtn.innerHTML = "Add Product";
    clearForm();



}


function searchProduct(term) {

    var str = '';
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            str += ` <tr>
        <td> ${[i+1]}</td>
        <td> ${productsContainer[i].name}</td>
        <td> ${productsContainer[i].price}</td>
        <td> ${productsContainer[i].category}</td>
        <td> ${productsContainer[i].description}</td>
        <td> <button  onclick='updateProduct (${i})' class="btn btn-warning"> 
        
        Update
        </button>
        </td>
        <td> <button onclick='deleteProduct(${i})' class="btn btn-danger"> 
        
        Delete
        </button>
        </td>
        
                </tr> `
        }
    }
    tbody.innerHTML = str;
}


function validateProductName() {

    var regex = /^[A-Z][a-z]{1,8}$/;

    if (regex.test(productNameInput.value) == true) {

        return true;
    } else {

        return false;
    }

}