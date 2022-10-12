el('.data-mahasiswa').addEventListener('click', e => {
    if (e.target.getAttribute('id') !== 'hapus') return

    const npm = e.target.getAttribute('data-npm')

    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: "Data mahasiswa akan dihapus secara permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
        if (result.isConfirmed) {
            // form.append('npm', npm)
            // xhrReady(function (tes) {
            //     console.log(tes)
            // })

            // xhr.open('GET', `http://localhost:8080/mahasiswaRest/${npm}`, true)
            // xhr.send()
            console.log(npm)
            fetch(`http://localhst:8080/mahasiswaRest/${npm}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }).then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
        }
    })
})