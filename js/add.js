el('#tambah').addEventListener('click', function () {
    el('.mahasiswa-modal .modal-title').innerText = 'Tambah Data Mahasiswa'
    el('.mahasiswa-modal form').setAttribute('data-modal', 'POST')
})