import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {addAttachment} from '@esri/arcgis-rest-feature-service';
import Swal from 'sweetalert2';
import * as _ from 'underscore';


declare let L;

const portailUrl = 'https://portailsig.radem.ma/server/rest/services/Gestion_Reclamation_clients/FeatureServer/0';

@Component({
  selector: 'app-claim-request',
  templateUrl: './claim-request.component.html',
  styleUrls: ['./claim-request.component.scss']
})
export class ClaimRequestComponent implements OnInit {

  dynamic: DynamicModel;
  private myMarker; // Position Marker
  private featureLayer; // Service ArcGis
  public attachment: any; // photo attachée
  public contact: FormGroup; // Formulaire du Réclamation
  // Icon du Marker
  Icon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  lat: string;
  lng: string;

  constructor(private adminServices: AdminService,
              private formBuilder: FormBuilder) {
    // Formulaire du Réclamation : Champs et Validation
    this.contact = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      claimType: ['001', [Validators.required]],
      claimText: [null, [Validators.required]],
      attachment: null
    });
  }

  ngOnInit() {
    this.adminServices.getDynamicContent('rec').subscribe(
      response => {
        this.dynamic = response.data;
      },
      err => {
        console.log(err);
      }
    );

    const map = L.map('map').setView([33.8935200, -5.5472700], 11);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Service Arcgis pour la gestion des Réclamation
    this.featureLayer = L.esri.featureLayer({
      url: portailUrl,
    });
    // Ajouer le Marker
    const Marker = L.marker([33.8935200, -5.5472700], {
      draggable: true,
      icon: this.Icon
    }).addTo(map);

    this.myMarker = Marker;
  }

  // Soumettre la Réclamation au Serveur
  addClaim() {
    // Vérifier Si la Posiontion est Pricisée
    if (this.myMarker.getLatLng().lat === 33.89352 && _.isEqual(this.myMarker.getLatLng().lng, -5.54727)) {
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
        'CONTRAT': null // inserer le num contrat si l'utilisateur est connecté
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [this.myMarker.getLatLng().lng, this.myMarker.getLatLng().lat]
      }
    };
    // Soumetre la Réclamation et recuperation du mun du Réclamation pour le suivi
    this.featureLayer.addFeature(geojsonFeature, (error, response) => {
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
