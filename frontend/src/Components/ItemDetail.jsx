import React from "react";
import { useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <button
        onClick={handleGoBack}
        className="bg-black text-gray-400 rounded px-2 py-1 italic"
      >
        back
      </button>
      {/* <h2 className="text-xl font-semibold mb-2">{item?.name}</h2>
      <p className="text-gray-600">{item?.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Created at: {item?.createdAt}
      </p>
      <p className="text-sm text-gray-500">Updated at: {item?.updatedAt}</p> */}
    </div>
  );
};

export default ItemDetail;
