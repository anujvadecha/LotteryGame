(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{8706:function(t,e,l){"use strict";l.r(e);var s=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{},[l("ResultHeader"),l("TimeHeader"),l("q-card",{staticClass:"row",attrs:{bordered:"",flat:""}},[l("div",{staticClass:"q-ma-lg font-bold",staticStyle:{"font-size":"large"}},[t._v("More draws")]),l("q-space"),l("q-checkbox",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{input:function(e){return t.select_all()}},model:{value:t.select_all_button,callback:function(e){t.select_all_button=e},expression:"select_all_button"}},[t._v("Select all")]),l("q-btn",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{click:function(e){return t.$router.push({path:"/"})}}},[t._v("Back")])],1),l("div",{staticClass:"row"},t._l(t.options,(function(e){return l("q-card",{key:e.value.id,staticClass:"col-2 q-pa-lg q-ma-sm",on:{click:function(l){return t.select_lottery(e)}}},[l("q-checkbox",{attrs:{disable:e.disabled,dense:"",val:"teal",label:e.label,color:"teal"},on:{input:function(e){return t.add_selected()}},model:{value:e.selected,callback:function(l){t.$set(e,"selected",l)},expression:"option.selected"}})],1)})),1)],1)},a=[],o=l("3ed8"),c=l("90b9"),r=l("8d37"),i={name:"MoreDraws",components:{TimeHeader:r["a"],ResultHeader:o["a"]},methods:{add_selected:function(){this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))},select_lottery:function(t){for(var e=0;e<this.options.length;e++)this.options[e].label===t.label&&(this.options[e].selected=!this.options[e].selected);this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))},select_all:function(){for(var t=0;t<this.options.length;t++)this.options[t].selected=this.select_all_button;this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))}},data(){return{options:[],selected_lotteries:[],select_all_button:!1}},created(){var t=this.$store.state.selected_lotteries.map((t=>t.id));console.log(t),this.options=this.$store.state.lotteries.filter((t=>Object(c["a"])(new Date,t.time)<=0&&Object(c["e"])(t.time))).map((e=>{var l=!1;return t.map((t=>{e.id===t&&(this.selected_lotteries.push(e),l=!0)})),{label:Object(c["b"])(e.time),value:e,selected:l}}))}},n=i,d=l("2877"),u=l("f09f"),f=l("2c91"),m=l("8f8e"),b=l("9c40"),h=l("eebe"),_=l.n(h),p=Object(d["a"])(n,s,a,!1,null,"3599528e",null);e["default"]=p.exports;_()(p,"components",{QCard:u["a"],QSpace:f["a"],QCheckbox:m["a"],QBtn:b["a"]})},"8d37":function(t,e,l){"use strict";var s=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"row"},[l("div",{staticClass:"col"},[l("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Date : "+t._s(t.get_current_date)+" ")]),l("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Time : "+t._s(t.currentTime))])]),t._m(0),l("div",{staticClass:"col"},[l("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),l("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"},attrs:{id:"left-time"}},[t._v("\n      Left time : "+t._s(t.leftTime)+"\n    ")])])])},a=[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ee82ef"}},[l("div",{staticClass:"text-center font-bold q-ma-md",staticStyle:{color:"black","font-size":"xx-large"}},[t._v("STAR SKILL GAME")])])}],o=l("90b9"),c={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){var t=new Date,e=t.getTimezoneOffset(),l=330,s=new Date(t.getTime()+6e4*(l+e)),a=s.getHours(),o=s.getMinutes();this.currentTime=a+":"+o+" "},calculateLefttime(){try{var t=this.$store.state.nextLottery.time;null==t&&(this.leftTime="");var e=Object(o["c"])(t).getTime()-(new Date).getTime(),l=Math.floor(e/1e3/60/60);e-=1e3*l*60*60;var s=Math.floor(e/1e3/60);e-=1e3*s*60;var a=Math.floor(e/1e3);e-=1e3*a,this.leftTime=l+":"+s+":"+a,0==parseInt(s)&&parseInt(a)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(c){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var t=this.$store.state.nextLottery.time;if(null==t)return"";var e=Object(o["c"])(t),l=e.getHours(),s=e.getMinutes(),a=e.getSeconds();return l+":"+s+" "+a}catch(c){return""}},get_current_date:function(){var t=Object(o["c"])(new Date);return t.toLocaleDateString("en-US")}},created(){const t=this.calculateLefttime,e=this.calculateCurrentTime;setInterval((function(){t(),e()}),1e3)}},r=c,i=l("2877"),n=Object(i["a"])(r,s,a,!1,null,"065183d2",null);e["a"]=n.exports}}]);