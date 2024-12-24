"use client";
import { useState, useEffect, JSX } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import image1 from "@/public/image1.jpeg";
import image2 from "@/public/image2.jpeg";
import image3 from "@/public/image3.jpeg";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageData {
  src: StaticImageData;
}

const images: ImageData[] = [
  { src: image1 },
  { src: image2 },
  { src: image3 },
];

export default function ImageSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!isHovered && !isClicked) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, isClicked]);

  const openModal = (): void => {
    setIsModalOpen(true);
    setIsClicked(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setIsClicked(false);
  };

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto mt-4">
        <div
          className="relative w-full h-full overflow-hidden rounded-xl group"
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={images[currentIndex].src}
            alt={`Slider Image ${currentIndex + 1}`}
            layout="intrinsic" // Use intrinsic to maintain original aspect ratio
            className="rounded-xl cursor-pointer"
            onClick={openModal} // Open modal on click
/>
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          onClick={prevSlide}
        >
          <ChevronLeft className="text-white" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          onClick={nextSlide}
        >
          <ChevronRight className="text-white" />
        </button>
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-10 mx-1 ${
                index === currentIndex
                  ? "bg-[#beff46] rounded-xl"
                  : "bg-gray-300 rounded-xl"
              } transition-all duration-500 ease-in-out`}
            ></div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
              onClick={closeModal}
            >
              <X className="text-white" />
            </button>
            <Image
              src={images[currentIndex].src}
              alt={`Modal Image ${currentIndex + 1}`}
              width={1200}
              height={800}
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
