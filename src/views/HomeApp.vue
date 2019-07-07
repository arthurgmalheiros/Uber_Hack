<template>
  <div class="home">

    <TourHome v-if="tourCompleto != 'true' || newFeatureCompleta != 'true'"/>

    <HeaderHome name-fluxo="Home" :key="notificationsKey" />

    <!-- <OrdersInProgress :key="forceRerender" v-if="sliderIsVisible && currentOrders.length > 0" :orders="currentOrders" :detailOrder="clickOrder" :cancelOrder="openCancelaOrder"/> -->

    <div class="top-fix-home"></div>

    <div class="home-title">
        <img src="../assets/mtc_sem_escudo.svg"/>
    </div>

    <ListDefault id="allNews" class="newsHeight" style="margin: 0 !important; height: 200px" typeList="shortcuts">
        <Shortcuts slot="options" :id="homeNew.ID" href="" v-for="(homeNew, index) in homeNews" :key="index" :image="homeNew.IMAGE" :title="homeNew.TITLE" :index="index" :setNewsDetails="setNewsDetails"/>
        <Shortcuts slot="options" style="visibility: hidden; width:1px;"/>
    </ListDefault>

    <div v-if="menuOptions">
        <MenuOptions :closeThis="closeMenuOptions"/>
    </div>

    <div class="schedule">
        <div class="events-section">
            <h1 class="events-title">Minha Agenda</h1>
        </div>
        <!-- <TabsHome :counts="calendar.categories" :hideTabsMargin="notFound && !calendar.categories" /> -->
        <div class="events" v-if="!notFound && calendar.divs[0]">
            <div class="events" >
                <EventCalendar v-for="(div, index) in calendar.divs" :key="index" :name="div.name" :initialDate="formatDate(div.initialDate.date)" :location="div.location" :imageCover="div.imageCover" :favoriteId="'favorito'+div.id" :clickEvent="openEvent" :favoriteEvent="toggleFavorite" />
                <EventCalendar style="visibility: hidden; width:1px;" />
            </div>
        </div>
        <div v-else style="width: 100%; position: relative; margin: auto 0;">
            <div style="display: flex; position: relative; flex-direction:column; transform: scale(0.7, 0.7);">
                <img src="../assets/anniversary.svg" style="margin-top:-25px; font-size: 8em; margin: 0 auto; color: var(--primary-color); width: 80px;"/>
                <a v-on:click="goToEvents" style="font-size: 1.5em; padding: 10px 10px; color:black; text-decoration: underline;"> Explore eventos </a><span style="font-size: 1.2em; color:rgb(80,80,80)">Favorite-os na sua agenda. </span>
            </div>
        </div>
    </div>

    <!-- <div v-if="sliderIsVisible" class="border-100"></div> -->
    <!-- <Slider v-if="sliderIsVisible && currentOrders.length > 0" sliderId="pedidos-em-andamento" classes="slider-bottom" :onClose="onCloseSwipe">
        <SliderItem slot="sliderContent" v-for="(order, index) in currentOrders" v-bind:key="index">
            <OrderInProgress slot="slideContent" :orderStoreLogo="order.storeLogo" :orderId="order.id" :initialSatus="order.initial_status" :orderStatusDuring="order.status" :dateTime="formatDate(order.createDate.date)" :storeName="order.storeName" :paymentMethodName="order.paymentMethodName" :deliverTo="order.deliverTo" :structure="order.structure" :orderStatus="order.orderStatus" :orderIndex="index" :ordersAmount="currentOrders.length" :click="openedCurrentOrder" :orderDetail="clickOrder" :cancelOrder="openCancelaOrder"/>
        </SliderItem>
    </Slider> -->

    <BottomNavigation :key="componentKey" :openThis="openMenuOptions"/>

    <SlideNav :userPhoto="userData.IMAGE" :userName="userData.FULL_NAME" :open="openLogOut"/>

    <ModalCodigo v-if="cancelaOrder" @close="cancelaOrder = false" icon="error_outline" content="Você realmente deseja cancelar este pedido?">
        <div class="display-flex SIM" slot="footer">
            <DefaultButton classDiv="width-45 in_the_middle" name-button="NÃO" class-component="button-modal" v-on:buttonCallBack="closeModalCancel"/>
            <DefaultButton classDiv="width-45 in_the_middle" name-button="SIM" class-component="button-modal" v-on:buttonCallBack="cancelOrder(orderCancelado); cancelaOrder = false"/>
        </div>
    </ModalCodigo>
    <ModalCodigo v-if="notification" @close="notification = false" icon="error_outline" :content="notificationMessage">
        <div class="display-flex SIM" slot="footer">
            <DefaultButton classDiv="width-45 in_the_middle" name-button="OK" class-component="button-modal" v-on:buttonCallBack="callFunction()()"/>
        </div>
    </ModalCodigo>
    <ModalCodigo v-if="resultadoOrderCancel" @close="resultadoOrderCancel = false" icon="error_outline" :content="msgResultadoOrderCancel">
        <div class="display-flex SIM" slot="footer">
            <DefaultButton classDiv="width-45 in_the_middle" name-button="OK" class-component="button-modal" v-on:buttonCallBack="resultadoOrderCancel = false;"/>
        </div>
    </ModalCodigo>
    <ModalCodigo v-if="openModal" @close="openModal = false" icon="exit_to_app" content="Você realmente deseja sair do aplicativo?">
        <div class="display-flex SIM" slot="footer">
          <DefaultButton classDiv="width-45 in_the_middle" name-button="NÃO" class-component="button-modal" v-on:buttonCallBack="openModal = false;"/>
          <DefaultButton classDiv="width-45 in_the_middle" name-button="SIM" class-component="button-modal" v-on:buttonCallBack="logOff"/>
        </div>
    </ModalCodigo>
    <!-- <ModalCodigo v-if="hasSurveys" @close="hasSurveys = false" icon="error_outline" content="Você tem pesquisas em aberto. Deseja respondê-las agora?">
        <div class="display-flex SIM" slot="footer">
            <DefaultButton classDiv="width-45 in_the_middle" name-button="NÃO" class-component="button-modal" v-on:buttonCallBack="hasSurveys = false"/>
            <DefaultButton classDiv="width-45 in_the_middle" name-button="SIM" class-component="button-modal" v-on:buttonCallBack="goToSurveys()"/>
        </div>
    </ModalCodigo> -->

    <CompraEventos v-if="compraEventos" @close="compraEventos = false" :closeCompraEventos="closePopUp" :closeThis="closePopUp" :doIt="closeEventsCallback" :goToTelaEvents="goToEvents" :itens="pegarEventos"/>
    <Warning v-if="Warning" @close="compraEventos = false" :closeWarning="closeWarning" :closeThis="closeWarning" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TextLink from '@/components/TextLink.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import NewsHome from '@/components/NewsHome.vue';
