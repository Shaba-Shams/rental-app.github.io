import React, {useState} from 'react'
import classes from './Body.module.css';
import rentData from '../../../src/data.json';
import DataTable from '../DataTable/DataTable';
import Modal from '../Modal/Modal';
import ReturnModal from '../Modal/ReturnModal';
export default function Body(){
    const [q, setQ] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [returnmodalIsOpen, setreturnModalIsOpen] = useState(false);
    function search(rows){
        return rows.filter(
            (row) => 
            row.name.toLowerCase().indexOf(q) > -1 ||
            row.code.toLowerCase().indexOf(q) > -1)
    }
    return (
        <div>
            <div className={classes.mainBody}>
                <div className={classes.inputFieldDiv}>
                    <label><strong>Search Product:</strong></label>
                    <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
                <DataTable data={search(rentData)}/>
                <div className={classes.btnDiv}>
                <button type='button' className={[classes.book_btn, 'rounded'].join(' ')} onClick={()=>setModalIsOpen(true)}>Book</button>
                <button type='button' className={[classes.return_btn, 'rounded'].join(' ')} onClick={()=>setreturnModalIsOpen(true)}>Return</button>
                </div>
                
            </div>
            <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)} data= {rentData}/>
            <ReturnModal open={returnmodalIsOpen} onClose={() => setreturnModalIsOpen(false)} data= {rentData}/>
        </div>
    )
}
