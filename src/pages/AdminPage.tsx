import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>(""); // State for success message

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: editingProduct?.name || "",
      price: editingProduct?.price || 0,
      image: editingProduct?.image || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .required("Product price is required")
        .min(0, "Price must be greater than 0"),
      image: Yup.string()
        .url("Image URL is invalid")
        .required("Image URL is required"),
    }),
    onSubmit: (values) => {
      if (editingProduct) {
        handleEditProduct(values);
      } else {
        handleAddProduct(values);
      }
    },
  });

  const handleAddProduct = (product: Omit<Product, "id">) => {
    axios
      .post("http://localhost:3000/products", product)
      .then((response) => {
        setProducts([...products, response.data]);
        setSuccessMessage("Product added successfully!"); // Show success message
        formik.resetForm(); // Reset form
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const handleEditProduct = (product: Omit<Product, "id">) => {
    if (editingProduct) {
      axios
        .put(`http://localhost:3000/products/${editingProduct.id}`, product)
        .then((response) => {
          setProducts(
            products.map((p) =>
              p.id === editingProduct.id ? response.data : p
            )
          );
          setEditingProduct(null);
          setSuccessMessage("Product updated successfully!"); // Show success message
        })
        .catch((error) => console.error("Error updating product:", error));
    }
  };

  const handleDeleteProduct = (id: number) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => setProducts(products.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleSelectProductForEdit = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div className="admin-page container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Add/Edit product form */}
      <form onSubmit={formik.handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="border rounded p-2 w-full"
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="border rounded p-2 w-full"
          />
          {formik.touched.price && formik.errors.price && (
            <div>{formik.errors.price}</div>
          )}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formik.values.image}
            onChange={formik.handleChange}
            className="border rounded p-2 w-full"
          />
          {formik.touched.image && formik.errors.image && (
            <div>{formik.errors.image}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {editingProduct ? "Edit Product" : "Add Product"}
        </button>
      </form>

      {/* Product list */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleSelectProductForEdit(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
