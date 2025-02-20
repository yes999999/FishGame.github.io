// 初始化变量
let coins = 0;// 总金币数
let lasttoal = 0; // 上轮得分
let lastwin = 0; // 上轮赢取金币数
let lastlose = 0; // 上轮损失金币数
let round = 1;
let bigfish = 35;
let smallfish = 50;
let bigFishcatch = 0; // 捕获的大鱼数量
let smallFishcatch = 0; // 捕获的小鱼数量
let bigFishRatioValue = returnFloat((bigfish / (bigfish + smallfish)) * 100); // 大鱼比率
let smallFishRatioValue = returnFloat((smallfish / (bigfish + smallfish)) * 100); // 小鱼比率
let roundcoins = 0; // 本轮金币数
const fishes = []; // 存储所有鱼的数组
const totalFish = 600; // 鱼的数量
const minRadius = 110; // 最小半径
const maxRadius = 2100; // 最大半径
const angles = []; // 存储鱼的角度
const fixedRadii = []; // 存储鱼的固定半径
const speed = 0.005; // 鱼的固定速度


// 获取元素的引用
const Round = document.getElementById('Round');// 轮数
const lastWin = document.getElementById('last-win');// 上轮金币获得情况
const lastLose = document.getElementById('last-lose');// 上轮金币损失情况
const lastTotal = document.getElementById('last-total');// 上轮情况
const Coins = document.getElementById('total-coins');// 总金币数
const startButton = document.getElementById('start-button');// 开始按钮
const stopButton = document.getElementById('stop-button');// 停止按钮
const catchCountInput = document.getElementById('catch-count');// 输入框
const result = document.getElementById('result');// 结果
const bigFishCount = document.getElementById('num-big-fish');// 大鱼数量
const bigFishRatio = document.getElementById('big-fish-ratio');// 大鱼比率
const smallFishCount = document.getElementById('num-small-fish');// 小鱼数量
const smallFishRatio = document.getElementById('small-fish-ratio');// 小鱼比率
const Net = document.getElementById('net');// 渔网
const bigFish = document.createElement('big-fish');// 大鱼
const smallFish = document.createElement('small-fish');// 小鱼
const Container = document.getElementById('container');// 容器
const Gamearea = document.getElementById('game-area');// 游戏区域
const bigFishCatch = document.getElementById('big-fish-catch');// 大鱼捕获
const smallFishCatch = document.getElementById('small-fish-catch');// 小鱼捕获
const roundCoins = document.getElementById('round-coins');// 本轮金币数
//初始界面
function init() {
    coins = 0;// 总金币数
    lasttoal = 0; // 上轮得分
    lastwin = 0; // 上轮赢取金币数
    lastlose = 0; // 上轮损失金币数
    round = 1;
    bigfish = 35;
    smallfish = 50;
    bigFishcatch = 0; // 捕获的大鱼数量
    smallFishcatch = 0; // 捕获的小鱼数量
    bigFishRatioValue = returnFloat((bigfish / (bigfish + smallfish)) * 100); // 大鱼比率
    smallFishRatioValue = returnFloat((smallfish / (bigfish + smallfish)) * 100); // 小鱼比率
    roundcoins = 0; // 本轮金币数
    Coins.textContent = coins; // 初始化总金币数
    Round.innerText = round;// 初始化轮数
    lastWin.innerText = lastwin;// 初始化上轮赢取金币数
    lastLose.innerText = lastlose;// 初始化上轮损失金币数
    lastTotal.innerText = lasttoal;// 初始化上轮情况
    bigFishCount.innerText = bigfish;// 初始化大鱼数量
    bigFishRatio.innerText = bigFishRatioValue;// 初始化大鱼比率
    smallFishCount.innerText = smallfish;// 初始化小鱼数量
    smallFishRatio.innerText = smallFishRatioValue;// 初始化小鱼比率
}
//生成鱼
function createFish() {
    const fragment = document.createDocumentFragment(); // 创建文档碎片
    for (let i = 0; i < totalFish; i++) {
        const fish = document.createElement('img');
        fish.src = i % 2 === 0 ? './images/big-fish.png' : './images/small-fish.png'; // 偶数为大鱼，奇数为小鱼
        fish.style.position = 'absolute';
        fish.style.width = '90px'; // 鱼的宽度
        fish.style.height = 'auto';

        let radius;
        let a = Math.random();
        if (a < 0.9) { // 50%的几率产生外圈鱼
            radius = a * (maxRadius - (minRadius + 150)) + (minRadius + 150); // 更大的半径
        } else {
            radius = a * (maxRadius - minRadius) + minRadius; // 原有的半径范围
        }
        
        const angle = (i / totalFish) * (2 * Math.PI); // 计算每条鱼的初始角度
        angles.push(angle);
        fixedRadii.push(radius); // 存储固定半径

        // 计算初始位置
        const initialX = +250+window.innerWidth / 2 + radius * Math.cos(angle);
        const initialY = window.innerHeight / 2 + radius * Math.sin(angle);

        fish.style.left = initialX + 'px'; // 设置初始X位置
        fish.style.top = initialY + 'px'; // 设置初始Y位置

        fragment.appendChild(fish); // 添加到文档碎片中
        fishes.push(fish); // 将鱼保存到数组中
    }
    Gamearea.appendChild(fragment); // 将鱼添加到游戏区域
}
//鱼环绕

