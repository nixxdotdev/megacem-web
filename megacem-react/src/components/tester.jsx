import { useEffect, useState } from 'react';

function Tester() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>GMCHolcim Records</h1>
      <ul>
        {records.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tester;