import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  detailContent: string;
  error: ErrorEvent

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.getChiroService()
  }

  getChiroService(): void {
    const currentService = this.route.snapshot.paramMap.get('service');
    this.http.get("assets/docs/service-detail/" + currentService + ".html", {responseType: 'html'})
             .subscribe(content => this.detailContent = content,
                        error => if (error.error) console.log(error));
  }

}
