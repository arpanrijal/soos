const resourceType = (file) => {
    if (file.mimetype.startsWith('video/')) {
        return 'video'
    } else if (file.mimetype.startsWith('audio/')) {
        return 'video'
    } else if (file.mimetype.startsWith('image/')) {
        return 'image'
    } else {
        return 'raw'
    }
}
module.exports = resourceType