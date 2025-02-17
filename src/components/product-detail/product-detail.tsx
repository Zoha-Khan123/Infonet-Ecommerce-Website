import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Product } from "../fetch-data/fetch-data";
import client from "../../../sanityClient";
import { urlFor } from "../../../lib/image";
import renderStars from "../stars/stars";
import "./product-detail.css";
import { ColorRing } from "react-loader-spinner";
import { CartContextValue } from "../cart-context/cart-context";

const ProductDetail = () => {

 // ================= Context Api ===================
 const cartContextValue = useContext(CartContextValue);
  const {addToCart} = cartContextValue

  
  const params = useParams();
  const id = Number(params.id);
  console.log(id);

  const navigate = useNavigate();
  const [dynamicProduct, setDynamicProduct] = useState<Product[]>([]);
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);
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
        price,
        category,
        price,
        description,
        rating{
          rate,
          count
        },
      }
    `;

    // Fetch all products from Sanity
    const products = await client.fetch(query);

    // Find the dynamic product based on the id
    const dynamicProduct = products.filter(
      (product: Product) => product.id === id
    );
    setDynamicProduct(dynamicProduct);

    // Find related products based on category of the dynamic product
    if (dynamicProduct.length > 0) {
      const category = dynamicProduct[0].category;

      // Find all products with the same category but excluding the current dynamic product
      const related = products.filter(
        (product: Product) => product.category === category && product.id !== id
      );
      setRelatedProduct(related);
    }

    setLoading(false); // Set loading to false after data is fetched
  }

  useEffect(() => {
    // Smooth scroll to the top
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Enables smooth scrolling effect
      });
    }, 100); // Small delay to ensure component re-renders properly
    fetchProducts();
  }, [id]); // Re-run the fetch whenever the `id` changes

  return (
    <>
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
          {/* =================== Detail Page  =================== */}
          <div className="detail-page">
            <h1>Detail Page</h1>
            <div className="detail-products-container">
              {dynamicProduct?.map((item) => {
                return (
                  <div key={item.id} className="detail-product-card">
                    <div className="detail-image-container">
                      <img
                        src={urlFor(item.image).url()}
                        alt={item.title}
                        className="detail-product-image"
                      />
                    </div>
                    <div className="detail-product-details">
                      <h1 className="detail-product-title">
                        {item.title.slice(0, 20)}
                      </h1>
                      <h2 className="detail-product-category">
                        {item.category.toUpperCase()}
                      </h2>
                      <p className="detail-product-price">${item.price}</p>
                      <p className="product-quantity">Quantity:{item.quantity}</p>
                      <p>{item.description.slice(0, 270)}</p>
                      <div className="rating">
                        <span>{renderStars(item.rating.rate)}</span>
                        <span className="rating-count">
                          ({item.rating.count} reviews)
                        </span>
                      </div>
                      <div className="add-to-cart" onClick={()=>addToCart(item)}>
                      <button className="detail-product-button product-button">
                        Add to cart
                      </button>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================== Related Products  =================== */}
          <div className="related-page">
            <h1>Related Products</h1>
            <div className="products-container">
              {relatedProduct?.length > 0 ? (
                relatedProduct.map((item) => (
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
                      <p className="product-quantity">Quantity:{item.quantity}</p>
                      <p>{item.description.slice(0, 70)}</p>
                      <div className="rating">
                        <span>{renderStars(item.rating.rate)}</span>
                        <span className="rating-count">
                          ({item.rating.count} reviews)
                        </span>
                      </div>
                      <div className="add-to-cart" onClick={()=>addToCart(item)}>
                      <button className="product-button">Add to cart</button>
                    </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;