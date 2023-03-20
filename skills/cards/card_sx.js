skill={
    audio:2,
    trigger:{
        player:"phaseUseAfter",
    },
    frequent:true,
    filter:function(event,player){
        if(!player.hasSkill('card_sx_add')) return true
        return false
    },
    onremove:function(player){
        player.removeSkill('card_sx_add');
    },
    content:function(){
        player.draw(3)
        var next=player.phaseUse();
        event.next.remove(next);
        trigger.next.push(next);
    },
    group:["card_sx_clean","card_sx_mark"],
    subSkill:{
        add:{
        },
        mark:{
            trigger:{
                player:"phaseUseBegin"
            },
            forced:true,
            charlotte:true,
            audio:false,
            popup:false,
            content:function(){
                player.addSkill('card_sx_add')
            }
        },
        clean:{
            trigger:{
                source:"dieAfter",
            },
            charlotte:true,
            forced:true,
            audio:false,
            content:function(){
                player.removeSkill('card_sx_add');
            },
        }
    }
}