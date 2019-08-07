import { translate } from './culture';
export class LocalizableString {
    public constructor(private key: string) { }
    public toString = (): string => {
        return translate(this.key);
    }
}
