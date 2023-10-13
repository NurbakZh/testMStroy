import {TreeStore} from "./class";
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

describe("Тесты", () => {
    it("Проверка метода работы getAll()", () => {
        const check = ts.getAll();
        expect(check).toEqual([
            {"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},
            {"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},
            {"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},
            {"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}
        ]);
    });
    it("Проверка метода работы getItem() с существующим значением id", () => {
        const check = ts.getItem(7);
        expect(check).toEqual( {"id":7,"parent":4,"type":null});
    });
    it("Проверка метода работы getItem() с несуществующим значением id", () => {
        const check = ts.getItem(0);
        expect(check).toEqual("извините, но элемента с таким id не существует");
    });
    it("Проверка метода работы getChildren() с существующими дочерними элементами", () => {
        const check = ts.getChildren(4);
        expect(check).toEqual( [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]);
    })
    it("Проверка метода работы getChildren() с несуществующими дочерними элементами", () => {
        const check = ts.getChildren(5);
        expect(check).toEqual([]);
    })
    it("Проверка метода работы getAllChildren()", () => {
        const check = ts.getAllChildren(2);
        expect(check).toEqual( [
            {"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},
            {"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},
            {"id":8,"parent":4,"type":null}
        ]);
    })
    it("Проверка метода работы getAllParents()", () => {
        const check = ts.getAllParents(7);
        expect(check).toEqual([
            {"id":4,"parent":2,"type":"test"},
            {"id":2,"parent":1,"type":"test"},
            {"id":1,"parent":"root"}
        ]);
    })
})