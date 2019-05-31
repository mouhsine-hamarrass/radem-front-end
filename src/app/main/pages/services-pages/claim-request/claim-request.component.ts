import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {addAttachment} from '@esri/arcgis-rest-feature-service';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {ServicesService} from '../../../services/services.service';

declare let L;

// const portailUrl = 'http://portailsig.radem.ma/server/rest/services/Reclamation_clients/FeatureServer/0';
const portailUrl = 'https://portailsig.radem.ma/server/rest/services/Gestion_Reclamation_clients/FeatureServer/0';

@Component({
  selector: 'app-claim-request',
  templateUrl: './claim-request.component.html',
  styleUrls: ['./claim-request.component.scss']
})
export class ClaimRequestComponent implements OnInit {

  private myMarker; // Position Marker
  private featureLayer; // Service ArcGis
  public attachment: any; // photo attachée
  public contact: FormGroup; // Formulaire du Réclamation
  public flag: string;
  clientContracts: Array<ContractAttachModel>;
  selectedContract: string;

  constructor(private formBuilder: FormBuilder,
              private services: ServicesService) {
    // Formulaire du Réclamation : Champs et Validation
    this.contact = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      claimType: ['001', [Validators.required]],
      claimText: [null, [Validators.required]],
      contractId: [null, [Validators.required]],
      attachment: null
    });
  }

  ngOnInit() {
    this.getClientAttachedContracts()

    const map = L.map('map').setView([33.8935200, -5.5472700], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Service Arcgis pour la gestion des Réclamation
    this.featureLayer = L.esri.featureLayer({
      url: portailUrl,
    });
    // Ajouter le Pointeur de Position sur la Carte
    map.on('click', (e) => {
      if (typeof (this.myMarker) === 'undefined') {
        this.myMarker = L.marker(e.latlng, {draggable: true}).addTo(map);
        this.myMarker.bindPopup(e.latlng.lat + ', ' + e.latlng.lng);
        // (document.getElementById('address') as HTMLInputElement).value = String(e.latlng.lat + ', ' + e.latlng.lng);
      } else {
        this.myMarker.setLatLng(e.latlng);
        this.myMarker.bindPopup(e.latlng.lat + ', ' + e.latlng.lng).update();
        (document.getElementById('address') as HTMLInputElement).value = String(e.latlng.lat + ', ' + e.latlng.lng);
      }
    });
  }

  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
    }, err => {
      console.log(err)
    });
  }

  // Soumettre la Réclamation au Serveur
  addClaim() {
    // Vérifier Si la Posiontion est Pricisée
    if (!this.myMarker) {
      Swal({
        type: 'warning',
        title: 'Position non Pricisé',
        text: 'Veuillez priciser votre Position',
      });
      return;
    }
    // paramètrage du Réclamation
    const geojsonFeature = {
      'type': 'Feature',
      'properties': {
        'NOM_PRENOM': this.contact.get('fullName').value,
        'EMAIL': this.contact.get('email').value,
        'TÉL': this.contact.get('phone').value,
        'TYPE_RECLAMATION': this.contact.get('claimType').value,
        'DÉTAILS_RECLAMATION': this.contact.get('claimText').value,
        'STATUT': null,
        'COMMENTAIRE': null,
        'CONTRAT': this.contact.get('contractId').value // inserer le num contrat si l'utilisateur est connecté
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [this.myMarker.getLatLng().lng, this.myMarker.getLatLng().lat]
      }
    };
    console.log(this.contact.get('contractId').value);
    // Soumetre la Réclamation et recuperation du mun du Réclamation pour le suivi
    this.featureLayer.addFeature(geojsonFeature, (error, response) => {
      debugger;
      if (error) {
        console.log(error);
        Swal({
          type: 'error',
          title: 'Erreur Rencontrée',
          text: 'Veuillez Réessayer Ultérieurement',
        });
      } else {
        Swal({
          type: 'success',
          title: 'Merci pour votre Collaboration',
          text: 'Votre réclamation a été bien Enregistrée',
        }).then((result) => {
          // ajouter l'attachment
          if (this.attachment) {
            addAttachment({
              url: portailUrl,
              featureId: response.objectId,
              attachment: this.attachment
            });
          }
          if (result.value) {
            Swal({
              type: 'info',
              title: response.objectId, // Num Réclamation
              text: 'Le Code de votre Réclamation'
            });
          }
        });
      }

      // si l'utilisateur est connecté vous attachez la Réclamation au num du Contrat au niveau
      // de la base des données de l'agence en ligne [response.objectId]
    });
  }

  onFileChanged(event) {
    this.attachment = event.target.files[0];
  }
}
