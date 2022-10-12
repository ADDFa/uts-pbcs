el('.data-mahasiswa').addEventListener('click', e => {
    if (e.target.getAttribute('id') !== 'ubah') return

    const npm = e.target.getAttribute('data-npm')

    xhrReady(function (data) {
        const mahasiswa = JSON.parse(data)

        const setOptionSelected = (id, value) => {
            el(`.mahasiswa-modal #${id} [selected]`).removeAttribute('selected')
            el(`.mahasiswa-modal #${id} [value="${value}"]`).setAttribute('selected', '')
        }

        el('.mahasiswa-modal #nama').value = mahasiswa.nama
        el('.mahasiswa-modal #npm').value = mahasiswa.npm
        setOptionSelected('prodi', mahasiswa.prodi)
        setOptionSelected('jenis-kelamin', mahasiswa.jenis_kelamin)
        el('.mahasiswa-modal #alamat').value = mahasiswa.alamat
        el('.mahasiswa-modal #no-telp').value = mahasiswa.no_telp
        setOptionSelected('tahun-masuk', mahasiswa.tahun_masuk)
        setOptionSelected('bulan-masuk', parseInt(mahasiswa.bulan_masuk))
        setOptionSelected('seleksi-masuk', mahasiswa.seleksi_masuk)
    })

    xhr.open('GET', `http://localhost:8080/mahasiswaRest/${npm}`, true)
    xhr.send()

    el('.mahasiswa-modal .modal-title').innerText = 'Ubah Data Mahasiswa'
    el('.mahasiswa-modal form').setAttribute('data-modal', 'PUT')
})