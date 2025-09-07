import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/Category/actions';
import './_cat-nav.scss';
import { Link } from 'react-router-dom';

const CatNav = () => {
  const { categories, status, error } = useSelector(state => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (status === "Loading...") return <p>Loading categories...</p>;
  if (status === "Failed!") return <p>Error: {error}</p>;

  return (
    <div className="cat-nav-container container">
      <ul>
          <li className='list-items'>
                        <Link to="/"> Home </Link>
                    </li>
        {categories.length > 0 ? (
          categories
            .filter(cat => cat.parent_category_id === null) // ✅ only top-level
            .map(cat => (
              <li className="list-items" key={cat.id}>
                <a href="#">{cat.category}</a>
              </li>
            ))
        ) : (
          <li>No categories found</li>
        )}
      </ul>
    </div>
  );
};

export default CatNav;
