(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"713b":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-layout",{attrs:{view:"hHh lpR fFf"}},[o("q-page-container",[o("router-view")],1),o("q-footer",{staticClass:" text-white",attrs:{bordered:""}},[o("Footer")],1)],1)},a=[],i=(o("3ed8"),o("8d37"),function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("q-card-section")],1)}),n=[],l={name:"TicketDetailDrawer",computed:{selection_state(){return this.$store.state.selectionState},selection:function(){var t=[],e=this.$store.getters.get_selected;for(var o in e)return e.hasOwnProperty(o)&&(t.push({number:o,price:e[o]["price"],quantity:e[o]["quantity"]}),console.log(o,e[o])),t;return this.$store.getters.get_selected}},watch:{"this.$store.state.selectionState":function(){console.log("watcher received"),console.log(val)}},created(){console.log(this.$store.getters.get_selected)}},c=l,r=o("2877"),u=o("a370"),d=o("eebe"),f=o.n(d),m=Object(r["a"])(c,i,n,!1,null,"71ae95c2",null);m.exports;f()(m,"components",{QCardSection:u["a"]});o("0150"),o("c22d"),o("f9fa");var h=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row",staticStyle:{"background-color":"white"}},[o("div",{staticClass:"col-3",staticStyle:{border:"1px solid black"}},[o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("q-input",{staticClass:"q-ma-sm",attrs:{dense:"",outlined:"",id:"final_barcode"},model:{value:t.barCodeNumber,callback:function(e){t.barCodeNumber=e},expression:"barCodeNumber"}})],1),o("q-btn",{staticClass:"q-ma-sm bg-purple col",attrs:{unelevated:""},on:{click:function(e){return t.claim_result()}}},[t._v("Claim")])],1)]),o("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:""},on:{click:function(e){return t.$router.push({path:"/TxnDetails"})}}},[t._v("Txn Details")]),o("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:""},on:{click:function(e){return t.reset_all()}}},[t._v("Reset all")]),o("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:"",id:"buy_button"},on:{click:function(e){return t.place_ticket_order()}}},[t._v("Buy")]),o("div",{staticClass:"col text-center q-pa-sm text-black",staticStyle:{"font-weight":"bold","font-size":"large"}},[t._v("Total")]),o("div",{staticClass:"col-2"},[o("div",{staticClass:"row",staticStyle:{"background-color":"white",height:"100%"}},[o("div",{staticClass:"col text-center text-black",staticStyle:{border:"1px solid black","background-color":"white","font-size":"large","font-weight":"bold"}},[t._v(" "+t._s(t.quantitySet))]),o("div",{staticClass:"col text-center text-black",staticStyle:{border:"1px solid black","background-color":"white","font-size":"large","font-weight":"bold"}},[t._v(" "+t._s(t.priceSet))])])])],1)},p=[],b=o("c993"),v=o("2a19"),g=o("90b9"),_={name:"Footer",components:{},computed:{quantitySet:function(){var t=0,e=this.$store.state.inputs;for(var o in e)for(var s in e[o])if(null!==e[o][s]&&e[o][s])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t=parseInt(t)+parseInt(e[o][s]);return t},priceSet:function(){var t={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0},e=this.$store.state.inputs;for(var o in e){for(var s in e[o])if(null!==e[o][s]&&e[o][s])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t[o]=parseInt(t[o])+parseInt(e[o][s]);t[o]=t[o]*this.$store.state.setPoints[o]}return o,t.A+t.B+t.C+t.D+t.E+t.F+t.G+t.H+t.I+t.J}},methods:{claim_result:function(){var t=this.barCodeNumber,e={ticket_id:t};Object(b["b"])(e).then((t=>{console.log(t),200==t.status_code?(v["a"].create({type:"positive",progress:!0,message:"<h6>You have won "+t["ticket"]["inflow"]+" points for "+t["ticket"]["ticket_id"]+"</h6>",position:"center",timeout:8e3,html:!0,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]}),Object(g["f"])(t["ticket"],!0)):v["a"].create({type:"negative",progress:!0,message:"<h6>"+e["ticket_id"]+":  "+t["status_message"]+"</h6>",position:"center",html:!0,timeout:8e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}))},place_ticket_order:function(){var t=this.$store.state.selected_lotteries.map((t=>t.id));0===t.length&&(t=[this.$store.state.nextLottery]);var e={selected_lotteries:t,selection:this.$store.state.selectionState};console.log(e);const o=this.$store;Object(b["i"])(e).then((t=>{if(200===t.status_code){console.log(t),o.dispatch("update_balance_points",t.balance_points);t.tickets.map((e=>(v["a"].create({type:"positive",progress:!0,message:"Ticket booked "+e.ticket_id+" Points "+e.total_price+" Qty "+e.total_quantity,position:"top-right",timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]}),t.tickets.map((t=>{Object(g["f"])(t)})),e.ticket_id)));this.$store.dispatch("reset_all")}else v["a"].create({type:"negative",progress:!0,message:"Ticket could not be booked due to error "+t.message,position:"top-right",timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}))},logout(){return this.$q.localStorage.set("token",""),this.$router.push({path:"/Login"})},reset_all(){this.$store.dispatch("reset_all")},update_results(){Object(b["h"])({lottery_id:this.$store.state.previousLottery.id}).then((t=>{this.$store.dispatch("set_results",t.lottery_winners_ticket),this.$store.dispatch("set_announcements",t.announcements)}))}},data(){return{barCodeNumber:""}}},k=_,C=o("27f9"),y=o("9c40"),w=Object(r["a"])(k,h,p,!1,null,"6d11bf69",null),S=w.exports;f()(w,"components",{QInput:C["a"],QBtn:y["a"]});const $=[{title:"Set A -1",icon:"mdi-home",alias:"A",link:"A",mobile:!0},{title:"Set B -2",alias:"B",icon:"mdi-star",link:"B",mobile:!0},{title:"Set C -3",icon:"mdi-cart",alias:"C",link:"C",mobile:!0},{title:"Set D -4",icon:"mdi-account",alias:"D",link:"D",mobile:!0},{title:"Set E -4",icon:"mdi-account",alias:"E",link:"E",mobile:!0},{title:"Set F -4",icon:"mdi-account",alias:"F",link:"F",mobile:!0},{title:"Set G -4",icon:"mdi-account",alias:"G",link:"G",mobile:!0},{title:"Set H -4",icon:"mdi-account",alias:"H",link:"H",mobile:!0},{title:"Set I -4",icon:"mdi-account",alias:"I",link:"I",mobile:!0},{title:"Set J -4",icon:"mdi-account",alias:"J",link:"J",mobile:!0}];var q={name:"MainLayout",components:{Footer:S},methods:{changeMainSelectedStates:function(){console.log("changing state"),this.$store.dispatch("change_selected_sets",this.selectedSets)}},computed:{logged_in:function(){const t=this.$q.localStorage.getItem("token");return""!==t&&null!==t&&"null"!==t},currentRouteName:function(){return this.$route.name}},data(){return{essentialLinks:$,left:!0,right:!1,selectedSets:{A:!1,B:!1,C:!1,D:!1,E:!1,F:!1,G:!1,H:!1,I:!1,J:!1}}},created(){this.logged_in||this.$router.push("Login")}},x=q,D=o("4d5a"),T=o("9404"),O=o("09e3"),I=o("7ff0"),L=Object(r["a"])(x,s,a,!1,null,null,null);e["default"]=L.exports;f()(L,"components",{QLayout:D["a"],QDrawer:T["a"],QPageContainer:O["a"],QFooter:I["a"]})},"8d37":function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Date : "+t._s(t.get_current_date)+" ")]),o("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Time : "+t._s(t.currentTime))])]),t._m(0),o("div",{staticClass:"col"},[o("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),o("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"},attrs:{id:"left-time"}},[t._v("\n      Left time : "+t._s(t.leftTime)+"\n    ")])])])},a=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ee82ef"}},[o("div",{staticClass:"text-center font-bold q-ma-md",staticStyle:{color:"black","font-size":"xx-large"}},[t._v("STAR SKILL GAME")])])}],i=o("90b9"),n={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){var t=new Date,e=t.getTimezoneOffset(),o=330,s=new Date(t.getTime()+6e4*(o+e)),a=s.getHours(),i=s.getMinutes();this.currentTime=a+":"+i+" "},calculateLefttime(){try{var t=this.$store.state.nextLottery.time;null==t&&(this.leftTime="");var e=Object(i["c"])(t).getTime()-(new Date).getTime(),o=Math.floor(e/1e3/60/60);e-=1e3*o*60*60;var s=Math.floor(e/1e3/60);e-=1e3*s*60;var a=Math.floor(e/1e3);e-=1e3*a,this.leftTime=o+":"+s+":"+a,0==parseInt(s)&&parseInt(a)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(n){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var t=this.$store.state.nextLottery.time;if(null==t)return"";var e=Object(i["c"])(t),o=e.getHours(),s=e.getMinutes(),a=e.getSeconds();return o+":"+s+" "+a}catch(n){return""}},get_current_date:function(){var t=Object(i["c"])(new Date);return t.toLocaleDateString("en-US")}},created(){const t=this.calculateLefttime,e=this.calculateCurrentTime;setInterval((function(){t(),e()}),1e3)}},l=n,c=o("2877"),r=Object(c["a"])(l,s,a,!1,null,"065183d2",null);e["a"]=r.exports},c22d:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row",staticStyle:{"background-color":"#13fba5",color:"black"}},[o("div",{staticClass:"col q-ma-sm"},[t._v("\n    Terminal Id: "+t._s(t.user_id)+"   "+t._s(t.first_name)+"\n  ")]),o("div",{staticClass:"col q-ma-sm"},[t._v("\n    Available points :"),o("span",{staticStyle:{"font-weight":"bold","font-size":"medium",color:"darkred"}},[t._v(t._s(t.$store.state.balance_points))])]),o("q-space"),o("div",{},[o("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""},on:{click:function(e){return t.$router.push({path:"/MyAccounts"})}}},[t._v("My accounts")])],1),o("div",{},[o("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""}},[t._v("Password ")])],1),o("div",{},[o("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""},on:{click:function(e){return t.logout()}}},[t._v("Logout")])],1)],1)},a=[],i=o("2a19"),n={name:"OptionsHeader",computed:{first_name(){return null!=this.$store.state.user?this.$store.state.user.first_name:""},user_id(){return null!=this.$store.state.user?this.$store.state.user.id:""}},data(){return{points_available:12}},methods:{logout(){return this.$q.localStorage.set("token",""),i["a"].create({message:"You have been logged out",position:"top-right"}),this.$router.push({path:"/Login"})}}},l=n,c=o("2877"),r=o("2c91"),u=o("9c40"),d=o("eebe"),f=o.n(d),m=Object(c["a"])(l,s,a,!1,null,"28af8c73",null);e["a"]=m.exports;f()(m,"components",{QSpace:r["a"],QBtn:u["a"]})},f9fa:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row",staticStyle:{"background-color":"#ffff00",color:"black"}},[o("div",{staticClass:"col-5"},[o("div",{staticClass:"row"},[o("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("2D Coupon")]),o("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("JD")]),o("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("3D Coupon")])],1),o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("div",{staticClass:"row"},[o("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("Point-2")]),o("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("Pointwise")])],1)]),o("div",{staticClass:"col"}),o("div",{staticClass:"col"})])]),o("div",{staticClass:"col",staticStyle:{"background-color":"#eef8ff"}},[o("div",{staticClass:"row"}),o("div",{staticClass:"row",staticStyle:{"background-color":"#eef8ff"}},[o("div",{staticClass:"col-8"},[o("q-option-group",{attrs:{options:t.options,color:"primary",inline:""},on:{input:function(e){return t.change_selection_option()}},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}})],1),o("div",{staticClass:"col-2"}),o("q-checkbox",{on:{input:function(e){return t.change_fp_selection()}},model:{value:t.fP,callback:function(e){t.fP=e},expression:"fP"}},[t._v("FP")])],1)]),o("div",{staticClass:"col text-left"},[o("div",{staticClass:"row"},[o("q-btn",{staticClass:" col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/Results"})}}},[t._v("Results")]),o("q-btn",{staticClass:" col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/MoreDraws"})}}},[t._v("More Draws")])],1)])])},a=[],i=o("2a19"),n={name:"SelectionHeader",methods:{change_selection_option:function(){this.$store.dispatch("change_selection_option",this.group)},change_fp_selection:function(){this.$store.dispatch("fp_selection",this.fP)},coming_soon:function(){i["a"].create({type:"info",progress:!0,message:"<h6>This feature is coming soon</h6>",position:"center",timeout:3e3,html:!0,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}},data(){return{group:"All",options:[{label:"All",value:"All"},{label:"Even",value:"Even"},{label:"Odd",value:"Odd"}],fP:!1}}},l=n,c=o("2877"),r=o("9c40"),u=o("9f0a"),d=o("8f8e"),f=o("eebe"),m=o.n(f),h=Object(c["a"])(l,s,a,!1,null,"e21beda2",null);e["a"]=h.exports;m()(h,"components",{QBtn:r["a"],QOptionGroup:u["a"],QCheckbox:d["a"]})}}]);