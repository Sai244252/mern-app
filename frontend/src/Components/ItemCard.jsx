import React, { useState } from "react";
import EditItemForm from "./EditItemForm";
import {
  useEditItemMutation,
  useDeleteItemMutation,
  useGetItemsQuery,
} from "../redux/api/items";
import { toast } from "react-toastify";
import ConfirmDeletePopup from "../Containers/ConfirmDelete";

const ItemCard = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: items, refetch } = useGetItemsQuery();

  const [updateItem] = useEditItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const handleOnEdit = (item) => {
    setIsEditing(true);
  };

  const handleUpdate = async (updatedItem) => {
    if (!updatedItem.name || !updatedItem.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const result = await updateItem({
        id: updatedItem._id,
        data: updatedItem,
      }).unwrap();

      if (result) {
        toast.success(`${result?.name}: item updated successfully`);
        refetch();
      } else {
        toast.error("unable to update the item");
      }
    } catch (error) {
      toast.error(error?.message);
    }

    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteItem({ id: item._id });
      toast.success("Deleted Successfully !!");
      refetch();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
    setIsDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-gray-300 text-xs">Date : {item?.date}</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleOnEdit}
          className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
      {isEditing && (
        <EditItemForm
          item={item}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
      {isDeleteDialogOpen && (
        <ConfirmDeletePopup
          open={isDeleteDialogOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ItemCard;
