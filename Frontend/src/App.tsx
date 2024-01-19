import { useState } from 'react'
import './App.css'
import Papa from 'papaparse'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [message, setMessage] = useState<string | null>();
  const [error, setError] = useState<string | null>()
  console.log(error);
  
  const [selected, setSelected] = useState([])
  console.log(selected ,'<<<<<<<<<<<<,');
  
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      Papa.parse(file, {
        header: true,
        encoding: 'utf-8',
        skipEmptyLines: true,
        complete: async (results) => {
          const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/upload`, { parsedData: results.data })
          setData(response?.data)
        },
        error: function (error) {
          console.error(error.message);
        },
      })
    } else {
      setMessage("Please first select the file you want to import")
    }
  };
  const handleDownloade = async (e) => {
    e.preventDefault()
    if (selected?.length !== 0) {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/export`, { selectedData: selected })
      console.log(response.status, "<<<<<<<<<<<<");
      if (response) {
        console.log(response);
        
        setError(null)
        setData([])
        setMessage("data has been exported successfully")
        download(JSON.stringify(selected), "jsonFile.json", "text/plain");
      }else{
        setError('Data is already deleted')
      }
    } else {
      setError("There is no data selected , first select file you want to export then you'll be able to export file")
    }
  }

  const download = (data: any, fileName: string, contentType: string) => {
    const a = document.createElement("a");
    const file = new Blob([data], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  const handleChange = (e, value) => {
    const { checked, id } = e.target
    console.log(value);
    console.log(id);
    console.log(checked);

    if (checked) {
      setSelected([...selected, value])
    } else {
      const filtered = selected.filter((item) => item !== value)
      setSelected(filtered)

    }
  }

  return (
    <>
      <div>
        <input
          type={"file"}
          accept={".csv, .xls , .xlsx"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT
        </button>

        <button style={{ marginLeft: '20px' }}
          onClick={(e) => {
            handleDownloade(e);
          }}
        >
          Export
        </button>

        <div style={{ margin: "50px auto", height: '600px' }} >
          {error ? <p style={{margin:'15px 0' ,color:'red'}}>{error}</p> : null}
          {
            data.length !== 0 ?
              <>
                <table className='table'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>id</th>
                      <th>title</th>
                      <th>description</th>
                      <th>catogory</th>
                      <th>image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td><input type="checkbox" id={item.productID} value={item} defaultChecked={item.exported} onChange={(e) => handleChange(e, item)} disabled={item.exported} /></td>
                          <td>{item.productID}</td>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>{item.category}</td>
                          <td>{item.image}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
              : null
          }
          <>
            {
              message ?
                <p>{message}</p> :
                null
            }
          </>
        </div>

      </div>
    </>
  )
}

export default App



