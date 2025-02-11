import { filters } from "@/stores/filters";
import { useStore } from "@nanostores/react";
import {
  FaSortAmountDownAlt,
  FaSortAmountDown,
  FaFilter,
} from "react-icons/fa";
import React, { useState } from "react";

const Filters = () => {
  const $filterData = useStore(filters);

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filters.setKey("searchText", e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filters.setKey("orderBy", e.target.value as "name" | "level" | "rank");
  };

  const handleDirectionChange = () => {
    const newDirection = orderDirection === "asc" ? "desc" : "asc";
    setOrderDirection(newDirection);
    filters.setKey("orderDirection", newDirection);
  };

  return (
    <div className="flex flex-row justify-around items-center">
      <h4 className="flex flex-row gap-1">
        <FaFilter /> Filtros:
      </h4>
      <input
        type="text"
        className="sm:w-100 form-input md:w-1/4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-"
        placeholder="Buscar"
        value={$filterData.searchText}
        onChange={handleSearchChange}
      />

      <div className="flex md:w-1/4 justify-around">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="name"
            name="orderBy"
            value="name"
            checked={$filterData.orderBy === "name"}
            onChange={handleOrderChange}
          />
          <label htmlFor="name">Nome</label>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="level"
            name="orderBy"
            value="level"
            checked={$filterData.orderBy === "level"}
            onChange={handleOrderChange}
          />
          <label htmlFor="level">Level</label>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="rank"
            name="orderBy"
            value="rank"
            checked={$filterData.orderBy === "rank"}
            onChange={handleOrderChange}
          />
          <label htmlFor="rank">Rank</label>
        </div>
      </div>

      <button
        onClick={handleDirectionChange}
        className="flex gap-1 items-center w-[10%]"
      >
        {orderDirection === "asc" ? (
          <>
            <FaSortAmountDownAlt /> Crescente
          </>
        ) : (
          <>
            <FaSortAmountDown /> Decrescente
          </>
        )}
      </button>
    </div>
  );
};

export default Filters;
