import { useContext, useEffect, useState } from "react";
import client from "../../../sanityClient";
import { urlFor } from "../../../lib/image";
import { useNavigate } from "react-router";
import renderStars from "../stars/stars";
import { ColorRing } from "react-loader-spinner";
import { CartContextValue } from "../cart-context/cart-context";
import { IconNode } from "lucide";

export interface Product {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
  id: number;
  quantity:number,
  category: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  },
  Trash?:IconNode;
}

export default function FetchData() {
    // ================= Context Api ===================
    const cartContextValue = useContext(CartContextValue);
    const {addToCart} = cartContextValue
  

    // ================ Navigation =================
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading

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
        quantity,
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
    setLoading(false); // Set loading to false after data is fetched
  }

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means it will run only once after the first render

  return (
    <div className="flex">
      {loading ? (
       <div className="w-full h-screen flex justify-enter items-center">
         <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#333','#333','#333','#333','#333']}
          />
       </div>
      ) : (
        <>
          <h1 className="products-heading">Products</h1>
          <div className="products-container">
            {products.map((item) => (
              <div
                key={item.id}
                className="product-card"
                // onClick={() => navigate(`/${item.id}`)}
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
                <div className="add-to-cart" onClick={()=>addToCart({...item,quantity:1})}>
                <button className="product-button">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}