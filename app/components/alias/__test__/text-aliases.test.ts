import {
    Text10,
    Text12,
    Text14,
    Text16,
    Text20,
    Text24,
    Text32,
} from '@components/alias/text-aliases';

describe('test size text', () => {
    test('returns the correct size text', () => {
        expect(Text10).toEqual(10);
        expect(Text12).toEqual(12);
        expect(Text14).toEqual(14);
        expect(Text16).toEqual(16);
        expect(Text20).toEqual(20);
        expect(Text24).toEqual(24);
        expect(Text32).toEqual(32);
    });
});
