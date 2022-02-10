import { produce } from "immer";

const baseState = {
    name: "das",
};

const newproduce = produce((drawft) => {
    return drawft.name = "23";
});