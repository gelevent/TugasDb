const generateRandomId = require("./generateRandomId");
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const directory = './db';
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

const checkFile = './db/penjual.json';
if (!fs.existsSync(checkFile)) {
    fs.writeFileSync(checkFile, '[]', 'utf-8')
}

const penjualanQuestion = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer);
        })
    });
}

const penjualan = () => {
    const filePenjualan = fs.readFileSync(checkFile, 'utf-8');
    const data = JSON.parse(filePenjualan);
    console.log(data)

    rl.close()
}

const getPenjualan = (merek, seri, warna, ram, garansi, bonus, harga) => {
    const id = generateRandomId(5);
    const penjualan = { id, merek, seri, warna, ram, garansi, bonus, harga };
    const file = fs.readFileSync(checkFile, 'utf-8');
    const dataPenjualan = JSON.parse(file);
    dataPenjualan.push(penjualan);
    fs.writeFileSync(checkFile, JSON.stringify(dataPenjualan));
    console.log("Pesanan anda sedang diproses")

    rl.close()
}

const getById = (id) => {
    const file = fs.readFileSync(checkFile, 'utf-8');
    const data = JSON.parse(file)
    const findPenjualanId = data.find(penjualan => penjualan.id === id)

    if (findPenjualanId) {
        console.log(findPenjualanId);
        return findPenjualanId
    } else {
        console.log(`penjualan dengan id ini ${id} tidak ditemukan`)
        return false
    }

    rl.close()
}

const updateById = (id, updatePenjualan) => {
    const file = fs.readFileSync(checkFile, 'utf-8');
    const dataPenjualan = JSON.parse(file)
    const index = dataPenjualan.findIndex(penjualan => penjualan.id === id);

    if (index !== -1) {
        dataPenjualan[index] = { ...dataPenjualan[index], ...updatePenjualan };
        fs.writeFileSync(checkFile, JSON.stringify(dataPenjualan));
        console.log(`Berhasil meng update penjualan: ${id}`)
    } else {
        console.log(`Penjualan dengan id ini ${id} tidak ditemukan`)
    }

    rl.close()
}

const deleteById = (id) => {
    const file = fs.readFileSync(checkFile, 'utf-8');
    const dataPenjualan = JSON.parse(file);
    const filterPenjualan = dataPenjualan.filter(penjualan => penjualan.id !== id);

    if (filterPenjualan.length < dataPenjualan.length) {
        fs.writeFileSync(checkFile, JSON.stringify(filterPenjualan));
        console.log(`Berhasil menghapus id ${id}`);
    } else {
        console.log(`Id ini ${id} tidak ditemukan `)
    }

    rl.close()
}

module.exports = {
    penjualanQuestion,
    penjualan,
    getPenjualan,
    getById,
    updateById,
    deleteById,
    rl
}