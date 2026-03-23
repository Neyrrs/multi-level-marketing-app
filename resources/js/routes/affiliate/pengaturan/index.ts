import bankAccount from './bank-account'
import withdraw from './withdraw'
const pengaturan = {
    bankAccount: Object.assign(bankAccount, bankAccount),
withdraw: Object.assign(withdraw, withdraw),
}

export default pengaturan