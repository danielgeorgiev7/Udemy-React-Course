import { useState } from "react";
import FriendsList from "./FriendsList";
import SplitBillForm from "./SplitBillForm";

let initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends,setFriends] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(false);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [friendsExpense, setFriendsExpense] = useState("");
  const [isPaidByUser, setIsPaidByUser] = useState(true);

  function paidToFalse() {
    setIsPaidByUser(false);
  }

  function paidToTrue() {
    setIsPaidByUser(true);
  }

  function handleBill(e) {
    setBill(e.target.value);
    isPaidByUser ? setFriendsExpense(e.target.value - yourExpense) : setYourExpense(e.target.value - friendsExpense);
  }

  function handleYourExpense(e) {
    setYourExpense(e.target.value);
    setFriendsExpense(bill - e.target.value);
  }

  function handleFriendExpense(e) {
    setFriendsExpense(e.target.value);
    setYourExpense(bill - e.target.value);
  }

  function toggleForm(friend) {
    if (currentFriend === null) setIsOpen(!isOpen)
    else setIsOpen(currentFriend === null || currentFriend !== friend ? isOpen : !isOpen);
    setCurrentFriend(friend);
  }

  function handleSplitBill(friend, isPaidByUser, yourExpense, friendsExpense) {
if(!bill) return;

let value = isPaidByUser ? Number(friendsExpense) : -yourExpense;
setFriends(friends.map((f)=> f.id === friend.id ? {...f, balance :f.balance + value} : f ));
    setIsOpen(false);
    setCurrentFriend(null);
    setYourExpense("");
    setFriendsExpense("");
    setBill("");
    setIsPaidByUser(true);
  }


  return (
    <div className="app" >
      <div className="sidebar">
        <FriendsList friends={friends}
          onToggleForm={toggleForm}
          isOpen={isOpen}
          currentFriend={currentFriend}
          setFriends={setFriends}/>
      </div>
      {isOpen && <SplitBillForm
        handleSplitBill={handleSplitBill}
        friend={currentFriend}
        bill={bill}
        isPaidByUser={isPaidByUser}
        yourExpense={yourExpense}
        friendsExpense={friendsExpense}
        handleFriendExpense={handleFriendExpense}
        handleYourExpense={handleYourExpense}
        paidToTrue={paidToTrue}
        paidToFalse={paidToFalse}
        handleBill={handleBill}
      />}

    </div>
  )
}