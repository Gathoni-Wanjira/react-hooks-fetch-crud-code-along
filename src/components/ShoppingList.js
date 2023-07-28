import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [items, setItems] = useState([]);
    

    function handleCategoryChange(category) {
        setSelectedCategory(category);
    }

    const itemsToDisplay = items.filter((item) => {
        if (selectedCategory === "All") return true;

        return item.category === selectedCategory;
    });

    function handleUpdateItem (updatedItem) {
        console.log(updatedItem);
       
            const updatedItems = items.map((item) => {
              if (item.id === updatedItem.id) {
                return updatedItem;
              } else {
                return item;
              }
            });
            setItems(updatedItems);

    
    }
    


    function fetchfunction() {
        console.log("jhgf")
        fetch("http://localhost:4000/items")
            .then(res => res.json())
            .then(items => {
                console.log(items)
               setItems(items);

            })
    }

    useEffect(() => {
        fetchfunction();
        
    },[])

function handleUpdate (newItem){

    setItems([...items, newItem])
}

    return (
        <div className="ShoppingList">
            <ItemForm handleUpdate = {handleUpdate}/>
            <Filter
                category={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            <ul className="Items">
                {itemsToDisplay.map((item) => (
                    <Item handleUpdateItem = {handleUpdateItem} key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
