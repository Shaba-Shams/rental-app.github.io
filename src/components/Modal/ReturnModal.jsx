import React, {useState} from 'react';
import classes from '../Modal/Modal.module.css';
import rentData from '../../../src/data.json';
export default function ReturnModal({open, data, onClose}){
    const [index, setIndex] = useState(0);
    const [price, setPrice] = useState(data[0].price);

    const [mileage, setMileage] = useState(data[0].mileage);
    const [availability, setAvailability] = useState(data[0].availability);
    const [needing_repair, setNeeding_repair] = useState(data[0].needing_repair);

    const [changeUI, setChangeUI] = useState(false);
    const [changecartUI, setChangeCartUI] = useState(false);
    const [totalPrice, setTotal] = useState(0);
    const [isNull, setIsNull] = useState(false);
    const [returnmodalIsOpen, setreturnModalIsOpen] = useState(false);
    const myComponentStyle = {
        width: '400px'
    }
    if(!open) return null;
    function cart(){ 
        const day = mileage / 10;
        const total = day * price;
        setTotal(total);
        setChangeUI(true);
    }
    function checkout(){
        setMileage(null);
        setAvailability(true);

        rentData[index].mileage = null;
        rentData[index].availability = true;
        setChangeCartUI(true);
    }

    function getIndex(e){
        const val = e.target.value;
        setIndex(val);
        setPrice(data[val].price);
        setMileage(data[val].mileage);
        setAvailability(data[val].availability);
        setNeeding_repair(data[val].needing_repair);
        if(data[val].mileage=== null){
            setIsNull(true);
        }
        else{
            setIsNull(false);
        }
    }
    function closeModal(){
        setChangeCartUI(false);
        setChangeUI(false);
    }
    return (
        <div>
            {changeUI?
                changecartUI?
                <div>
                    <div className={classes.backdrop}></div>
                    <div className={classes.modalBody} style={myComponentStyle}>
                        <div className={classes.title}><h1>Success</h1></div>
                        <div className="body">
                            <h1>Thanks for renting product</h1>
                        </div>
                        <div className={classes.footer}>
                        <button type='button' onClick={closeModal}>Back</button>
                        </div>
                    </div>
                </div>
                :
            <div>
                <div className={classes.backdrop} onClick={onClose}></div>
                <div className={classes.modalBody} style={myComponentStyle}>
                    <div className={classes.title}><h1>Return a product</h1></div>
                    <div className="body">
                        <h1>Your total price is ${totalPrice}</h1>
                        <h2>Do you want to procedure?</h2>
                    </div>
                    <div className={classes.footer}>
                        <button onClick={checkout}>Confirm</button>
                    </div>
                </div>
            </div>
            :
            <div>
                <div className={classes.backdrop} onClick={onClose}></div>
                <div className={classes.modalBody}>
                    <div className={classes.title}><h1>Rent a product</h1></div>
                    <div className="body">
                        <form className="orderForm">
                            <div>
                            <select onChange={getIndex}>
                                {
                                    data.map((row, key) =>{
                                        return (
                                            <option value={key} key={key}>{row.name}/{row.code}</option>
                                        );
                                    })
                                }
                            </select>
                            </div>
                            <div>
                                <label>Mileage</label>
                                <input type="text" value={mileage} disabled/>
                            </div>
                            {needing_repair? <div className={classes.needFixed}>This product need to be fixed</div>: ""}
                        </form>
                    </div>
                    <div className={classes.footer}>
                        <button type='button' onClick={onClose} className={classes.cancelBtn}>No</button>
                        {
                            isNull?
                            <button disabled>Yes</button>
                            :
                            <button onClick={cart}>Yes</button>
                        }
                        
                    </div>
                </div>
            </div>        
            }
        </div>
    )
}
