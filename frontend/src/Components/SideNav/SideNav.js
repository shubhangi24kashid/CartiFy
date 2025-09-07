import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCategories } from '../../Redux/Category/actions';
import { filterProducts, filterByPrice } from '../../Redux/Products/productSlice';
import './_side-nav.scss';

const SideNav = () => {
  // Safe default values
  const { categories = [], status = '', error = '' } = useSelector(state => state.categories || {});
  const fetchedProductData = useSelector(state => state.product) || { products: [], status: '' };

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [minPriceLimit, setMinPriceLimit] = useState(10);
  const [maxPriceLimit, setMaxPriceLimit] = useState(130);

  // Fetch categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Set products when Redux product state updates
  useEffect(() => {
    if (fetchedProductData?.products) setProducts(fetchedProductData.products);
  }, [fetchedProductData?.status]);

  // Filter products by category
  const filterData = (selectedCategory) => {
    const payload = { selectedCategory, products };
    dispatch(filterProducts(payload));
  };

  // Handle min/max slider change
  const setPriceLimit = (e, stateFlag) => {
    if (stateFlag === "max") setMaxPriceLimit(Number(e.target.value));
    else if (stateFlag === "min") setMinPriceLimit(Number(e.target.value));
  };

  // Apply price filter
  const applyPriceFilter = () => {
    const payload = { products, minPriceLimit, maxPriceLimit };
    dispatch(filterByPrice(payload));
  };

  if (status === "Loading...") return <p>Loading...</p>;
  if (status === "Failed!") return <p>Error: {error}</p>;

  return (
    <div className="side-nav">
      {/* Category Section */}
      <div className="section-title">
        <h3>Category</h3>
      </div>

      <div className="accordion">
        {categories
          ?.filter(cat => cat.parent_category_id === null)
          .map((parentCat, key) => {
            const subCategories = categories?.filter(sub => sub.parent_category_id === parentCat.id);
            return (
              <div className="accordion-item individual-category" key={parentCat.id}>
                <div className="accordion-header">
                  <button
                    className="accordion-button"
                    data-bs-target={"#collapse" + key}
                    data-bs-toggle="collapse"
                  >
                    <div className="category-title">
                      <a href="#">{parentCat.category}</a>
                    </div>
                  </button>
                </div>

                <div className="accordion-collapse collapse show" id={"collapse" + key}>
                  <div className="accordion-body">
                    <ul>
                      {subCategories?.length > 0 ? (
                        subCategories.map(sub => (
                          <li className="sub-items" key={sub.id}>
                            <a href="#" onClick={() => filterData(sub)}>{sub.category}</a>
                          </li>
                        ))
                      ) : (
                        <li className="sub-items">No subcategories</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Price Filter Section */}
      <div className="price-filter-container mt-4">
        <div className="section-title">
          <h3>Filter By Price</h3>
        </div>

        <div className="price-slider">
          <label>Min: {minPriceLimit}</label>
          <input
            type="range"
            className="form-range"
            min={10}
            max={130}
            step={10}
            value={minPriceLimit}
            onChange={(e) => setPriceLimit(e, "min")}
          />
        </div>

        <div className="price-slider">
          <label>Max: {maxPriceLimit}</label>
          <input
            type="range"
            className="form-range"
            min={10}
            max={130}
            step={10}
            value={maxPriceLimit}
            onChange={(e) => setPriceLimit(e, "max")}
          />
        </div>

        <button className="btn btn-outline-dark mt-3" onClick={applyPriceFilter}>
          Apply Price Filter
        </button>
      </div>
    </div>
  );
};

export default SideNav;
