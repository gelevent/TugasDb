const { getById, penjualanQuestion } = require('./penjualan')

const penjualanId = async () => {
    const id = await penjualanQuestion("Masukan id penjualan : ")

    getById(id)
}

penjualanId()