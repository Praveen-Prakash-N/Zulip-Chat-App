import React, {useState} from 'react';
import { Button} from "@material-ui/core";
import NewConvo from "./../images/Add button svg.svg";
import "./dropdown.css";
// import Newchat from "./../images/New chat.svg";
// import Newgroup from "./../images/New group.svg";
import Popup from './Popup';

function Dropdown({ title, items = [], multiSelect = false}) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);
    const [showPopup, setshowPopup] = useState(false);

    // function handleonClick(item) {
    //     if (!selection.some(current => current.id === item.id)) {
    // } 
    // }

   const togglePopup= () =>  {
        setshowPopup(!showPopup);
    }

    return (
        <div className="dd-wrapper">
            <div tabIndex={0} 
            className="dd-header" 
            role="button" 
            onKeyPress={() => toggle(!open)} 
            onClick={() =>  toggle(!open)}>
            <div className="dd-header_title">
                <p className="dd-header_title--bold"></p>
            </div>
            <div className="dd-header_action">
            
            <Button color="primary" id="newConversation">{open ? <img src={NewConvo} /> : <img src={NewConvo} />}</Button>
            </div>
            </div>
            {open && (
                <div className="dd-list">
                    {items.map((item) => { 
                        return (
                            <div className="newConver">
                                <div className="dd-list-item" key={item.id}>
                                    <Button id="new_convo_list"  onClick={togglePopup}>
                                    {showPopup && 
                                        <Popup
                                         text='New Chat'
                                         closePopup={togglePopup}
                                    />
                                    }
                                    <div className="dd-show" >
                                        {/* <div className="dd-logo">
                                        <img src={Newchat} />
                                        </div> */}
                                    <span>{item.value} </span>
                                    </div>
                                    
                                     </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}


export default Dropdown;