import HeaderHome from '@/components/HeaderHome.vue';
import TabsHome from '@/components/TabsHome.vue';
import EventCalendar from '@/components/EventCalendar.vue';
import ListDefault from '@/components/ListDefault.vue';
import Shortcuts from '@/components/Shortcuts.vue';
import SlideNav from '@/components/SlideNav.vue';
import ModalCodigo from '@/components/ModalCodigo.vue';
import Slider from '@/components/Slider.vue';
import SliderItem from '@/components/SliderItem.vue';
import CompraEventos from '@/components/CompraEventos.vue';
import Warning from '@/components/Warning.vue';
import OrderInProgress from '@/components/OrderInProgress.vue';
import OrdersInProgress from '@/components/OrdersInProgress.vue';
import TourHome from '@/components/TourHome.vue';
import Request from '@/ts/Request';
import moment from 'moment';
import Util from '@/ts/Util';
import FCM from '@/ts/FCM';
import MenuOptions from '@/components/MenuOptions.vue';
import Card from '@/components/Card.vue';
declare var feather: any;

@Component({
    components: { BottomNavigation, TextLink, DefaultButton, NewsHome, HeaderHome, EventCalendar, TabsHome, Shortcuts, ListDefault, SlideNav, Slider, SliderItem, OrderInProgress, ModalCodigo, CompraEventos, OrdersInProgress, TourHome, Warning, Card, MenuOptions }
})
export default class HomeApp extends Vue {

    menuOptions: boolean = false;
    showModal: boolean = false;
    lastOrderId: number = Number(localStorage.getItem('LAST_ORDER_ID'));
    true: String = 'true';

