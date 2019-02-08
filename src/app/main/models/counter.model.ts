export class CounterModel {
    id?: number;
    physiqueNo?: string;
    status?: string;
    brand?: string;
    coefficientReader?: string;
    beakerSettings?: string;
    numberWheels?: string;
    numberDial?: string;
    dateRemoval?: string;
    typeNetwork?: string;

    constructor(id: number,
                physiqueNo: string,
                status: string,
                brand: string,
                coefficientReader: string,
                beakerSettings: string,
                numberWheels: string,
                numberDial: string,
                dateRemoval: string,
                typeNetwork: string
    ) {
        this.id = id;
        this.physiqueNo = physiqueNo;
        this.status = status;
        this.brand = brand;
        this.coefficientReader = coefficientReader;
        this.beakerSettings = beakerSettings;
        this.numberWheels = numberWheels;
        this.numberDial = numberDial;
        this.typeNetwork = typeNetwork;
    }
}
