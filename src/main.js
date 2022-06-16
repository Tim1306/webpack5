import count from "./js/count";
import sum from "./js/sum";
import { mul } from "./js/math";
import "./css/index.css";
import  "./css/iconfont.css";
import "./sass/index.sass"
import "./sass/index.scss"

console.log(count(2, 1));
console.log(sum(1, 2,3, 4));
console.log(mul(3, 3));

if (module.hot) {
    // 判断是否支持热模块替换功能
    module.hot.accept("./js/count")
    module.hot.accept("./js/sum")
}