    shorts: object = [
        { id: '1', nome: 'Minha Área' , icone: 'https://svgshare.com/i/9d4.svg', fluxo: '/MinhaArea', notification: false, funcao: () => {}, hasSoon: false, soonClass: '' },
        { id: '2', nome: 'Pedir' , icone: 'https://svgshare.com/i/BwY.svg', fluxo: '/Lojas', notification: 'false', funcao: () => { localStorage.setItem('ENTERED_ORDERS_FROM', 'HomeApp'); }, hasSoon: false, soonClass: '' },
        { id: '3', nome: 'Aluguel de Espaços' , icone: 'https://svgshare.com/i/Cyk.svg', fluxo: '/SpaceRent', notification: 'false', funcao: () => {}, hasSoon: false, soonClass: '' },
        { id: '4', nome: 'Recarregar Saldo' , icone: 'https://svgshare.com/i/9bs.svg', fluxo: '', notification: 'false', funcao: this.goToAddBalance, hasSoon: false, soonClass: '' },
        { id: '5', nome: 'Compras em Eventos' , icone: 'https://svgshare.com/i/9u_.svg', fluxo: '', notification: 'false', funcao: this.openPopUp, hasSoon: false, soonClass: '' },
        { id: '6', nome: 'Meus Ingressos' , icone: 'https://svgshare.com/i/9dF.svg', fluxo: '/Ingressos', notification: 'false', funcao: () => {}, hasSoon: false, soonClass: '' }
    ];
    homeNews: object[] = JSON.parse(localStorage.getItem('NEWS') || '[]');
    ORG_DATA: any = JSON.parse(localStorage.getItem('ORGANIZATION_DATA') || '{}');
    LOGO: any = this.ORG_DATA.CONFIGURATIONS.LOGO_IMAGE_SMALL;
    calendar: any = JSON.parse(localStorage.getItem('CALENDAR') || '{}');
    currentOrders: any = JSON.parse(localStorage.getItem('CURRENT_ORDERS') || '[]');
    sliderIsVisible: boolean = !this.lastOrderId || (this.currentOrders.length > 0 && this.currentOrders[0].id > this.lastOrderId);
    notFound: boolean = localStorage.getItem('CALENDAR') == '';
    userData: any = JSON.parse(localStorage.getItem('DADOS_USUARIOS') || '[]');
    noAddress: boolean = false;
    notification: boolean = false;
    notificationMessage: any = '';
    alreadyShowed = localStorage.getItem('ALREADY_SHOWED');
    lastNotification: any = [];
    cancelaOrder: boolean = false;
    orderCancelado: any;
    compraEventos: boolean = false;
    Warning: boolean = false;
    pegarEventos: any = JSON.parse(localStorage.getItem('CLOSE_EVENTS') || '[]');
    events: object[] = [];
    tourCompleto: any = localStorage.getItem('TOUR_COMPLETO') || '';
    newFeatureCompleta: any = localStorage.getItem('NEW_FEATURE_COMPLETA_2188') || '';
    resultadoOrderCancel : boolean = false;
    msgResultadoOrderCancel : any = '';
    surveys : any = [];
    hasSurveys: boolean = false;
    openModal: boolean = false;
    notificationsKey: number = 1;
    componentKey: number = 0;
    closeEventsCallback: Function = new Function();
    eventsCount: any = JSON.parse(localStorage.getItem('EVENTS') || '[]');

