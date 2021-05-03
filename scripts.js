"use strict";

import imagesRefs from "./gallery-items.js";

let ulRef = document.querySelector("ul");

imagesRefs.forEach(({ original }) => {
  ulRef.innerHTML += `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${original}" data-source="${original}"/></a></li>`;
});

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modalRef: document.querySelector(".lightbox"),
};

refs.gallery.addEventListener("click", ongalleryClick);

function ongalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  refs.modalRef.classList.add("is-open");
  let imageRef = document.querySelector(".lightbox__image");
  imageRef.src = event.target.src;

  const slides = document.querySelectorAll(".gallery__image");
  const arr = Array.from(slides);
  const prev = document.querySelector(".btn-prev");
  const next = document.querySelector(".btn-next");

  {
    let slideIndex = arr.indexOf(event.target);

    const activeSlide = (n) => {
      imageRef.src = slides[n].src;
    };

    const nextSlide = () => {
      if (slideIndex == slides.length - 1) {
        slideIndex = 0;
        activeSlide(slideIndex);
      } else {
        slideIndex++;
        activeSlide(slideIndex);
      }
    };

    const prevSlide = () => {
      if (slideIndex == 0) {
        slideIndex = slides.length - 1;
        activeSlide(slideIndex);
      } else {
        slideIndex--;
        activeSlide(slideIndex);
      }
    };

    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", prevSlide);
  }

  {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        refs.modalRef.classList.remove("is-open");
      }
    });

    let overlayRef = document.querySelector(".lightbox__overlay");
    overlayRef.addEventListener("click", () => {
      refs.modalRef.classList.remove("is-open");
    });
  }

  let btn = document.querySelector(".lightbox__button");
  btn.addEventListener("click", () => {
    refs.modalRef.classList.remove("is-open");
  });
}
