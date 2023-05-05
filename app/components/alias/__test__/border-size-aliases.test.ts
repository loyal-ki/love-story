import {BorderSize1, BorderSize2, BorderSize4, BorderSize6, BorderSize8} from '..';

describe('Test border size', () => {
    test('returns the correct border', () => {
        expect(BorderSize1).toEqual(1);
        expect(BorderSize2).toEqual(2);
        expect(BorderSize4).toEqual(4);
        expect(BorderSize6).toEqual(6);
        expect(BorderSize8).toEqual(8);
    });
});
