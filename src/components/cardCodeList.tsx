import { useState, type ChangeEventHandler } from "react"

const url = "http://127.0.0.1:5000/api/clients/"

const response = await fetch(url);
if (!response.ok) {
    console.log("Error fetching cardNames");
}

const users: objClientCardCodeData = await response.json();

const numEntries = 6;

type objClientCardCodeData = {
    cardName: String
    cardCode: String
}[];

export default function ClientCardCodes() {
    const [searchItem, setSearchItem] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [shownUsers, setShownUsers] = useState(filteredUsers)
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        setFilteredUsers(
            users.filter(
                (user) => user.cardName.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        
        const max10Users = filteredUsers.slice(0,9);
        const l = max10Users.length;
        for (let i = 0; i < numEntries - l; i++) {
            max10Users.push({"cardCode": "", "cardName": ""})
        }
        setShownUsers(max10Users);
    }


    return (
        <>
            <input type="text" value={searchItem} onChange={handleInputChange} placeholder="Search Card Name"></input>
            <div className="table-container">
            <table className="center">
                <tbody>
                    <tr>
                        <th>CardCode</th>
                        <th>CardName</th>
                    </tr>
                        {shownUsers.slice(0,numEntries-1).map(user => 
                        <tr>
                            <td>{user.cardCode}</td> 
                            <td>{user.cardName}</td>
                        </tr>
                        )}
                </tbody>
            </table>
            </div>
        </>
    )
}