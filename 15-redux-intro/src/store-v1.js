import { legacy_createStore as createStore, combineReducers } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            if (action.payload > state.balance) return;
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose: action.payload.purpose }
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            };
        default: return state;
    }
}


function deposit(amount) {
    return { type: "account/deposit", payload: amount }
}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}
function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: { amount, purpose } }
}
function payLoan() {
    return { type: "account/payLoan" }
}

////////////////////////////////////////////////////////////////////////

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    CreatedAt: "",
};

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            }
        case "customer/updateName":
            return {
                ...state,
                fullName: action.payload.fullName
            }
        default: return state
    }
}

function createCustomer(fullName, nationalID) {
    return {
        type: "account/createCustomer",
        payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString()
        }
    }
}
function updateName(fullName) {
    return {
        type: "account/createCustomer",
        payload: fullName
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer);