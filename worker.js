const { workerData, parentPort } = require('worker_threads');
const driver = require('./build/Release/js-inv-mpu.node');

driver.setSampleFreq(workerData.sample);
driver.setDlpf(workerData.filter);
driver.startMpu();
driver.readMpu((accel, gyro, rot) => parentPort.postMessage
({
    accel: { x: accel[2], y: accel[1], z: accel[0] },
    gyro: { x: gyro[2], y: gyro[1], z: gyro[0] },
    rot: { y: rot[0], p: rot[1], r: rot[2] }
}));