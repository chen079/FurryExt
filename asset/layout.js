window.furry.frImport(function (lib,game,ui,get,ai,_status) {
    // 9-17人布局 代码来自9-17，感谢作者棘手怀念摧毁
    var style1 = document.createElement('style');
    // 9人
    style1.innerHTML += "[data-number='9']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='9']>.player[data-position='2']{top:18px;left:auto;right:calc(14% - 18px);}";
    style1.innerHTML += "[data-number='9']>.player[data-position='3']{top:9px;left:auto;right:calc(27% - 19px);}";
    style1.innerHTML += "[data-number='9']>.player[data-position='4']{top:0px;left:auto;right:calc(40% - 16px);}";
    style1.innerHTML += "[data-number='9']>.player[data-position='5']{top:0px;left:calc(40% - 16px);}";
    style1.innerHTML += "[data-number='9']>.player[data-position='6']{top:9px;left:calc(27% - 19px);}";
    style1.innerHTML += "[data-number='9']>.player[data-position='7']{top:18px;left:calc(14% - 18px);}";
    style1.innerHTML += "[data-number='9']>.player[data-position='8']{top:72px;left:calc(2% - 30px);}";
    // 10人
    style1.innerHTML += "[data-number='10']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='2']{top:36px;left:auto;right:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='3']{top:18px;left:auto;right:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='4']{top:9px;left:auto;right:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='5']{top:0px;left:calc(47% - 22.5px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='6']{top:9px;left:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='7']{top:18px;left:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='8']{top:36px;left:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='10']>.player[data-position='9']{top:72px;left:calc(2% - 30px);}";
    // 11人
    style1.innerHTML += "[data-number='11']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='2']{top:36px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='3']{top:18px;left:auto;right:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='4']{top:9px;left:auto;right:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='5']{top:0px;left:auto;right:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='6']{top:0px;left:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='7']{top:9px;left:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='8']{top:18px;left:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='9']{top:36px;left:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='11']>.player[data-position='10']{top:72px;left:calc(2% - 30px);}";
    // 12人
    style1.innerHTML += "[data-number='12']>.player[data-position='1']{top:275px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='2']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='3']{top:36px;left:auto;right:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='4']{top:18px;left:auto;right:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='5']{top:9px;left:auto;right:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='6']{top:0px;left:calc(47% - 22.5px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='7']{top:9px;left:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='8']{top:18px;left:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='9']{top:36px;left:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='10']{top:72px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='12']>.player[data-position='11']{top:275px;left:calc(2% - 30px);}";
    // 13人
    style1.innerHTML += "[data-number='13']>.player[data-position='1']{top:275px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='2']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='3']{top:36px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='4']{top:18px;left:auto;right:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='5']{top:9px;left:auto;right:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='6']{top:0px;left:auto;right:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='7']{top:0px;left:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='8']{top:9px;left:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='9']{top:18px;left:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='10']{top:36px;left:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='11']{top:72px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='13']>.player[data-position='12']{top:275px;left:calc(2% - 30px);}";
    // 14人
    style1.innerHTML += "[data-number='14']>.player[data-position='1']{top:275px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='2']{top:275px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='3']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='4']{top:36px;left:auto;right:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='5']{top:18px;left:auto;right:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='6']{top:9px;left:auto;right:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='7']{top:0px;left:calc(47% - 22.5px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='8']{top:9px;left:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='9']{top:18px;left:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='10']{top:36px;left:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='11']{top:72px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='12']{top:275px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='14']>.player[data-position='13']{top:275px;left:calc(12% - 28px);}";
    // 15人
    style1.innerHTML += "[data-number='15']>.player[data-position='1']{top:275px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='2']{top:275px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='3']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='4']{top:36px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='5']{top:18px;left:auto;right:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='6']{top:9px;left:auto;right:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='7']{top:0px;left:auto;right:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='8']{top:0px;left:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='9']{top:9px;left:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='10']{top:18px;left:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='11']{top:36px;left:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='12']{top:72px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='13']{top:275px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='15']>.player[data-position='14']{top:275px;left:calc(12% - 28px);}";
    // 16人
    style1.innerHTML += "[data-number='16']>.player[data-position='1']{top:275px;left:auto;right:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='2']{top:275px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='3']{top:275px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='4']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='5']{top:36px;left:auto;right:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='6']{top:18px;left:auto;right:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='7']{top:9px;left:auto;right:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='8']{top:0px;left:calc(47% - 22.5px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='9']{top:9px;left:calc(36% - 28px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='10']{top:18px;left:calc(25% - 32px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='11']{top:36px;left:calc(14% - 38px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='12']{top:72px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='13']{top:275px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='14']{top:275px;left:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='16']>.player[data-position='15']{top:275px;left:calc(22% - 26px);}";
    // 17人
    style1.innerHTML += "[data-number='17']>.player[data-position='1']{top:275px;left:auto;right:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='2']{top:275px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='3']{top:275px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='4']{top:72px;left:auto;right:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='5']{top:36px;left:auto;right:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='6']{top:18px;left:auto;right:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='7']{top:9px;left:auto;right:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='8']{top:0px;left:auto;right:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='9']{top:0px;left:calc(42% - 22.5px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='10']{top:9px;left:calc(32% - 24px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='11']{top:18px;left:calc(22% - 26px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='12']{top:36px;left:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='13']{top:72px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='14']{top:275px;left:calc(2% - 30px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='15']{top:275px;left:calc(12% - 28px);}";
    style1.innerHTML += "[data-number='17']>.player[data-position='16']{top:275px;left:calc(22% - 26px);}";
    document.head.appendChild(style1);
})