import React, {useState} from 'react'

const DataTable = ({data}) => {
    const [b] = useState(true);
    return (
      <table cellPadding={0} cellSpacing={0}>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Availability</th>
                  <th>Need to Repair</th>
                  <th>Durability</th>
                  <th>Mileage</th>
              </tr>
          </thead>
        <tbody>
            {
                data.map((row, key)=>{
                    return (
                    <tr key={key}>
                        <td>{row.name}</td>
                        <td>{row.code}</td>
                        <td>{row.availability === b ? "True": "False"} </td>
                        <td>{row.needing_repair === b ? "True": "False"} </td>
                        <td>{row.durability}</td>
                        <td>{row.mileage}</td>
                    </tr>
                    );
                    
                    
                })
            }
        </tbody>
      </table>
    );
  };
  export default DataTable;