    mounted(){
        const self = this;
        feather.replace();
        $(document).ready(function(){
            $('.sidenav').sidenav();
        });

        localStorage.setItem('LAST_USER_ID', localStorage.getItem('USER_ID') || '');

        Util.setBackButtonBehavior(this.goBack);
        if (this.calendar && this.calendar.divs && this.calendar.categories) {
            this.setFavoritedEvents();
            // $('.tabs').tabs();
        }
        
        localStorage.setItem('SHOW_FILTERED_EVENTS', '');
        this.getOrdersFromUserInOrganization();
        this.loadEvents();
        // this.getUserTicketsByOrg();
        this.getEvents();
        this.getNews();
        this.getUserSurveys();

        //const lastGetUserData: any = localStorage.getItem('LAST_GET_USER_DATA') && localStorage.getItem('USER_DATA') && localStorage.getItem('USER_DEPENDENTS') ? localStorage.getItem('LAST_GET_USER_DATA') : null;
        const lastGetNotifications: any = localStorage.getItem('LAST_GET_NOTIFICATIONS') ? localStorage.getItem('LAST_GET_NOTIFICATIONS') : null;
        const duration: any    = (lastGetNotifications) ? moment.duration(moment().diff(lastGetNotifications)) : null;
        const diffTime: number = (duration) ? duration._data.hours : 0;

        //NOTIFICATIONS
        if (diffTime >= 0) {
            Util.getUserNotifications((response: any) => {
                let currentNotifications : any = [];

                if (response.length > 0) {
                    currentNotifications = response;
                    
                   let currentNotificationsStorage: any = JSON.parse(localStorage.getItem('CURRENT_NOTIFICATIONS') || '[]');
                   let oldNotificationsStorage: any = JSON.parse(localStorage.getItem('OLD_NOTIFICATIONS') || '[]');

                   if(oldNotificationsStorage && currentNotifications) {
                        if (self.existsNewValues(oldNotificationsStorage,currentNotifications)) {
                            localStorage.setItem('USER_HAS_NOTIFICATIONS', JSON.stringify(true));
                        } else { localStorage.setItem('USER_HAS_NOTIFICATIONS', JSON.stringify(false));  localStorage.setItem('OLD_NOTIFICATIONS',JSON.stringify(currentNotifications)); }
                    }
            
                    localStorage.setItem('CURRENT_NOTIFICATIONS', JSON.stringify(currentNotifications));
                    this.notificationsKey ++;

                } else {
                    currentNotifications = [];
                    localStorage.setItem('USER_HAS_NOTIFICATIONS', JSON.stringify(false));
                    localStorage.setItem('CURRENT_NOTIFICATIONS', JSON.stringify(currentNotifications));
                    this.notificationsKey ++;
                }
            });
        }
        Util.getUserData((response: any) => {
            self.userData = response.user;
            localStorage.setItem('DADOS_USUARIOS', JSON.stringify(self.userData));
            //self.verifyModifiedAt();
        });
        // this.getUserDependents();
        this.initFCM();
        Slider.refresh();
        localStorage.setItem('ENTERED_ORDERS_FROM', '');
        self.eventsCount = self.eventsCount.length;
    }

    initFCM() {
        new FCM().init(Util.onNewFCMToken, this.onPushOrderTapped, this.forceRerender);
    }

    forceRerender(data: any) {
        this.componentKey++; 
        this.getOrdersFromUserInOrganization(); 

        const orderId = data.orderId;
        const title   = data.title;
        const message = data.message;
        console.log(orderId + ', ' + title + ', ' + message);
        // M.toast({html: message});
    }

    onPushOrderTapped(data: any) {
        const orderId = data.orderId;
        const title   = data.title;
        const message = data.message;
        console.log(orderId + ', ' + title + ', ' + message);
        this.$router.push('/HomeApp');
    }
    
    existsNewValues(a: any,b: any) {
        return !!b.find((objeto: any) => !a.find((obj2: any) => obj2.id == objeto.id)) 
    }

    openLogOut(){
        this.openModal = true;
    }


    filterCloseEvents() {
        let filteredEvents : any = this.events.filter(((event:any) => event.salesMethod != 'I' && event.menuId != null && event.menuId != ''));
        var eventsObj : any = JSON.stringify(filteredEvents);
        localStorage.setItem('CLOSE_EVENTS',eventsObj);
        if (eventsObj) {
            this.pegarEventos = filteredEvents;
        } else {
            this.pegarEventos = [];
        }
    }

    openNotification( message:any ){
        this.notificationMessage = message;
        this.notification = true;
    }

    callFunction(){
        if(this.noAddress == true) return this.closeNotificationAndGoToAddress;
        else return this.closeNotification;
    }

    closeNotification(){
        this.notification = false;
    }

