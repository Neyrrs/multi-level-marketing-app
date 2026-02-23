import products from './products'
import commissionMethods from './commission-methods'
import commissionRules from './commission-rules'
import withdrawals from './withdrawals'
const api = {
    products: Object.assign(products, products),
commissionMethods: Object.assign(commissionMethods, commissionMethods),
commissionRules: Object.assign(commissionRules, commissionRules),
withdrawals: Object.assign(withdrawals, withdrawals),
}

export default api