// src/pages/product-listing/ProductListing.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/product-listing/Breadcrumb";
import ListingTopBar from "../../components/product-listing/ListingTopBar";
import FilterSidebar from "../../components/product-listing/FilterSidebar";
import ProductListItem from "../../components/product-listing/ProductListItem";
import ProductGridCard from "../../components/product-listing/ProductGridCard";
import Pagination from "../../components/product-listing/Pagination";

const emptyFilters = { categories: [], brands: [], features: [], priceMin: "", priceMax: "", rating: 0 };

const ProductListing = () => {
  const { items: products } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("featured");
  const [verified, setVerified] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = view === "grid" ? 12 : 6;

  const [filters, setFilters] = useState(emptyFilters);

  useEffect(() => {
    const newFilters = { ...emptyFilters };
    if (urlCategory) newFilters.categories = [urlCategory];
    setFilters(newFilters);
    setPage(1);
  }, [urlCategory]);

  const toggleFilter = (group, value) => {
    setPage(1);
    setFilters((f) => ({
      ...f,
      [group]: f[group].includes(value) ? f[group].filter((v) => v !== value) : [...f[group], value],
    }));
  };

  const applyPrice = (min, max) => {
    setPage(1);
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));
  };

  const clearAll = () => {
    setPage(1);
    setFilters(emptyFilters);
    setVerified(false);
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!filters.categories.length || filters.categories.includes(p.category)) &&
        (!filters.brands.length || filters.brands.includes(p.brand)) &&
        (!filters.features.length || filters.features.some((t) => (p.tags || []).includes(t))) &&
        (filters.priceMin === "" || p.price >= +filters.priceMin) &&
        (filters.priceMax === "" || p.price <= +filters.priceMax) &&
        (filters.rating === 0 || p.rating >= filters.rating)
    );

    if (urlSearch) {
      const term = urlSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(term))
      );
    }

    if (sort === "top-rated") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, filters, sort, urlSearch]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const chips = [
    ...filters.categories.map((value) => ({ group: "categories", value })),
    ...filters.brands.map((value) => ({ group: "brands", value })),
    ...filters.features.map((value) => ({ group: "features", value })),
  ];

  const changeView = (v) => {
    setView(v);
    setPage(1);
  };

  return (
    <div className="max-w-[1340px] mx-auto px-4 mt-4 flex flex-col gap-4">
      <Breadcrumb items={["Home", "Catalog", urlSearch || urlCategory || "All products"]} />

      {urlSearch && (
        <div className="bg-primary-light border border-primary/20 text-primary text-sm rounded-lg px-4 py-2">
          Search results for: <b>"{urlSearch}"</b>
          <button
            onClick={() => setSearchParams(urlCategory ? { category: urlCategory } : {})}
            className="ml-2 text-xs underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      )}

      <ListingTopBar
        count={filtered.length}
        view={view} onViewChange={changeView}
        sort={sort} onSortChange={setSort}
        verified={verified} onVerifiedChange={() => setVerified((v) => !v)}
        onToggleFilters={() => setShowFilters((s) => !s)}
        chips={chips} onRemoveChip={toggleFilter} onClearAll={clearAll}
      />

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-60 shrink-0 bg-white border border-gray-200 rounded-lg px-4`}>
          <FilterSidebar
            products={products}
            filters={filters}
            onToggle={toggleFilter}
            onPriceApply={applyPrice}
            onRating={(r) => { setPage(1); setFilters((f) => ({ ...f, rating: r })); }}
          />
        </aside>

        <div className="w-full flex-1 flex flex-col gap-3">
          {paginated.length === 0 ? (
            <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg p-6 text-center">
              No products found for these filters.
            </p>
          ) : view === "list" ? (
            paginated.map((p) => <ProductListItem key={p.id} product={p} />)
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {paginated.map((p) => <ProductGridCard key={p.id} product={p} />)}
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          <div className="lg:hidden mt-2">
            <h3 className="text-base font-semibold text-gray-900 mb-3">You may also like</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {products.slice(0, 6).map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-3 w-36 shrink-0">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-24 object-contain mb-2" />
                  <p className="text-sm font-bold text-gray-900">${p.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;