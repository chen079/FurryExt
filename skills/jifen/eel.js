skill = {
    enable:'phaseUse',
    integrate: function (a, b) {
        const math = require('mathjs');
        // 随机生成一个最高次数为四阶的含参幂函数
        let f = '';
        const n = Math.floor(Math.random() * 5); // 随机生成次数
        for (let i = n; i >= 0; i--) {
            const c = (i === n) ? '' : '+';
            const d = Math.floor(Math.random() * 9) + 1; // 随机生成系数
            const p = Math.floor(Math.random() * 4) + 1; // 随机生成指数
            const x = (i === 0) ? '' : `*x^${i}`;
            f += `${c}${d}*x^${p}${x}`;
        }
        f = math.parse(f);
        // 计算积分的正确结果
        const x = math.parse('x');
        const integral = math.integral(f, x);
        const A = math.fraction(
            math.evaluate(integral.eval(b)) - math.evaluate(integral.eval(a))
        );
        // 随机生成三个错误结果，并打乱结果的顺序
        const error1 = math.fraction(
            math.add(A, math.multiply((Math.floor(Math.random() * 11) - 5), math.divide(math.bignumber(A), 10)))
        );
        const error2 = math.fraction(
            math.add(A, math.multiply((Math.floor(Math.random() * 21) - 10), math.divide(math.bignumber(A), 100)))
        );
        const error3 = math.fraction(
            math.add(A, math.multiply((Math.floor(Math.random() * 51) - 25), math.divide(math.bignumber(A), 100)))
        );
        return {
            f: f.toString(),
            results: [A, error1, error2, error3].map((r) => r.toFraction())
        };
    },
    content:function(){
        'step 0'
        var cards = get.cards(2)
        player.gain(cards,'draw')
        var cardnum=[cards[0].number,cards[1].number].sort((a, b) => {
            return b - a;
          });
        event.result=lib.skill.jifen.integrate(cardnum[1],cardnum[0])
        player.chooseControl('请选择'+event.result.f+'积分上限为'+cards[0].number+'积分下限为'+cards[1].number+'的结算结果')
        .set('choiceList',event.result.results.sort(() => Math.random() - 0.5)).set('ai',function(){
            return event.result.results[0]
        })
        'step 1'
        if(result.control==event.result.results[0]){
            game.log(player,'计算正确')
        }else{
            game.log(player,'计算错误')
        }
    }
}