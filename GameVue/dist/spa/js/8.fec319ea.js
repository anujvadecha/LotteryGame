(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{e84b:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[t.$q.platform.is.mobile?t._e():a("ResultHeader"),a("q-card",{staticClass:"row justify-end",attrs:{bordered:"",flat:""}},[a("q-input",{staticClass:"q-pa-md ",attrs:{dense:"",filled:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD"},model:{value:t.start_date,callback:function(s){t.start_date=s},expression:"start_date"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.start_date,callback:function(s){t.start_date=s},expression:"start_date"}}),a("q-input",{staticClass:"q-pa-md ",attrs:{dense:"",filled:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD"},model:{value:t.end_date,callback:function(s){t.end_date=s},expression:"end_date"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.end_date,callback:function(s){t.end_date=s},expression:"end_date"}}),a("q-btn",{staticClass:"q-ma-md",attrs:{color:"primary",unelevated:""},on:{click:function(s){return t.fetch_transaction_according_to_date()}}},[t._v(" Go ")])],1),a("div",{attrs:{id:"account_details"}},[a("q-card-section",{staticClass:"row",staticStyle:{"font-size":"x-large"}},[t._v("\n     SHREE ONLINE VIDEO GAME\n     ")]),a("q-card-section",{staticStyle:{"font-size":"large"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[t._v("From: "+t._s(this.start_date))]),a("div",{staticClass:"col"},[t._v("To: "+t._s(this.end_date)+" ")])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[t._v("Play Points: ")]),a("div",{staticClass:"col"},[t._v(t._s(t.total_inflow))])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[t._v("Win Points")]),a("div",{staticClass:"col"},[t._v(t._s(t.total_outflow))])]),"AGENT"===this.user_type?a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[t._v("End Points")]),a("div",{staticClass:"col"},[t._v(t._s(t.total_inflow-t.total_outflow))])]):t._e(),"AGENT"===this.user_type?a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[t._v(" Profit ")]),a("div",{staticClass:"col"},[t._v(t._s(Math.round(t.total_inflow*(t.commission/100))))])]):t._e(),"AGENT"===this.user_type?a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[t._v(" Net To Payable Points ")]),a("div",{staticClass:"col"},[t._v(t._s(Math.round(t.total_inflow-t.total_outflow)-t.total_inflow*(t.commission/100)))])]):t._e()])],1),a("q-card",{staticClass:"row absolute-bottom",attrs:{bordered:"",flat:""}},[a("q-btn",{staticClass:"col-2 q-ma-md",attrs:{color:"blue",unelevated:""},on:{click:function(s){return t.$router.push({path:"/"})}}},[t._v("Back")]),a("q-btn",{staticClass:"col-2 q-ma-md",attrs:{color:"orange",unelevated:""},on:{click:function(s){return t.print_account()}}},[t._v("Print")]),a("q-btn",{staticClass:"col-2 q-ma-md",attrs:{color:"black",unelevated:""},on:{click:function(s){return t.refresh()}}},[t._v("Refresh")])],1)],1)},o=[],n=a("3ed8"),i=a("c993"),l=a("90b9"),c={name:"MyAccounts",components:{ResultHeader:n["a"]},data(){return{start_date:Object(l["d"])(),end_date:Object(l["d"])(),total_outflow:"",total_inflow:"",total_pending:"",commission:0,user_type:"PLAYER"}},methods:{print_account(){var t=document.getElementById("account_details").innerHTML,s=document.body.innerHTML;document.body.innerHTML=t,window.print(),document.body.innerHTML=s},refresh(){console.log(this.start_date),console.log(this.end_date);var t={start_date:this.start_date,end_date:this.end_date};Object(i["f"])(t).then((t=>{console.log(t),this.user_type=t.user.user_type,this.total_inflow=t.outflow,this.total_outflow=t.inflow,this.total_pending=t.balance_points}))},fetch_transaction_according_to_date(){console.log(this.start_date),console.log(this.end_date);var t={start_date:this.start_date,end_date:this.end_date};Object(i["f"])(t).then((t=>{console.log(t),this.user_type=t.user.user_type,this.total_inflow=t.outflow,this.total_outflow=t.inflow,this.total_pending=t.balance_points})),console.log(this.total_inflow)}},created(){console.log("created my accounts"),Object(i["f"])(null).then((t=>{this.user_type=t.user.user_type,this.total_inflow=t.outflow,this.total_outflow=t.inflow,this.total_pending=t.balance_points,this.commission=t.commission}))}},r=c,d=a("2877"),_=a("f09f"),u=a("27f9"),p=a("0016"),f=a("7cbe"),v=a("52ee"),m=a("9c40"),h=a("a370"),w=a("7f67"),b=a("eebe"),C=a.n(b),y=Object(d["a"])(r,e,o,!1,null,"2a2ed06c",null);s["default"]=y.exports;C()(y,"components",{QCard:_["a"],QInput:u["a"],QIcon:p["a"],QPopupProxy:f["a"],QDate:v["a"],QBtn:m["a"],QCardSection:h["a"]}),C()(y,"directives",{ClosePopup:w["a"]})}}]);