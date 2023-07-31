// import ProtonXD from "./mod.ts";


// ProtonXD.XD.instantiate(`<html><body style="color: #ff00ff;">hello wrld</body></html>`,{
//     title: "my-app"
// });

import { collections } from "./mod.ts";

const q=new collections.Queue(0,1,2,3,4,5,69);


for(const entity of q) {
    console.log(entity);
}


console.log(q.toString());


