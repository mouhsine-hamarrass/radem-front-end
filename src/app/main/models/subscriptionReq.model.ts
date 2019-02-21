export class SubscriptionReqModel {
    id?: number;
    firstAndLastName?: string;
  profession?: string;
  workingPlace?: string;
  addressOfWork?: string;
  cellphone?: string;
  homePhonenumber?: string;
  workPhonenumber?: string;
  adressNumber?: string;
  address?: string;
  building?: string;
  apartment?: string;
  floor?: string;
  address_supplement?: string;
  subscriptionType?: string;
  successor?: string;
  oldWaterSubscription?: string;
  oldElectricitySubscription?: string;


    constructor(id: number,
                firstAndLastName: string,
                profession: string,
                workingPlace: string,
                addressOfWork: string,
                cellphone: string,
                homePhonenumber: string,
                workPhonenumber: string,
                adressNumber: string,
                address: any,
                building: any,
                apartment: any,
                floor: string,
                address_supplement: string,
                subscriptionType: string,
                successor: string,
                oldWaterSubscription: string,
                oldElectricitySubscription: string) {

        this.id = id;
        this.firstAndLastName = firstAndLastName;
        this.profession = profession;
        this.workingPlace = workingPlace;
        this.addressOfWork = addressOfWork;
        this.cellphone = cellphone;
        this.homePhonenumber = homePhonenumber;
        this.workPhonenumber = workPhonenumber;
        this.adressNumber = adressNumber;
        this.address = address;
        this.building = building;
        this.apartment = apartment;
        this.floor = floor;
        this.address_supplement = address_supplement;
        this.subscriptionType = subscriptionType;
        this.successor = successor;
        this.oldWaterSubscription = oldWaterSubscription;
        this.oldElectricitySubscription = oldElectricitySubscription;
    }
}