    closeNotificationAndGoToAddress(){
        this.notification = false;
        this.$router.push('AlteraEndereco');
    }
    verifyModifiedAt(){
        let message;
        let self = this;
        const date = moment();
        let lastNotification = null;
        const showed = this.alreadyShowed;
        const address = this.userData.ADDRESS;
        let addressBilling = address.filter(( a:any ) => a.TYPE == "BILLING");

        if (localStorage.getItem('DATE_ALREADY_SHOWED'))
            lastNotification = moment(localStorage.getItem('DATE_ALREADY_SHOWED') || '');

        if(!showed || (lastNotification && moment().diff(lastNotification, 'years') >= 1)){
            if(!address) {
                self.noAddress = true;
                localStorage.setItem('HAS_NOTIFICATION', 'true');
                localStorage.setItem('ALREADY_SHOWED', '1');
                localStorage.setItem('DATE_ALREADY_SHOWED', date.toString())
                message = "Você não tem nenhum endereço de cobrança cadastrado. Favor cadastrar algum endereço de cobrança."
                self.openNotification(message);
                return ;
            }
            if(addressBilling.length == 0) {
                self.noAddress = true;
                localStorage.setItem('HAS_NOTIFICATION', 'true');
                localStorage.setItem('ALREADY_SHOWED', '1');
                localStorage.setItem('DATE_ALREADY_SHOWED', date.toString())
                message = "Você não tem nenhum endereço de cobrança cadastrado. Favor cadastrar algum endereço de cobrança."
                self.openNotification(message);
            }else {
                self.noAddress = false;
                if(addressBilling[0].MODIFIED_AT == null){
                    let modifiedAtCreated = moment(addressBilling[0].CREATED_AT.date);
                    let currentDate = moment();
                    if(currentDate.diff(modifiedAtCreated, 'years') >= 1){
                        localStorage.setItem('HAS_NOTIFICATION', 'true');
                        localStorage.setItem('ALREADY_SHOWED', '1');
                        localStorage.setItem('DATE_ALREADY_SHOWED', date.toString())
                        message = "Você não altera seu endereço de COBRANÇA há 1 ano. Verifique se seu endereço de COBRANÇA está correto.";
                        self.openNotification(message);
                    }
                }else{
                    let modifiedAt = moment(addressBilling[0].MODIFIED_AT.date);
                    let currentDate = moment();
                    if(currentDate.diff(modifiedAt, 'years') >= 1){
                        localStorage.setItem('HAS_NOTIFICATION', 'true');
                        localStorage.setItem('ALREADY_SHOWED', '1');
                        localStorage.setItem('DATE_ALREADY_SHOWED', date.toString())
                        message = "Você não altera seu endereço de COBRANÇA há 1 ano. Verifique se seu endereço de COBRANÇA está correto.";
                        self.openNotification(message);
                    }
                }
            }
        }
    }

    // getUserTicketsByOrg() {
    //     var self = this;
    //     try {
    //         const req: any = new Request();
    //         req.body = {
    //             "USER_ID": localStorage.getItem('USER_ID'),
    //             "TOKEN": localStorage.getItem('TOKEN'),
    //             "NRORG": localStorage.getItem('NRORG')
    //         };
    //         req.route = 'getUserTicketsByOrg';
    //         req.callbackSuccess = function(response: any) {
    //             localStorage.setItem('USER_TICKETS', JSON.stringify(response.userTickets.filter((tickets: any) => moment().isBefore(tickets.finalDate.date))));
    //         };
    //         req.callbackError = function(error: any) {
                
    //             console.log(error);
    //         };
    //         req.send();
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    getOrdersFromUserInOrganization() {
        var self = this;

        const req = new Request();

        req.body = {
            "NRORG": localStorage.getItem('NRORG'),
            "USER_ID": localStorage.getItem("USER_ID"),
            "TOKEN": localStorage.getItem("TOKEN")
        };
        req.route = 'getOrdersFromUser';
        req.callbackSuccess = function (response: any) {

            // let finishedOrder = self.currentOrders.filter(((order:any) => order.isFinished
            // == true));

            // finishedOrder.forEach((order:any) => {
            //     M.toast({html: 'O seu pedido '+ order.id +' foi finalizado!'})
            // });
    
            // response.orders.filter((o: any) => o.isFinished == true).forEach(function(o: any) {
            //     if (self.currentOrders.find((o2: any) => o2.id == o.id)) {
            //         M.toast({html: 'Pedido '+o.id+' finalizado!'+'<a id="ver'+o.id+'" class="btn-flat toast-action seeOrder">VER</a>', classes: 'toast-blue', displayLength: 4500});

            //         $('#ver'+o.id).click(function(){
            //             localStorage.setItem('ORDER_ID', o.id+'');
            //             self.$router.push('ExtratoPedido');
            //         }); 

            //     }
    
                  
            // });

            self.currentOrders = response.orders.filter((order: any) => order && order.isFinished == false && order.items && order.items.length > 0);
            localStorage.setItem('CURRENT_ORDERS', JSON.stringify(self.currentOrders));

            if (self.currentOrders && self.currentOrders.length == 0) self.sliderIsVisible = false;
            else if (self.currentOrders && self.currentOrders[0].id > self.lastOrderId) self.sliderIsVisible = true;

            setTimeout(function() {
                const panel :any      = document.querySelector('#pedidosEmAndamento');
                const carousel  = M.Carousel.init(panel);
            }, 5)
        };
        req.callbackError = function (error: any) {
            
            console.log(error);
        };
        req.showLoader = true;

        req.send();
    }

