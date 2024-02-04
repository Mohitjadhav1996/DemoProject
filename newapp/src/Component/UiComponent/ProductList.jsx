import React, { useState } from "react";
import { useProduct } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../Reusable/DialogBoxDelete";
import { Box, Button, Typography } from "@mui/material";
import SearchProduct from "./SearchProduct";
import {
  BroadcastLogTable,
  ContainerWrapper,
  ErrorComponent,
} from "../../Styles/ContainerStyle";
import { useAuth } from "./AuthContext";
import TemplateAPIERROR from "../../assets/TemplateAPIERROR.png";
const ProductList = () => {
  const { products, setProducts, currentPage, setCurrentPage } = useProduct();
  const [itemsPerPage] = useState(5);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dataid, setId] = useState();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Delete API call
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://dummyjson.com/products/${dataid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prev_products) =>
          prev_products.filter((product) => product.id !== dataid)
        );
        setDialogOpen(false);
        setCurrentPage(1);
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Navigate to edit product
  const handleEditProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };

  // Navigate to add product
  const handleAdd = () => {
    navigate(`/products/add`);
  };

  // Search API call
  const handleSearch = async (term) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${term}`
      );
      const data = await response.json();
      if (term !== "") {
        setProducts(data.products);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // logut functionality
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ContainerWrapper>
      <div className="title">
        <h2>Product List</h2>
        <Button onClick={handleLogout} variant="Outlined">
          Logout
        </Button>
      </div>
      <div className="search-class">
        <SearchProduct onSearch={handleSearch} />
        <Button onClick={handleAdd} variant="contained">
          Add Product
        </Button>
      </div>
      <BroadcastLogTable>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-head">Brand</th>
                <th className="table-head">Title</th>
                <th className="table-head">Price</th>
                <th className="table-head">Category</th>
                <th className="table-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length < 0 ? (
                <>
                  <ErrorComponent>
                    <Box>
                      <img src={TemplateAPIERROR} style={{}} />
                    </Box>
                    <Box className="err-content">
                      <Typography variant="h4">No Records Found</Typography>
                    </Box>
                  </ErrorComponent>
                </>
              ) : (
                <>
                  {currentProducts?.map((product) => (
                    <tr key={product.id}>
                      <td>{product.brand}</td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td className="button">
                        <Button
                          onClick={() => {
                            setDialogOpen(true);
                            setId(product.id);
                          }}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => handleEditProduct(product.id)}
                          variant="contained"
                          color="success"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </BroadcastLogTable>
      <div className="pagination">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>{currentPage}</span>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastProduct >= products.length}
        >
          Next
        </Button>
      </div>
      <DeleteConfirmationDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onDelete={handleDeleteProduct}
      />
    </ContainerWrapper>
  );
};

export default ProductList;
