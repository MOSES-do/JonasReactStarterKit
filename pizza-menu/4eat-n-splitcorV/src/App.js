import { useState } from 'react';

const initialFriends = [
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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null)


  const handleBillSplit = (value) => {
    // console.log(value)
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend
      ))
    setSelectedFriend(null)
  }

  const handleSelection = (friend) => {
    // setSelectedFriend(friend)
    /**
     *setSelectedFriend(cur => cur?.id === friend.id ? null : friend)
      const isSelected = selectedFriend?.id === friend.id;

     * On initial load state [selectedFriend] for cur.id is null, so the onClick interaction results in an error,
    optional chaining breaks off the instruction on 1st interaction and the "false" value is loaded,
    which i s what is required on the first onClick., after which the "true" value is now true and 
    i can toggle the "select/close" button on and off.
     */
    setSelectedFriend(cur => cur?.id === friend.id ? null : friend)
    setShowAddFriend(false)
    // console.log(friend)
  }


  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend])
    setShowAddFriend(false)
  }


  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend addNewFriends={handleAddFriend} />}
        <Button onClick={() => setShowAddFriend(boolShow => !boolShow)}>{showAddFriend ? 'Close' : "Add friend"}</Button>
      </div>

      {selectedFriend && <FormSplitBill friendsList={friends} onSplitBill={handleBillSplit} selectedFriend={selectedFriend} key={selectedFriend.id} />}
    </div>
  )
}


function Button({ children, onClick }) {
  return <button onClick={onClick} className="button">{children}</button>
}


const FriendsList = ({ friends, onSelection, selectedFriend }) => (
  friends.map((friend) => (
    <Friend key={friend.id} friend={friend} selectedFriend={selectedFriend} onSelection={onSelection} />
  ))
)


function Friend({ friend, onSelection, selectedFriend }) {

  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even ${Math.abs(friend.balance)}</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'close' : 'Select'}
      </Button>
    </li>
  )
}



function FormAddFriend({ addNewFriends }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  const addFriend = (e) => {
    e.preventDefault();


    if (!name || !image) return
    const newFriend = { id: crypto.randomUUID(), name, image: `${image}?$={id}`, balance: 0 }
    addNewFriends(newFriend)

    setName('');
    setImage('https://i.pravatar.cc/48')

  }
  return (
    <form className="form-add-friend" onSubmit={addFriend}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button >Add</Button>
    </form>
  )
}



function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : ''

  //becos bill is an empty string by default
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const onEnterBill = (e) => {
    if (!Number(e.target.value)) return
    setBill(Number(e.target.value))
  }

  const onPaidbyUser = (e) => {
    if (!Number(e.target.value)) return
    setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input type="text" value={bill} onChange={onEnterBill} />

      <label>🧍‍♂️Your expense</label>
      <input type="text" value={paidByUser} onChange={onPaidbyUser} />

      <label>🧑‍🤝‍🧑 {selectedFriend.name ? `${selectedFriend.name}'s expense` : `Friends' expense`}</label>
      <input type="text" value={paidByFriend} disabled />

      <label>Who is paying the bill?</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)} >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}