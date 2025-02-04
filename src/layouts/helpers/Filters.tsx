import { filters } from "@/stores/filters";
import { useStore } from "@nanostores/react";
import React from "react";

const Filters = () => {
  const $filterData = useStore(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filters.setKey("searchText", e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filters.setKey("orderBy", e.target.value as "name" | "level" | "rank");
  };

  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filters.setKey("orderDirection", e.target.value as "asc" | "desc");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar"
        value={$filterData.searchText}
        onChange={handleSearchChange}
      />

      <select value={$filterData.orderBy} onChange={handleOrderChange}>
        <option value="name">Nome</option>
        <option value="level">Level</option>
        <option value="rank">Rank</option>
      </select>

      <select
        value={$filterData.orderDirection}
        onChange={handleDirectionChange}
      >
        <option value="asc">Crescente</option>
        <option value="desc">Decrescente</option>
      </select>
    </div>
  );
};

export default Filters;
