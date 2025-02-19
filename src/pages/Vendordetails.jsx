import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Vendors.css";
import gorillaPackImg from "../assets/gorillapack.png"; // Vendor image

const vendorData = {
  gorillapack: {
    name: "Gorilla Pack Genetics",
    description: "Premium genetics for the best yields. Exclusive strains available now!",
    image: gorillaPackImg,
    products: [
      { name: "Frosty Ape Seeds", price: "500 $CLAIM", image: gorillaPackImg },
      { name: "Banana Punch Seeds", price: "750 $CLAIM", image: gorillaPackImg },
    ],
  }
};

const VendorDetails = () => {
  const { vendorId } = useParams();
  const vendor = vendorData[vendorId];

  if (!vendor) return <h2 className="vendors-title">Vendor not found.</h2>;

  return (
    <div className="vendors-container">
      <h1 className="vendors-title">{vendor.name}</h1>
      <p className="vendor-description">{vendor.description}</p>
      <div className="vendor-products">
        {vendor.products.map((product, index) => (
          <div key={index} className="vendor-product">
            <img src={product.image} alt={product.name} className="vendor-image" />
            <p>{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
      <Link to="/vendors" className="back-button">⬅ Back to Vendors</Link>
    </div>
  );
};

export default VendorDetails;
