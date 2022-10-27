import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function KendaraanForm() {
  const navigate = useNavigate();
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

  function handleInput(event, propName) {
    const copyFormInput = { ...formInput };
    copyFormInput[propName] = event.target.value;
    setFormInput(copyFormInput);
  }

  async function getKendaraan() {
    const res = await axios.get("http://localhost:1111/kendaraan/data");

    console.log(res.data);
    setKendaraans(res.data);
  }

  async function getFormInput() {
    const res = await axios.get(
      "http://localhost:1111/kendaraan/" + params.kendaraanId
    );

    console.log(res.data);
    setFormInput(res.data[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isEditing) {
      await axios.put(
        "http://localhost:1111/kendaraan/update/" + params.kendaraanId,
        formInput
      );
    } else {
      await axios.post("http://localhost:1111/kendaraan/save", formInput);
    }

    navigate("/kendaraan");
  }

  useEffect(() => {
    getKendaraan();
    if (isEditing) {
      getFormInput();
    }
  }, []);

  function hanyaAngka(evt) {
    var charCode = evt.which ? evt.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

    return true;
  }
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Form Kendaraan</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">No Registrasi</label>
              <input
                className="form-control"
                type="text"
                value={formInput.noRegistrasi}
                onChange={(event) => handleInput(event, "noRegistrasi")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nama Pemilik</label>
              <input
                className="form-control"
                type="text"
                value={formInput.namaPemilik}
                onChange={(event) => handleInput(event, "namaPemilik")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Merk Kendaraan</label>
              <input
                className="form-control"
                type="text"
                value={formInput.merkKendaraan}
                onChange={(event) => handleInput(event, "merkKendaraan")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Alamat</label>
              <input
                className="form-control"
                type="text"
                value={formInput.alamat}
                onChange={(event) => handleInput(event, "alamat")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tahun Pembuatan</label>
              <input
                className="form-control"
                type="text"
                maxLength="4"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={formInput.tahunPembuatan}
                onChange={(event) => handleInput(event, "tahunPembuatan")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Kapasitas Silinder</label>
              <input
                className="form-control"
                type="text"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={formInput.kapasitasSilinder}
                onChange={(event) => handleInput(event, "kapasitasSilinder")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Warna</label>
              <select
                className="form-control"
                type="text"
                value={formInput.warna}
                onChange={(event) => handleInput(event, "warna")}
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
                onChange={(event) => handleInput(event, "bahanBakar")}
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
