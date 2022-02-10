import { generateNanoId } from "@/utils/nano";
import { faker } from "@faker-js/faker";
import type { Bird } from "@/bean/Bird";
import App from "./root-app.vue";
import { createApp } from "vue";

const smallBird: Bird = {
    age: 21,
    category: "small cu",
    gender: "female",
};

const msg = "hell11o vue 3";

console.log(msg, smallBird);

const city: string[] = [];

for (let idx = 0; idx < 1000; idx++) {
    city.push(faker.animal.bird());
}

console.log(city);
console.log(PRODUCTION);

console.log("hello world", generateNanoId(20));

createApp(App).mount("#app");

const a = 23;

console.log(a);

// type PrintHandle = {
//   pages: number;
//   printPage: () => void;
// }


// 如果类型PrintHandle能够赋值给Demo，结果类型就是true，否则是false
// type Res = PrintHandle extends Demo ? true : false;

// type Res = Exclude<PrintHandle, Demo>;
// type Res = Extract<Demo, PrintHandle>;