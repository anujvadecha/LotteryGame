(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{8706:function(e,t,l){"use strict";l.r(t);var s=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{},[l("ResultHeader"),l("TimeHeader"),l("q-card",{staticClass:"row",attrs:{bordered:"",flat:""}},[l("div",{staticClass:"q-ma-lg font-bold",staticStyle:{"font-size":"large"}},[e._v("More draws")]),l("q-space"),l("q-checkbox",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{input:function(t){return e.select_all()}},model:{value:e.select_all_button,callback:function(t){e.select_all_button=t},expression:"select_all_button"}},[e._v("Select all")]),l("q-btn",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{click:function(t){return e.$router.push({path:"/"})}}},[e._v("Back")])],1),l("div",{staticClass:"row"},e._l(e.options,(function(t){return l("q-card",{key:t.value.id,staticClass:"col-2 q-pa-lg q-ma-sm",on:{click:function(l){return e.select_lottery(t)}}},[l("q-checkbox",{attrs:{disable:t.disabled,dense:"",val:"teal",label:t.label,color:"teal"},on:{input:function(t){return e.add_selected()}},model:{value:t.selected,callback:function(l){e.$set(t,"selected",l)},expression:"option.selected"}})],1)})),1)],1)},a=[],o=l("3ed8"),i=l("90b9"),r=l("8d37"),c={name:"MoreDraws",components:{TimeHeader:r["a"],ResultHeader:o["a"]},methods:{add_selected:function(){this.$store.dispatch("set_selected_lotteries",this.options.filter((e=>e.selected)).map((e=>e.value)))},select_lottery:function(e){for(var t=0;t<this.options.length;t++)this.options[t].label===e.label&&(this.options[t].selected=!this.options[t].selected);this.$store.dispatch("set_selected_lotteries",this.options.filter((e=>e.selected)).map((e=>e.value)))},select_all:function(){for(var e=0;e<this.options.length;e++)this.options[e].selected=this.select_all_button;this.$store.dispatch("set_selected_lotteries",this.options.filter((e=>e.selected)).map((e=>e.value)))}},data(){return{options:[],selected_lotteries:[],select_all_button:!1}},created(){var e=this.$store.state.selected_lotteries.map((e=>e.id));console.log(e),this.options=this.$store.state.lotteries.filter((e=>Object(i["a"])(new Date,e.time)<=0&&Object(i["e"])(e.time))).map((t=>{var l=!1;return e.map((e=>{t.id===e&&(this.selected_lotteries.push(t),l=!0)})),{label:Object(i["b"])(t.time),value:t,selected:l}}))}},n=c,d=l("2877"),u=l("f09f"),f=l("2c91"),m=l("8f8e"),b=l("9c40"),p=l("eebe"),h=l.n(p),_=Object(d["a"])(n,s,a,!1,null,"3599528e",null);t["default"]=_.exports;h()(_,"components",{QCard:u["a"],QSpace:f["a"],QCheckbox:m["a"],QBtn:b["a"]})},"8d37":function(e,t,l){"use strict";var s=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"row"},[e.$q.platform.is.mobile?e._e():l("div",{staticClass:"col"},[l("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[e._v("Current Date : "+e._s(e.get_current_date)+" ")]),l("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"}},[e._v("Current Time : "+e._s(e.currentTime))])]),e.$q.platform.is.mobile?e._e():l("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ee82ef"}},[l("div",{staticClass:"text-center font-bold q-ma-md",staticStyle:{color:"black","font-size":"xx-large"}},[e._v("STAR SKILL GAME")])]),(e.$q.platform.is.mobile,l("div",{staticClass:"col"},[l("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[e._v("\n      Next Draw time : "+e._s(e.nextLotteryFormatted)+"\n    ")]),l("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"},attrs:{id:"left-time"}},[e._v("\n      Left time : "+e._s(e.leftTime)+"\n    ")])]))])},a=[],o=l("90b9"),i={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){var e=new Date,t=e.getTimezoneOffset(),l=330,s=new Date(e.getTime()+6e4*(l+t)),a=s.getHours(),o=s.getMinutes();this.currentTime=a+":"+o+" "},calculateLefttime(){try{var e=this.$store.state.nextLottery.time;null==e&&(this.leftTime="");var t=Object(o["c"])(e).getTime()-(new Date).getTime(),l=Math.floor(t/1e3/60/60);t-=1e3*l*60*60;var s=Math.floor(t/1e3/60);t-=1e3*s*60;var a=Math.floor(t/1e3);t-=1e3*a,this.leftTime=l+":"+s+":"+a,0==parseInt(s)&&parseInt(a)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(i){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var e=this.$store.state.nextLottery.time;if(null==e)return"";var t=Object(o["c"])(e),l=t.getHours(),s=t.getMinutes(),a=t.getSeconds();return l+":"+s+" "+a}catch(i){return""}},get_current_date:function(){var e=Object(o["c"])(new Date);return e.toLocaleDateString("en-US")}},created(){const e=this.calculateLefttime,t=this.calculateCurrentTime;setInterval((function(){e(),t()}),1e3)}},r=i,c=l("2877"),n=Object(c["a"])(r,s,a,!1,null,"40f1768f",null);t["a"]=n.exports}}]);