import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/Condonation.module.css";

function Condonation() {
  const [condoData, setCondoData] = useState([]);
  const [modalDisplay,setModalDisplay] = useState('none')

  const [condoLeft,setCondoLeft] = useState('')
  const [condoFirst,setcondoFirst] = useState('')
  const [condoSecond,setcondoSecond] = useState('')
  const [condoThird,setcondoThird] = useState('')
  const [nameInModal,setNameInModal] = useState('')
  const [regInModal,setregInModal] = useState('')
  const [condoId,setCondoId] = useState('')

  const [updationData,setUpdateData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("../api/getCondonationDetails");
        setCondoData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(condoData, "print");

  const handleUpdate = (obj) => { 
    console.log(obj,'this is the object');
    setCondoLeft(obj.condo_left)
    setcondoFirst(obj.condo_first)
    setcondoSecond(obj.condo_second)
    setcondoThird(obj.condo_third)
    setNameInModal(obj.name)
    setregInModal(obj.registration_number)
    setCondoId(obj.id)
    return modalDisplay=='none'? setModalDisplay('block') : setModalDisplay('none')
  }

  const handleSaveChanges = async () => {
    const obj ={}
    obj['condoLeft'] = condoLeft
    obj['condoFirst'] = condoFirst
    obj['condoSecond'] = condoSecond
    obj['condoThird'] = condoThird
    obj['registration_number'] = regInModal
    obj['id'] = condoId
    setUpdateData(obj)
    console.log(obj,'=========================================');

    try {
      const res = await axios.post('../api/updateUserCondonation', obj);
      setCondoData(res.data.table);
      console.log('API response:',typeof res.data.table);
      console.log('API response:',res.data.table);
    } catch (err) {
      console.log('Error:', err);
    }

  }

  console.log(updationData,'asd');

  return (
    <div>

      <div className={styles.box} style={{display:modalDisplay}} >
        <div className={styles.updateForm}>
          <div className={styles.close} ><button onClick={()=> setModalDisplay('none') } className={styles.closeBtn}>X</button></div>
          <h2>{nameInModal}</h2> 
          <small>{regInModal}</small>
          
          <div className={styles.modal_label}>
          <span className="label" >Condonation Left : </span>
          <input placeholder="Condonation Left " onChange={(e) => setCondoLeft(e.currentTarget.value)} value={condoLeft}  type='number' min='0' max={3} className={styles.input} />
          </div>

          <div className={styles.modal_label}>
          <span className="label" >1st Condo's Semester : </span>
          <input placeholder="Condo's Semester " onChange={(e) => setcondoFirst(e.currentTarget.value)} value={condoFirst} type='text' className={styles.input} />
          </div>

          <div className={styles.modal_label}>
          <span className="label" >2nd Condo's Semester : </span>
          <input placeholder="Condo's Semester " onChange={(e) => setcondoSecond(e.currentTarget.value)} value={condoSecond} type='text' className={styles.input} />
          </div>

          <div className={styles.modal_label}>
          <span className="label" >3rd Condo's Semester : </span>
          <input placeholder="Condo's Semester " onChange={(e) => setcondoThird(e.currentTarget.value)} value={condoThird} type='text' className={styles.input} />
          </div>
          
         
          <button onClick={handleSaveChanges} className={styles.btn}>SAVE CHANGES</button>
        </div>
      </div>
      <div className={styles.condo_content}>
        <h2>CONDONATION DETAILS</h2>
      </div>
      <div>
      {
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>Reg. No.</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Condonation Left</th>
                <th className={styles.th}>Condo First</th>
                <th className={styles.th}>Condo Second</th>
                <th className={styles.th}>Condo Third</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* //0 50 - brown , 50 - 75 - red, 75 + = black */}

              {condoData.map((row, index) => (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>{row.registration_number}</td>
                  <td className={styles.td}>{row.name}</td>
                  <td className={styles.td}>{row.condonation_remaining}</td>
                  <td className={styles.td}>{row.condo_first}</td>
                  <td className={styles.td}>{row.condo_second}</td>
                  <td className={styles.td}>{row.condo_third}</td>
                  <td className={styles.td}>
                    <button onClick={() => handleUpdate(
                      {condo_left:row.condonation_remaining,
                        registration_number:row.registration_number,
                        name:row.name,
                        condo_first:row.condo_first,
                        condo_second:row.condo_second,
                        id:row.id,
                        condo_third:row.condo_third}
                      )}  
                    className={styles.updateBtn}>UPDATE</button>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        
      </div>
    </div>
  );
}

export default Condonation;
