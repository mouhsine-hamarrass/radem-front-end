export class ContractModel {
    id?: number;
    etatContrat?: string;
    dateCreationAbonnement?: string;
    dateEffetAbonnement?: string;
    dateFinAbonnement?: string;
    diametrePuissanceFacture?: string;
    typeContrat?: string;
    nomClientTitulaire?: string;
    prenomClientTitulaire?: string;
    nomClientPayeur?: string;
    prenomClientPayeur?: string;
    adresseClientPayeur?: string;
    libelleCategorieAbonnement?: string;
    libelleTypeReseau?: string;
    tariff?: string;

    constructor(id: number,
                etatContrat: string,
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
                libelleCategorieAbonnement: string,
                libelleTypeReseau: string,
                tariff: string) {
        this.id = id;
        this.etatContrat = etatContrat;
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
        this.libelleCategorieAbonnement = libelleCategorieAbonnement;
        this.libelleTypeReseau = libelleTypeReseau;
    }
}
