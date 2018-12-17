"use strict";
class MyArray {
    constructor() {
        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }
    }

    get length() {
        return Object.keys(this).length;
    }

    push() {
        for (var i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
        }
        return this.length;
    }

    pop() {
        let deletedKey = this.length - 1;
        let deletedValue = this[deletedKey];
        delete this[deletedKey];
        return deletedValue;
    }

    static from(arrayLike, mapFn, thisArg) {
        let newArr = new MyArray();
        if (arguments.length === 1) {
            for (var i = 0; i < arrayLike.length; i++) {
                newArr.push(arrayLike[i]);
            }
        } else if (mapFn) {
            if (thisArg) {
                for (var i = 0; i < arrayLike.length; i++) {
                    newArr.push(mapFn.call(thisArg, arrayLike[i]));
                }
            } else {
                for (var i = 0; i < arrayLike.length; i++) {
                    newArr.push(mapFn(arrayLike[i]));
                }
            }
        }
        return newArr;
    }

    forEach(callback, thisArg) {
        if (!callback) {
            return;
        }
        if (thisArg) {
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                callback(this[i], i, this);
            }
        }
    }

    map(callback, thisArg) {
        if (!callback) {
            return;
        }
        let newObj = new MyArray();
        if (thisArg) {
            for (var i = 0; i < this.length; i++) {
                newObj.push(callback.call(thisArg, this[i], i, this));
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                newObj.push(callback(this[i], i, this));
            }
        }
        return newObj;
    }

    toString() {
        let result = "";
        for (var i = 0; i < this.length; i++) {
            if (i !== this.length - 1) {
                result += this[i] + ",";
            } else {
                result += this[i];
            }
        }
        return result;
    }

    filter(callback, thisArg) {
        if (!callback) {
            return;
        }
        let newObj = new MyArray();
        if (thisArg) {
            for (var i = 0; i < this.length; i++) {
                var match = callback.call(thisArg, this[i], i, this);
                if (match) {
                    newObj.push(this[i]);
                }
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                match = callback(this[i], i, this);
                if (match) {
                    newObj.push(this[i]);
                }
            }
        }
        if (newObj.length === 0) {
            return;
        }
        return newObj;
    }

    reduce(callback, initialValue) {
        if (!callback) {
            return;
        }

        if (this.length === 0 && !initialValue) {
            throw new TypeError('MyArray.prototype.reduce called on null or undefined');
        }

        if (this.length === 1 && !initialValue) {
            return this[0];
        }

        if (this.length === 0 && initialValue) {
            return initialValue;
        }

        var accumulator;
        if (initialValue) {
            accumulator = initialValue;
            for (var i = 0; i < this.length; i++) {
                accumulator = callback(accumulator, this[i], i, this);
            }
        } else {
            accumulator = this[0];
            for (var i = 1; i < this.length; i++) {
                accumulator = callback(accumulator, this[i], i, this);
            }
        }
        return accumulator;
    }

    sort(compareFunc) {
        if (compareFunc) {
            let temp;
            for (var j = this.length; j > 1; j--) {
                for (var i = 0; i < this.length-1; i++) {
                    if (compareFunc(this[i], this[i + 1]) > 0) {
                        temp = this[i];
                        this[i] = this[i + 1];
                        this[i + 1] = temp;
                    }
                }
            }
            return this;
        } else {
            for (let i = 1; i < this.length; i++) {
                let current = this[i];
                let j = i;

                while (j > 0 && String(this[j - 1]) > String(current)) {
                    this[j] = this[j - 1];
                    j--;
                }

                this[j] = current;
            }
            return this;
        }
    }
}

 //export default MyArray;
 module.exports = MyArray;