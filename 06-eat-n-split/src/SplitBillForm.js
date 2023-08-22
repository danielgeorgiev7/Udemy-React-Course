export default function SplitBillForm({ friend, bill, handleBill, isPaidByUser, paidToFalse, paidToTrue, yourExpense, friendsExpense, handleYourExpense, handleFriendExpense, handleSplitBill }) {
    return <form className="form-split-bill">
        <h2>Split a bill with {friend.name}</h2>
        <label>💰 Bill value</label>
        <input value={bill} onChange={handleBill} type="text"></input>
        <label>🧍‍♀️ Your expense</label>
        <input type="text" disabled={!isPaidByUser} value={yourExpense} onChange={handleYourExpense}></input>
        <label>👫 {friend.name}'s expense</label>
        <input type="text" disabled={isPaidByUser} value={friendsExpense} onChange={handleFriendExpense}></input>
        <label>🤑 Who is paying the bill</label>
        <select onChange={(e) => e.target.value === "user" ? paidToTrue() : paidToFalse()}>
            <option value="user">You</option>
            <option value="friend">{friend.name}</option>
        </select>
        <button className="button" onClick={() =>handleSplitBill(friend,isPaidByUser,yourExpense,friendsExpense)}>Split bill</button>
    </form>
}