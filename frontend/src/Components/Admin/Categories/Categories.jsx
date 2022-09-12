import React from "react";
import { useEffect } from "react";
import * as ReactRedux from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../../redux/actions/Categories/CategoryAction";

function Categories() {
  const dispatch = ReactRedux.useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { categories } = ReactRedux.useSelector(
    (state) => state.categoryReducer
  );

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {categories.length
          ? categories.map((cat) => (
              <Link to={`/admin/categories/detail/${cat.id}`} key={cat.id}>
                {cat.name}
              </Link>
            ))
          : "cargando"}
        <Link to={"/admin/categories/newcategory"}>Nueva Categoria</Link>
      </div>
    </div>
  );
}

export default Categories;
