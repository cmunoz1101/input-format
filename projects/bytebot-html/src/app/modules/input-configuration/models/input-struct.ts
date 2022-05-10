import { Input } from "./input";

export class InputStruct {
    id: number;
    input: Input;
    version: number;
    draft: string;
    active: string;
    startDate: string;
    endDate: string;
    type: string;
    separator: string;
    startRow: number;
    autoTrim: string;
    fileConvert: string;
}