import { getLetterMatchCount } from './';

describe('getLetterMatchCount', () => {
    const secretWord = 'train';
    test('return correct count when there are no matching letters', () => {
        const letterMatchCount = getLetterMatchCount('bones', secretWord);
        expect(letterMatchCount).toBe(0);
    });

    test('return the correct count when there are three matching letters', () => {
        const letterMatchCount = getLetterMatchCount('obtain', secretWord);
        expect(letterMatchCount).toBe(3);
    });

    test('return the correct count when there are duplicate letters in the guess', () => {
        const letterMatchCount = getLetterMatchCount('attain', secretWord);
        expect(letterMatchCount).toBe(3);
    });
});