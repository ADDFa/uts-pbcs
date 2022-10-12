const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov']

const setDataMahasiswa = (res = []) => {
    let dataMahasiswa = ''
    let nomor = 1

    res.forEach(elemet => {
        dataMahasiswa += /* html */
            `
            <tr class="text-center">
                <th scope="row">${nomor}</th>
                <td class="text-start">${elemet.nama}</td>
                <td>${elemet.npm}</td>
                <td>${elemet.nama_prodi}</td>
                <td>${elemet.jenis_kelamin}</td>
                <td>${elemet.no_telp}</td>
                <td>${elemet.seleksi_masuk}MPTN</td>
                <td>${bulan[elemet.bulan_masuk - 1]}-${elemet.tahun_masuk}</td>
                <td>
                    <button type="button" class="btn btn-warning" id="ubah" data-npm="${elemet.npm}" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Ubah</button>
                    <button type="button" class="btn btn-danger" id="hapus" data-npm="${elemet.npm}">Hapus</button>
                </td>
            </tr>
            `

        nomor++
    })

    const data = /* html */
        `
            <table class="table">
                <thead>
                    <tr class="text-center">
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">NPM</th>
                        <th scope="col">Program Studi</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Nomor Telepon</th>
                        <th scope="col">Jalur Masuk</th>
                        <th scope="col">Tahun Masuk</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${dataMahasiswa}
                </tbody>
            </table>
        `

    el('.data-mahasiswa').innerHTML = data
}

const getDataMahasiswa = () => {
    xhrReady(function (data) {
        setDataMahasiswa(JSON.parse(data))
    })

    xhr.open('GET', 'http://localhost:8080/mahasiswaRest', true)
    xhr.send()
}

const settingModal = () => {
    xhrReady(function (data) {
        let listProdi = ''

        JSON.parse(data).forEach(elemet => {
            listProdi +=
                /* html */
                `
                    <option value="${elemet.kode_prodi}">${elemet.nama_prodi}</option>
                `
        })

        el('.mahasiswa-modal #prodi').innerHTML += listProdi
    })

    xhr.open('GET', 'http://localhost:8080/prodiRest', true)
    xhr.send()

    for (let i = yearNow; i >= yearNow - 20; i--) {
        el('.mahasiswa-modal #tahun-masuk').innerHTML +=
            /* html */
            `
                <option value="${i}">${i}</option>
            `
    }

    for (let i = 1; i <= 12; i++) {
        el('.mahasiswa-modal #bulan-masuk').innerHTML +=
            /* html */
            `
                <option value="${i}">${bulan[i - 1]}</option>
            `
    }

    el(`.mahasiswa-modal #bulan-masuk [value="10"]`).setAttribute('selected', '')
}

window.addEventListener('load', function () {
    getDataMahasiswa()

    setTimeout(() => {
        settingModal()
    }, 300)
})

// 


let setFormData = function () {
    const getVal = key => el(`.mahasiswa-modal #${key}`).value

    form.append('nama', getVal('nama'))
    form.append('npm', getVal('npm'))
    form.append('prodi', getVal('prodi'))
    form.append('jenis_kelamin', getVal('jenis-kelamin'))
    form.append('alamat', getVal('alamat'))
    form.append('no_telp', getVal('no-telp'))
    form.append('tahun_masuk', getVal('tahun-masuk'))
    form.append('bulan_masuk', getVal('bulan-masuk'))
    form.append('seleksi_masuk', getVal('seleksi-masuk'))

    return
}


// 

// TODO: ADD and UPDATE
el('#simpan-data-mahasiswa').addEventListener('click', function () {
    const method = el('.mahasiswa-modal form').getAttribute('data-modal')

    setFormData()
    xhrReady(function (res) {
        const result = JSON.parse(res)
        if (result.status == 201) {
            Swal.fire(
                'Berhasil',
                result.messages.success,
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    el('.mahasiswa-modal .btn-close').click()
                    getDataMahasiswa()
                }
            })
        }

    })

    const npm = (method === 'PUT') ? `/${el('.mahasiswa-modal #npm').value}` : ''
    console.log(npm)

    xhr.open(method, `http://localhost:8080/mahasiswaRest${npm}`, true)
    xhr.send(form)
})