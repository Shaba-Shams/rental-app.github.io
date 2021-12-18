import React, {useState} from 'react';
import classes from '../Modal/Modal.module.css';
import rentData from '../../../src/data.json';
export default function Modal({open, data, onClose}){
    const [index, setIndex] = useState(0);
    const [price, setPrice] = useState(data[0].price);
    const [type, setType] = useState(data[0].type);
    const [durability, setDurability] = useState(data[0].durability);
    const [mileage, setMileage] = useState(data[0].mileage);
    const [availability, setAvailability] = useState(data[0].availability);
    const [needing_repair, setNeeding_repair] = useState(data[0].needing_repair);
    const [rentPeriod, setrentPeriod] = useState(data[0].minimum_rent_period);
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [changeUI, setChangeUI] = useState(false);
    const [changecartUI, setChangeCartUI] = useState(false);
    const [totalPrice, setTotal] = useState(0);
    const [minRent, setMinRent] = useState(false);
    const myComponentStyle = {
        width: '250px'
    }
    if(!open) return null;
    function cart(){
        var clientDays = numOfDay(endDate, startDate);
        var total = price * clientDays;
        if(clientDays < rentPeriod){
            clientDays = rentPeriod
            total = price * clientDays;
        }

        setTotal(total);
        setChangeUI(true);

        
    }
    function checkout(){
        var clientDays = numOfDay(endDate, startDate);
        var newDurability, newMileage;
        if(type === "plain"){
            newDurability = durability - (1 * clientDays);
        }else if(type === "meter"){
            newDurability = durability - (4 * clientDays);
        }
        setDurability(newDurability);

        if(mileage === null){
            newMileage = (10 * clientDays);
        }else{
            newMileage = mileage + (10 * clientDays);
        }
        setMileage(newMileage);
        setAvailability(false);

        rentData[index].mileage = newMileage;
        rentData[index].durability = newDurability;
        rentData[index].availability = false;
        setChangeCartUI(true);
    }

    function getIndex(e){
        const val = e.target.value;
        setIndex(val);
        setPrice(data[val].price);
        setrentPeriod(data[val].minimum_rent_period);
        setType(data[val].type);
        setDurability(data[val].durability);
        setMileage(data[val].mileage);
        setAvailability(data[val].availability);
        setNeeding_repair(data[val].needing_repair);
        
        var clientDays = numOfDay(endDate, startDate);
    
        if(clientDays < data[val].minimum_rent_period){
            setMinRent(true);
        }else{
            setMinRent(false);
        }
    }
    function getStartDate(e){
        setstartDate(new Date(e.target.value));
    }
    function getEndDate(e){
        setendDate(new Date(e.target.value));
        var clientDays = numOfDay(new Date(e.target.value), startDate);
        if(clientDays < rentPeriod){
            setMinRent(true);
        }else{
            setMinRent(false);
        }
    }
    function numOfDay(date1, date2) {
        const day = 1000 * 60 * 60 * 24;
        const differenceMs = Math.abs(date1 - date2);
        return Math.round(differenceMs / day);
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
                    <div className={classes.modalBody}>
                        <div className={classes.title}><h1>Book a product</h1></div>
                        <div className="body">
                            <h1>Your estimated price is ${totalPrice}</h1>
                            <h2>Do you want to procedure?</h2>
                        </div>
                        <div className={classes.footer}>
                            <button type='button' onClick={()=>setChangeUI(false)} className={classes.cancelBtn}>No</button>
                            <button onClick={checkout}>Yes</button>
                        </div>
                    </div>
                </div>
            :
            <div>
                <div className={classes.backdrop} onClick={onClose}></div>
                <div className={classes.modalBody}>
                    <div className={classes.title}><h1>Book a product</h1></div>
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
                                <label>From</label>
                                <input type="date" onChange={getStartDate}/>
                                <label>To</label>
                                <input type="date" onChange={getEndDate}/>
                            </div>
                            {needing_repair? <div className={classes.needFixed}>This product need to be fixed</div>: ""}
                            {minRent? <div className={classes.needFixed}>Minimum rent period of this product is {rentPeriod} day(s)</div>: ""}
                        </form>
                    </div>
                    <div className={classes.footer}>
                        <button type='button' onClick={onClose} className={classes.cancelBtn}>No</button>
                        {availability?
                            minRent?
                                <button disabled>Yes</button>
                                :
                                <button onClick={cart}>Yes</button>
                            :
                            <button disabled className={classes.notAvailableBtn}>Not Available</button>
                        }
                        
                    </div>
                </div>
            </div>        
            }
        </div>
    )
}
