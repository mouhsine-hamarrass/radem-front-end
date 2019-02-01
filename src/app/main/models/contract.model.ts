export class ContractModel {
    id?: number;
    numeroContrat?: string;
    etatContrat?: string;
    usage?: string;
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
                numeroContrat: string,
                etatContrat: string,
                usage: string,
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
                tariff: string) {
        this.id = id;
        this.numeroContrat = numeroContrat;
        this.etatContrat = etatContrat;
        this.usage = usage;
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