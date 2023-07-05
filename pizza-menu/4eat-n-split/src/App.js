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
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelection = (friend) => {
    // setSelectedFriends(friend);
    setSelectedFriend(cur => cur?.id === friend.id ? null : friend)

  }


  const handleBillSplit = (value) => {
    //fetches array when friend id and dropdown id are same
    // console.log(value)
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id ?
          { ...friend, balance: friend.balance + value }
          : friend))
  }


  function handleAddFriend(newFriend) {
    setFriends(friends => [...friends, newFriend])
    setShowAddFriend(false);
  }


  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} handleSelection={handleSelection} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriends={handleAddFriend} />}
        <Button onClick={() => setShowAddFriend(boolShow => !boolShow)}>{showAddFriend ? 'Close' : "Add friend"}</Button>
      </div>

      <FormSplitBill
        handleBillSplit={handleBillSplit}
        selectedFriend={selectedFriend}
        friends={friends}
        key={selectedFriend?.id}
      />
    </div>
  )
}

function Button({ children, onClick }) {
  return <button onClick={onClick} className="button">{children}</button>
}


const FriendsList = ({ friends, handleSelection, selectedFriend }) => (
  friends.map((friend) => (
    <Friend key={friend.id} friend={friend} handleSelection={handleSelection} selectedFriend={selectedFriend} />
  ))
)


function Friend({ friend, handleSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even ${Math.abs(friend.balance)}</p>}

      <Button onClick={() => handleSelection(friend)}>
        Select
      </Button>
    </li>
  )
}



function FormAddFriend({ onAddFriends }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    const id = Math.ceil(Math.random() * 100000 + 1);
    // console.log(id)


    const newFriend = {
      id, name, image: `${image}?=${id}`, balance: 0
    }

    //guard clause
    if (!name || !image) return;

    onAddFriends(newFriend)

    setName("")
    setImage("https://i.pravatar.cc/48")
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  )
}



function FormSplitBill({ friends, selectedFriend, handleBillSplit }) {
  const [bill, setBill] = useState('')
  const [userPays, setUserPays] = useState('')
  const [whoPays, setWhoPays] = useState('user')
  // const [dropDownId, setDropDownId] = useState('')

  // const onFriendChange = (e) => setDropDownId(Number(e.target.value))

  const option2 = friends.map((friend) => (
    <option key={friend.id} value={friend.id} onChange={(e) => setWhoPays(Number(e.target.value))} >
      {friend.name}
    </option>
  ))



  const onEnterExpense = (e) => {
    if (!Number(e.target.value)) return
    setUserPays(Number(e.target.value))
  }

  const onEnterBill = (e) => {
    if (!Number(e.target.value)) return
    setBill(Number(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !userPays) return
    handleBillSplit(whoPays === 'user' ? bill - userPays :
      whoPays === selectedFriend.id ? -userPays : null
    )

    //tests for handleBillSplit condition

    // console.log(whoPays, selectedFriend.id)
    // console.log(whoPays === selectedFriend.id)

    setBill('')
    setUserPays('')
  }


  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {!selectedFriend?.name ? '[friend]' : selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input type="text" value={bill} onChange={onEnterBill} />

      <label>🧍‍♂️Your expense</label>
      <input type="text" value={userPays} onChange={onEnterExpense} />

      <label>🧑‍🤝‍🧑 {selectedFriend?.name ? `${selectedFriend.name}'s expense` : `Friends' expense`}</label>
      <input type="text" value={bill - userPays} disabled />

      <label>Who is paying the bill?</label>
      <select value={whoPays} onChange={(e) => setWhoPays(Number(e.target.value))} >
        <option value='user' >You</option>
        {option2}
      </select>

      {selectedFriend && <Button>Split bill</Button>}
    </form>
  )
}