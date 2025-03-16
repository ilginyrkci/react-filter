import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceMin: '',
    priceMax: '',
    search: '',
    sort: 'priceLowToHigh',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
        setCategories([...new Set(data.products.map((product) => product.category))]);
        setBrands([...new Set(data.products.map((product) => product.brand))]);
      } catch (error) {
        console.error('Bir sorun oluştu', error);
      }
    };
  
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredProducts = products.filter((product) => {
    const inCategory = filters.category ? product.category === filters.category : true;
    const inBrand = filters.brand ? product.brand === filters.brand : true;
    const inPriceRange =
      (filters.priceMin ? product.price >= filters.priceMin : true) &&
      (filters.priceMax ? product.price <= filters.priceMax : true);
    const matchesSearch =
      (product.name && product.name.toLowerCase().includes(filters.search.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(filters.search.toLowerCase()));

    return inCategory && inBrand && inPriceRange && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === 'priceLowToHigh') return a.price - b.price;
    if (filters.sort === 'priceHighToLow') return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gelişmiş Ürün Filtreleme Sistemi</h1>
      <div className="flex gap-6 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Ara..."
          value={filters.search}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">Kategori</option>
          {categories.map((category, index) => (
            <option key={`category-${index}`} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">Marka</option>
          {brands.map((brand, index) => (
            <option key={`brand-${index}`} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="priceMin"
          placeholder="En düşük fiyat"
          value={filters.priceMin}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="priceMax"
          placeholder="En yüksek fiyat"
          value={filters.priceMax}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        />

        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        >
          <option value="priceLowToHigh">Fiyatı artan</option>
          <option value="priceHighToLow">Fiyatı azalan</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {sortedProducts.length === 0 ? (
          <div>Seçili filtrelere göre ürün bulunamadı</div>
        ) : (
          sortedProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="font-bold mt-2">${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
