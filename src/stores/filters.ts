import { map } from "nanostores";

export type FilterData = {
  searchText: string;
  orderBy: "name" | "rank" | "level";
  orderDirection: "asc" | "desc";
  exclude: string[];
};

export const filters = map<FilterData>({
  searchText: "",
  orderBy: "rank",
  orderDirection: "asc",
  exclude: [],
});