    onCloseSwipe() {
        if (this.currentOrders) {
        localStorage.setItem('LAST_ORDER_ID', this.currentOrders[0].id);
        }
        this.sliderIsVisible = false;
    }

    clickOrder(orderId: number) {
        const order = this.currentOrders.find(( currentOrder:any ) => currentOrder.id == orderId);
        localStorage.setItem('CURRENT_ORDER', JSON.stringify(order));
        localStorage.setItem('ORDER_ID', String(orderId));
        this.$router.push('ExtratoPedido');
    }

    formatDate(stringDate: string) {
        const momentDate: any = moment(stringDate);
        return momentDate.lang('pt-br').format('DD [de] MMMM [às] HH:mm');
    }

    openEvent(eventCalendarId: string) {
        var eventId: number = Number(eventCalendarId.split("favorito")[1]);
        var events: any = [];
        var selectedEvent: any = {};

        this.calendar.divs.forEach((event: any) => {
            events.push(event); if (event.id == eventId) selectedEvent = event; 
        });
        
        localStorage.setItem('EVENT', JSON.stringify(selectedEvent));
        localStorage.setItem('EVENTS', JSON.stringify(events));
        localStorage.setItem('SELECTED_EVENT', eventId + '');

        this.$router.push('EventDetails');
    }

    loadEvents() {
        const self = this
        const req = new Request();
        req.body = {
            'USER_ID': localStorage.getItem('USER_ID') || '',
            'NRORG': localStorage.getItem('NRORG'),
            'TOKEN': localStorage.getItem('TOKEN') || ''
        };
        req.route = 'favorite';
        req.callbackSuccess = function(response: any) {
            const events = response.calendar;
            if (!events || events.length == 0) {
                self.notFound = true; 
                localStorage.setItem('CALENDAR', "");
                return;
            }
            else self.notFound = false;
            const divs: any = [];
            const calendar = {divs:divs};

            for(const i in response.calendar ) {
                divs.push(response.calendar[i]);
                divs.splice(5);
            }
            localStorage.setItem('CALENDAR', "");


            self.calendar = calendar;
            setTimeout(function() {
                $('.tabs').tabs();
                self.setFavoritedEvents();
            }, 200);

            localStorage.setItem('CALENDAR', JSON.stringify(calendar));
        };
        req.callbackError = function(error: any) {
            self.notFound = true;
            console.log(error);
        };
        req.send();
    }

    setFavoritedEvents() {
        const self = this;
   
        if (this.calendar && this.calendar.divs) {
            this.calendar.divs.forEach((event: any) => {
                $('#icon-favorito' + event.id).html(event.favoriteId != null ? 'favorite' : 'favorite_border');
            });
        }
    }

    toggleFavorite(eventId: string) {
        const isFavorite = $('#icon-' + eventId).html() === 'favorite';
        if (isFavorite) {
            $('#icon-' + eventId).html('favorite_border'); 
            this.unfavoriteEvent(Number(eventId.split('favorito')[1]));
        }
        else {
            $('#icon-' + eventId).html('favorite'); 
            this.favoriteEvent(Number(eventId.split('favorito')[1]));
        }
    }

    favoriteEvent(eventId: number) {
        const self = this
        const req = new Request();
        req.body = {
            'NRORG': localStorage.getItem('NRORG'),
            'TOKEN': localStorage.getItem('TOKEN'),
            'USER_ID': localStorage.getItem('USER_ID'),
            'EVENT_ID': eventId
        };
        req.route = 'createFavoriteEvent';
        req.callbackSuccess = function (response: any) { 
            //self.loadEvents(); 
        };
        req.callbackError = function(error: any) {
            
            console.log(error);
        };
        req.showLoader = false;
        req.send();
    }

