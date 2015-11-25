hljs.registerLanguage("ebnf", function (e) {
    var r = {
        b: t,
        e: a,
        c: []
    }, n = [e.C("--(?!" + t + ")", "$"), e.C("--" + t, a, {c: [r], r: 10})];
    return {
        l: e.UIR,
        k: {
            keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
            built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
        },
        c: n.concat([{
            cN: "function",
            bK: "function",
            e: "\\)",
            c: [e.inherit(e.TM, {b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}), {
                cN: "params",
                b: "\\(",
                eW: !0,
                c: n
            }].concat(n)
        }, e.CNM, e.ASM, e.QSM, {cN: "string", b: t, e: a, c: [r], r: 5}])
    }
});