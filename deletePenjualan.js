const { deleteById, penjualanQuestion } = require('./penjualan');

const deleted = async () => {
    const id = await penjualanQuestion("Masukkan ID penjualan: ");
    deleteById(id)
}
deleted()