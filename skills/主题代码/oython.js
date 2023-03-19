function encode(str){
    return str.replace(/(\w)/g,function(_,$1){ return "\\x"+ $1.charCodeAt(0).toString(16) });
}