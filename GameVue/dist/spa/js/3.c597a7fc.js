(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"713b":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-layout",{attrs:{view:"hHh lpR fFf"}},[s("q-page-container",[s("router-view")],1),s("q-footer",{staticClass:" text-white",attrs:{bordered:""}},[s("Footer")],1)],1)},o=[],i=(s("3ed8"),s("8d37"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("q-card-section")],1)}),l=[],n={name:"TicketDetailDrawer",computed:{selection_state(){return this.$store.state.selectionState},selection:function(){var t=[],e=this.$store.getters.get_selected;for(var s in e)return e.hasOwnProperty(s)&&(t.push({number:s,price:e[s]["price"],quantity:e[s]["quantity"]}),console.log(s,e[s])),t;return this.$store.getters.get_selected}},watch:{"this.$store.state.selectionState":function(){console.log("watcher received"),console.log(val)}},created(){console.log(this.$store.getters.get_selected)}},r=n,c=s("2877"),u=s("a370"),d=s("eebe"),p=s.n(d),m=Object(c["a"])(r,i,l,!1,null,"71ae95c2",null);m.exports;p()(m,"components",{QCardSection:u["a"]});s("0150"),s("c22d"),s("f9fa");var f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row",staticStyle:{"background-color":"white"}},[s("div",{staticClass:"col-3",staticStyle:{border:"1px solid black"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.barCodeNumber,expression:"barCodeNumber"}],staticClass:"q-ml-md",staticStyle:{width:"50%"},attrs:{id:"final_barcode"},domProps:{value:t.barCodeNumber},on:{input:function(e){e.target.composing||(t.barCodeNumber=e.target.value)}}}),s("q-btn",{staticClass:"bg-purple col q-ml-lg ",staticStyle:{border:"1px solid black"},attrs:{unelevated:""},on:{click:function(e){return t.claim_result()}}},[t._v("Claim")])],1),s("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:""},on:{click:function(e){return t.update_results()}}},[t._v("Update Results")]),s("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:""},on:{click:function(e){return t.$router.push({path:"/TxnDetails"})}}},[t._v("Txn Details")]),s("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:""},on:{click:function(e){return t.reset_all()}}},[t._v("Reset all")]),s("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:"",id:"buy_button"},on:{click:function(e){return t.place_ticket_order()}}},[t._v("Buy")]),s("div",{staticClass:"col text-center q-pa-sm text-black",staticStyle:{"font-weight":"bold","font-size":"large"}},[t._v("Grand Total")]),s("div",{staticClass:"col-2"},[s("div",{staticClass:"row",staticStyle:{"background-color":"white",height:"100%"}},[s("div",{staticClass:"col text-center text-black",staticStyle:{border:"1px solid black","background-color":"white","font-size":"large","font-weight":"bold"}},[t._v(" "+t._s(t.quantitySet))]),s("div",{staticClass:"col text-center text-black",staticStyle:{border:"1px solid black","background-color":"white","font-size":"large","font-weight":"bold"}},[t._v(" "+t._s(t.priceSet))])])])],1)},b=[],h=s("c993"),v=s("2a19"),g=s("90b9"),_={name:"Footer",components:{},computed:{quantitySet:function(){var t=0,e=this.$store.state.inputs;for(var s in e)for(var a in e[s])if(null!==e[s][a]&&e[s][a])for(var o=0;o<this.$store.state.selected_lotteries.length;o++)t=parseInt(t)+parseInt(e[s][a]);return t},priceSet:function(){var t={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0},e=this.$store.state.inputs;for(var s in e){for(var a in e[s])if(null!==e[s][a]&&e[s][a])for(var o=0;o<this.$store.state.selected_lotteries.length;o++)t[s]=parseInt(t[s])+parseInt(e[s][a]);t[s]=t[s]*this.$store.state.setPoints[s]}return s,t.A+t.B+t.C+t.D+t.E+t.F+t.G+t.H+t.I+t.J}},methods:{claim_result:function(){var t=document.getElementById("final_barcode").value,e={ticket_id:t};Object(h["b"])(e).then((t=>{console.log(t),200==t.status_code?(v["a"].create({type:"positive",progress:!0,message:"Ticket can be claimed",position:"top-right",timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]}),Object(g["f"])(t["ticket"],!0)):v["a"].create({type:"negative",progress:!0,message:t["status_message"],position:"top-right",timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}))},place_ticket_order:function(){var t={selected_lotteries:this.$store.state.selected_lotteries.map((t=>t.id)),selection:this.$store.state.selectionState};console.log(t);const e=this.$store;Object(h["i"])(t).then((t=>{if(200===t.status_code){console.log(t),e.dispatch("update_balance_points",t.balance_points);t.tickets.map((e=>(v["a"].create({type:"positive",progress:!0,message:"Ticket booked "+e.ticket_id+" Points "+e.total_price+" Qty "+e.total_quantity,position:"top-right",timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]}),t.tickets.map((t=>{Object(g["f"])(t)})),e.ticket_id)));this.$store.dispatch("reset_all")}else v["a"].create({type:"negative",progress:!0,message:"Ticket could not be booked due to error "+t.message,position:"top-right",timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}))},logout(){return this.$q.localStorage.set("token",""),this.$router.push({path:"/Login"})},reset_all(){this.$store.dispatch("reset_all")},update_results(){this.$router.push({name:"DiceRotation"}),Object(h["h"])({lottery_id:this.$store.state.previousLottery.id}).then((t=>{this.$store.dispatch("set_results",t.lottery_winners_ticket),this.$store.dispatch("set_announcements",t.announcements)}))}},data(){return{barCodeNumber:""}}},k=_,C=s("9c40"),y=Object(c["a"])(k,f,b,!1,null,"56f776dc",null),S=y.exports;p()(y,"components",{QBtn:C["a"]});const w=[{title:"Set A -1",icon:"mdi-home",alias:"A",link:"A",mobile:!0},{title:"Set B -2",alias:"B",icon:"mdi-star",link:"B",mobile:!0},{title:"Set C -3",icon:"mdi-cart",alias:"C",link:"C",mobile:!0},{title:"Set D -4",icon:"mdi-account",alias:"D",link:"D",mobile:!0},{title:"Set E -4",icon:"mdi-account",alias:"E",link:"E",mobile:!0},{title:"Set F -4",icon:"mdi-account",alias:"F",link:"F",mobile:!0},{title:"Set G -4",icon:"mdi-account",alias:"G",link:"G",mobile:!0},{title:"Set H -4",icon:"mdi-account",alias:"H",link:"H",mobile:!0},{title:"Set I -4",icon:"mdi-account",alias:"I",link:"I",mobile:!0},{title:"Set J -4",icon:"mdi-account",alias:"J",link:"J",mobile:!0}];var $={name:"MainLayout",components:{Footer:S},methods:{changeMainSelectedStates:function(){console.log("changing state"),this.$store.dispatch("change_selected_sets",this.selectedSets)}},computed:{logged_in:function(){const t=this.$q.localStorage.getItem("token");return""!==t&&null!==t&&"null"!==t},currentRouteName:function(){return this.$route.name}},data(){return{essentialLinks:w,left:!0,right:!1,selectedSets:{A:!1,B:!1,C:!1,D:!1,E:!1,F:!1,G:!1,H:!1,I:!1,J:!1}}},created(){this.logged_in||this.$router.push("Login")}},q=$,x=s("4d5a"),D=s("9404"),T=s("09e3"),O=s("7ff0"),E=Object(c["a"])(q,a,o,!1,null,null,null);e["default"]=E.exports;p()(E,"components",{QLayout:x["a"],QDrawer:D["a"],QPageContainer:T["a"],QFooter:O["a"]})},"8d37":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Date : "+t._s(t.get_current_date)+" ")]),s("div",{staticClass:" q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"}},[t._v("Current Time : "+t._s(t.currentTime))])]),t._m(0),s("div",{staticClass:"col"},[s("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"large"}},[t._v("\n      Next Draw time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),s("div",{staticClass:"row q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"large"},attrs:{id:"left-time"}},[t._v("\n      Left time : "+t._s(t.leftTime)+"\n    ")])])])},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ee82ef"}},[s("div",{staticClass:"text-center font-bold q-ma-md",staticStyle:{color:"black","font-size":"xx-large"}},[t._v("STAR SKILL GAME")])])}],i=s("90b9"),l={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){var t=new Date,e=t.getTimezoneOffset(),s=330,a=new Date(t.getTime()+6e4*(s+e)),o=a.getHours(),i=a.getMinutes();this.currentTime=o+":"+i+" "},calculateLefttime(){try{var t=this.$store.state.nextLottery.time;null==t&&(this.leftTime="");var e=Object(i["c"])(t).getTime()-(new Date).getTime(),s=Math.floor(e/1e3/60/60);e-=1e3*s*60*60;var a=Math.floor(e/1e3/60);e-=1e3*a*60;var o=Math.floor(e/1e3);e-=1e3*o,this.leftTime=s+":"+a+":"+o,0==parseInt(a)&&parseInt(o)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(l){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var t=this.$store.state.nextLottery.time;if(null==t)return"";var e=Object(i["c"])(t),s=e.getHours(),a=e.getMinutes(),o=e.getSeconds();return s+":"+a+" "+o}catch(l){return""}},get_current_date:function(){var t=Object(i["c"])(new Date);return t.toLocaleDateString("en-US")}},created(){const t=this.calculateLefttime,e=this.calculateCurrentTime;setInterval((function(){t(),e()}),1e3)}},n=l,r=s("2877"),c=Object(r["a"])(n,a,o,!1,null,"065183d2",null);e["a"]=c.exports},c22d:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row",staticStyle:{"background-color":"#13fba5",color:"black"}},[s("div",{staticClass:"col q-ma-sm"},[t._v("\n    Terminal Id: "+t._s(t.user_id)+"   "+t._s(t.first_name)+"\n  ")]),s("div",{staticClass:"col q-ma-sm"},[t._v("\n    Available points :"),s("span",{staticStyle:{"font-weight":"bold","font-size":"medium",color:"darkred"}},[t._v(t._s(t.$store.state.balance_points))])]),s("q-space"),s("div",{},[s("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""},on:{click:function(e){return t.$router.push({path:"/MyAccounts"})}}},[t._v("My accounts")])],1),s("div",{},[s("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""}},[t._v("Password ")])],1),s("div",{},[s("q-btn",{staticStyle:{color:"#033aca"},attrs:{flat:""},on:{click:function(e){return t.logout()}}},[t._v("Logout")])],1)],1)},o=[],i=s("2a19"),l={name:"OptionsHeader",computed:{first_name(){return null!=this.$store.state.user?this.$store.state.user.first_name:""},user_id(){return null!=this.$store.state.user?this.$store.state.user.id:""}},data(){return{points_available:12}},methods:{logout(){return this.$q.localStorage.set("token",""),i["a"].create({message:"You have been logged out",position:"top-right"}),this.$router.push({path:"/Login"})}}},n=l,r=s("2877"),c=s("2c91"),u=s("9c40"),d=s("eebe"),p=s.n(d),m=Object(r["a"])(n,a,o,!1,null,"28af8c73",null);e["a"]=m.exports;p()(m,"components",{QSpace:c["a"],QBtn:u["a"]})},f9fa:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row",staticStyle:{"background-color":"#ffff00",color:"black"}},[s("div",{staticClass:"col-5"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""}},[t._v("2D Coupon")]),s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""}},[t._v("JD")]),s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""}},[t._v("3D Coupon")])],1),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""}},[t._v("Point-2")]),s("q-btn",{staticClass:"col",attrs:{color:"",unelevated:"",outline:""}},[t._v("Pointwise")])],1)]),s("div",{staticClass:"col"}),s("div",{staticClass:"col"})])]),s("div",{staticClass:"col",staticStyle:{"background-color":"#eef8ff"}},[s("div",{staticClass:"row"}),s("div",{staticClass:"row",staticStyle:{"background-color":"#eef8ff"}},[s("div",{staticClass:"col-8"},[s("q-option-group",{attrs:{options:t.options,color:"primary",inline:""},on:{input:function(e){return t.change_selection_option()}},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}})],1),s("div",{staticClass:"col-2"}),s("div",{staticClass:"col-2"},[s("q-checkbox",{on:{input:function(e){return t.change_fp_selection()}},model:{value:t.fP,callback:function(e){t.fP=e},expression:"fP"}},[t._v("FP")])],1)])]),s("div",{staticClass:"col text-left"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:" col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/Results"})}}},[t._v("Results")]),s("q-btn",{staticClass:" col",attrs:{color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/MoreDraws"})}}},[t._v("More Draws")])],1)])])},o=[],i={name:"SelectionHeader",methods:{change_selection_option:function(){this.$store.dispatch("change_selection_option",this.group)},change_fp_selection:function(){this.$store.dispatch("fp_selection",this.fP)}},data(){return{group:"All",options:[{label:"All",value:"All"},{label:"Even",value:"Even"},{label:"Odd",value:"Odd"}],fP:!1}}},l=i,n=s("2877"),r=s("9c40"),c=s("9f0a"),u=s("8f8e"),d=s("eebe"),p=s.n(d),m=Object(n["a"])(l,a,o,!1,null,"58935e18",null);e["a"]=m.exports;p()(m,"components",{QBtn:r["a"],QOptionGroup:c["a"],QCheckbox:u["a"]})}}]);