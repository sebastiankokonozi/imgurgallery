import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ImageGrid.css";
import { useAppDispatch, useAppSelector } from "../pages/hooks/reduxHooks";
import {
  ImgurImage,
  setGallerySelection,
  setImages,
  setIncludeViral,
  setSelectedImage,
} from "../pages/redux/slice";
import upvotes from "../images/upvotes.svg";
import downvotes from "../images/downvotes.svg";
import { NavHeader } from "./NavHeader";

const ImageGrid: React.FC = () => {
  const { images, includeViral, gallerySelection, selectedImage } =
    useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const handleImageClick = (image: ImgurImage) => {
    console.log("clicked image");
    dispatch(setSelectedImage(image));
  };

  const closeModal = () => {
    dispatch(setSelectedImage(undefined));
  };

  useEffect(() => {
    const viralParam = includeViral ? "viral" : "time";
    const accessToken = "9d3a8b7b1df0382e64b64087115f69f33f9614e4";

    axios
      .get(
        `https://api.imgur.com/3/gallery/${gallerySelection}/${viralParam}/0.json`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        let responseData = response.data;

        console.log("responseData", responseData);

        if (
          !responseData ||
          !responseData.data ||
          responseData.data.length === 0
        ) {
          console.log("No images found in the response.");
          return;
        }

        if (
          !responseData ||
          !responseData.data ||
          responseData.data.length === 0
        ) {
          console.log("No images found in the response.");
          return;
        }

        const allItems = responseData.data;

        // Filter out albums and only keep images
        const imgurImages = allItems.filter(
          (item: any) =>
            item.images &&
            item.images.length > 0 &&
            item.images[0].type === "image/jpeg"
        );

        console.log("imgurImages", imgurImages);

        if (imgurImages.length === 0) {
          console.log("No images left after filtering.");
          return;
        }

        // Extract the relevant image data
        const formattedImages = imgurImages.map((item: any) => ({
          id: item.images[0].id,
          title: item.title,
          link: item.images[0].link,
          ups: item.ups,
          downs: item.downs,
          viral: item.in_most_viral || false,
        }));

        console.log("formattedImages", formattedImages);

        dispatch(setImages(formattedImages));
      })
      .catch((error) => {
        console.error("Error fetching images from Imgur API:", error);
      });
  }, [gallerySelection, includeViral]);

  return (
    <div className="content">
      <NavHeader />
      <div className="only-viral">
        <label>
          Include Viral Images:
          <input
            type="checkbox"
            checked={includeViral}
            onChange={(e) => dispatch(setIncludeViral(e.target.checked))}
          />
        </label>
      </div>
      <div className="image-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-item"
            onClick={() => handleImageClick(image)}
          >
            <img src={image.link} alt={image.title} loading="lazy" />

            <p>{image.title}</p>
            <div className="scores">
              <div className="scores_wrapper">
                <img src={upvotes} className="up-down" alt="Upvotes" />
                {image.ups}
              </div>
              <div className="scores_wrapper">
                <img src={downvotes} className="up-down" alt="Downvotes" />{" "}
                {image.downs}
              </div>
            </div>
          </div>
        ))}
        {!!selectedImage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                x
              </span>
              <img
                className="modal-img"
                src={selectedImage.link}
                alt={selectedImage.title}
              />
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <p>Upvotes: {selectedImage.ups}</p>
              <p>Downvotes: {selectedImage.downs}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
