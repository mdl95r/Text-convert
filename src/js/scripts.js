"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const btn_before = document.querySelector('.js-before');
    const btn_after = document.querySelector('.js-after');
    const form = document.querySelector('.js-form');
    const resetAll = document.querySelector('.js-reset');
    const copyBtn = document.querySelector('.js-btn-copy');
    const copyThis = document.querySelector('.js-copy-this');

    let textarea_beforeValue;
    let textarea_beforeUpperCase;
    let textarea_afterLowerCase;


    btn_before.addEventListener('click', function () {
        const textarea_after = document.querySelector('.js-textarea-after');
        const textarea_before = document.querySelector('.js-textarea-before');

        if (textarea_before.value == '' || textarea_before.value == null) {
            alert('Введите слово!')
        } else {
            textarea_beforeValue = textarea_before.value

            textarea_beforeUpperCase = textarea_beforeValue.toUpperCase();

            textarea_after.value = textarea_beforeUpperCase
        }
    });

    btn_after.addEventListener('click', function () {
        const textarea_after = document.querySelector('.js-textarea-after');
        const textarea_before = document.querySelector('.js-textarea-before');

        if (textarea_before.value == '' || textarea_before.value == null) {
            alert('Введите слово!')
        } else {
            textarea_beforeValue = textarea_before.value

            textarea_afterLowerCase = textarea_beforeValue.toLowerCase();

            const firstUpperCase = textarea_afterLowerCase[0].toUpperCase() + textarea_afterLowerCase.slice(1);

            textarea_after.value = firstUpperCase
        }
    });

    resetAll.addEventListener('click', function () {
        form.reset();
    });

    copyBtn.addEventListener('click', function (e) {
        const textarea_after = document.querySelector('.js-textarea-after');
        e.preventDefault();
        if (textarea_after.value == '' || textarea_after.value == null) {
            copyThis.innerText = 'Type anything!'
        } else {
            textarea_after.select();
            document.execCommand("copy");
            copyThis.innerText = `${textarea_after.value} copied successful!`;
        }
    });

    copyBtn.addEventListener('mouseover', function () {
        copyThis.classList.add('active')
    })

    copyBtn.addEventListener('mouseout', function () {
        setTimeout(function () {
            copyThis.classList.remove('active');
            copyThis.innerText = 'Copy this!'
        }, 1000)
    })
});