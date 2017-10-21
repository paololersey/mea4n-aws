exports.replaceAll = function (target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
};

exports.Create2DArray = function (rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

exports.sort_array_by = function (field, reverse, pr) {
    reverse = (reverse) ? -1 : 1;
    return function (a, b) {
        a = a[field];
        b = b[field];
        if (typeof (pr) != 'undefined') {
            a = pr(a);
            b = pr(b);
        }
        if (a < b) return reverse * -1;
        if (a > b) return reverse * 1;
        return 0;
    }
}

exports.integerSort = (array) => {
    return array.sort(function (a, b) {
        return a - b;
    })
}