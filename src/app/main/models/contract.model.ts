export class ContractModel {
    id?: number;
    contractNo?: string;
    holderName?: string;
    payerName?: string;
    holderLastname?: string;
    holderFirstname?: string;
    addressConsumption?: string;
    usage?: string;
    typeNetwork?: string;
    status?: string;
    dateSubscription?: string;
    dateEndSubscription?: string;
    dateEffectSubscription?: string;
    /* model keep changing a lot, above recent values.*/
    numeroContrat?: string;
    etatContrat?: string;
    comment?: string;
    dateCreationAbonnement?: string;
    dateEffetAbonnement?: string;
    dateFinAbonnement?: string;
    diametrePuissanceFacture?: string;
    typeContrat?: string;
    nomClientTitulaire?: string;
    prenomClientTitulaire?: string;
    nomClientPayeur?: string;
    prenomClientPayeur?: string;
    soldeTot?: string;
    soldeExigible?: string;
    adresseClientPayeur?: string;
    libelleCategorieAbonnement?: string;
    libelleTypeReseau?: string;
    tariff?: string;

    constructor(id: number,
                contractNo: string,
                holderName: string,
                payerName: string,
                holderLastname: string,
                holderFirstname: string,
                addressConsumption: string,
                usage: string,
                typeNetwork: string,
                status: string,
                dateSubscription: string,
                dateEndSubscription: string,
                dateEffectSubscription: string,
                /* model keep changing a lot, above recent values.*/
                numeroContrat: string,
                etatContrat: string,
                comment: string,
                dateCreationAbonnement: string,
                dateEffetAbonnement: string,
                dateFinAbonnement: string,
                diametrePuissanceFacture: string,
                typeContrat: string,
                nomClientTitulaire: string,
                prenomClientTitulaire: string,
                nomClientPayeur: string,
                prenomClientPayeur: string,
                adresseClientPayeur: string,
                soldeTot: string,
                soldeExigible: string,
                libelleCategorieAbonnement: string,
                libelleTypeReseau: string,
                tariff: string
    ) {
        this.id = id;
        this.contractNo = contractNo;
        this.holderName = holderName;
        this.payerName = payerName;
        this.holderLastname = holderLastname;
        this.holderFirstname = holderFirstname;
        this.addressConsumption = addressConsumption;
        this.usage = usage;
        this.typeNetwork = typeNetwork;
        this.status = status;
        this.dateSubscription = dateSubscription;
        this.dateEndSubscription = dateEndSubscription;
        this.dateEffectSubscription = dateEffectSubscription;
        /* model keep changing a lot, above recent values.*/
        this.numeroContrat = numeroContrat;
        this.etatContrat = etatContrat;
        this.comment = comment;
        this.dateCreationAbonnement = dateCreationAbonnement;
        this.dateEffetAbonnement = dateEffetAbonnement;
        this.dateFinAbonnement = dateFinAbonnement;
        this.diametrePuissanceFacture = diametrePuissanceFacture;
        this.typeContrat = typeContrat;
        this.nomClientTitulaire = nomClientTitulaire;
        this.prenomClientTitulaire = prenomClientTitulaire;
        this.nomClientPayeur = nomClientPayeur;
        this.prenomClientPayeur = prenomClientPayeur;
        this.adresseClientPayeur = adresseClientPayeur;
        this.soldeTot = soldeTot;
        this.soldeExigible = soldeExigible;
        this.libelleCategorieAbonnement = libelleCategorieAbonnement;
        this.libelleTypeReseau = libelleTypeReseau;
    }
}
