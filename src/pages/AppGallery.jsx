import React from "react";
import AppGalleriesComponent from "../components/AppGalleriesComponent";
import SearchComponent from "../components/SearchComponent";

export default function AppGallery() {
  return (
    <div>
      <SearchComponent />
      <AppGalleriesComponent />
    </div>
  );
}
