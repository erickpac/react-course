import { useId } from "react";
import { useFilters } from "../hooks/userFilters";
import "./Filters.css";

export function Filters() {
  const { filters, setFilters } = useFilters(); 
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: Number(e.target.value),
    }));
  };

  const handleChangeCategory = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Min price</label>
        <input
          id={minPriceFilterId}
          type="range"
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Smartphones</option>
        </select>
      </div>
    </section>
  );
}