    cancelOrder(orderId:number) {
        const self = this
        const req = new Request();
        req.body = {
            'ORDER_ID': orderId,
            'TOKEN': localStorage.getItem('TOKEN'),
            'USER_ID': localStorage.getItem('USER_ID'),
        };
        req.route = 'cancelOrder';
        req.callbackSuccess = function (response: any) {
            setTimeout(function(){
                self.cancelaOrder = false;
                self.msgResultadoOrderCancel = 'Seu pedido número '+orderId+' foi cancelado!';
                self.resultadoOrderCancel = true;
            },300); 
            // self.cancelaOrder = false;
            self.getOrdersFromUserInOrganization();
        };
        req.callbackError = function(error: any) {
            self.msgResultadoOrderCancel = 'Ocorreu um erro para cancelar seu pedido de número '+orderId+', tente novamente!';
            self.resultadoOrderCancel = true;
            console.log(error);
        };
        req.showLoader = true;
        req.send();
    }

    openCancelaOrder(orderId:number){
        const self = this;
        this.orderCancelado = orderId;
        this.cancelaOrder = true;
    }

    closeModalCancel(){
        this.cancelaOrder = false;
    }

    unfavoriteEvent(eventId: number) {
        const self = this
        const req = new Request();
        req.body = {
            'NRORG': localStorage.getItem('NRORG'),
            'TOKEN': localStorage.getItem('TOKEN'),
            'USER_ID': localStorage.getItem('USER_ID'),
            'EVENT_ID': eventId
        };
        req.route = 'deleteFavoriteEvent';
        req.callbackSuccess = function (response: any) { 
            //self.loadEvents(); 
            const localCalendar : any = localStorage.getItem('CALENDAR');
    
            if (!localCalendar && localCalendar.length < 1){
                localStorage.setItem('CALENDAR', '');
                 self.notFound = true; 
            }
        };
        req.callbackError = function(error: any) {
            
            console.log(error);
        };
        req.showLoader = false;
        req.send();
    }

    mostraModal() {
        this.showModal = true;
    }

    fechaModal() {
        this.showModal = false;
    }

    goBack() {
        //Do nothing
    }

    goTo() {
        this.$router.push({ name: 'CreditSuccess' });
    }

    goUpIcon() {
        this.$router.push({ name: 'CarteiraDigital' });
    }

    getEvents() {
        try {
            const self = this;
            const req = new Request();
            req.body = {
                "NRORG": localStorage.getItem('NRORG'),
                "TOKEN": localStorage.getItem('TOKEN'),
                "DATE": localStorage.getItem('SELECTED_DATE'),
                "STRUCTURES": localStorage.getItem('SELECTED_STRUCTURES') || '[]',
                "CATEGORIES": localStorage.getItem('CATEGORIES') || '[]',
                "TAGS": localStorage.getItem('SELECTED_TAGS') || '[]',
                "USER_ID": localStorage.getItem('USER_ID')
            };
            req.route = 'getEventsByOrg';
            req.callbackSuccess = function(response: any) { 
                let events = response.events;
                self.events = events;
                self.filterCloseEvents();
            };
            req.callbackError = function(error: any) {
                console.log(error);
            }
            req.blockTouchEvents = false;
            req.send();
            } catch (e) {
                console.log(e);
            }
    }

    getUserDependents() {
        const self = this
        const req = new Request();
        req.body = {
            'USER_ID': localStorage.getItem('USER_ID') || '',
            'NRORG': localStorage.getItem('NRORG'),
            'TOKEN': localStorage.getItem('TOKEN') || '',
        };
        req.route = 'getUserDependents';
        req.callbackSuccess = function (response: any) {
            localStorage.setItem('USER_DEPENDENTS', JSON.stringify(response.dependents));
        };
        req.callbackError = function(error: any) {
            
            console.log(error);
        };
        req.send();
    }

    openedCurrentOrder(){
        $('#pedidos-em-andamento').toggleClass('openedCurrentOrders');
        if($('#pedidos-em-andamento').hasClass('openedCurrentOrders')){
          $('#pedidos-em-andamento').addClass('opacity1');
          $('.indicatorNumeric, .statusCurrentOrder').addClass('display-none');
          $('.iconeExpandOrder').html('');
          $('.iconeExpandOrder').html('expand_more');
        }
        else {
          $('#pedidos-em-andamento').removeClass('opacity1');
          $('.indicatorNumeric').removeClass('display-none');
          $('.iconeExpandOrder').html('');
          $('.iconeExpandOrder').html('expand_less');
        }
    }

