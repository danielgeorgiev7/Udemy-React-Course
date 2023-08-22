import { useState } from "react";
export default function FriendsList({ friends, setFriends, onToggleForm, isOpen, currentFriend }) {
    const [friendName, setFriendName] = useState("");
    const [image, setImage] = useState("");
    const [addFriendOpen, setAddFriendOpen] = useState(false);

    function handleName(e) {
        setFriendName(e.target.value)
    }

    function handleImage(e) {
        setImage(e.target.value)
    }

    function handleAddFriendClick() {
        setAddFriendOpen(!addFriendOpen);
      }
    
      function handleAddFriend(e) {
        e.preventDefault();
        setFriends([...friends, { id: crypto.randomUUID, name: friendName, image: image, balance: 0 }]);
        handleAddFriendClick();
      }
    return (
        <>
            <ul>
                {friends.map((friend) => <Friend friend={friend} isOpen={isOpen} onToggleForm={onToggleForm} currentFriend={currentFriend} key={friend.id} />)}
            </ul>
            {addFriendOpen ?
                <>
                    <form className="form-add-friend">
                        <label>👫 Friend name</label>
                        <input type="text" value={friendName} onChange={handleName}></input>
                        <label>🌄 Image URL</label>
                        <input type="text" value={image} onChange={handleImage}></input>
                        <button className="button" onClick={handleAddFriend}>Add</button>
                    </form>
                    <button className="button" onClick={handleAddFriendClick}>Close</button>
                </>
                :
                <button className="button" onClick={handleAddFriendClick}>Add Friend</button>}
        </>
    )
}

function Friend({ friend, onToggleForm, isOpen, currentFriend }) {
    return <li>
        <img src={friend.image} alt="img"></img>
        <h3>{friend.name}</h3>
        <p className={friend.balance > 0 ? "green" : (friend.balance === 0 ? "" : "red")}>
            {friend.balance > 0 ? `${friend.name} owes you ${friend.balance}` :
                friend.balance === 0 ? `You and ${friend.name} are even` :
                    `You owe ${friend.name} ${Math.abs(friend.balance)}`}
        </p>
        <button className="button" onClick={() => onToggleForm(friend)}>{isOpen && currentFriend.id === friend.id ? "Close" : "Select"}</button>
    </li>
}