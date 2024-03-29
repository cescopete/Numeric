﻿const $ = (query) => new DomManip(query);
class DomManip {
    constructor(element) {
        if (typeof element === "string") {
            this.el = document.querySelector(element);
        } else if (typeof element === "object") {
            this.el = element;
        }

    }

    attr(attrName, value) {
        this.el.setAttribute(attrName, value)
    }

    val(value) {
        if (value) {
            this.el.value = value;
        }
        return this.el.value;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    $('.numeric').attr('onblur', 'numeric_onblur(this)');
    $('.numeric').attr('onkeypress', 'return numeric_onkeypress(this,event);');
}, false);

function numeric_onkeypress(o, e) {
    let code = (e.which) ? e.which : e.keyCode;
    if (code >= 43 && code <= 57 && code != 47) {
        return true;
    } else {
        return false;
    }
}

function countChar(haystack, needle) {
    return haystack.split(needle).length;
}

function numeric_onblur(o) {
    let val = $(o).val();

    val = val.split(',').join('');

    Unicodes = /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0AE6\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]/;
    let hasNumber = Unicodes.test(val);

    if (countChar(val, '-') > 2 || countChar(val, '+') > 2) {
        val = "0.00";
    }

    if (val.length > 0 && hasNumber) {
        let priceRegex = /^[-|+]?([1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|\.[0-9]{1,2})$/g;
        let t = priceRegex.test(val);
        if (t) {
            let n = Number(val).toFixed(2);
            let s = addCommas(n);
            $(o).val(s);
        } else {
            let isValid = Boolean(priceRegex.test(val));
            for (; !isValid;) {
                val = val.slice(0, -1);
                isValid = Boolean(priceRegex.test(val));
            }

            if (isValid) {
                let n = Number(val).toFixed(2);
                let s = addCommas(n);
                $(o).val(s);
            }
        }
    } else {
        $(o).val("0.00");
    }
}

function addCommas(val) {
    let wholeNumber = "";
    val = val.replace(",", "");
    let splitted = val.split('.');
    let tempDigits = Array.from(splitted[0]);
    tempDigits = tempDigits.reverse();
    for (let i = 0; i < tempDigits.length; i++) {
        if (i > 0 && i % 3 == 0) {
            wholeNumber = tempDigits[i] + "," + wholeNumber;
        } else {
            wholeNumber = tempDigits[i] + wholeNumber;
        }
    }
    if (wholeNumber.startsWith("-,")) {
        wholeNumber = wholeNumber.replace("-,", "-");
    }
    return wholeNumber + "." + splitted[1];
}