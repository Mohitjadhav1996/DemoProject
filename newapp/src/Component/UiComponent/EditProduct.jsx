import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { FormWrapper } from "../../Styles/ContainerStyle";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditProduct = () => {
  const { id } = useParams();
  const { products, setCurrentPage, setProducts } = useProduct();
  const navigate = useNavigate();

  const product = products?.find((product, index) => product.id ===parseInt(id));

  const formik = useFormik({
    initialValues: {
      brand: product?.brand || "",
      title: product?.title || "",
      price: product?.price || "",
      category: product?.category || "",
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

    // Submit function and Api call to update product
    onSubmit: async (values) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${parseInt(id)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const updatedProduct = await response.json();
          setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === parseInt(id) ? updatedProduct : p))
          );
          setCurrentPage(1);
          navigate("/products");
        } else {
          console.error("Failed to edit product");
        }
      } catch (error) {
        console.error("Error editing product:", error);
      }
    },
  });

  useEffect(() => {
    if (product) {
      formik.setValues({
        brand: product.brand || "",
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
      });
    }
  }, [product]);

  return (
    <FormWrapper>
      <div className="container">
        <h2>Edit Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="brand">
            Brand:
            <input
              type="text"
              id="brand"
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.brand && formik.errors.brand && (
              <div>{formik.errors.brand}</div>
            )}
          </label>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div>{formik.errors.title}</div>
            )}
          </label>
          <label htmlFor="price">
            Price:
            <input
              type="text"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <div>{formik.errors.price}</div>
            )}
          </label>
          <label htmlFor="category">
            category:
            <input
              type="text"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.category && formik.errors.category && (
              <div>{formik.errors.category}</div>
            )}
          </label>
          <Button type="submit" variant="contained">
            Edit Product
          </Button>
        </form>
      </div>
    </FormWrapper>
  );
};

export default EditProduct;
