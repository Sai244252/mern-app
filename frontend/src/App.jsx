import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Users from "./pages/Users";
import Items from "./pages/Items";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ItemDetail from "./Components/ItemDetail";
import AddItemForm from "./Components/AddItemForm";
import EditItemForm from "./Components/EditItemForm";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route index={true} path="/items" element={<Items />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/create-item/" element={<AddItemForm />} />
          <Route path="/edit-item/:id" element={<EditItemForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
