function filesizeConverter(size_in_bit) {
    let truncateNum = size_in_bit.toString().length
    // console.log(truncateNum, size_in_bit, "FILE SIZE CONVERTER")
    if (truncateNum < 6) {
        data = {
            sizedata: (size_in_bit / 1024).toFixed(2),
            state: "KB"
        }
        return data;
    } else if (truncateNum > 5 || truncateNum < 9) {
        data = {
            sizedata: (size_in_bit / (1024 * 1024)).toFixed(2),
            state: "MB"
        }
        return data
    } else if (truncateNum > 8 || truncateNum < 12) {
        data = {
            sizedata: (size_in_bit / (1024 * 1024 * 1024)).toFixed(2),
            state: "GB"
        }
        return data
    } else if (truncateNum > 11 || truncateNum < 15) {
        data = {
            sizedata: (size_in_bit / (1024 * 1024 * 1024 * 1024)).toFixed(2),
            state: "TB"
        }
        return data
    } else if (truncateNum > 13 || truncateNum < 18) {
        data = {
            sizedata: (size_in_bit / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2),
            state: "PB"
        }
        return data
    } else if (truncateNum > 17 || truncateNum < 21) {
        data = {
            sizedata: (size_in_bit / (1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2),
            state: "EB"
        }
        return data
    } else if (truncateNum > 20 || truncateNum < 24) {
        data = {
            sizedata: (size_in_bit / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2),
            state: "ZB"
        }
        return data
    } else if (truncateNum > 26) {
        data = {
            sizedata: (size_in_bit / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2),
            state: "YB"
        }
        return data
    }
}

module.exports = filesizeConverter;