import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, selectAllGalleries } from "../store/galleries/slice";
import Galleries from "../services/Galleries";
import { selectSearchterm } from "../store/galleries/selector";
import AppGalleryRow from "./AppGalleryRow";
import Footer from "../partials/Footer";
import { useLocation, useParams } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";

export default function AppGalleriesComponent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const galleriesData = useSelector(selectAllGalleries);
  const searchTerm = useSelector(selectSearchterm);
  const [perPage, setPerPage] = useState(10);

  const handleGalleries = async (params) => {
    if (location.pathname === "/my-galleries") {
      const response = await Galleries.getMyGalleries(params);
      dispatch(getAll(response.data));
    } else if (location.pathname === `/authors/${id}`) {
      const response = await Galleries.getAuthorsGalleries(params, id);
      dispatch(getAll(response.data));
    } else {
      const response = await Galleries.getAll(params);
      dispatch(getAll(response));
    }
  };

  useEffect(() => {
    handleGalleries({
      perPage,
      searchTerm,
    });
  }, [perPage, searchTerm]);

  const handleNextPage = () => {
    setPerPage(perPage + 10);
  };
  return (
    <main>
      <div>
        <div className="">
          <SearchComponent />
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
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
            </div>
          </div>
          <div className="text-center">
            {galleriesData?.per_page < galleriesData?.total ? (
              <button
                className="btn btn-blue btn-secondary"
                onClick={handleNextPage}
              >
                Load more
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <Footer />
        <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
      </div>
    </main>
  );
}
