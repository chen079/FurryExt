skill={
    trigger:{
        source:"damageBefore"
    },
    filter:function(event,card,player){
        if(event.card&&get.name(event.card)=='sha') return true;
        return false
    },
    content:function(){
        var shanature =['thunder','fire','kami','ice','']
        var num =Math.floor(Math.random() * shanature.length)
        trigger.nature=shanature[num]
    },
    ai:{
        threaten:3,
    },
}