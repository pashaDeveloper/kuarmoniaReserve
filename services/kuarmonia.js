

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
console.log("MongoDB URI:", process.env.ATLAS_URI);
console.log("DB Name:", process.env.DB_NAME);
console.log(process.env);

export const kuarmoniaApi = createApi({
  reducerPath: "kuarmonia",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  }),
  tagTypes: ["User", "Cart", "Rent", "Favorite", "Purchase", "Review","Category","Tag","CategoryDropdown","TagDropdown","Blog","Post","Gallery","Slide"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
