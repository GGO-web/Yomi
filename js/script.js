$(window).on("load", function() {
   'use strict';

   // ==> Burger menu <==
   $(".burger").click(function(event) {
      event.preventDefault();
      $(this).toggleClass("burger--active");

      if (this.getAttribute("aria-expanded") == "true") 
         this.setAttribute("aria-expanded", "false");
      else this.setAttribute("aria-expanded", "true");

      $("body").toggleClass("body-lock");
      $(".menu").toggleClass("menu--active");
      $(".header").toggleClass("header--active");
   });
   // ==X Burger menu X==
   

   // ==> Smooth scrolling <==
   function smoothScroll() {
      const navBarLink = $("a, button");
      const navHeight = $('.header').outerHeight();

      navBarLink.click((event) => {
         const target = event.target;
         if (target.hasAttribute("data-scrollto")) {
            const data = target.dataset.scrollto;
            event.preventDefault();

            $(".burger").click();
            const elementOffset = $(data).offset().top;
            window.scroll(0, elementOffset - navHeight);
         }
      });
   }
   smoothScroll();
   // ==X Smooth scrolling X==


   // ==> Hover links <==
   function headerHoverLinks() {
      const navBar = $(".header");

      const navHeight = navBar.outerHeight();
      const navBarLinks = document.querySelectorAll(".menu__link");

      $(window).scroll(function () {
         const windowTop = $(window).scrollTop();

         // === active nav-menu link by scrolling ===
         for (let index = 0; index < navBarLinks.length; ++index) {
            const data = navBarLinks[index].dataset.scrollto;
            const elementOffset = $(data).offset().top;
            const elementHeight = $(data).outerHeight();

            if (windowTop + navHeight + 1 > elementOffset && elementOffset + elementHeight - navHeight - 1 > windowTop) {
               $(navBarLinks[index]).css("color", "#cee7ba");
            } else {
               $(navBarLinks[index]).css("color", "");
            }
         }
         // === /active nav-menu link by scrolling ===
      });
   }
   headerHoverLinks();
   // ==X Hover links X==


   // ==> Contacts-form <==
   const contactsFormInput = $(".contacts__form-input");
   contactsFormInput.on("focus", function () {
      const contactsFormLabel = $(this).prev();
      if ($(this).val().length === 0)
         contactsFormLabel.toggleClass("contacts__form-label--active");
   });
   contactsFormInput.on("focusout", function () {
      $(this).css("borderBottom", "2px solid #cecece");
      const contactsFormLabel = $(this).prev();
      if ($(this).val().length === 0)
         contactsFormLabel.removeClass("contacts__form-label--active");
   });

   function validName() {
      // ===> form name validation <===
      const contactsFormName = $("#contacts__form-name");
      const contactsFormName_Value = contactsFormName.val();
      let valid = true;

      if (contactsFormName_Value.length <= 2)
         valid = false;

      const namePattern = /^[\u0400-\u04FFa-zA-Z]+$/;
      if (!namePattern.test(contactsFormName_Value))
         valid = false;

      if (!valid) {
         contactsFormName.css("borderBottom", "2px solid #e63946");
      } else {
         contactsFormName.css("borderBottom", "2px solid #c4c4c4");
      }
      // ===X form name validation X===
      return valid;
   }

   function validTel() {
      // ===> form tel validation <===
      const contactsFormTel = $("#contacts__form-tel");
      const contactsFormTel_Value = contactsFormTel.val();
      let valid = true;

      if (contactsFormTel_Value.length < 12 || contactsFormTel_Value.length > 13)
         valid = false;

      const telPattern = /^\+?[0-9]+$/;
      if (!telPattern.test(contactsFormTel_Value))
         valid = false;

      if (!valid) {
         contactsFormTel.css("borderBottom", "2px solid #e63946");
      } else {
         contactsFormTel.css("borderBottom", "2px solid #c4c4c4");
      }
      // ===X form tel validation X===
      return valid;
   }

   function validCheckbox() {
      // ===> form checkbox validation <===
      const contactsFormCheckbox = $(".contacts__form-checkbox");
      let valid = true;
      if (!contactsFormCheckbox.prop("checked"))
         valid = false;
      // ===X form checkbox validation X===
      return valid;
   }

   function checkValid() {
      const formValid = validName() && validTel() && validCheckbox();
      return formValid;
   }

   const formMain = $("#form-main");
   formMain.on("submit", function (event) {
      return checkValid();
   });
   // ==X Contacts-form X==


   // ==> Accordion <==
   const accordionLinks = document.querySelectorAll(".accordion__item-box");
   let prevItem = document.querySelector(".more--active");
      // for start active one item in accordion list
   let itemContentActive = document.querySelector(".accordion__item-content--active");
   if (itemContentActive != null)
      itemContentActive.style.maxHeight = itemContentActive.scrollHeight + "px";

   accordionLinks.forEach((link) => {
      link.addEventListener("click", () => {
         // seacrh content after current link
         const itemContent = link.nextElementSibling;
         if (prevItem != null)
            prevItem.classList.remove("more--active");

         const item = link.querySelector(".more");

         accordionLinks.forEach((link) => {
            const currLinkList = link.nextElementSibling;
            // remove active class for all element but not with given item
            if (currLinkList != itemContent) {
               currLinkList.classList.remove("accordion__item-content--active");
               currLinkList.style.maxHeight = null;
            }
         });

         if (itemContent.classList.contains("accordion__item-content--active")) {
            itemContent.classList.remove("accordion__item-content--active");
            item.classList.remove("more--active");
            itemContent.style.maxHeight = null;
         } else {
            itemContent.classList.add("accordion__item-content--active");
            item.classList.add("more--active");
            
            itemContent.style.maxHeight = itemContent.scrollHeight + "px";
         }

         prevItem = item;
      });
   });
   // ==X Accordion X==


   // ==> Slider <==
   var mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 48,
      loop: true,
      grabCursor: true,
      navigation: {
         nextEl: '.follow__arrow-right',
         prevEl: '.follow__arrow-left',
      },
      keyboard: {
         enabled: true,
      },
      breakpoints: {
         1320: {
            spaceBetween: 48,
         },
         1024: {
            slidesPerView: 4,
            spaceBetween: 36,
         },
         768: {
            slidesPerView: 3,
            spaceBetween: 36,
         },
         442: {
            slidesPerView: 2,
            spaceBetween: 24,
         },
         320: {
            slidesPerView: 1,
            spaceBetween: 0,
         },
         0: {
            slidesPerView: 1,
         },
      }
   });
   // ==X Slider X==


   // ==> type text animation <==
   const sectionBeautyOffset = $("#beauty").offset().top;

   let flag = true;
   const windowHalfHeight = $(window).outerHeight() * 3 / 4;

   function TypeItInit() {
      // TypeIt plugin
      new TypeIt(".beauty__typetext", {
         speed: 175,
         deleteSpeed: 70,
         loop: true
      })
         .type(`а погладь <span class='cat emoji'>&nbsp;</span>`, { delay: 1000 })
         .delete()
         .type("а <span class='kiss emoji'>&nbsp;</span> коханих", { delay: 1000 })
         .delete()
         .type("а випий <span class='cup emoji'>&nbsp;</span>", { delay: 1000 })
         .delete()
         .type("а запишись до Yomi на <span class='manicure emoji'>&nbsp;</span>", { delay: 1000 })
         .go();
   }

   $(window).scroll(function () {
      if (pageYOffset + windowHalfHeight >= sectionBeautyOffset && flag) {
         TypeItInit();
         flag = false;
      }
   })

   if (pageYOffset + windowHalfHeight >= sectionBeautyOffset && flag) {
      TypeItInit();
      flag = false;
   }
   // ==X type text animation X==
   
   // var typed = new Typed('.beauty__typetext', {
   //    strings: ["а погладь <span>&#128008;</span>", "а <span>&#128139;</span> коханих", "а випий <span>&#9749;</span>", "а запишись до Yomi на <span>&#128133;</span>"],
   //    typeSpeed: 150,
   //    backSpeed: 40,
   //    loop: true,
   // });
});