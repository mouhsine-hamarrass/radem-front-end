export class CounterModel {
    id?: number;
    codeEtatCompteur?: string;
    datePoseCompteur?: string;
    diametreCompteur?: string;
    libelleModeleCompteur?: string;
    libelleReglageDisjoncteur?: string;
    numeroPhysiqueCompteur?: string;

    constructor(id: number,
                codeEtatCompteur: string,
                datePoseCompteur: string,
                diametreCompteur: string,
                libelleModeleCompteur: string,
                libelleReglageDisjoncteur: string,
                numeroPhysiqueCompteur: string) {
        this.id = id;
        this.codeEtatCompteur = codeEtatCompteur;
        this.datePoseCompteur = datePoseCompteur;
        this.diametreCompteur = diametreCompteur;
        this.libelleModeleCompteur = libelleModeleCompteur;
        this.libelleReglageDisjoncteur = libelleReglageDisjoncteur;
        this.numeroPhysiqueCompteur = numeroPhysiqueCompteur;
    }
}
