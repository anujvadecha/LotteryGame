(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{8706:function(t,e,s){"use strict";s.r(e);var l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("ResultHeader"),s("TimeHeader"),s("q-card",{staticClass:"row",attrs:{bordered:"",flat:""}},[s("div",{staticClass:"q-ma-lg font-bold",staticStyle:{"font-size":"large"}},[t._v("More draws")]),s("q-space"),s("q-checkbox",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{input:function(e){return t.select_all()}},model:{value:t.select_all_button,callback:function(e){t.select_all_button=e},expression:"select_all_button"}},[t._v("Select all")]),s("q-btn",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{click:function(e){return t.$router.push({path:"/"})}}},[t._v("Back")])],1),s("div",{staticClass:"row"},t._l(t.options,(function(e){return s("q-card",{key:e.value.id,staticClass:"col-2 q-pa-lg q-ma-sm",on:{click:function(s){return t.select_lottery(e)}}},[s("q-checkbox",{attrs:{disable:e.disabled,dense:"",val:"teal",label:e.label,color:"teal"},on:{input:function(e){return t.add_selected()}},model:{value:e.selected,callback:function(s){t.$set(e,"selected",s)},expression:"option.selected"}})],1)})),1)],1)},a=[],o=s("3ed8"),i=s("90b9"),r=s("8d37"),c={name:"MoreDraws",components:{TimeHeader:r["a"],ResultHeader:o["a"]},methods:{add_selected:function(){this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))},select_lottery:function(t){for(var e=0;e<this.options.length;e++)this.options[e].label===t.label&&(this.options[e].selected=!this.options[e].selected);this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))},select_all:function(){for(var t=0;t<this.options.length;t++)this.options[t].selected=this.select_all_button;this.$store.dispatch("set_selected_lotteries",this.options.filter((t=>t.selected)).map((t=>t.value)))}},data(){return{options:[],selected_lotteries:[],select_all_button:!1}},created(){var t=this.$store.state.selected_lotteries.map((t=>t.id));console.log(t),this.options=this.$store.state.lotteries.filter((t=>Object(i["a"])(new Date,t.time)<=0&&Object(i["e"])(t.time))).map((e=>{var s=!1;return t.map((t=>{e.id===t&&(this.selected_lotteries.push(e),s=!0)})),{label:Object(i["b"])(e.time),value:e,selected:s}}))}},n=c,u=s("2877"),d=s("f09f"),m=s("2c91"),f=s("8f8e"),b=s("9c40"),p=s("eebe"),h=s.n(p),_=Object(u["a"])(n,l,a,!1,null,"3599528e",null);e["default"]=_.exports;h()(_,"components",{QCard:d["a"],QSpace:m["a"],QCheckbox:f["a"],QBtn:b["a"]})},"8d37":function(t,e,s){"use strict";var l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col"},[s("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Date : "+t._s(t.get_current_date)+" ")]),s("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Time : "+t._s(t.currentTime))])]),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ee82ef"}},[s("div",{staticClass:"text-center font-bold q-ma-md",staticStyle:{color:"black","font-size":"xx-large"}},[t._v("STAR SKILL GAME")])]),(t.$q.platform.is.mobile,s("div",{staticClass:"col"},[s("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),s("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"},attrs:{id:"left-time"}},[t._v("\n      Left time : "+t._s(t.leftTime)+"\n    ")])]))])},a=[],o=s("90b9"),i={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){var t=new Date,e=t.getTimezoneOffset(),s=330,l=new Date(t.getTime()+6e4*(s+e)),a=l.getHours(),o=l.getMinutes()<10?"0"+l.getMinutes():l.getMinutes(),i=l.getSeconds(),r=a+":"+o+":"+i,c=+r.substr(0,2),n=c%12||12,u=c<12||24===c?"AM":"PM";r=n+r.substr(2,3)+u,this.currentTime=r},calculateLefttime(){try{var t=this.$store.state.nextLottery.time;null==t&&(this.leftTime="");var e=Object(o["c"])(t).getTime()-(new Date).getTime(),s=Math.floor(e/1e3/60/60);e-=1e3*s*60*60;var l=Math.floor(e/1e3/60);e-=1e3*l*60;var a=Math.floor(e/1e3);e-=1e3*a,l=l<10?"0"+l:l,e=e<10?"0"+e:e,this.leftTime="0"+s+":"+l+":"+a,0==parseInt(l)&&parseInt(a)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(i){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var t=this.$store.state.nextLottery.time;if(null==t)return"";var e=Object(o["c"])(t),s=e.getHours(),l=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),a=e.getSeconds(),i=s+":"+l+":"+a,r=+i.substr(0,2),c=r%12||12,n=r<12||24===r?"AM":"PM";return i=c+i.substr(2,3)+n,i}catch(u){return""}},get_current_date:function(){var t=Object(o["c"])(new Date);return t.toLocaleDateString("en-US")}},created(){const t=this.calculateLefttime,e=this.calculateCurrentTime;setInterval((function(){t(),e()}),1e3)}},r=i,c=s("2877"),n=Object(c["a"])(r,l,a,!1,null,"2bae6538",null);e["a"]=n.exports}}]);