(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"2b92":function(t,e,s){"use strict";s("65f5")},"65f5":function(t,e,s){},"8d37":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col"},[s("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Date : "+t._s(t.get_current_date)+" ")]),s("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Time : "+t._s(t.currentTime))])]),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ee82ef"}},[s("div",{staticClass:"text-center font-bold q-ma-md",staticStyle:{color:"black","font-size":"xx-large"}},[t._v("STAR SKILL GAME")])]),t.$q.platform.is.mobile?s("div",{staticClass:"col"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"medium"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),s("div",{staticClass:"col q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"medium"},attrs:{id:"left-time"}},[t._v("\n      Left time : "+t._s(t.leftTime)+"\n    ")])])]):s("div",{staticClass:"col"},[s("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),s("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"},attrs:{id:"left-time"}},[t._v("\n      Left time : "+t._s(t.leftTime)+"\n    ")])])])},a=[],o=s("90b9"),n={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){var t=new Date,e=t.getTimezoneOffset(),s=330,i=new Date(t.getTime()+6e4*(s+e)),a=i.getHours(),o=i.getMinutes()<10?"0"+i.getMinutes():i.getMinutes(),n=i.getSeconds(),l=a+":"+o+":"+n,c=+l.substr(0,2),r=c%12||12,d=c<12||24===c?"AM":"PM";l=r+l.substr(2,3)+d,this.currentTime=l},calculateLefttime(){try{var t=this.$store.state.nextLottery.time;null==t&&(this.leftTime="");var e=Object(o["c"])(t).getTime()-(new Date).getTime(),s=Math.floor(e/1e3/60/60);e-=1e3*s*60*60;var i=Math.floor(e/1e3/60);e-=1e3*i*60;var a=Math.floor(e/1e3);e-=1e3*a,i=i<10?"0"+i:i,e=e<10?"0"+e:e,this.leftTime="0"+s+":"+i+":"+a,0==parseInt(i)&&parseInt(a)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(n){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var t=this.$store.state.nextLottery.time;if(null==t)return"";var e=Object(o["c"])(t),s=e.getHours(),i=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),a=e.getSeconds(),n=s+":"+i+":"+a,l=+n.substr(0,2),c=l%12||12,r=l<12||24===l?"AM":"PM";return n=c+n.substr(2,3)+r,n}catch(d){return""}},get_current_date:function(){var t=Object(o["c"])(new Date);return t.toLocaleDateString("en-US")}},created(){const t=this.calculateLefttime,e=this.calculateCurrentTime;setInterval((function(){t(),e()}),1e3)}},l=n,c=s("2877"),r=Object(c["a"])(l,i,a,!1,null,"4e939878",null);e["a"]=r.exports},c22d:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.$q.platform.is.mobile?t._e():s("div",{staticClass:"row",staticStyle:{"background-color":"#13fba5",color:"black"}},[s("div",{staticClass:"col q-ma-sm"},[t._v("\n    Terminal Id: "+t._s(t.user_id)+"   "+t._s(t.first_name)+"\n  ")]),s("div",{staticClass:"col q-ma-sm"},[t._v("\n    Available points :"),s("span",{staticStyle:{"font-weight":"bold","font-size":"medium",color:"darkred"}},[t._v(t._s(t.$store.state.balance_points))])]),s("q-space"),s("div",{},[s("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""},on:{click:function(e){return t.$router.push({path:"/MyAccounts"})}}},[t._v("My accounts")])],1),s("div",{},[s("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""}},[t._v("Password ")])],1),s("div",{},[s("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""},on:{click:function(e){return t.logout()}}},[t._v("Logout")])],1)],1)},a=[],o=s("2a19"),n={name:"OptionsHeader",computed:{first_name(){return null!=this.$store.state.user?this.$store.state.user.first_name:""},user_id(){return null!=this.$store.state.user?this.$store.state.user.id:""}},data(){return{points_available:12}},methods:{logout(){return this.$q.localStorage.set("token",""),o["a"].create({message:"<h6>You have been logged out</h6>",html:!0,position:"center"}),this.$router.push({path:"/Login"})}}},l=n,c=s("2877"),r=s("2c91"),d=s("9c40"),u=s("eebe"),f=s.n(u),m=Object(c["a"])(l,i,a,!1,null,"17f86f40",null);e["a"]=m.exports;f()(m,"components",{QSpace:r["a"],QBtn:d["a"]})},f1be:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.$q.platform.is.mobile?t._e():s("q-header",{staticClass:"bg-primary text-white",attrs:{bordered:""}},[s("ResultHeader"),s("TimeHeader"),s("div",{staticStyle:{"background-color":"black",color:"red"}},[s("marquee",{staticStyle:{"font-size":"medium"}},[t._v(t._s(t.marquee))])],1),s("OptionsHeader"),s("SelectionHeader")],1),s("q-page",{staticClass:"row"},[s("div",{staticClass:"col-2",staticStyle:{"background-color":"lightpink"}},[s("div",{staticClass:"row",staticStyle:{"background-color":"white",height:"9.09%"}},[s("div",{staticClass:"q-ma-sm",staticStyle:{"background-color":"#ba56d4",color:"white",width:"100%"},on:{click:function(e){t.all_sets=!t.all_sets,t.all_set_call()}}},[s("q-checkbox",{attrs:{dense:""},on:{input:function(e){return t.all_set_call()}},model:{value:t.all_sets,callback:function(e){t.all_sets=e},expression:"all_sets"}}),t._v("\n          Name\n        ")],1)]),t._l(t.essentialLinks,(function(e){return s("div",{key:e.title,staticClass:"row",staticStyle:{"background-color":"white",height:"9.09%",cursor:"default","font-size":"large"}},[s("div",{staticClass:"q-ma-sm",style:t.getStyleForButton(e),on:{click:function(s){return t.pushToPage(e)}}},[s("q-checkbox",{attrs:{dense:"",value:!0},on:{click:function(s){return t.pushToPage(e)},input:function(s){return t.changeMainSelectedStates(e)}},model:{value:t.selectedSets[e.alias],callback:function(s){t.$set(t.selectedSets,e.alias,s)},expression:"selectedSets[link.alias]"}}),t._v("\n          "+t._s(e.title)+"\n        ")],1)])}))],2),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col-1 bg-light-green "},[s("div",{staticClass:"row",staticStyle:{"background-color":"white",height:"9.09%"}},[s("div",{staticClass:"col text-center font-bold q-pa-sm",staticStyle:{border:"1px solid black","font-size":"large","font-weight":"bold"}},[t._v("Pts\n        ")]),s("div",{staticClass:"col text-center font-bold q-pa-sm",staticStyle:{border:"1px solid black","font-size":"large","font-weight":"bold"}},[t._v(" SR\n        ")])]),t._l(t.essentialLinks,(function(e){return s("div",{key:e.title,staticClass:"row",staticStyle:{"background-color":"white",height:"9.09%"}},[s("div",{staticClass:"col text-center q-pa-sm",staticStyle:{border:"1px solid black","font-size":"large","font-weight":"bold"}},[t._v("\n          "+t._s(10*parseInt(t.$store.state.setPoints[e.alias]))+"\n        ")]),s("div",{staticClass:"col text-center q-pa-sm",staticStyle:{border:"1px solid black","font-size":"large","font-weight":"bold"}},[t._v("\n          "+t._s(e.alias)+"\n        ")])])}))],2),s("div",{staticClass:"col",staticStyle:{"background-color":"#eef8ff"}},[s("div",{staticClass:"row"},[s("div",{staticStyle:{width:"9.09%"}},[s("q-card",{staticClass:" text-center q-pl-sm q-pr-sm",staticStyle:{"background-color":"#eef8ff"},attrs:{flat:""}},[s("div",{staticStyle:{"font-size":"medium"}},[t._v(" SET "+t._s(this.set))])])],1),t._l(10,(function(e){return s("div",{key:e,staticStyle:{width:"9.09%"}},[s("q-card",{staticClass:" text-center q-pa-xs q-pr-xs ",staticStyle:{"background-color":"#eef8ff"},attrs:{flat:""}},[s("input",{staticClass:"text-center text-red col_cards",style:"background-color:#882ce2;".concat(";width:100%;height:100%"),attrs:{onkeypress:"return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))",type:"text",id:"col"+t.set+e},on:{input:function(s){return t.add_input_col(e)}}})])],1)}))],2),t._l(10,(function(e){return s("div",{key:e,staticClass:"row ",staticStyle:{height:"9.09%"}},[s("div",{staticStyle:{width:"9.09%"}},[s("q-card",{staticClass:" text-center q-pl-xs q-pr-xs ",staticStyle:{"background-color":"#eef8ff"},attrs:{flat:""}},[s("div",{staticStyle:{"font-size":"large"}},[t._v("  ")]),s("input",{staticClass:"text-center text-red q-pl-xs q-pr-xs row_cards",style:"background-color:#882ce2;".concat(";width:100%;height:100%"),attrs:{onkeypress:"return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))",type:"text",id:"row"+t.set+e},on:{input:function(s){return t.add_input_row(e)}}})])],1),t._l(10,(function(i){return s("div",{key:i,staticStyle:{width:"9.09%"}},[s("q-card",{staticClass:" text-center q-pl-xs q-pr-xs",staticStyle:{"background-color":"#eef8ff"},attrs:{flat:""}},[s("div",{staticStyle:{"font-size":"large"}},[t._v(" "+t._s(("0"+(10*e+i-10-1)).slice(-2)))]),s("input",{staticClass:"text-center text-red lottery_input",style:t.getStyleForInput(t.inputs[t.set][10*e+i-10-1]).concat(";width:100%;"),attrs:{onkeypress:"return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))",type:"text",id:t.set+(10*e+i-10-1),autocomplete:"off"},domProps:{value:t.inputs[t.set][10*e+i-10-1]},on:{input:function(s){return t.add_input(10*e+i-10-1,!0)}}})])],1)}))],2)}))],2),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col-2 bg-light-green "},[s("div",{staticClass:"row",staticStyle:{"background-color":"white",height:"9.09%"}},[s("div",{staticClass:"col text-center font-bold",staticStyle:{border:"1px solid black"}},[t._v(" Qty")]),s("div",{staticClass:"col text-center font-bold",staticStyle:{border:"1px solid black"}},[t._v(" Pts")])]),t._l(t.essentialLinks,(function(e){return s("div",{key:e.title,staticClass:"row",staticStyle:{"background-color":"white",height:"9.09%"}},[s("div",{staticClass:"col text-center q-pa-sm",staticStyle:{border:"1px solid black","background-color":"#7ffffe","font-size":"large","font-weight":"bold"}},[t._v("\n          "+t._s(t.quantitySet[e.alias])+"\n        ")]),s("div",{staticClass:"col text-center q-pa-sm",staticStyle:{border:"1px solid black","background-color":"#fec0ff","font-size":"large","font-weight":"bold"}},[t._v("\n          "+t._s(t.priceSet[e.alias])+"\n        ")])])}))],2)])],1)},a=[],o=(s("ddb0"),s("26e9"),s("3ed8")),n=s("8d37"),l=s("c22d"),c=s("f9fa");const r=[{title:"Set A -1",icon:"mdi-home",alias:"A",link:"A",mobile:!0},{title:"Set B -2",alias:"B",icon:"mdi-star",link:"B",mobile:!0},{title:"Set C -3",icon:"mdi-cart",alias:"C",link:"C",mobile:!0},{title:"Set D -4",icon:"mdi-account",alias:"D",link:"D",mobile:!0},{title:"Set E -5",icon:"mdi-account",alias:"E",link:"E",mobile:!0},{title:"Set F -6",icon:"mdi-account",alias:"F",link:"F",mobile:!0},{title:"Set G -7",icon:"mdi-account",alias:"G",link:"G",mobile:!0},{title:"Set H -8",icon:"mdi-account",alias:"H",link:"H",mobile:!0},{title:"Set I -9",icon:"mdi-account",alias:"I",link:"I",mobile:!0},{title:"Set J -10",icon:"mdi-account",alias:"J",link:"J",mobile:!0}];var d={name:"SelectionTable",components:{SelectionHeader:c["a"],OptionsHeader:l["a"],TimeHeader:n["a"],ResultHeader:o["a"]},props:["set"],computed:{marquee:function(){var t="";return this.$store.state.announcements.map((e=>{t+=e+", "})),t=t.slice(0,-2),t},inputs:{get(){return this.$store.state.inputs},set(t){this.$store.commit("update_inputs",{set:this.set,value:t})}},quantitySet:function(){var t={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0},e=this.$store.state.inputs;for(var s in e)for(var i in e[s])if(null!==e[s][i]&&e[s][i])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t[s]=parseInt(t[s])+parseInt(e[s][i]);return t},priceSet:function(){var t={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0},e=this.$store.state.inputs;for(var s in e){for(var i in e[s])if(null!==e[s][i]&&e[s][i])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t[s]=parseInt(t[s])+parseInt(e[s][i]);t[s]=t[s]*this.$store.state.setPoints[s]}return t},selectedSets:{get(){return this.$store.state.selectedSets},set(t){this.$store.commit("update_inputs",{set:this.set,value:t})}}},data(){return{essentialLinks:r,all_sets:!1}},methods:{all_set_call(){for(const[t,e]of Object.entries(this.selectedSets))this.selectedSets[t]=this.all_sets;this.$store.dispatch("change_selected_sets",{selectedSets:this.selectedSets,currentSet:this.set})},reverse_number(t){t>=1&&t<=9&&(t="0"+t);const e=t,s=t=>parseInt(String(t).split("").reverse().join(""),10);return s(e)},add_input_fp:function(t){var e=0,s=0,i=0,a=0;t<50?(t%10<=4&&(e=t,s=t+5,i=t+50,a=s+50),t%10>4&&(e=t,s=t-5,i=t+50,a=s+50)):t>=50&&(t%10<=4&&(e=t,s=t+5,i=t-50,a=s-50),t%10>4&&(e=t,s=t-5,i=t-50,a=s-50));var o=this.reverse_number(e),n=this.reverse_number(s),l=this.reverse_number(i),c=this.reverse_number(a);document.getElementById(this.set+i).value=document.getElementById(this.set+e).value,document.getElementById(this.set+s).value=document.getElementById(this.set+e).value,document.getElementById(this.set+a).value=document.getElementById(this.set+e).value,this.add_input(e,!1),this.add_input(s,!1),this.add_input(i,!1),this.add_input(a,!1),document.getElementById(this.set+o).value=document.getElementById(this.set+e).value,document.getElementById(this.set+n).value=document.getElementById(this.set+e).value,document.getElementById(this.set+l).value=document.getElementById(this.set+e).value,document.getElementById(this.set+c).value=document.getElementById(this.set+e).value,document.getElementById(this.set+e).classList.add("fp_selected"),document.getElementById(this.set+s).classList.add("fp_selected"),document.getElementById(this.set+i).classList.add("fp_selected"),document.getElementById(this.set+a).classList.add("fp_selected"),document.getElementById(this.set+o).classList.add("fp_selected"),document.getElementById(this.set+n).classList.add("fp_selected"),document.getElementById(this.set+l).classList.add("fp_selected"),document.getElementById(this.set+c).classList.add("fp_selected"),this.add_input(o,!1),this.add_input(n,!1),this.add_input(l,!1),this.add_input(c,!1)},add_input:function(t,e){!0===this.$store.state.fp&&!0===e&&this.add_input_fp(t),!1===this.$store.state.fp&&document.getElementById(this.set+t).classList.remove("fp_selected");for(const[s,i]of Object.entries(this.selectedSets))!0===i&&this.$store.dispatch("add_input",{set:s,number:t,quantity:document.getElementById(this.set+t).value});this.$store.dispatch("add_input",{set:this.set,number:t,quantity:document.getElementById(this.set+t).value})},add_input_col:function(t){for(var e=0;e<10;e++)"Even"===this.$store.state.selection_group&&(10*e+(t-1))%2!==0||"Odd"===this.$store.state.selection_group&&(10*e+(t-1))%2===0||(document.getElementById(this.set+(10*e+(t-1))).value=document.getElementById("col"+this.set+t).value,this.add_input(10*e+(t-1),!0))},add_input_row:function(t){for(var e=0;e<10;e++)"Even"===this.$store.state.selection_group&&(e+10*(t-1))%2!==0||"Odd"===this.$store.state.selection_group&&(e+10*(t-1))%2===0||(document.getElementById(this.set+(e+10*(t-1))).value=document.getElementById("row"+this.set+t).value,this.add_input(e+10*(t-1),!0))},add_input_all:function(t){},changeMainSelectedStates:function(t){this.$store.dispatch("change_selected_sets",{selectedSets:this.selectedSets,currentSet:this.set}),this.$router.push({path:"SelectionTable/"+t.alias,name:"SelectionTable",params:{set:t.alias}})},getStyleForButton:function(t){return t.alias===this.set||!0===this.selectedSets[t.alias]?"background-color: red; color: white;width: 100%;font-size:medium":"background-color: #ba56d4; color: white;width: 100%;font-size:medium"},getStyleForInput(t){return t&&0!=t&&null!=t?"color:#c50a46; font-weight:bold ;border:1px solid black;":"border:1px solid black; background-color:white;"},pushToPage:function(t){this.$router.push({path:"SelectionTable/"+t.alias,name:"SelectionTable",params:{set:t.alias}})}},mounted(){},created(){},updated(){},watch:{set:function(t){}}};$((function(){var t;$(document).on("focus","input",(function(){t!=this&&(t=this,setTimeout((function(){t.select()}),100))}))}));var u=d,f=(s("2b92"),s("2877")),m=s("e359"),h=s("9989"),p=s("8f8e"),v=s("f09f"),g=s("eebe"),_=s.n(g),b=Object(f["a"])(u,i,a,!1,null,"2a3e2216",null);e["default"]=b.exports;_()(b,"components",{QHeader:m["a"],QPage:h["a"],QCheckbox:p["a"],QCard:v["a"]})},f9fa:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row",staticStyle:{"background-color":"#ffff00",color:"black"}},[t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col-5"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("2D Coupon")]),s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("JD")]),s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("3D Coupon")])],1),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("Point-2")]),s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("Pointwise")])],1)]),s("div",{staticClass:"col"}),s("div",{staticClass:"col"})])]),s("div",{staticClass:"col",staticStyle:{"background-color":"#eef8ff"}},[s("div",{staticClass:"row"}),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"row",staticStyle:{"background-color":"#eef8ff"}},[s("div",{staticClass:"col-8"},[s("q-option-group",{attrs:{options:t.options,color:"primary",inline:""},on:{input:function(e){return t.change_selection_option()}},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}})],1),s("div",{staticClass:"col-2"}),s("q-checkbox",{on:{input:function(e){return t.change_fp_selection()}},model:{value:t.fP,callback:function(e){t.fP=e},expression:"fP"}},[t._v("FP")])],1)]),s("div",{staticClass:"col text-left"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:" col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/Results"})}}},[t._v("Results")]),s("q-btn",{staticClass:" col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/MoreDraws"})}}},[t._v("More Draws")])],1)])])},a=[],o=s("2a19"),n={name:"SelectionHeader",methods:{change_selection_option:function(){this.$store.dispatch("change_selection_option",this.group)},change_fp_selection:function(){this.$store.dispatch("fp_selection",this.fP)},coming_soon:function(){o["a"].create({type:"info",progress:!0,message:"<h6>This feature is coming soon</h6>",position:"center",timeout:3e3,html:!0,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}},data(){return{group:"All",options:[{label:"All",value:"All"},{label:"Even",value:"Even"},{label:"Odd",value:"Odd"}],fP:!1}}},l=n,c=s("2877"),r=s("9c40"),d=s("9f0a"),u=s("8f8e"),f=s("eebe"),m=s.n(f),h=Object(c["a"])(l,i,a,!1,null,"6f18e96f",null);e["a"]=h.exports;m()(h,"components",{QBtn:r["a"],QOptionGroup:d["a"],QCheckbox:u["a"]})}}]);