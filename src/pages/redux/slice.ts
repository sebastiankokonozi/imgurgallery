import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ImgurImage {
  id: string;
  title: string;
  link: string;
  ups: number;
  downs: number;
  viral: boolean;
  description?:string;
}

interface InitialStateProps {
  images: ImgurImage[];
  gallerySelection: string;
  includeViral: boolean;
  selectedImage?: ImgurImage;
}

const initialState: InitialStateProps = {
  images: [],
  gallerySelection: "hot",
  includeViral: false,
  selectedImage: undefined,
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<ImgurImage[]>) {
      state.images = action.payload;
    },
    setGallerySelection(state, action: PayloadAction<string>) {
      state.gallerySelection = action.payload;
    },
    setIncludeViral(state, action: PayloadAction<boolean>) {
      state.includeViral = action.payload;
    },
    setSelectedImage(state, action: PayloadAction<ImgurImage | undefined>) {
      state.selectedImage = action.payload;
    },
  },
});

export const {
  setImages,
  setGallerySelection,
  setIncludeViral,
  setSelectedImage,
} = slice.actions;
export default slice.reducer;
