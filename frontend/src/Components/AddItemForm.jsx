import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCreateItemMutation } from "../redux/api/items";

import { toast } from "react-toastify";

const AddItemForm = () => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    date: new Date(),
  });

  const navigate = useNavigate();

  const [createItem, { error: itemCreationError }] = useCreateItemMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!item.name || !item.description || !item.date) {
        toast.error("Please fill all required fields");
        return;
      }

      const newItem = await createItem({
        name: item.name,
        description: item.description,
        date: item.date,
      }).unwrap();

      if (newItem) {
        toast.success("Item created successfully !!");
        navigate(-1);
      } else {
        toast.error("unable to add Item");
      }

      setItem({ name: "", description: "" });
    } catch (error) {
      console.error("Failed to create Item :", itemCreationError);
      toast.error(`Failed to create Item : ${itemCreationError?.message}`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        onClick={handleGoBack}
        className="bg-black text-gray-400 rounded px-2 py-1 mb-5 italic"
      >
        back
      </button>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}
      >
        <p>Enter Item Details</p>
        <TextField
          label="Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Description"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          variant="outlined"
          margin="normal"
          multiline
        />

        <TextField
          label="Date"
          type="date"
          value={item.date}
          onChange={(e) => setItem({ ...item, date: e.target.value })}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 16 }}
        >
          Add Item
        </Button>
      </form>
    </>
  );
};

export default AddItemForm;
