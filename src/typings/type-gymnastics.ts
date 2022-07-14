import type { Equal } from "@type-challenges/utils";

type Base<X, Y> = <T>(params: T) => T extends X ? boolean : false;

type Expect<T extends boolean> = T;

type Case = <T>() => T extends boolean ? 1 : 2;

type IsAny<T> = "0" extends T & number ? true : false;

type Case3 = IsAny<string>;

// 可分配的类型表格查询
// https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability
type Case4 = unknown extends "x" ? true : false;

// https://jishuin.proginn.com/p/763bfbd66b08
//  关于extends 关键字的使用原则
// extends 有三个使用场景： 1. 条件类型中判断是否可被分配， 2. class中继承某个父类型， 3. 表示约束某个类型

// 满足两个要点即可适用分配律：第一，参数是泛型类型，第二，代入参数的是联合类型

// 带中括号表示不参与分配律
type P<T> = [T] extends ["x"] ? string : number;
type A1 = P<"x" | "x">; // number

type A2 = unknown extends null ? true : false; // unknown 只能分配给unknown自身或者any类型

type A3<T> = T extends (args: infer P) => any ? P : T;

type Constructor = new (...args: any[]) => any;

interface User {
    name: string;
    age: number;
    sayHi: () => void;
    sayYes: (msg: string) => string;
}

type Func = (user: User) => void;

type TupleMapUnion<T> = T extends Array<infer E> ? E : never;

type A44 = TupleMapUnion<[string, number]>;

type TTuple = [number, string];
type Res = TTuple[number]; // string | number

type FuncName<T> = { [k in keyof T]: T[k] extends (...args: any) => any ? k : never }[keyof T];
type Res2 = FuncName<User>;

function printHello(msg = "default Hello") {
    console.log(msg);
}

printHello();

// 实现接口的一个例子：
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: number | string) {
    if (typeof foo === "number") {
        return foo * foo;
    } else if (typeof foo === "string") {
        return `hello ${foo}`;
    }
}

type AnimateOption = {
    step: number;
    start: number;
    end: number;
};

function animeNumber(target: number): number;
function animeNumber(target: number, animateOptions: AnimateOption): number;
function animeNumber(target: number, animateOptions?: AnimateOption) {
    if (animateOptions) {
        //
    }
    return 123;
}

animeNumber(1, {
    step: 12,
    start: 9099,
    end: 21090,
});

const obj = {
    name: "dwx",
    age: 23,
    girlFriend: "oyyy",
};

// Object.defineProperty(obj, Symbol.iterator, {
//     value() {
//         const keys = Object.keys(this); // 3 0< 3 1 < 3 < 2<3
//         let startIdx = 0;
//         return {
//             next: ()  => {
//                 return {
//                     value: this[keys[startIdx++]],
//                     done: startIdx > keys.length,
//                 };
//             },
//         };
//     },
// });

// for (let item of obj) console.log(item);