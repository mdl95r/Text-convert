"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.js-form');
    const resetAll = document.querySelector('.js-reset');
    const toLowerCaseBtn = document.querySelector('.js-after');
    const toUpperCaseBtn = document.querySelector('.js-before');
    const copyBtn = document.querySelector('.js-btn-copy');
    const textarea_before = document.querySelector('.js-textarea-before');
    const textarea_after = document.querySelector('.js-textarea-after');
    const getStorageId = localStorage.getItem('id');

    loadStorage()

    textarea_before.addEventListener('keyup', function () {
        checkReg();
    })

    /**
    *  Проверяем какая кнопка нажата и производим трансформацию текста, 
    * а так же задаем в localStorage id кнопки которая выбрана
    */
    function checkReg() {
        if (toLowerCaseBtn.classList.contains('text-control__btn--active')) {
            let textAreaInput = textarea_before.value
            textarea_after.value = textAreaInput.toLowerCase();
            localStorage.setItem('id', 1)
        }
        if (toUpperCaseBtn.classList.contains('text-control__btn--active')) {
            let textAreaInput = textarea_before.value
            textarea_after.value = textAreaInput.toUpperCase();
            localStorage.setItem('id', 2)
        }
    }

    // Кнопки в нижний и верхний регистр
    toUpperCaseBtn.addEventListener('click', function () {
        this.classList.add('text-control__btn--active');
        toLowerCaseBtn.classList.remove('text-control__btn--active');
        checkReg();
    })

    toLowerCaseBtn.addEventListener('click', function () {
        this.classList.add('text-control__btn--active');
        toUpperCaseBtn.classList.remove('text-control__btn--active');
        checkReg();
    })

    // сбрасываем форму и чистим localStorage
    resetAll.addEventListener('click', function () {
        form.reset();
        localStorage.clear();
    });

    // копируем значение и сохраняем оба поля в localStorage
    copyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        textarea_after.select();
        document.execCommand("copy");
        localStorage.setItem('item-before', textarea_before.value);
        localStorage.setItem('item-after', textarea_after.value);
    });

    // получаем данные из хранилища
    function getInputs() {
        textarea_before.value = localStorage.getItem('item-before');
        textarea_after.value = localStorage.getItem('item-after');
    }

    // функция проверяющая при загрузке, какая кнопка была нажата
    function loadStorage() {
        if (getStorageId == 1) {
            toLowerCaseBtn.classList.add('text-control__btn--active');
            toUpperCaseBtn.classList.remove('text-control__btn--active');
        }
        if (getStorageId == 2) {
            toUpperCaseBtn.classList.add('text-control__btn--active');
            toLowerCaseBtn.classList.remove('text-control__btn--active');
        }
        getInputs()
    }
});