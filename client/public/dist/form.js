"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const submitInfo = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
});
const form = document.querySelector('form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    let userInfo = {};
    const allValues = [...form.querySelectorAll('input')];
    for (let prop in allValues) {
        userInfo[allValues[prop].name] = allValues[prop].value;
    }
    formPath(document.URL, userInfo);
});
const formPath = (path, userData) => {
    const link = path.split('/');
    const formName = link[link.length - 1];
    submitInfo(`/forms/${formName}`, userData)
        .then(data => {
        if (data.status === 200) {
            return window.location.href = data.url;
        }
        return data.json();
    })
        .then(res => {
        if (res.message) {
            alert(res.message);
        }
    })
        .catch(err => console.error(`An issue ocurred: ${err}`));
};
