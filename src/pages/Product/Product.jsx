import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Publish } from "@mui/icons-material";

import Chart from "../../components/Chart/Chart";

import "./Product.css";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";

const defaultFormFields = {
  title: "",
  desc: "",
  price: "",
  img: "",
};

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, desc, price, img } = formFields;
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => a._id - b._id);
        list.map((item) =>
          setPStats((prevState) => [
            ...prevState,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  useEffect(() => {
    setFormFields({
      title: product.title,
      desc: product.desc,
      price: product.price,
      img: product.img,
    });
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!title.trim().length || !desc.trim().length || +price <= 0) return;

    updateProduct(productId, formFields, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/new-product">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sale:</span>
              <span className="productInfoValue">1234</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form onSubmit={submitHandler} className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              value={desc}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button type="submit" className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
