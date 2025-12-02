const {tambah} = require('../src/mathFunctions');
const {kurang} = require('../src/mathFunctions');
const {bagi} = require('../src/mathFunctions');
const {kali} = require('../src/mathFunctions');
describe ('Fungsi Matematika', () => {

    //test untuk fungsi tambahan
    it('Penambahan 2 bilangan', () => {
        expect(tambah(1,2)).toBe(3);
    });
    it('Pengurangan 2 bilangan', () => {
        expect(kurang(2,1)).toBe(1);
    });
    it('Perkalian 2 bilangan', () => {
        expect(kali(2,1)).toBe(2);
    });
    it('Pembagian 2 bilangan', () => {
        expect(bagi(2,2)).toBe(1);
    });

});