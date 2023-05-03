import {
    Spacing0,
    Spacing1,
    Spacing2,
    Spacing3,
    Spacing4,
    Spacing5,
    Spacing6,
    Spacing8,
    Spacing10,
    Spacing12,
    Spacing14,
    Spacing15,
    Spacing16,
    Spacing20,
    Spacing24,
    Spacing30,
    Spacing32,
    Spacing48,
    Spacing50,
    Spacing58,
    Spacing64,
    Spacing77,
    Spacing90,
} from '@components/alias/spacing-aliases';

describe('test space', () => {
    test('returns the correct space', () => {
        expect(Spacing0).toEqual(0);
        expect(Spacing1).toEqual(1);
        expect(Spacing2).toEqual(2);
        expect(Spacing3).toEqual(3);
        expect(Spacing4).toEqual(4);
        expect(Spacing5).toEqual(5);
        expect(Spacing6).toEqual(6);
        expect(Spacing8).toEqual(8);
        expect(Spacing10).toEqual(10);
        expect(Spacing12).toEqual(12);
        expect(Spacing14).toEqual(14);
        expect(Spacing15).toEqual(15);
        expect(Spacing16).toEqual(16);
        expect(Spacing20).toEqual(20);
        expect(Spacing24).toEqual(24);
        expect(Spacing30).toEqual(30);
        expect(Spacing32).toEqual(32);
        expect(Spacing48).toEqual(48);
        expect(Spacing50).toEqual(50);
        expect(Spacing58).toEqual(58);
        expect(Spacing64).toEqual(64);
        expect(Spacing77).toEqual(77);
        expect(Spacing90).toEqual(90);
    });
});
