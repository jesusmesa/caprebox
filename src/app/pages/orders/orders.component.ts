import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private webSocketService:WebsocketService) {
    //this.webSocketService.emit('pedido',{data:"dasdadasd"})

    this.webSocketService.listen('nuevo-pedido').subscribe(resp => {
      console.log(resp);
      
    });

  }

  ngOnInit(): void {
    

  }

  

}
