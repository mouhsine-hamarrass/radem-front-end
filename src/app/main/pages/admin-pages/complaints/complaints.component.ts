import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';

declare let L;
const portailUrl = 'https://portailsig.radem.ma/server/rest/services/Gestion_Reclamation_clients/FeatureServer/0';
const messageUrl = 'https://portailsig.radem.ma/server/rest/services/message_recl/FeatureServer/1';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  private myMarker: any;
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalCount = 0;
  public todayCount = 0;
  public showPanel = false;
  private messageLayer: any;
  public messages: any;
  public message: string;
  public showPagination = false;
  // private featureLayer; //Service ArcGis
  public reclamationCollection;
  public selectedReclamation = {
    'properties': {
      'OBJECTID': 0,
      'NOM_PRENOM': ''
    },
    'geometry': {
      'coordinates': []
    }
  };
  Icon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  static getNextStatus(status: string) {
    let status_reclamation: string;
    switch (status) {
      case 'Prise en Charge':
        status_reclamation = 'Intervention';
        break;
      case 'Intervention':
        status_reclamation = 'Cloturée';
        break;
      case 'Cloturée':
        status_reclamation = 'Cloturée';
        break;
      default:
        status_reclamation = 'Non Spécifié';
        break;
    }
    return status_reclamation;
  }

  static decodeStatus(status) {
    let type_reclamation: string;
    switch (status) {
      case 'Prise en Charge':
        type_reclamation = 'btn-label-warning';
        break;
      case 'Cloturée':
        type_reclamation = 'btn-label-success';
        break;
      case 'Intervention':
        type_reclamation = 'btn-label-brand';
        break;
      default:
        type_reclamation = 'btn-label-danger';
        break;
    }
    return type_reclamation;
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

  constructor() {
  }

  ngOnInit() {
    this.loadFeatures().then(response => {
      if (response) {
        this.showPagination = true;
        this.reclamationCollection = response;
        this.selectedReclamation = this.reclamationCollection[0];
        this.myMarker = L.marker([this.selectedReclamation.geometry.coordinates[1], this.selectedReclamation.geometry.coordinates[0]]).addTo(map);
      }
      console.log(response);
    });
    this.getTotalCount().then((count: number) => {
      this.totalCount = count;
    });

    this.getTodayCount().then((count: number) => {
      this.todayCount = count;
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
      draggable: true,
      icon: this.Icon
    }).addTo(map);
  }

  loadMessages(idReclamation: number) {
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
    const geojsonFeature = {
      'type': 'Feature',
      'properties': {
        'ID_RECLAMATION': this.selectedReclamation.properties.OBJECTID,
        'EMITTEUR': 'RADEM',
        'MESSAGE': this.message,
        'MODIFIE': '0',
        'ORDRE': '1'
      }
    };
    this.messageLayer.addFeature(geojsonFeature, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
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
    })

  }

  loadFeatures() {
    return new Promise(function (resolve, reject) {
      const query = L.esri.query({
        url: portailUrl
      })
      query.where('1=1').orderBy('CREATED_DATE', 'ASC');
      query.run(function (error, featureCollection, response) {
        if (error) {
          reject(error);
        } else {
          resolve(featureCollection.features);
        }
      });
    })
  }

  getTotalCount() {
    return new Promise(function (resolve, reject) {
      const query = L.esri.query({
        url: portailUrl
      })
      query.where('1=1');
      query.count(function (error, count, response) {
        if (error) {
          reject(error);
        } else {
          resolve(count);
        }
      });
    })
  }

  getTodayCount() {
    return new Promise(function (resolve, reject) {
      const query = L.esri.query({
        url: portailUrl
      })
      const now = new Date();
      const dd = now.getDate();
      const mm = now.getMonth() + 1
      const yyyy = now.getFullYear();
      const today = `${yyyy}-${mm}-${dd}`;
      query.where(`CREATED_DATE between date'${today} 00:00:00' and date'${today} 23:59:59'`)
      query.count(function (error, count, response) {
        if (error) {
          reject(error);
        } else {
          resolve(count);
        }
      });
    })
  }

  toggleSidePanel(show: boolean, reclamation?) {
    this.showPanel = show;
    if (reclamation) {
      this.selectedReclamation = reclamation;
      this.focusReclamation(reclamation);
    }
  }

  detailReclamtion(reclamation) {
    this.focusReclamation(reclamation);
  }

  focusReclamation(reclamation) {
    this.selectedReclamation = reclamation;
    this.myMarker.setLatLng([this.selectedReclamation.geometry.coordinates[1], this.selectedReclamation.geometry.coordinates[0]]);
    this.loadMessages(this.selectedReclamation.properties.OBJECTID).then(response => {
      console.log(response);
      this.messages = response
    });
  }

  nextStatus(reclamation) {
    if (reclamation.properties.STATUT) {
      if (ComplaintsComponent.getNextStatus(reclamation.properties.STATUT) !== 'Cloturée') {
        swal({
          title: 'Réclamation N° ' + reclamation.properties.OBJECTID,
          text: 'Modifier l\'état vers ' + ComplaintsComponent.getNextStatus(reclamation.properties.STATUT),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuer!'
        }).then((result) => {
          if (result.value) {
            reclamation.properties.STATUT = ComplaintsComponent.getNextStatus(reclamation.properties.STATUT);
            L.esri.featureLayer({
              url: portailUrl
            }).updateFeature(reclamation, (error, response) => {
              if (error) {
                console.log(error);
              } else {
                swal({
                  type: 'success',
                  title: 'Réclamation N° ' + reclamation.properties.OBJECTID,
                  text: 'Modification Enregistrée'
                });
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
    }
  }
}
