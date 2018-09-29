import Vue from 'vue'
import Router from 'vue-router'


const Faucet = () => {
    return import ('@/components/faucet')
}



Vue.use(Router)

const router = new Router({
    routes: [
    	{
		path: '/',
		name: 'Faucet',
		component: Faucet,
    	}
    ]
});


export default router;