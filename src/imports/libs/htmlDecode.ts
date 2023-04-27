import {decode} from 'html-entities';

export const htmlDecode = (text: string) => {
    return decode(text);
}