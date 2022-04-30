import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { getProducts, deleteProduct } from "../../redux/apiCalls";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.img}
              alt={params.row.title}
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row._id}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              onClick={() => deleteUserHandler(params.row._id)}
              className="productListDelete"
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        disableSelectionOnClick
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default ProductList;
