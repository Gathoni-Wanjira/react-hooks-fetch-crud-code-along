import { response } from "msw";
import React, { useState } from "react";

function ItemForm({ handleUpdate }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Dairy");




    function postNewItem() {

        const newPost = {
            name: name,
            category: category,
            isInCart: false
        }



        fetch("http://localhost:4000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify(newPost)


        })
            .then(res => res.json())
            .then(postedItem => {
                console.log(postedItem)
                handleUpdate(newPost)

            })
    }
    function handlePost(e) {
        e.preventDefault();
        postNewItem();

    }


    return (

        < form className="NewItem" onSubmit={handlePost} >
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label>
                Category:
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Dessert">Dessert</option>
                </select>
            </label>

            <button type="submit">Add to List</button>
        </form >
    );
}

export default ItemForm;
