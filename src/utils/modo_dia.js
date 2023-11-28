import data from '../assets/modo_dia.json';


const getRawData = () => {
    return data;
}

const getModes = () => {
    const modes = data.map((item) => item.modo);
    const uniqueModes = [...new Set(modes)];
    return uniqueModes.sort();
}

const getModeData = (mode) => {
    return data.filter((item) => {
        return item.modo === mode;
    });
}

export  {
    getRawData,
    getModes,
    getModeData,
}