(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"713b":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-layout",{attrs:{view:"hHh lpR fFf"}},[t.$q.platform.is.mobile?s("q-header",{staticStyle:{"font-family":"Times New Roman"}},[s("q-toolbar",{staticClass:"shadow-2 bg-purple"},[s("q-toolbar-title",[s("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}),t._v("\n        Star skill game")],1)],1),s("q-expansion-item",{staticClass:"text-dark col-12 bg-white justify-evenly",staticStyle:{"font-weight":"bold"},attrs:{"header-style":"background-color:white; color:black;"},scopedSlots:t._u([{key:"header",fn:function(){return[t._v("\n              Total\n             "),s("div",{staticClass:"col text-center text-black",staticStyle:{"background-color":"white","font-weight":"bold"}},[t._v(" Quantity "+t._s(t.quantitySet))]),s("div",{staticClass:"col text-center text-black",staticStyle:{"background-color":"white","font-weight":"bold"}},[t._v("  Price "+t._s(t.priceSet))])]},proxy:!0}],null,!1,3429529280)},[s("ResultHeader"),s("TimeHeader"),s("OptionsHeader")],1)],1):t._e(),t.$q.platform.is.mobile?t._e():s("q-header",["DiceRotation"!==t.currentRouteName?s("ResultHeader"):t._e(),"SelectionTable"===t.currentRouteName?s("TimeHeader"):t._e(),"SelectionTable"===t.currentRouteName?s("div",{staticStyle:{"background-color":"black",color:"red"}},[s("marquee",{staticStyle:{"font-size":"large",color:"#41c32c","font-weight":"bolder"}},[t._v(t._s(t.marquee))])],1):t._e(),"SelectionTable"===t.currentRouteName?s("OptionsHeader"):t._e(),"SelectionTable"===t.currentRouteName?s("SelectionHeader"):t._e()],1),t.$q.platform.is.mobile?s("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-grey-1"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[s("q-scroll-area",{staticStyle:{height:"calc(100% - 150px)","margin-top":"150px","border-right":"1px solid #ddd"}},[s("EssentialLink",{attrs:{title:"Buy",link:"/SelectionTable/A"}}),s("EssentialLink",{attrs:{title:"Results",link:"/Results"}}),s("EssentialLink",{attrs:{title:"My accounts",link:"/MyAccounts"}}),s("EssentialLink",{attrs:{title:"More Draws",link:"/MoreDraws"}}),s("EssentialLink",{attrs:{title:"Logout",link:"/Login"}})],1),s("q-img",{staticClass:"absolute-top",staticStyle:{height:"150px"},attrs:{src:"https://cdn.quasar.dev/img/material.png"}},[s("div",{staticClass:"absolute-bottom bg-transparent"},[s("q-avatar",{staticClass:"q-mb-sm",attrs:{size:"56px"}}),s("div",{staticClass:"text-weight-bold"},[t._v("  Terminal Id: "+t._s(t.user_id)+"   "+t._s(t.first_name))]),s("div",[t._v("Available points :"),s("span",{staticStyle:{"font-weight":"bold","font-size":"medium",color:"darkred"}},[t._v(t._s(t.$store.state.balance_points))])])],1)])],1):t._e(),s("q-page-container",[s("router-view")],1),s("q-footer",{staticClass:" text-white",attrs:{bordered:""}},[s("Footer")],1)],1)},a=[],i=s("3ed8"),l=s("8d37"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("q-card-section")],1)},r=[],c={name:"TicketDetailDrawer",computed:{selection_state(){return this.$store.state.selectionState},selection:function(){var t=[],e=this.$store.getters.get_selected;for(var s in e)return e.hasOwnProperty(s)&&(t.push({number:s,price:e[s]["price"],quantity:e[s]["quantity"]}),console.log(s,e[s])),t;return this.$store.getters.get_selected}},watch:{"this.$store.state.selectionState":function(){console.log("watcher received"),console.log(val)}},created(){console.log(this.$store.getters.get_selected)}},u=c,d=s("2877"),m=s("a370"),h=s("eebe"),f=s.n(h),p=Object(d["a"])(u,n,r,!1,null,"71ae95c2",null);p.exports;f()(p,"components",{QCardSection:m["a"]});s("0150");var b=s("c22d"),_=s("f9fa"),g=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row",staticStyle:{"background-color":"white"}},[t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col-3",staticStyle:{border:"1px solid black"}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("q-input",{staticClass:"col-8",staticStyle:{border:"1px solid black"},attrs:{label:"Please enter barcode here",dense:"",outlined:"",id:"final_barcode"},model:{value:t.barCodeNumber,callback:function(e){t.barCodeNumber=e},expression:"barCodeNumber"}})],1),s("q-btn",{staticClass:"col-4 bg-purple col",staticStyle:{padding:"2px"},attrs:{dense:"",unelevated:""},on:{click:function(e){return t.claim_result()}}},[t._v("Claim")])],1)]),s("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:""},on:{click:function(e){return t.$router.push({path:"/TxnDetails"})}}},[t._v("Txn Details")]),s("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:"",id:"reset_all_btn"},on:{click:function(e){return t.reset_all()}}},[t._v("Reset all")]),s("q-btn",{staticClass:"bg-purple col ",staticStyle:{border:"1px solid black"},attrs:{dense:"",unelevated:"",id:"buy_button"},on:{click:function(e){return t.place_ticket_order()}}},[t._v("Buy")]),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col text-center q-pa-sm text-black",staticStyle:{"font-weight":"bold","font-size":"large"}},[t._v("Total")]),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col-2"},[s("div",{staticClass:"row",staticStyle:{"background-color":"white",height:"100%"}},[s("div",{staticClass:"col text-center text-black",staticStyle:{border:"1px solid black","background-color":"white","font-size":"large","font-weight":"bold"}},[t._v(" "+t._s(t.quantitySet))]),s("div",{staticClass:"col text-center text-black",staticStyle:{border:"1px solid black","background-color":"white","font-size":"large","font-weight":"bold"}},[t._v(" "+t._s(t.priceSet))])])])],1)},v=[],k=s("c993"),y=s("2a19"),w=s("90b9"),S={name:"Footer",components:{},computed:{quantitySet:function(){var t=0,e=this.$store.state.inputs;for(var s in e)for(var o in e[s])if(null!==e[s][o]&&e[s][o])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t=parseInt(t)+parseInt(e[s][o]);return t},priceSet:function(){var t={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0},e=this.$store.state.inputs;for(var s in e){for(var o in e[s])if(null!==e[s][o]&&e[s][o])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t[s]=parseInt(t[s])+parseInt(e[s][o]);t[s]=t[s]*this.$store.state.setPoints[s]}return s,t.A+t.B+t.C+t.D+t.E+t.F+t.G+t.H+t.I+t.J}},methods:{claim_result:function(){var t=this.barCodeNumber,e={ticket_id:t};const s=this.$store;Object(k["b"])(e).then((t=>{console.log(t),200==t.status_code?(y["a"].create({type:"positive",progress:!0,message:"<h6>You have won "+t["ticket"]["inflow"]+" points for "+t["ticket"]["ticket_id"]+"</h6>",position:"center",timeout:8e3,html:!0,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]}),Object(w["f"])(t["ticket"],!0,s.state.user.first_name)):y["a"].create({type:"negative",progress:!0,message:"<h6>"+e["ticket_id"]+":  "+t["status_message"]+"</h6>",position:"center",html:!0,timeout:8e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}))},place_ticket_order:function(){var t=this.$store.state.selected_lotteries.map((t=>t.id));0===t.length&&(t=[this.$store.state.nextLottery.id]);var e={selected_lotteries:t,selection:this.$store.state.selectionState};console.log(e);const s=this.$store,o=this.$q;Object(k["i"])(e).then((t=>{if(200===t.status_code){console.log(t),s.dispatch("update_balance_points",t.balance_points);t.tickets.map((t=>(y["a"].create({type:"positive",progress:!0,message:"<h6>Ticket booked "+t.ticket_id+" Points "+t.total_price+" Qty "+t.total_quantity+"</h6>",html:!0,position:"center",timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]}),document.getElementById("all_set_checkbox").checked&&document.getElementById("all_set_checkbox").click(),t.ticket_id)));t.tickets.map((t=>{this.$q.platform.is.mobile||Object(w["f"])(t,!1,s.state.user.first_name)})),this.$store.dispatch("reset_all"),o.fullscreen.request().then((()=>{console.log("Success")})),this.$q.notify({message:" Go fullscreen",color:"primary",position:"center",timeout:2e4,html:!0,actions:[{label:"Go",color:"white",handler:()=>{console.log(document.body.style.zoom),this.$q.fullscreen.toggle().then((t=>{window.screen.availHeight<=800&&(document.body.style.zoom="88%")}))}},{label:"Dismiss",color:"white",handler:()=>{}}]}).catch((t=>{console.log(t)}))}else y["a"].create({type:"negative",progress:!0,message:"<h6>Ticket could not be booked due to error "+t.message+"</h6>",position:"center",html:!0,timeout:5e3,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}))},logout(){return this.$q.sessionStorage.set("token",""),this.$router.push({path:"/Login"})},reset_all(){this.$store.dispatch("reset_all")},update_results(){Object(k["h"])({lottery_id:this.$store.state.previousLottery.id}).then((t=>{this.$store.dispatch("set_results",t.lottery_winners_ticket),this.$store.dispatch("set_announcements",t.announcements)}))}},data(){return{barCodeNumber:""}}},C=S,$=s("27f9"),q=s("9c40"),x=Object(d["a"])(C,g,v,!1,null,"cb253cfa",null),T=x.exports;f()(x,"components",{QInput:$["a"],QBtn:q["a"]});var D=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:t.link}},[s("q-item",{style:this.$route.path===this.link?{backgroundColor:"#9c27b0",color:"white"}:{backgroundColor:"white",color:"black"},attrs:{clickable:"",tag:"a",target:"_blank"}},[t.icon?s("q-item-section",{attrs:{avatar:""}},[s("q-icon",{attrs:{name:t.icon}})],1):t._e(),s("q-item-section",{},[t._v("\n    "+t._s(t.title)+"\n  ")])],1)],1)},I=[],O={name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}},methods:{open_set:function(t){}}},E=O,L=s("66e5"),H=s("4074"),Q=s("0016"),j=Object(d["a"])(E,D,I,!1,null,null,null),A=j.exports;f()(j,"components",{QItem:L["a"],QItemSection:H["a"],QIcon:Q["a"]});const R=[{title:"Set A -1",icon:"mdi-home",alias:"A",link:"A",mobile:!0},{title:"Set B -2",alias:"B",icon:"mdi-star",link:"B",mobile:!0},{title:"Set C -3",icon:"mdi-cart",alias:"C",link:"C",mobile:!0},{title:"Set D -4",icon:"mdi-account",alias:"D",link:"D",mobile:!0},{title:"Set E -4",icon:"mdi-account",alias:"E",link:"E",mobile:!0},{title:"Set F -4",icon:"mdi-account",alias:"F",link:"F",mobile:!0},{title:"Set G -4",icon:"mdi-account",alias:"G",link:"G",mobile:!0},{title:"Set H -4",icon:"mdi-account",alias:"H",link:"H",mobile:!0},{title:"Set I -4",icon:"mdi-account",alias:"I",link:"I",mobile:!0},{title:"Set J -4",icon:"mdi-account",alias:"J",link:"J",mobile:!0}];var B={name:"MainLayout",components:{SelectionHeader:_["a"],EssentialLink:A,OptionsHeader:b["a"],TimeHeader:l["a"],ResultHeader:i["a"],Footer:T},methods:{changeMainSelectedStates:function(){console.log("changing state"),this.$store.dispatch("change_selected_sets",this.selectedSets)}},computed:{marquee:function(){var t="";return this.$store.state.announcements.map((e=>{t+=e+", "})),t=t.slice(0,-2),t},quantitySet:function(){var t=0,e=this.$store.state.inputs;for(var s in e)for(var o in e[s])if(null!==e[s][o]&&e[s][o])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t=parseInt(t)+parseInt(e[s][o]);return t},priceSet:function(){var t={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0},e=this.$store.state.inputs;for(var s in e){for(var o in e[s])if(null!==e[s][o]&&e[s][o])for(var a=0;a<this.$store.state.selected_lotteries.length;a++)t[s]=parseInt(t[s])+parseInt(e[s][o]);t[s]=t[s]*this.$store.state.setPoints[s]}return s,t.A+t.B+t.C+t.D+t.E+t.F+t.G+t.H+t.I+t.J},first_name(){return null!=this.$store.state.user?this.$store.state.user.first_name:""},user_id(){return null!=this.$store.state.user?this.$store.state.user.id:""},logged_in:function(){const t=this.$q.sessionStorage.getItem("token");return""!==t&&null!==t&&"null"!==t},currentRouteName:function(){return this.$route.name}},data(){return{essentialLinks:R,left:!0,right:!1,leftDrawerOpen:!1,rightDrawerOpen:!1,selectedSets:{A:!1,B:!1,C:!1,D:!1,E:!1,F:!1,G:!1,H:!1,I:!1,J:!1}}},created(){if(this.logged_in){const t=this.$store;Object(k["d"])().then((e=>{console.log(e);var s=e.lottery_objects.map((t=>(t.time=new Date(t.time),t)));e.closest_lottery.time=new Date(e.closest_lottery.time),this.$store.dispatch("set_lottery_timings",s),this.$store.dispatch("set_next_lottery");const o=this.$store.getters.get_next_lottery;this.$store.dispatch("set_selected_lotteries",[o]),setInterval((function(){t.dispatch("set_next_lottery")}),1e3),Object(k["g"])().then((e=>{t.dispatch("update_user_details",e)}))}))}else this.$router.push({name:"Login"})}},F=B,N=s("4d5a"),P=s("9404"),z=s("e359"),M=s("65c6"),G=s("6ac5"),J=s("3b73"),Y=s("4983"),K=s("068f"),U=s("cb32"),V=s("09e3"),W=s("7ff0"),X=Object(d["a"])(F,o,a,!1,null,null,null);e["default"]=X.exports;f()(X,"components",{QLayout:N["a"],QDrawer:P["a"],QHeader:z["a"],QToolbar:M["a"],QToolbarTitle:G["a"],QBtn:q["a"],QExpansionItem:J["a"],QScrollArea:Y["a"],QImg:K["a"],QAvatar:U["a"],QPageContainer:V["a"],QFooter:W["a"]})},"8d37":function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row",staticStyle:{"font-family":"'Times New Roman'"}},[t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col"},[s("div",{staticClass:"q-pl-md",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"x-large"}},[t._v("Current Date : "+t._s(t.get_current_date)+" ")]),s("div",{staticClass:"q-pl-md ",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"x-large"}},[t._v("Current Time : "+t._s(t.currentTime))])]),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col text-center",staticStyle:{"background-color":"#ed92f1"}},[s("div",{staticClass:"text-center font-bold",staticStyle:{color:"black","font-size":"xx-large"}},[t._v("STAR SKILL GAME")])]),t.$q.platform.is.mobile?s("div",{staticClass:"col"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-pa-sm",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"medium"}},[t._v("\n      Next Draw Time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),s("div",{staticClass:"col q-pa-sm",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"medium"},attrs:{id:"left-time"}},[t._v("\n      Left Time : "+t._s(t.leftTime)+"\n    ")])])]):s("div",{staticClass:"col"},[s("div",{staticClass:"row q-pl-md",staticStyle:{"background-color":"#a4ff01","font-weight":"bold",color:"black","font-size":"x-large"}},[t._v("\n      Next Draw Time : "+t._s(t.nextLotteryFormatted)+"\n    ")]),s("div",{staticClass:"row q-pl-md",staticStyle:{"background-color":"#ffa400","font-weight":"bold",color:"black","font-size":"x-large"},attrs:{id:"left-time"}},[t._v("\n      Left Time :"),s("span",{},[t._v(" "+t._s(t.leftTime))])])])])},a=[],i=s("90b9"),l={name:"TimeHeader",data(){return{leftTime:null,currentTime:null,next_lottery_time:""}},methods:{calculateCurrentTime(){this.currentTime=Object(i["b"])(new Date)},calculateLefttime(){try{var t=this.$store.state.nextLottery.time;null==t&&(this.leftTime="");var e=Object(i["c"])(t).getTime()-(new Date).getTime(),s=Math.floor(e/1e3/60/60);e-=1e3*s*60*60;var o=Math.floor(e/1e3/60);e-=1e3*o*60;var a=Math.floor(e/1e3);e-=1e3*a,o=o<10?"0"+o:o,e=e<10?"0"+e:e,this.leftTime="0"+s+":"+o+":"+a,0==parseInt(o)&&parseInt(a)<=30?document.getElementById("left-time").style.color="red":document.getElementById("left-time").style.color="black"}catch(l){this.leftTime=""}}},computed:{nextLotteryFormatted:function(){try{var t=this.$store.state.nextLottery.time;return Object(i["b"])(t)}catch(e){return""}},get_current_date:function(){var t=Object(i["c"])(new Date);return t.toLocaleDateString("en-US")}},created(){const t=this.calculateLefttime,e=this.calculateCurrentTime;setInterval((function(){t(),e()}),1e3)}},n=l,r=s("2877"),c=Object(r["a"])(n,o,a,!1,null,"47b952e4",null);e["a"]=c.exports},c22d:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.$q.platform.is.mobile?t._e():s("div",{staticClass:"row",staticStyle:{"background-color":"#13fba5",color:"black"}},[s("div",{staticClass:"col",staticStyle:{padding:"5px","font-family":"'Times New Roman'"}},[t._v("\n    Terminal Id: "+t._s(t.user_id)+"   "+t._s(t.first_name)+"\n  ")]),s("div",{staticClass:"col ",staticStyle:{padding:"5px","font-weight":"bolder"}},[t._v("\n    Available points :"),s("span",{staticStyle:{"font-weight":"bold",color:"darkred"}},[t._v(t._s(t.$store.state.balance_points))])]),s("q-space"),s("div",{staticClass:"q-ml-md"},[s("q-btn",{staticStyle:{color:"#033aca","background-color":"greenyellow"},attrs:{dense:"",flat:""},on:{click:function(e){return t.$router.push({path:"/MyAccounts"})}}},[t._v("My accounts")])],1),s("div",{staticClass:"q-ml-md"},[s("q-btn",{staticStyle:{color:"#033aca","background-color":"greenyellow"},attrs:{dense:""}},[t._v("Password ")])],1),s("div",{staticClass:"q-ml-md"},[s("q-btn",{staticStyle:{color:"#033aca","background-color":"greenyellow"},attrs:{dense:"",flat:""},on:{click:function(e){return t.logout()}}},[t._v("Logout")])],1)],1)},a=[],i=s("2a19"),l={name:"OptionsHeader",computed:{first_name(){return null!=this.$store.state.user?this.$store.state.user.first_name:""},user_id(){return null!=this.$store.state.user?this.$store.state.user.id:""}},data(){return{points_available:12}},methods:{logout(){return this.$q.localStorage.set("token",""),i["a"].create({message:"<h6>You have been logged out</h6>",html:!0,position:"center"}),this.$router.push({path:"/Login"})}}},n=l,r=s("2877"),c=s("2c91"),u=s("9c40"),d=s("eebe"),m=s.n(d),h=Object(r["a"])(n,o,a,!1,null,"44c1313a",null);e["a"]=h.exports;m()(h,"components",{QSpace:c["a"],QBtn:u["a"]})},f9fa:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row",staticStyle:{"background-color":"#ffff00",color:"black"}},[t.$q.platform.is.mobile?t._e():s("div",{staticClass:"col-5"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:"col",attrs:{dense:"",color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("2D Coupon")]),s("q-btn",{staticClass:"col",attrs:{dense:"",color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("JD")]),s("q-btn",{staticClass:"col",attrs:{dense:"",color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("3D Coupon")])],1),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:"col",attrs:{dense:"",color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("Point-2")]),s("q-btn",{staticClass:"col",attrs:{dense:"",color:"",unelevated:"",outline:""},on:{click:function(e){return t.coming_soon()}}},[t._v("Pointwise")])],1)])])]),s("div",{staticClass:"col",staticStyle:{"background-color":"#eef8ff"}},[s("div",{staticClass:"row"}),t.$q.platform.is.mobile?t._e():s("div",{staticClass:"row",staticStyle:{"background-color":"#eef8ff"}},[s("div",{},[s("q-option-group",{attrs:{options:t.options,color:"primary",inline:""},on:{input:function(e){return t.change_selection_option()}},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}})],1),s("div",{}),s("q-checkbox",{on:{input:function(e){return t.change_fp_selection()}},model:{value:t.fP,callback:function(e){t.fP=e},expression:"fP"}},[t._v("FP")])],1)]),s("div",{staticClass:"col text-left"},[s("div",{staticClass:"row"},[s("q-btn",{staticClass:" col",attrs:{dense:"",color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/Results"})}}},[t._v("Results")]),s("q-btn",{staticClass:" col",attrs:{dense:"",color:"",unelevated:"",outline:""},on:{click:function(e){return t.$router.push({path:"/MoreDraws"})}}},[t._v("More Draws")])],1)])])},a=[],i=s("2a19"),l={name:"SelectionHeader",methods:{change_selection_option:function(){this.$store.dispatch("change_selection_option",this.group)},change_fp_selection:function(){this.$store.dispatch("fp_selection",this.fP)},coming_soon:function(){i["a"].create({type:"info",progress:!0,message:"<h6>This feature is coming soon</h6>",position:"center",timeout:3e3,html:!0,actions:[{label:"Dismiss",color:"white",handler:()=>{}}]})}},data(){return{group:"All",options:[{label:"All",value:"All"},{label:"Even",value:"Even"},{label:"Odd",value:"Odd"}],fP:!1}}},n=l,r=s("2877"),c=s("9c40"),u=s("9f0a"),d=s("8f8e"),m=s("eebe"),h=s.n(m),f=Object(r["a"])(n,o,a,!1,null,"23bd38ae",null);e["a"]=f.exports;h()(f,"components",{QBtn:c["a"],QOptionGroup:u["a"],QCheckbox:d["a"]})}}]);