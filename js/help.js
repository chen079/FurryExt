import { lib, game, ui, get, ai, _status } from '../../../noname.js';

// 扩展的 help 字段类型为 Record<string, string>，会在「选项-帮助」里直接读取。
// 之前这里在模块初始化阶段直接调用 window.furry.help()，但此时 InitFurry() 尚未执行，
// 导致 window.furry 为 undefined，从而在加载扩展时抛出 TypeError。
//
// 现在改成：导出一个对象，并给 "福瑞拓展" 这个键挂一个 getter，
// 在真正读取帮助内容时（打开帮助页面时）再去调用 window.furry.help()。
// 这样既能使用原有的 introduce 数据生成完整说明，又不会在扩展加载阶段访问未初始化的全局对象。
export let help = {};

Object.defineProperty(help, '福瑞拓展', {
    configurable: true,
    enumerable: true,
    get() {
        try {
            if (window.furry && typeof window.furry.help === 'function') {
                return window.furry.help();
            }
        } catch (e) {
            console.error(e);
        }
        // 兜底的静态说明，防止在极端情况下（例如 InitFurry 未执行）仍然报错
        return (
            '<ul>' +
            '<li>福瑞拓展为无名杀的原创扩展包，包含 Buff 系统、节日/世界观设定、特殊标签等大量自定义规则说明。' +
            '<li>在配置中可通过「查看Buff列表」等入口查看详细 Buff 说明；部分术语说明也会在技能描述中以标签形式出现。' +
            '<li>如果你看到的是这段简化说明，说明运行环境未正确初始化 window.furry.help()，不影响正常游戏。' +
            '</ul>'
        );
    },
});
