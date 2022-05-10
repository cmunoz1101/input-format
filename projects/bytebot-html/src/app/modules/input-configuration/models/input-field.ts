import { InputFieldMandatory } from "./input-field-mandatory";
import { InputMapping } from "./input-mapping";

export class InputField {
    id: number;
    inputMapping: InputMapping;
    inputFieldMandatory: InputFieldMandatory;
    identifier: string;
    optional: string;
    description: string;
    dataType: string;
    dynamic: string;
    refDynamic: string;
    formatValidate: string;
    absolute: string;
    maxLength: number;
    dateFormat: string;
    groupSeparator: string;
    numberFormat: string;
    decimalSeparator: string;
    regularExpression: string;
    typeField: string;
    catalogueName: string;
}