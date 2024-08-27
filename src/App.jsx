import { useState, useEffect } from 'react';
import './App.css';

const records = [];

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ ad: '', soyad: '', ePosta: '', dogumTarihi: '' });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedData = localStorage.data ? JSON.parse(localStorage.data) : [];
    setData(storedData);
  }, []); 
  
  function save() {
    localStorage.data = JSON.stringify(data);
  }

  function updateRecord(record) {
    let foundRecord = data.find(x => x.id === record.id);
    Object.assign(foundRecord, record);
    setData([...data]);
    save();
  }

  function deleteRecord(id) {
    if (!confirm('Emin misiniz?')) { return; }
    const updatedData = data.filter(x => x.id !== id);
    setData(updatedData);
    localStorage.data = JSON.stringify(updatedData);
  }
  
  function handleNewStudentChange(e) {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  }

  function addNewStudent(e) {
    e.preventDefault();
    const newId = data.length ? Math.max(...data.map(x => x.id)) + 1 : 1;
    const updatedData = [...data, { ...newStudent, id: newId }];
    setData(updatedData);
    localStorage.data = JSON.stringify(updatedData);
    closeModal();
  }
  
  return (
    <div className='container'>
      <h1>Öğrenci Bilgi Sistemi <button onClick={openModal}>yeni</button></h1>
      <div className="studentTable">
        <ul className="studentTableTitles">
          <li>Ad</li>
          <li>Soyad</li>
          <li>E-Posta Adresi</li>
          <li>Doğum Tarihi</li>
          <li>#</li>
        </ul>
        {data.map(x => <StudentRow key={x.id} {...x} deleteRecord={deleteRecord} updateRecord={updateRecord} />)}
      </div>
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Yeni Öğrenci Ekle</h2>
            <form onSubmit={addNewStudent}>
              <input type="text" required name='ad' placeholder="Ad" onChange={handleNewStudentChange} />
              <input type="text" required name='soyad' placeholder="Soyad" onChange={handleNewStudentChange} />
              <input type="email" required name='ePosta' placeholder="E-Posta" onChange={handleNewStudentChange} />
              <input type="date" required name='dogumTarihi' onChange={handleNewStudentChange} />
              <button type='submit'>Ekle</button>
              <button type='button' onClick={closeModal}>Kapat</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
