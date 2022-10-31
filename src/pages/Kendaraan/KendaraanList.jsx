import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";

export default function KendaraanList() {
  const [kendaraans, setKendaraans] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredKendaraan, setFilteredKendaraan] = useState([]);
  const [searchKeywordDebounced] = useDebounce(searchKeyword, 500);

  async function getKendaraanList() {
    try {
      const response = await axios.get("http://localhost:1111/kendaraan/data");

      console.log(response.data);
      setKendaraans(response.data);
    } catch (err) {
      alert("Terjadi Masalah");
    }
  }

  function deletekendaraan(noRegistrasi) {
    var result = confirm("Anda Yakin Menghapus Data " + noRegistrasi + "?");
    if (result) {
      axios
        .delete("http://localhost:1111/kendaraan/delete/" + noRegistrasi)
        .then(() => {
          getKendaraanList();
        })
        .catch((err) => {
          console.log(err);
          alert("Error woi");
        });
    }
  }
  useEffect(() => {
    getKendaraanList();
  }, [searchKeywordDebounced]);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      const filterResult = kendaraans.filter((kendaraan) => {
        const a = kendaraan.noRegistrasi
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
        const b = kendaraan.namaPemilik
          .toLowerCase()
          .includes(searchKeyword.toLocaleLowerCase());
        return a, b;
      });
      setFilteredKendaraan(filterResult);
    } else {
      setFilteredKendaraan(kendaraans);
    }
  }, [searchKeyword, kendaraans]);

  return (
    <>
      <div class="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Data Kendaraan</h6>

          <form className="d-none d-sm-inline-block form-inline mr-md-3 ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-md-white-auth-end border-0 small"
                placeholder="cari.."
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchKeyword}
                onChange={(evt) => setSearchKeyword(evt.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <Link to="/kendaraan/form">
            <button className="btn btn-primary"> Add </button>
          </Link>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th>No Registrasi</th>
                  <th>Nama Pemilik</th>
                  <th>Alamat</th>
                  <th>Merk Kendaraan</th>
                  <th>Tahun Pembuatan</th>
                  <th>Kapasitas</th>
                  <th>Warna</th>
                  <th>Bahan Bakar</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredKendaraan.map((kendaraan, index) => (
                  <tr>
                    <td key={kendaraan.kendaraanId} scope="row">
                      {index + 1}
                    </td>
                    <td>{kendaraan.noRegistrasi}</td>
                    <td>{kendaraan.namaPemilik}</td>
                    <td>{kendaraan.alamat}</td>
                    <td>{kendaraan.merkKendaraan}</td>
                    <td>{kendaraan.tahunPembuatan}</td>
                    <td>{kendaraan.kapasitasSilinder} cc</td>
                    <td>{kendaraan.warna}</td>
                    <td>{kendaraan.bahanBakar}</td>
                    <td>
                      <Link to={"/kendaraan/detail/" + kendaraan.noRegistrasi}>
                        <button className="btn btn-primary"> Detail </button>
                      </Link>{" "}
                      <Link to={"/kendaraan/form/" + kendaraan.noRegistrasi}>
                        <button className="btn btn-primary"> Edit </button>
                      </Link>{" "}
                      <button
                        onClick={() => deletekendaraan(kendaraan.noRegistrasi)}
                        className="btn btn-danger"
                      >
                        {" "}
                        Hapus{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
