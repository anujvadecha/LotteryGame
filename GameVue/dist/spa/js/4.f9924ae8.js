(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{8706:function(t,e,l){"use strict";l.r(e);var s=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{},[t.$q.platform.is.mobile?t._e():l("TimeHeader"),l("q-card",{staticClass:"row",attrs:{bordered:"",flat:""}},[l("div",{staticClass:"q-ma-lg font-bold",staticStyle:{"font-size":"large"}},[t._v("More draws")]),l("q-space"),l("q-checkbox",{staticClass:"col-2 q-ma-md",staticStyle:{"font-size":"large"},attrs:{color:"blue",unelevated:""},on:{input:function(e){return t.select_all()}},model:{value:t.select_all_button,callback:function(e){t.select_all_button=e},expression:"select_all_button"}},[t._v("Select all")]),l("q-btn",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{click:function(e){return t.$router.push({path:"/"})}}},[t._v("Back")])],1),l("div",{staticClass:"row"},t._l(t.options,(function(e){return l("q-card",{key:e.value.id,staticClass:"col-xs-4 col-sm-2 col-md-2 q-pa-lg q-ma-sm",staticStyle:{"background-color":"#fbb000","font-size":"large"},on:{click:function(l){return t.select_lottery(e)}}},[l("q-checkbox",{attrs:{disable:e.disabled,dense:"",val:"teal",label:e.label,color:"teal"},on:{input:function(e){return t.add_selected()}},model:{value:e.selected,callback:function(l){t.$set(e,"selected",l)},expression:"option.selected"}})],1)})),1)],1)},a=[],o=(l("3ed8"),l("90b9")),i=l("8d37"),c={name:"MoreDraws",components:{TimeHeader:i["a"]},methods:{add_selected:function(){this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))},select_lottery:function(t){for(var e=0;e<this.options.length;e++)this.options[e].label===t.label&&(this.options[e].selected=!this.options[e].selected);this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))},select_all:function(){for(var t=0;t<this.options.length;t++)this.options[t].selected=this.select_all_button;this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))}},data(){return{options:[],selected_lotteries:[],select_all_button:!1}},computed:{},created(){var t=this.$store.state.selected_lotteries.map((t=>t.id));console.log(t),this.options=this.$store.state.lotteries.filter((t=>Object(o["a"])(new Date,t.time)<=0&&Object(o["e"])(t.time))).map((t=>{var e=!1;return{label:Object(o["b"])(t.time),value:t,selected:e}}))}},r=c,n=l("2877"),d=l("f09f"),u=l("2c91"),m=l("8f8e"),f=l("9c40"),b=l("eebe"),_=l.n(b),p=Object(n["a"])(r,s,a,!1,null,"7e067e13",null);e["default"]=p.exports;_()(p,"components",{QCard:d["a"],QSpace:u["a"],QCheckbox:m["a"],QBtn:f["a"]})},"8d37":function(t,e,l){"use strict";var s=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"row",staticStyle:{"font-family":"'Times New Roman'"}},[t.$q.platform.is.mobile?t._e():l("div",{staticClass:"col"},[l("div",{staticClass:"q-pl-md",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"x-large"}},[t._v("Current Date : "+t._s(t.get_current_date)+" ")]),l("div",{staticClass:"q-pl-md ",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"x-large"}},[t._v("Current Time : "+t._s(t.currentTime))])]),t.$q.platform.is.mobile?t._e():l("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ed92f1"}},[l("div",{staticClass:"text-center font-bold",staticStyle:{color:"black","font-size":"xx-large"}},[t._v("STAR SKILL GAME")])]),t.$q.platform.is.mobile?l("div",{staticClass:"col"},[l("div",{staticClass:"row"},[l("div",{staticClass:"col q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"medium"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),l("div",{staticClass:"col q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"medium"},attrs:{id:"left-time"}},[t._v("\n      Left time : "+t._s(t.leftTime)+"\n    ")])])]):l("div",{staticClass:"col"},[l("div",{staticClass:"row q-pl-md",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"x-large"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),l("div",{staticClass:"row q-pl-md",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"x-large"},attrs:{id:"left-time"}},[t._v("\n      Left time :"),l("span",{},[t._v(" "+t._s(t.leftTime))])])])])},a=[],o=l("90b9"),i={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){var t=new Date,e=t.getTimezoneOffset(),l=330,s=new Date(t.getTime()+6e4*(l+e)),a=s.getHours(),o=s.getMinutes()<10?"0"+s.getMinutes():s.getMinutes(),i=s.getSeconds(),c=a+":"+o+":"+i,r=+c.substr(0,2),n=r%12||12,d=r<12||24===r?"AM":"PM";c=n+c.substr(2,3)+d,this.currentTime=c},calculateLefttime(){try{var t=this.$store.state.nextLottery.time;null==t&&(this.leftTime="");var e=Object(o["c"])(t).getTime()-(new Date).getTime(),l=Math.floor(e/1e3/60/60);e-=1e3*l*60*60;var s=Math.floor(e/1e3/60);e-=1e3*s*60;var a=Math.floor(e/1e3);e-=1e3*a,s=s<10?"0"+s:s,e=e<10?"0"+e:e,this.leftTime="0"+l+":"+s+":"+a,0==parseInt(s)&&parseInt(a)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(i){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var t=this.$store.state.nextLottery.time;if(null==t)return"";var e=Object(o["c"])(t),l=e.getHours(),s=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),a=e.getSeconds(),i=l+":"+s+":"+a,c=+i.substr(0,2),r=c%12||12,n=c<12||24===c?"AM":"PM";return i=r+i.substr(2,3)+n,i}catch(d){return""}},get_current_date:function(){var t=Object(o["c"])(new Date);return t.toLocaleDateString("en-US")}},created(){const t=this.calculateLefttime,e=this.calculateCurrentTime;setInterval((function(){t(),e()}),1e3)}},c=i,r=l("2877"),n=Object(r["a"])(c,s,a,!1,null,"a9ea32e6",null);e["a"]=n.exports}}]);