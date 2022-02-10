import { nanoid } from "nanoid";

export function generateNanoId(idLength?: number) {
    return idLength ? nanoid(idLength) : nanoid();
}

// 将一个tuple转换成联合类型

// type MyTuple = [string, null];

// // 同一个类型的变量在有多种情况下会被推断成联合类型
// // infer关键字是出现在条件类型的，只能出现在条件类型中的类型判断
// type TupleToCollectionType<T> = T extends Array<infer E> ? E : never;

// type CollectionType = TupleToCollectionType<MyTuple>;

// type JudgePromiseType<T> = T extends Promise<infer E> ? E : never;

// type MyReturnType<T> = T extends (...args: any[]) => infer K ? AddBoolean<K> : never;

// type AddBoolean<T>  = T extends boolean ? number : T; 

// function print(isTrust: boolean) {
//     if (isTrust) {
//         return "past!";
//     } else {
//         return false;
//     }
// }

// type Res = MyReturnType<typeof print>;

// type Stu = {
//     name: number;
// }


// type StuExcludeAge = {
//     name: number;
//     age: number;
// }

// class Car1 implements StuExcludeAge {
//     name: number;
//     age: number;
//     constructor(name: number) {
//         this.name = name;
//         this.age = 21;
//     }
// }


// type BAN = StuExcludeAge extends Stu ? StuExcludeAge : never;

// // 从T中抽取出所有可以分配给U的类型
// type BaseExt = MyExtract<"a" | StuExcludeAge, Stu>;

// type MyExtract<T, U> = T extends U ? T : never;

// type MyParameters = Parameters<(name: StuExcludeAge, age: number) => void>; // 构造一个元组类型，元组数组的类型为参数的类型

// interface Staff {
//     assetsCode: string;
//     assetsName: string;
// }

// interface Plant {
//     id: number;
//     gmtCreate: string;
//     assetsCode: string;
//     assetsName: string;
// }

// type MyReadOnlyRequired<T> = {
//     readonly [k in keyof T]?: T[k];
// }


// type Res1 = MyReadOnlyRequired<Plant>;

// const dd:Res1 = {
//     gmtCreate: "312"
// };