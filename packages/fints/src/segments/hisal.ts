import { SegmentClass } from "./segment";
import { SEPAAccount } from "../types";
import { Parse } from "../parse";

export class HISALProps {
    public segNo: number;
    public account: SEPAAccount;
    public productName: string;
    public currency: string;
    public availableBalance: number;
}

/**
 * HISAL (Saldenrückmeldung)
 * Section C.2.1.2.2
 */
export class HISAL extends SegmentClass(HISALProps) {
    public type = "HISAL";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [
            [ iban, bic, accountNumber, subAccount, _country, blz ], 
            [ productName ], 
            [ _currency ],
            [ _flag, balance, currency, date ]
        ] = input;
        this.account = { accountNumber, subAccount, blz, iban, bic };
        this.productName = productName;
        this.currency = currency;
        this.availableBalance = _flag === 'C' ? Parse.num(balance) : -Parse.num(balance);
    }
}
