import React, { useEffect } from "react";
import ItemList from "../Components/ItemList";
import { Link } from "react-router-dom";
import { useGetItemsQuery } from "../redux/api/items";

const Items = () => {
  // const items = [
  //   { id: 1, name: "Item 1", description: "Description for Item 1" },
  //   { id: 2, name: "Item 2", description: "Description for Item 2" },
  //   { id: 3, name: "Item 3", description: "Description for Item 3" },
  // ];

  const { data: items, refetch, isLoading } = useGetItemsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="p-4">
      <div className="flex space-x-96">
        <h2 className="text-2xl font-bold mb-4">Items</h2>
        <Link
          to="/create-item/"
          className="text-sm italic mb-4 bg-black text-white rounded p-2 cursor-pointer"
        >
          Add Item
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : items && items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default Items;