    getNews(){
        try {
            const self = this;
            const req = new Request();
                req.body = {
                'NRORG': localStorage.getItem('NRORG'),
                'MAX_RESULTS': 4
            };
            req.route  = 'getLastNews';
            req.callbackSuccess = function(response: any) {
                self.homeNews = response.news;
                localStorage.setItem('NEWS',JSON.stringify(self.homeNews));
                const now: any = moment();
                localStorage.setItem('LAST_GET_HOME', now);
            };
            req.callbackError = function(error: any) {
                console.log(error);
            }
            req.blockTouchEvents = false;
            req.send();
        } catch (e){
            console.log(e);
        }
    }

    goToCurrentNews() {
        const path            = window.location.href.split('/');
        const pathName   = path[path.length - 1];
        if (pathName.includes('#')) {
            const newsId = pathName.split('#')[1];
        }
    }

    setNewsDetails(ID: any, index: number){
        localStorage.setItem('NEWS_DETAIL', JSON.stringify(this.homeNews.find((news: any) => news.ID == ID)));
        localStorage.setItem('CURRENT_NEWS_INDEX', String(index));
        this.$router.push({ name: "NewsDetails" });
    }

    goToEvent(id: any) {
        const evento: any = this.events.find((event:any) => event.id == id);
        localStorage.setItem('SELECTED_EVENT', JSON.stringify(id));
        localStorage.setItem('EVENT_NAME_QRCODE', JSON.stringify(evento.name));
        if( evento.salesMethod == 'U' ) this.$router.push('ProductMenu');
        if( evento.salesMethod == 'S' ) this.$router.push('GetProduct');
    }

    openPopUp() {
        this.closeEventsCallback = this.goToEvent;
        this.compraEventos = true;  
    }

    openPopupBalance() {
        this.closeEventsCallback = this.goToAddBalance;
        this.compraEventos = true;
    }

    goToEvents(){
        localStorage.setItem('CAME_FROM_HOME', 'true');
        this.$router.push('Events');
    }

    closePopUp(){
        this.compraEventos = false;
    }

    openWarning(){
        this.Warning = true;
    }

    closeWarning(){
        this.Warning = false;
    }

    openMenuOptions(){
        this.menuOptions = true;
        localStorage.setItem('PULSE_CLASS', 'false');
    }

    closeMenuOptions(){
        const OPENLIST = 'popInBottom';
        const CLOSELIST  = 'popOutBottom';
        const OPEN= 'popIn';
        const CLOSE  = 'popOut';

        $('#option0').removeClass(OPENLIST);
        $('#option0').addClass(CLOSELIST);
        $('#option1').removeClass(OPENLIST);
        $('#option1').addClass(CLOSELIST);
        $('#option2').removeClass(OPENLIST);
        $('#option2').addClass(CLOSELIST);
        $('#option3').removeClass(OPENLIST);
        $('#option3').addClass(CLOSELIST);
        $('#option4').removeClass(OPENLIST);
        $('#option4').addClass(CLOSELIST);
        $('#option5').removeClass(OPENLIST);
        $('#option5').addClass(CLOSELIST);
        $('#btn').removeClass(OPEN);
        $('#btn').addClass(CLOSE);

        setTimeout( () => {
            this.menuOptions = false;
            this.componentKey++;
        }, 600);
    }

    goToAddBalance() {
        const userId : any =  localStorage.getItem('USER_ID');
        localStorage.setItem('USER_RECEIVED_ID', userId);
        this.$router.push('AddBalance')
    }

    getUserSurveys() {
        try {
            const self = this;
            const req = new Request();
                req.body = {
                    'USER_ID': localStorage.getItem('USER_ID'),
                    'NRORG': localStorage.getItem('NRORG'),
                    'TOKEN': localStorage.getItem('TOKEN')
            };
            req.route  = 'getSurveys';
            req.callbackSuccess = function(response: any) {
                if (response) self.surveys = response.surveys;
                if (self.surveys && self.surveys[0]) self.hasSurveys = true;
            };
            req.callbackError = function(error: any) {
                console.log('ERRO');
            }
            req.blockTouchEvents = false;
            req.send();
        } catch (e){
            console.log(e);
        }
    }

    goToSurveys(){
        this.hasSurveys = false;
        this.$router.push('Surveys');
    }

    logOff() {
        Util.logOff();
      }
}

</script>