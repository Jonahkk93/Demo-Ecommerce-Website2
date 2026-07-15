const product=[
    {
            id: 1,
            name: "Purple Nails",
            price: 20000,
            image: "Nails1.jpg"
        },
        {
            id: 2,
            name: "Blue Nails",
            price: 35000,
            image: "Nails2.jpg"
        },
        {
            id: 3,
            name: "Yellow Nails",
            price: 25000,
            image: "Nails3.jpg"
        },
        {
            id: 4,
            name: "Red Nails",
            price: 10000,
            image: "Nails3.jpg"
        },
        {
            id: 5,
            name: "Maroon Nails",
            price: 30000,
            image: "Shop3.jpg"
        },
        {
            id: 6,
            name: "Baby Blue Nails",
            price: 40000,
            image: "Nails1.jpg"
        },
        {
            id: 7,
            name: "Burgandy Nails",
            price: 20000,
            image: "Nails1.jpg"
        },
        {
            id: 8,
            name: "Almond Nails",
            price: 27000,
            image: "Shop3.jpg"
        },
        {
        id: 9,
        name: "Midnight Blue Nails",
        price: 28000,
        image: "Nails1.jpg"
    },  
    {
        id: 10,
        name: "Sunshine Yellow Nails",
        price: 26000,
        image: "Shop3.jpg"
    },
    {
        id: 11,
        name: "Margentta expo Nails",
        price: 30000,
        image: "Nails2.jpg"
    },
    {
    id: 12,
    name: "Pitch Black Nails",
    price: 20000,
    image: "Nails1.jpg"
    }
]
const categories = [...new Set(product.map((item)=> {return item}))]

document.getElementById('searchBar').addEventListener('keyup', (e)=>{
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter((item)=> {
        return(
            item.title.toLocaleLowerCase().includes(searchData)
        )
    })
    displayItem(filterData)
});

const displayItem = (items)=> {
    document.getElementById('root').innerHTML=items.map((item)=>{
        var {image, name, price} = item;
        return(
            `
            <img src="${product.image}" alt="">
            <div class="discount">
                <h5>15%</h5>
            </div>
            <div class="name">
                <h4>${product.name}</h4></div>
            <div class="price">
                <p>UGX ${product.price}</p>
            </div>
            <div class="addCart">Add to Cart</div> 
            `
        )
}).join('')
};
displayItem(categories);
    