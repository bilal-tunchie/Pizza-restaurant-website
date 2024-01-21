import _ from "lodash/isEqual"
import { CartProducts } from "@/types"

const isEqualObjects = (firstObject: CartProducts, otherObject: CartProducts) => {

    const firstObjectSortedSauces = firstObject.sauces.sort((sauceA, sauceB) => {
        return sauceA.label.localeCompare(sauceB.label, "ar");
    });
    
    const obj1 = {
        size: firstObject.size, 
        chosenDough: firstObject.chosenDough,
        sauces: firstObjectSortedSauces.map( sauce => ({
            label: sauce.label,
            quantity: sauce.quantity,
            image: sauce.image
        })),  
    }
    
    const otherObjectSortedSauces = otherObject.sauces.sort((sauceA, sauceB) => {
        return sauceA.label.localeCompare(sauceB.label, "ar");
    });

    const obj2 = {
        size: otherObject.size, 
        chosenDough: otherObject.chosenDough,
        sauces: otherObjectSortedSauces.map( sauce => ({
            label: sauce.label,
            quantity: sauce.quantity,
            image: sauce.image
        })), 
    }

    const isEqual = _(obj1, obj2);

    return isEqual
}


export default isEqualObjects;