"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const FORM = document.querySelector('.js-form');
    const RESETALL = document.querySelector('.js-reset');
    const TOLOWERCASEBTN = document.querySelector('.js-after');
    const TOUPPERCASEBTN = document.querySelector('.js-before');
    const COPYBTN = document.querySelector('.js-btn-copy');
    const TEXTAREA_BEFORE = document.querySelector('.js-textarea-before');
    const TEXTAREA_AFTER = document.querySelector('.js-textarea-after');
    const POPUPCOPY = document.querySelector('.popup-copy');

    TEXTAREA_BEFORE.addEventListener('keyup', function () {
        checkReg();
    })

    /**
    *  Проверяем какая кнопка нажата и производим трансформацию текста, 
    *
    */
    function checkReg() {
        if (TOLOWERCASEBTN.classList.contains('text-control__btn--active')) {
            let textAreaInput = TEXTAREA_BEFORE.value
            TEXTAREA_AFTER.value = textAreaInput.toLowerCase();
        }
        if (TOUPPERCASEBTN.classList.contains('text-control__btn--active')) {
            let textAreaInput = TEXTAREA_BEFORE.value
            TEXTAREA_AFTER.value = textAreaInput.toUpperCase();
        }
    }

    // !< Кнопки в нижний и верхний регистр >
    TOUPPERCASEBTN.addEventListener('click', function () {
        this.classList.add('text-control__btn--active');
        TOLOWERCASEBTN.classList.remove('text-control__btn--active');
        checkReg();
    })
    TOLOWERCASEBTN.addEventListener('click', function () {
        this.classList.add('text-control__btn--active');
        TOUPPERCASEBTN.classList.remove('text-control__btn--active');
        checkReg();
    })
    // < Кнопки в нижний и верхний регистр >!

    // сбрасываем форму
    RESETALL.addEventListener('click', function () {
        FORM.reset();
    });

    // копируем значение
    COPYBTN.addEventListener('click', function (e) {
        e.preventDefault();
        popupCopy();
        TEXTAREA_AFTER.select();
        document.execCommand("copy");
    });

    function popupCopy() {
        let textarea_before_val = TEXTAREA_BEFORE.value
        if (textarea_before_val != '') {
            POPUPCOPY.classList.add('popup-copy_active');
            setTimeout(function () {
                POPUPCOPY.classList.remove('popup-copy_active');
            }, 2000)
        }
    }
});