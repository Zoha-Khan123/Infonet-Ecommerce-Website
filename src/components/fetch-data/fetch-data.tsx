import { useEffect, useState } from "react";
import client from "../../../sanityClient";
import { urlFor } from "../../../lib/image";

import { useNavigate } from "react-router";
import renderStars from "../stars/stars";

export interface Product {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
  id: number;
  category: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

export default function FetchData() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]); // State to store products

  // Fetch products from Sanity
  async function fetchProducts() {
    const query = `
      *[_type == "product"] {
        title,
        image {
          asset -> {
            _id,
            url
          }
        },
        id,
        category,
        price,
        description,
        rating{
          rate,
          count
        },
      }
    `;

    const products = await client.fetch(query);
    setProducts(products); // Set the fetched products to state
  }

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means it will run only once after the first render

  return (
    <div className="flex">
      <h1 className="products-heading">Products</h1>
      <div className="products-container">
        {products.map((item) => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => navigate(`/${item.id}`)}
          >
            <div className="image-container">
              <img
                src={urlFor(item.image).url()}
                alt={item.title}
                className="product-image"
              />
            </div>
            <div className="product-details">
              <h1 className="product-title">{item.title.slice(0, 20)}</h1>
              <h2 className="product-category">
                {item.category.toUpperCase()}
              </h2>
              <p className="product-price">${item.price}</p>
              <p>{item.description.slice(0, 70)}</p>
              <div className="rating">
                <span>{renderStars(item.rating.rate)}</span>
                <span className="rating-count">
                  ({item.rating.count} reviews)
                </span>
              </div>
            </div>
            <button className="product-button">Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
