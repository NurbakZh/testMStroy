"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeStore = void 0;
var TreeStore = /** @class */ (function () {
    function TreeStore(someObjectsArray) {
        this.ourObjectsArray = someObjectsArray;
    }
    TreeStore.prototype.getAll = function () {
        return this.ourObjectsArray;
    };
    TreeStore.prototype.getItem = function (id) {
        var item = this.ourObjectsArray.find(function (x) { return x.id === id; });
        if (item === undefined) {
            return "извините, но элемента с таким id не существует";
        }
        else {
            return item;
        }
    };
    TreeStore.prototype.getChildren = function (id) {
        return this.ourObjectsArray.filter(function (x) {
            if (x.parent === id) {
                return x;
            }
        });
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var _this = this;
        var children = this.ourObjectsArray.filter(function (x) {
            if (x.parent === id) {
                return x;
            }
        });
        var allChildren = children;
        children.forEach(function (child) {
            allChildren = allChildren.concat(_this.getChildren(child.id));
        });
        return allChildren;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var parentObject = this.ourObjectsArray.find(function (x) { return x.id === id; });
        var parentsChain = [];
        while (parentObject.parent !== 'root') {
            parentObject = this.ourObjectsArray.find(function (x) { return x.id === parentObject.parent; });
            console.log(parentsChain);
            parentsChain.push(parentObject);
        }
        return parentsChain;
    };
    return TreeStore;
}());
exports.TreeStore = TreeStore;
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var ts = new TreeStore(items);
console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));
