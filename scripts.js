"use strict";

import imagesRefs from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modalRef: document.querySelector(".lightbox"),
  imageRef: document.querySelector(".lightbox__image"),
  prev: document.querySelector(".btn-prev"),
  next: document.querySelector(".btn-next"),
  overlayRef: document.querySelector(".lightbox__overlay"),
  btn: document.querySelector(".lightbox__button"),
  ulRef: document.querySelector("ul"),
};

class Gallery {
  constructor(elements, elementsRefs) {
    this.imagesRefs = elements;
    this.refs = elementsRefs;
  }

  newImagesOnPage() {
    imagesRefs.forEach(({ description, preview, original }) => {
      refs.ulRef.innerHTML += `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${original}" data-source="${preview}" alt="${description}"/>
      </a>
      </li>`;
    });
  }

  addListener() {
    refs.gallery.addEventListener("click", ongalleryClick);

    function ongalleryClick(event) {
      event.preventDefault();

      let slides = document.querySelectorAll(".gallery__image");
      let arr = Array.from(slides);

      if (event.target.nodeName !== "IMG") {
        return;
      }

      refs.modalRef.classList.add("is-open");
      refs.imageRef.src = event.target.src;

      {
        let slideIndex = arr.indexOf(event.target);

        const activeSlide = (n) => {
          refs.imageRef.src = slides[n].src;
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

        refs.next.addEventListener("click", nextSlide);
        refs.prev.addEventListener("click", prevSlide);

        window.addEventListener("keydown", (event) => {
          if (event.code === "ArrowRight") {
            nextSlide();
          }
        });

        window.addEventListener("keydown", (event) => {
          if (event.code === "ArrowLeft") {
            prevSlide();
          }
        });
      }

      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          refs.modalRef.classList.remove("is-open");
          document.body.style.overflow = "";
        }
      });

      refs.overlayRef.addEventListener("click", () => {
        refs.modalRef.classList.remove("is-open");
        document.body.style.overflow = "";
      });

      refs.btn.addEventListener("click", () => {
        refs.modalRef.classList.remove("is-open");
        document.body.style.overflow = "";
      });
      document.body.style.overflow = "hidden";
    }
  }
}

const gallery = new Gallery(imagesRefs, refs);

gallery.newImagesOnPage();
gallery.addListener();
