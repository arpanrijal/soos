const resourceType = (file) => {
    let resourceType = 'image'
    if (file.mimetype.startsWith('video/')) {
        resourceType = 'video'
    } else if (file.mimetype.startsWith('audio/')) {
        resourceType = 'video'
    } else if (file.mimetype === 'application/pdf') {
        resourceType = 'image'
    } else if (file.mimetype.startsWith('image/')) {
        resourceType = 'image'
    } else {
        resourceType = 'raw'
    }
    return resourceType
}
module.exports = resourceType