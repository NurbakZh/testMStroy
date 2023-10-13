interface ourObject {
    id: string | number,
    parent: string | number,
    type: string | null,
}
export class TreeStore {
    ourObjectsArray: ourObject[];
    constructor(someObjectsArray) {
        this.ourObjectsArray = someObjectsArray;
    }
    getAll() {
        return this.ourObjectsArray;
    }
    getItem(id: string | number) {
        const item = this.ourObjectsArray.find(x => x.id === id);
        if(item === undefined) {
            return "извините, но элемента с таким id не существует";
        } else {
            return item
        }
    }
    getChildren(id: string | number) {
        return this.ourObjectsArray.filter(x => {
            if (x.parent === id) {
                return x;
            }
        });
    }
    getAllChildren(id: string | number) {
        const children = this.ourObjectsArray.filter(x => {
            if (x.parent === id) {
                return x;
            }
        });
        let allChildren: ourObject[] = children;
        children.forEach(child => {
            allChildren = allChildren.concat(this.getChildren(child.id));
        });
        return allChildren;
    }
    getAllParents(id: string | number) {
        let parentObject = this.ourObjectsArray.find(x => x.id === id);
        const parentsChain: ourObject[] = [];
        while(parentObject.parent !== 'root') {
            parentObject = this.ourObjectsArray.find(x => x.id === parentObject.parent);
            console.log(parentsChain);
            parentsChain.push(parentObject);
        }
        return parentsChain;
    }
}

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);
console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));