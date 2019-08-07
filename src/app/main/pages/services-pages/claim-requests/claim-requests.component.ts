import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {ServicesService} from '../../../services/services.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare let L;
const portailUrl = 'https://portailsig.radem.ma/server/rest/services/Gestion_Reclamation_clients/FeatureServer/0';
const messageUrl = 'https://portailsig.radem.ma/server/rest/services/message_recl/FeatureServer/1';

@Component({
  selector: 'app-claim-requests',
  templateUrl: './claim-requests.component.html',
  styleUrls: ['./claim-requests.component.scss']
})
export class ClaimRequestsComponent implements OnInit {

  clientContracts: Array<ContractAttachModel>;
  selectedContract: string;
  public contractForm: FormGroup;
  public currentPage = 1;

  public showPagination = false;
  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  public itemsPerPage = 7;

  private myMarker: any;
  public showPanel = false;
  private messageLayer: any;
  public messages: any;
  public message: string;
  // Icon du Marker
  Icon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  // private featureLayer; //Service ArcGis
  public reclamationCollection;

  public selectedReclamation = {
    'properties': {
      'OBJECTID': 0,
      'NOM_PRENOM': '',
      'CONTRAT': '',
      'TEL': '',
      'EMAIL': '',
      'CREATED_DATE': '',
      'DETAILS_RECLAMATION': ''
    },
    'geometry': {
      'coordinates': []
    }
  };

  constructor(private services: ServicesService,
              private formBuilder: FormBuilder) {
    this
      .contractForm = this.formBuilder.group({
      contract: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getClientAttachedContracts();
    this.loadFeatures().then(response => {
      if (response) {
        this.reclamationCollection = response;
        this.showPagination = true;
        this.selectedReclamation = this.reclamationCollection[0];
        this.myMarker = this.myMarker
          .setLatLng([this.selectedReclamation.geometry.coordinates[1], this.selectedReclamation.geometry.coordinates[0]]);
      }
      // console.log(response);
    });
    const map = L.map('map').setView([33.8935200, -5.5472700], 11);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.radem.ma">RADEM</a> Copyrights'
    }).addTo(map);
    // Service Arcgis pour la gestion des Réclamation
    // Ajouer le Marker
    this.messageLayer = L.esri.featureLayer({
      url: messageUrl
    });

    // Ajouer le Marker
    this.myMarker = L.marker([33.8935200, -5.5472700], {
      draggable: false,
      icon: this.Icon
    }).addTo(map);
  }

  pageChanged(page: number
  ):
    void {
    this.page = page;
  }

  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
      if (this.clientContracts.length) {
        this.selectedContract = this.clientContracts[0].contractNo;
        const clientContractsNo = [];
        this.clientContracts.forEach(function (value) {
          clientContractsNo.push(value.contractNo);
        });
        const savedContractNo = localStorage.getItem('SELECTED_CONTRACT');
        if (savedContractNo && clientContractsNo.includes(savedContractNo)) {
          this.selectedContract = localStorage.getItem('SELECTED_CONTRACT');
        }
        this.setContract(this.selectedContract);
      }
    }, err => {
      console.log(err)
    });
  }

  setContract(id
                :
                any
  ) {
    localStorage.setItem('SELECTED_CONTRACT', id);
  }

  loadMessages(idReclamation
                 :
                 number
  ) {
    return new Promise(function (resolve, reject) {
      const query = L.esri.query({
        url: messageUrl
      });
      query.where(`ID_RECLAMATION=${idReclamation}`).orderBy('OBJECTID', 'DESC');
      query.run(function (error, featureCollection, response) {
        if (error) {
          reject(error);
        } else {
          resolve(featureCollection.features);
        }
      });
    });

  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    const geojsonFeature = {
      'type': 'Feature',
      'properties': {
        'ID_RECLAMATION': this.selectedReclamation.properties.OBJECTID,
        'EMITTEUR': this.selectedReclamation.properties.NOM_PRENOM,
        'MESSAGE': this.message,
        'MODIFIE': '0',
        'ORDRE': '1'
      }
    };
    this.messageLayer.addFeature(geojsonFeature, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(response);
        this.loadMessages(this.selectedReclamation.properties.OBJECTID).then(respnose => {
          this.messages = respnose;
        });
      }
      this.message = '';
    });
  }

  deleteFeature(reclamation) {
    swal({
      title: 'Etes-vous sûr?',
      text: 'Cette action est irréversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer'
    }).then((result) => {
      if (result.value) {
        L.esri.featureLayer({
          url: portailUrl
        }).deleteFeature(reclamation.properties.OBJECTID, (error, response) => {
          if (error) {
            console.log(error);
          } else {
            swal(
              'Supprimé!',
              `Réclamation #${reclamation.properties.OBJECTID} a été supprimée`,
              'success'
            );
            this.loadFeatures().then(response => {
              if (response) {
                this.reclamationCollection = response;
                this.showPagination = true;
              }
            });
          }
        });
      }
    });

  }

  loadFeatures() {
    return new Promise(function (resolve, reject) {
      const query = L.esri.query({
        url: portailUrl
      });
      // query.where("CONTRAT = contrat").orderBy('CREATED_DATE', 'ASC');
      // Cas de plusieurs contrats // query.where("CONTRAT IN (*contrat_1,..)").orderBy('CREATED_DATE', 'ASC');
      query.where('1=1').orderBy('CREATED_DATE', 'ASC');
      query.run(function (error, featureCollection, response) {
        if (error) {
          reject(error);
        } else {
          resolve(featureCollection.features);
        }
      });
    });
  }

  toggleSidePanel(show: boolean, reclamation ?) {
    this.showPanel = show;
    if (reclamation) {
      this.selectedReclamation = reclamation;
      this.focusReclamation(reclamation);
    }
  }

  detailReclamtion(reclamation) {
    console.log('clicked');
    this.focusReclamation(reclamation);
  }

  focusReclamation(reclamation) {
    this.selectedReclamation = reclamation;
    this.myMarker.setLatLng([this.selectedReclamation.geometry.coordinates[1], this.selectedReclamation.geometry.coordinates[0]]);
    this.loadMessages(this.selectedReclamation.properties.OBJECTID).then(response => {
      console.log(response);
      this.messages = response;
    });
    const map = L.map('map')
      .setView([this.selectedReclamation.geometry.coordinates[1], this.selectedReclamation.geometry.coordinates[0]], 11);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.radem.ma">RADEM</a> Copyrights'
    }).addTo(map);
  }

  decodeType(type) {
    let type_reclamation: string;
    switch (type) {
      case '001':
        type_reclamation = 'Eau';
        break;
      case '002':
        type_reclamation = 'Electricité';
        break;
      case '003':
        type_reclamation = 'Assainissement';
        break;
      case '004':
        type_reclamation = 'Contrat';
        break;
      default:
        type_reclamation = 'Non-défini';
        break;
    }
    return type_reclamation;
  }
}
