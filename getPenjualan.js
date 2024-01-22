const { getPenjualan, penjualanQuestion } = require('./penjualan');

const addPenjualan = async () => {
    const merek = await valid("Merek Laptop : ");
    const seri = await valid("Masukan nomor seri : ");
    const warna = await valid("Pilih Warna : ");
    const ram = await valid("Masukan ram : ");
    const garansi = await valid("garansi(iya/tidak) : ");
    const bonus = await valid("Masukan bonus : ");
    const harga = await valid("Harga : ");

    getPenjualan(merek, seri, warna, ram, garansi, bonus, harga)
}

const valid = async (prompt) => {
    let index;
    do {
        index = await penjualanQuestion(prompt)
        if (!index) {
            console.log('isi blog')
        }
    } while (!index);

    return index;
}

addPenjualan()