import Login from "pages/Login";
import TicketDetails from "components/TicketDetails";
import Register from "pages/Register";

const routes = [
  {
    path: '/Results',
    name: 'Results',
    component: () => import('pages/Results.vue'),
  },
  {
    path: '/TxnDetails',
    name: 'TxnDetails',
    component: () => import('pages/TxnDetails.vue'),
    children: [
    ]
  },
 {
   path: 'TicketDetails/:ticket',
   name:'TicketDetails'
    ,component:TicketDetails
    ,props: true
 },
  {
    path: '/MyAccounts',
    name: 'MyAccounts',
    component: () => import('pages/MyAccounts.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'SelectionTable/:set',name:'SelectionTable', component: () => import('pages/SelectionTable.vue') ,props: true },
   {
    path: '/MoreDraws',
    name: 'MoreDraws',
    component: () => import('pages/MoreDraws.vue'),
  },
  {
    path: '/DiceRotation',
    name: 'DiceRotation',
    component: () => import('pages/DiceRotation.vue'),
  },
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component :Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  // Always leave this as last one,
  // but you can also remove it

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
