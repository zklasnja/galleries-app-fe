import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../store/galleries/slice";
import Galleries from "../services/Galleries";
import { selectAllGalleries } from "../store/galleries/slice";
import { selectSearchterm } from "../store/galleries/selector";
import AppGalleryRow from "./AppGalleryRow";

export default function AppGalleriesComponent() {
  const dispatch = useDispatch();
  const galleriesData = useSelector(selectAllGalleries);
  const searchTerm = useSelector(selectSearchterm);
  const [page, setPage] = useState(1);

  const handleGalleries = async (params) => {
    const response = await Galleries.getAll();
    dispatch(getAll(response));
  };

  useEffect(() => {
    handleGalleries({
      page,
      searchTerm,
    });
  }, [page, searchTerm]);
  return (
    <div>
      <main className="container">
        {galleriesData?.data?.length ? (
          galleriesData?.data?.map((gallery) =>
            gallery?.images?.length ? (
              <AppGalleryRow key={gallery.id} {...gallery} />
            ) : (
              ""
            )
          )
        ) : (
          <p>There are no result found</p>
        )}
      </main>

      <footer className="text-muted py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
          <p className="mb-1">
            Album example is &copy; Bootstrap, but please download and customize
            it for yourself!
          </p>
          <p className="mb-0">
            New to Bootstrap? <a href="/">Visit the homepage</a> or read our{" "}
            <a href="../getting-started/introduction/">getting started guide</a>
            .
          </p>
        </div>
      </footer>

      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}
