async function deleteFiles(id,value) {
    await fetch(`/ftp/deletefile/${id}/${value}`, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) {
            console.error("Network issue")
            throw new Error(res)
        }
    }).then(
        window.location.href = '/ftp'
    ).catch(err => console.error("Error in delete file js ftp file: ", err))
}