function moveFish() {
    fishes.forEach((fish, index) => {
        // 更新角度
        angles[index] += speed; // 使用固定速度更新角度

        // 计算鱼的新位置，使用固定半径
        const fishX = +400+window.innerWidth / 2 + fixedRadii[index] * Math.cos(angles[index]); // 计算鱼的新X坐标
        const fishY = window.innerHeight / 2 + fixedRadii[index] * Math.sin(angles[index]); // 计算鱼的新Y坐标

        // 更新鱼的位置
        fish.style.left = fishX + 'px';
        fish.style.top = fishY + 'px';

        // 计算鱼的旋转角度，让鱼嘴指向运动方向
        const rotation = angles[index] * (180 / Math.PI) + 90; // 将弧度转换为角度，并加上90度使鱼嘴向右
        fish.style.transform = `rotate(${rotation}deg)`; // 应用旋转
    });
    requestAnimationFrame(moveFish); // 继续动画
}
function returnFloat(value){
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split( "." );
    if (xsd.length==1){
    value=value.toString()+ ".00" ;
    return value;
    }
    if (xsd.length>1){
    if (xsd[1].length<2){
    value=value.toString()+ "0" ;
    }
    return value;
    }
}

// 捕鱼逻辑
function catchFish() {
    const catchCount = parseInt(catchCountInput.value); // 获取输入的捕鱼数量
    if (isNaN(catchCount) || catchCount < 1 || catchCount > 5) {
        alert("请输入有效的捕鱼数量（1~5）");
        return 0;
    }    
    bigFishcatch = 0;
    smallFishcatch = 0;
    let lasttoal = 0; // 上轮得分
    let lastwin = 0; // 上轮赢取金币数
    let lastlose = 0; // 上轮损失金币数

    for (let i = 0; i < catchCount; i++) {
        const rand = Math.random() * 100;
        if (rand < bigFishRatioValue) {
            bigFishcatch++;
        } else {
            smallFishcatch++;
        }
    }
    // 更新金币数
    coins += bigFishcatch * 10 - smallFishcatch * 2;

    bigfish -= bigFishcatch;
    lastwin =bigFishcatch * 10;
    lastlose = smallFishcatch * 2;
    lasttoal = lastwin - lastlose;
    bigFishRatioValue = returnFloat((bigfish / (bigfish + smallfish)) * 100); 
    smallFishRatioValue = returnFloat((smallfish / (bigfish + smallfish)) * 100);
    // 更新界面 

    bigFishCatch.innerText = bigFishcatch;// 更新大鱼捕获数量
    smallFishCatch.innerText = smallFishcatch;// 更新小鱼捕获数量
    roundCoins.innerText = lasttoal;// 更新本轮金币数
}

// 点击开始捕鱼事件
startButton.addEventListener('click', startFishing);

// 开始捕鱼
function startFishing(){
    if (catchFish()==0) {
        return;
    } else {
                // 显示网
    Net.style.display = 'block'; // 显示网

    // 2秒后隐藏网
    setTimeout(() => {
        Net.style.display = 'none'; // 隐藏网

        // 显示结果栏
        result.style.display = 'block'; // 显示结果栏

        // 2秒后隐藏结果栏
        setTimeout(() => {
            result.style.display = 'none'; // 隐藏结果栏

            // 更新左侧栏数据
            updateLeftPanel(); // 调用更新函数

        }, 2000); // 隐藏结果栏的延迟
    }, 2000); // 隐藏网的延迟 
    }
}
// 更新左侧栏数据的函数
function updateLeftPanel() {
    // 在这里更新左侧栏的数据
    catchCountInput.value = ''; // 清空输入框
    round++; // 增加轮数
    lastwin =bigFishcatch * 10;
    lastlose = smallFishcatch * 2;
    lasttoal = lastwin - lastlose;
    Round.innerText = round;// 更新轮数
    Coins.innerText = coins;// 更新总金币数
    bigFishCount.innerText = bigfish;// 更新大鱼数量
    smallFishCount.innerText = smallfish;// 更新小鱼数量 
    bigFishRatio.innerText = bigFishRatioValue;// 更新大鱼比率
    smallFishRatio.innerText = smallFishRatioValue;// 更新小鱼比率
    lastWin.innerText = lastwin;// 更新上轮赢取金币数
    lastLose.innerText = lastlose;// 更新上轮损失金币数
    lastTotal.innerText = lasttoal;// 更新上轮情况
    // 结束捕鱼的条件
    if (round > 10) {
        alert(`十轮游戏结束，恭喜您获得总金币：${coins}！`);
        resetGame();
    } else {
        //再次输入捕鱼数量
        startButton.addEventListener(); // 触发开始捕鱼按钮的点击事件
    }
}
// 停止捕鱼按钮的点击事件
stopButton.addEventListener('click', () => {
    alert(`恭喜您获得总金币${coins}！`);
    resetGame();
});
// 重置游戏
function resetGame() {
    coins = 0;// 总金币数
    lasttoal = 0; // 上轮得分
    lastwin = 0; // 上轮赢取金币数
    lastlose = 0; // 上轮损失金币数
    round = 1;
    bigfish = 35;
    smallfish = 50;
    bigFishcatch = 0; // 捕获的大鱼数量
    smallFishcatch = 0; // 捕获的小鱼数量
    bigFishRatioValue = returnFloat((bigfish / (bigfish + smallfish)) * 100); // 大鱼比率
    smallFishRatioValue = returnFloat((smallfish / (bigfish + smallfish)) * 100); // 小鱼比率
    roundcoins = 0; // 本轮金币数
    init();
}
// 页面加载完成后生成鱼群
init();
createFish();
moveFish();