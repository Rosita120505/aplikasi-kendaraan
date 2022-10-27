import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useParams,
  useMatches,
} from "react-router-dom";

import App from "./App";

import KendaraanForm from "./pages/Kendaraan/KendaraanForm";
import KendaraanList from "./pages/Kendaraan/KendaraanList";

export default function Form() {
  const matches = useMatches();
  const [isDetail, setIsDetail] = useState(false);

  const params = useParams();

  const isEditing = params.kendaraanId;

  const [kendaraans, setKendaraans] = useState([]);
  const [formInput, setFormInput] = useState({
    noRegistrasi: "",
    namaPemilik: "",
    merkKendaraan: "",
    tahunPembuatan: "",
    kapasitasSilinder: "",
    warna: "",
    bahanBakar: "",
    alamat: "",
  });

  async function getFormInput() {
    const res = await axios.get(
      "http://localhost:1111/kendaraan/" + params.kendaraanId
    );

    console.log(res.data);
    setFormInput(res.data[0]);
  }

  useEffect(() => {
    if (isEditing) {
      getFormInput();
    }
    for (const match of matches) {
      if (match.pathname.indexOf("detail") > -1) {
        setIsDetail(true);
        break;
      }
    }
  }, []);

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Form Kendaraan</h6>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">No Registrasi</label>
              <input
                className="form-control"
                type="text"
                readOnly={isDetail}
                value={formInput.noRegistrasi}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nama Pemilik</label>
              <input
                className="form-control"
                type="text"
                readOnly={isDetail}
                value={formInput.namaPemilik}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Merk Kendaraan</label>
              <input
                className="form-control"
                type="text"
                value={formInput.merkKendaraan}
                readOnly={isDetail}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Alamat</label>
              <input
                className="form-control"
                type="text"
                value={formInput.alamat}
                readOnly={isDetail}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tahun Pembuatan</label>
              <input
                className="form-control"
                type="text"
                value={formInput.tahunPembuatan}
                readOnly={isDetail}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Kapasitas Silinder</label>
              <input
                className="form-control"
                type="text"
                value={formInput.kapasitasSilinder}
                readOnly={isDetail}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Warna</label>
              <select
                className="form-control"
                type="text"
                value={formInput.warna}
                readOnly={isDetail}
              >
                <option placeholder="pilih warna"></option>
                <option value="merah">Merah</option>
                <option value="hitam">Hitam</option>
                <option value="biru">Biru</option>
                <option value="abuabu">Abu-abu</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Bahan Bakar</label>
              <input
                className="form-control"
                type="text"
                value={formInput.bahanBakar}
                readOnly={isDetail}
              />
            </div>
            <button className="btn btn-primary">Submit</button>
            &nbsp; &nbsp;
            <Link to="/kendaraan">
              <button className="btn btn-secondary">Kembali</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/kendaraan",
    element: <KendaraanList />,
  },
  {
    path: "/kendaraan/form",
    element: <KendaraanForm />,
  },
  {
    path: "/kendaraan/form/:kendaraanId",
    element: <KendaraanForm />,
  },
  {
    path: "/kendaraan/detail/:kendaraanId",
    element: <Form />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />}>
//           <Route path="kendaraan" element={<KendaraanList />} />
//           <Route path="kendaraan/form" element={<KendaraanForm />} />
//           <Route
//             path="kendaraan/form/:kendaraanId"
//             element={<KendaraanForm />}
//           />
//           <Route path="kendaraan/detail/:kendaraanId" element={<Form />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
