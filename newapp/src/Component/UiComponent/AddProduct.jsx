import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProduct } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../Styles/ContainerStyle";
import { Button } from "@mui/material";

const AddProduct = () => {
  const { setCurrentPage, setProducts } = useProduct();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      brand: "",
      title: "",
      price: "",
      quantity: "",
    },

    // Validation schema for form fields
    validationSchema: Yup.object({
      brand: Yup.string().required("Brand is required"),
      title: Yup.string().required("Title is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      category: Yup.string().required("Category is required"),
    }),

    // submit function and Api call to add product
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          setProducts((prevProducts) => [data, ...prevProducts]);
          setCurrentPage(1);
          navigate("/products");
          formik.resetForm();
        } else {
          console.error("Failed to add product");
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
  });

  return (
    <FormWrapper>
      <div className="container">
        <h2>Add Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
            />
            {formik.touched.brand && formik.errors.brand && (
              <div>{formik.errors.brand}</div>
            )}
          </label>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title && (
              <div>{formik.errors.title}</div>
            )}
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price && (
              <div>{formik.errors.price}</div>
            )}
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
            {formik.touched.category && formik.errors.category && (
              <div>{formik.errors.category}</div>
            )}
          </label>
          <Button type="submit" variant="contained">
            Add Product
          </Button>
        </form>
      </div>
    </FormWrapper>
  );
};

export default AddProduct;
