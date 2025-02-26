import { filters } from "@/stores/filters";
import React, { useState } from "react";
import { useStore } from "@nanostores/react";

type Item = {
  id: string;
  data: {
    title: string;
    meta_title: string;
    description: string;
    rank: string;
    type: string;
    name: string;
    recipe_img: string;
    level: number;
    craft_time: number;
    value_npc: number;
    result: number;
    ingredients: {
      name: string;
      quantity: number;
      item_img: string;
      value_npc: number;
    }[];
    draft: false;
  };
  filePath: string;
  digest: string;
  deferredRender: boolean;
  collection: string;
};

const rankOrder: Record<string, number> = {
  S: 6,
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};

const ITEMS_PER_PAGE = 30;

const ItemList = ({ itens }: { itens: Item[] }) => {
  const filterData = useStore(filters);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Aplica os filtros nos itens
  const filteredItems = itens.filter((item) => {
    const searchText = filterData.searchText?.toString().toLowerCase() || "";
    const itemTitle = item.data.name
      ? item.data.name.toString().toLowerCase()
      : "";

    return itemTitle.includes(searchText);
  });

  // Ordena os itens
  const sortedItems = [...filteredItems].sort((a, b) => {
    const orderFactor = filterData.orderDirection === "asc" ? 1 : -1;

    if (filterData.orderBy === "name") {
      return orderFactor * a.data.name.localeCompare(b.data.name);
    }
    if (filterData.orderBy === "level") {
      return orderFactor * (a.data.level - b.data.level);
    }
    if (filterData.orderBy === "rank") {
      return (
        orderFactor *
        (rankOrder[a.data.rank.toUpperCase()] -
          rankOrder[b.data.rank.toUpperCase()])
      );
    }

    return 0;
  });

  // Itens visíveis na página
  const visibleItems = sortedItems.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center">
      <div className="row w-full">
        {visibleItems.map((craft, i) => (
          <div key={i} className="mb-14 md:col-4 ">
            <div className="flex flex-col items-stretch justify-center rounded h-full bg-theme-light p-4 text-center dark:bg-darkmode-theme-light">
              <a href={`/${craft.data.type}/${craft.id}`}>
                {craft.data.recipe_img && (
                  <img
                    className="mx-auto mb-3 mt-3 h-14"
                    src={craft.data.recipe_img}
                    alt={craft.data.name}
                    width={56}
                    height={56}
                  />
                )}
              </a>
              <h5 className="mb-3">
                <a href={`/${craft.data.type}/${craft.id}`}>
                  {craft.data.name}
                </a>
              </h5>
              <div className="flex flex-row justify-around mb-2">
                <h6>Rank: {craft.data.rank.toUpperCase()}</h6>
                <h6>Level: {craft.data.level}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < sortedItems.length && (
        <button
          className="btn btn-primary"
          onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
        >
          Carregar mais
        </button>
      )}
    </div>
  );
};

export default ItemList;
