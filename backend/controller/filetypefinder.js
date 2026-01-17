const resourceType = (file) => {
    let resourceType = ''
    if (file.mimetype.startsWith('video/')) {
        return resourceType = 'video'
    } else if (file.mimetype.startsWith('audio/')) {
        return resourceType = 'video'
    } else if (file.mimetype.startsWith('application/pdf')) {
        return resourceType = 'image'
    } else if (file.mimetype.startsWith('image/')) {
        return resourceType = 'image'
    } else {
        return resourceType = 'raw'
    }
}
module.exports = resourceType